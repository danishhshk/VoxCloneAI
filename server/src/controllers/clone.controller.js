import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import Person from "../models/Person.js";
import Generation from "../models/Generation.js";

/**
 * POST /api/clone
 * Body: { text, personId }
 * Auth: Required
 */
console.log("AI_SERVICE_URL =", process.env.AI_SERVICE_URL);

export const cloneVoice = async (req, res) => {
  let tempVoicePath;

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
    if (!person || !person.voicePath) {
      return res.status(404).json({
        message: "Voice profile not found"
      });
    }

    // 3️⃣ Download voice from Cloudinary → temp file
    tempVoicePath = path.join(
      process.cwd(),
      `voice_${Date.now()}.wav`
    );

    const voiceResponse = await axios.get(person.voicePath, {
      responseType: "stream"
    });

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(tempVoicePath);
      voiceResponse.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    // 4️⃣ Send MULTIPART request to AI service
    const formData = new FormData();
    formData.append("text", text);
    formData.append("voice", fs.createReadStream(tempVoicePath));

    const aiResponse = await axios.post(
      `${process.env.AI_SERVICE_URL}/clone`,
      formData,
      {
        headers: formData.getHeaders(),
        timeout: 180000 // XTTS on CPU is slow
      }
    );

    // ⚠️ HF Space returns AUDIO FILE, not JSON
    const audioBuffer = aiResponse.data;

    // 5️⃣ Upload generated audio to Cloudinary
    const cloudinary = (await import("../config/cloudinary.js")).default;

    const uploadResult = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: `voices/generated/${req.userId}`,
          resource_type: "video"
        },
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      ).end(audioBuffer);
    });

    // 6️⃣ Save generation history
    await Generation.create({
      userId: req.userId,
      personId,
      text,
      audioUrl: uploadResult.secure_url,
      seconds: Math.ceil(text.length / 15)
    });

    // 7️⃣ Respond
    return res.status(200).json({
      audioUrl: uploadResult.secure_url
    });

  } catch (err) {
    console.error("CLONE ERROR:", err);

    return res.status(500).json({
      message: "Voice generation failed"
    });

  } finally {
    // 8️⃣ Cleanup temp file (VERY IMPORTANT)
    if (tempVoicePath && fs.existsSync(tempVoicePath)) {
      fs.unlinkSync(tempVoicePath);
    }
  }
};
