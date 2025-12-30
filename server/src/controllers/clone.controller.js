import callAI from "../utils/callAI.js";
import cloudinary from "../config/cloudinary.js";
import Generation from "../models/Generation.js";
import User from "../models/User.js";
import Person from "../models/Person.js";
import fs from "fs";
import os from "os";
import path from "path";

export const cloneVoice = async (req, res) => {
  let tempPath;
  try {
    const { text, personId } = req.body;

    if (!text || !personId) {
      return res.status(400).json({ message: "Text and personId required" });
    }

    const person = await Person.findOne({
      _id: personId,
      userId: req.userId
    });

    if (!person) {
      return res.status(404).json({ message: "Voice profile not found" });
    }

    if (!person.voicePath) {
      return res.status(404).json({ message: "Voice profile has no voicePath" });
    }

    const voicePath = path.resolve(person.voicePath);
    if (!fs.existsSync(voicePath)) {
      return res.status(404).json({ message: "Voice file not found" });
    }

    const user = await User.findById(req.userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.usage?.secondsGenerated >= user.usage?.limit) {
      return res.status(403).json({ message: "Limit reached" });
    }

    const audioBuffer = await callAI(text, voicePath);
    if (!audioBuffer) {
      throw new Error("No audio buffer returned from AI");
    }


    tempPath = path.join(os.tmpdir(), `voice-${req.userId}-${Date.now()}.wav`);
    fs.writeFileSync(tempPath, audioBuffer);

    const upload = await cloudinary.uploader.upload(tempPath, {
      resource_type: "video",
      folder: `voices/${req.userId}`
    });

    const duration = Math.ceil(text.length / 15);

    await Generation.create({
      userId: req.userId,
      personId,
      text,
      audioUrl: upload.secure_url,
      duration
    });

    await User.findByIdAndUpdate(req.userId, {
      $inc: { "usage.secondsGenerated": duration }
    });

    return res.json({ audioUrl: upload.secure_url });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Audio generation failed" });
  } finally {
    if (tempPath && fs.existsSync(tempPath)) {
      try {
        fs.unlinkSync(tempPath);
      } catch (e) {
        console.error("Failed to remove temp file", e);
      }
    }
  }
};


