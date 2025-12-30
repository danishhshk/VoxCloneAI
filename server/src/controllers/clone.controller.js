// import axios from "axios";
// import fs from "fs";
// import path from "path";
// import FormData from "form-data";
// import Person from "../models/Person.js";
// import Generation from "../models/Generation.js";

// /**
//  * POST /api/clone
//  * Body: { text, personId }
//  * Auth: Required
//  */
// console.log("AI_SERVICE_URL =", process.env.AI_SERVICE_URL);

// export const cloneVoice = async (req, res) => {
//   let tempVoicePath;

//   try {
//     const { text, personId } = req.body;

//     // 1️⃣ Validate input
//     if (!text || !personId) {
//       return res.status(400).json({
//         message: "Text and personId required"
//       });
//     }

//     // 2️⃣ Find voice profile
//     const person = await Person.findById(personId);
//     if (!person || !person.voicePath) {
//       return res.status(404).json({
//         message: "Voice profile not found"
//       });
//     }

//     // 3️⃣ Download voice from Cloudinary → temp file
//     tempVoicePath = path.join(
//       process.cwd(),
//       `voice_${Date.now()}.wav`
//     );

//     const voiceResponse = await axios.get(person.voicePath, {
//       responseType: "stream"
//     });

//     await new Promise((resolve, reject) => {
//       const writer = fs.createWriteStream(tempVoicePath);
//       voiceResponse.data.pipe(writer);
//       writer.on("finish", resolve);
//       writer.on("error", reject);
//     });

//     // 4️⃣ Send MULTIPART request to AI service
//     const formData = new FormData();
//     formData.append("text", text);
//     formData.append("voice", fs.createReadStream(tempVoicePath));

//     const aiResponse = await axios.post(
//       `${process.env.AI_SERVICE_URL}/clone`,
//       formData,
//       {
//         headers: formData.getHeaders(),
//         timeout: 180000 // XTTS on CPU is slow
//       }
//     );

//     // ⚠️ HF Space returns AUDIO FILE, not JSON
//     const audioBuffer = aiResponse.data;

//     // 5️⃣ Upload generated audio to Cloudinary
//     const cloudinary = (await import("../config/cloudinary.js")).default;

//     const uploadResult = await cloudinary.uploader.upload(
//   generatedAudioPath,
//   {
//     resource_type: "video", // 🔥 REQUIRED FOR AUDIO
//     folder: `voxclone/generated/${req.userId}`,
//     format: "wav"
//   }
// );




//     // 6️⃣ Save generation history
//     await Generation.create({
//       userId: req.userId,
//       personId,
//       text,
//       audioUrl: uploadResult.secure_url,
//       seconds: Math.ceil(text.length / 15)
//     });

//     // 7️⃣ Respond
//     return res.status(200).json({
//       audioUrl: uploadResult.secure_url
//     });

//   } catch (err) {
//     console.error("CLONE ERROR:", err);

//     return res.status(500).json({
//       message: "Voice generation failed"
//     });

//   } finally {
//     // 8️⃣ Cleanup temp file (VERY IMPORTANT)
//     if (tempVoicePath && fs.existsSync(tempVoicePath)) {
//       fs.unlinkSync(tempVoicePath);
//     }
//   }
// };


import axios from "axios";
import fs from "fs";
import path from "path";
import Person from "../models/Person.js";
import Generation from "../models/Generation.js";
import cloudinary from "../config/cloudinary.js";

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

    /* 1️⃣ Validate input */
    if (!text || !personId) {
      return res.status(400).json({
        message: "Text and personId required"
      });
    }

    /* 2️⃣ Fetch voice profile */
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

    /* 3️⃣ Download voice WAV from Cloudinary */
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

    /* 4️⃣ Call AI service (HF Space) */
    const aiResponse = await axios.post(
      `${process.env.AI_SERVICE_URL}/clone`,
      {
        text,
        voice_path: tempVoicePath
      },
      {
        timeout: 120000 // XTTS is heavy
      }
    );

    if (!aiResponse.data || !aiResponse.data.audio_path) {
      throw new Error("AI service did not return audio_path");
    }

    /* 5️⃣ Save generated WAV locally */
    generatedAudioPath = path.join(
      process.cwd(),
      `generated_${Date.now()}.wav`
    );

    const audioStream = await axios.get(aiResponse.data.audio_path, {
      responseType: "stream"
    });

    await new Promise((resolve, reject) => {
      const writer = fs.createWriteStream(generatedAudioPath);
      audioStream.data.pipe(writer);
      writer.on("finish", resolve);
      writer.on("error", reject);
    });

    /* 6️⃣ Upload generated audio to Cloudinary (AUDIO = VIDEO) */
    const uploadResult = await cloudinary.uploader.upload(
      generatedAudioPath,
      {
        resource_type: "video", // 🔥 REQUIRED
        folder: `voxclone/generated/${req.userId}`,
        format: "wav"
      }
    );

    const audioUrl = uploadResult.secure_url;

    /* 7️⃣ Save generation history */
    await Generation.create({
      userId: req.userId,
      personId,
      text,
      audioUrl,
      seconds: Math.ceil(text.length / 15)
    });

    /* 8️⃣ Cleanup temp files */
    if (fs.existsSync(tempVoicePath)) fs.unlinkSync(tempVoicePath);
    if (fs.existsSync(generatedAudioPath)) fs.unlinkSync(generatedAudioPath);

    /* 9️⃣ Respond */
    return res.status(200).json({ audioUrl });

  } catch (err) {
    console.error("CLONE ERROR:", err);

    /* Cleanup on failure */
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
