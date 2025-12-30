import axios from "axios";
import fs from "fs";
import path from "path";
import Person from "../models/Person.js";
import Generation from "../models/Generation.js";

/**
 * POST /api/clone
 * Body: { text, personId }
 * Auth: Required
 */
export const cloneVoice = async (req, res) => {
  try {
    const { text, personId } = req.body;

    // 1️⃣ Validate input
    if (!text || !personId) {
      return res.status(400).json({
        message: "Text and personId required"
      });
    }

    // 2️⃣ Find voice profile
    const person = await Person.findById(personId);
    if (!person) {
      return res.status(404).json({
        message: "Voice profile not found"
      });
    }

    if (!person.voicePath) {
      return res.status(404).json({
        message: "Voice file not found"
      });
    }

    // 3️⃣ Download voice from Cloudinary
    const tempVoicePath = path.join(
      process.cwd(),
      `voice_${Date.now()}.wav`
    );

    const voiceResponse = await axios({
      method: "GET",
      url: person.voicePath,
      responseType: "stream"
    });

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(tempVoicePath);
      voiceResponse.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // 4️⃣ Call AI service (HF Space / XTTS)
    const aiResponse = await axios.post(
      process.env.AI_SERVICE_URL + "/clone",
      {
        text,
        voice_path: tempVoicePath
      },
      {
        timeout: 120000 // 2 min (XTTS is heavy)
      }
    );

    const audioUrl = aiResponse.data.audioUrl;

    if (!audioUrl) {
      throw new Error("AI service failed to generate audio");
    }

    // 5️⃣ Save generation history (optional but recommended)
    await Generation.create({
      userId: req.userId,
      personId,
      text,
      audioUrl,
      seconds: Math.ceil(text.length / 15)
    });

    // 6️⃣ Cleanup temp file
    fs.unlinkSync(tempVoicePath);

    // 7️⃣ Respond
    res.status(200).json({
      audioUrl
    });

  } catch (err) {
    console.error("CLONE ERROR:", err.message);

    return res.status(500).json({
      message: "Voice generation failed"
    });
  }
};
