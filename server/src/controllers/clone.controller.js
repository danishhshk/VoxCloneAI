import axios from "axios";
import fs from "fs";
import path from "path";
import FormData from "form-data";
import cloudinary from "../config/cloudinary.js";
import Person from "../models/Person.js";
import Generation from "../models/Generation.js";

/**
 * POST /api/clone
 * Body: { text, personId }
 * Auth: Required
 */
export const cloneVoice = async (req, res) => {
  let tempVoicePath;
  let generatedAudioPath;

  try {
    const { text, personId } = req.body;

    /* =====================
       1️⃣ VALIDATION
    ====================== */
    if (!text || !personId) {
      return res.status(400).json({
        message: "Text and personId required"
      });
    }

    /* =====================
       2️⃣ FETCH VOICE PROFILE
    ====================== */
    const person = await Person.findById(personId);

    if (!person) {
      return res.status(404).json({
        message: "Voice profile not found"
      });
    }

    if (!person.voicePath || !person.voicePath.startsWith("http")) {
      return res.status(404).json({
        message: "Voice file URL invalid"
      });
    }

    /* =====================
       3️⃣ DOWNLOAD VOICE (Cloudinary → Local)
    ====================== */
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

    /* =====================
       4️⃣ SEND TO HF XTTS (multipart/form-data)
    ====================== */
    const formData = new FormData();
    formData.append("text", text);
    formData.append("voice", fs.createReadStream(tempVoicePath));

    const aiResponse = await axios.post(
      `${process.env.AI_SERVICE_URL}/clone`,
      formData,
      {
        headers: {
          ...formData.getHeaders()
        },
        responseType: "stream",
        timeout: 180000 // XTTS is heavy
      }
    );

    /* =====================
       5️⃣ SAVE GENERATED WAV
    ====================== */
    generatedAudioPath = path.join(
      process.cwd(),
      `generated_${Date.now()}.wav`
    );

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(generatedAudioPath);
      aiResponse.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    /* =====================
       6️⃣ UPLOAD TO CLOUDINARY
    ====================== */
    const uploadResult = await cloudinary.uploader.upload(
      generatedAudioPath,
      {
        resource_type: "video", // REQUIRED for audio
        folder: `voxclone/generated/${req.userId}`
      }
    );

    const audioUrl = uploadResult.secure_url;

    /* =====================
       7️⃣ SAVE GENERATION HISTORY
    ====================== */
    await Generation.create({
      userId: req.userId,
      personId,
      text,
      audioUrl,
      seconds: Math.ceil(text.length / 15)
    });

    /* =====================
       8️⃣ CLEANUP TEMP FILES
    ====================== */
    if (fs.existsSync(tempVoicePath)) fs.unlinkSync(tempVoicePath);
    if (fs.existsSync(generatedAudioPath)) fs.unlinkSync(generatedAudioPath);

    /* =====================
       9️⃣ RESPONSE
    ====================== */
    return res.status(200).json({
      audioUrl
    });

  } catch (err) {
    console.error("CLONE ERROR:", err);

    // Cleanup on failure
    if (tempVoicePath && fs.existsSync(tempVoicePath)) {
      fs.unlinkSync(tempVoicePath);
    }
    if (generatedAudioPath && fs.existsSync(generatedAudioPath)) {
      fs.unlinkSync(generatedAudioPath);
    }

    return res.status(500).json({
      message: "Voice generation failed"
    });
  }
};
