import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../config/cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "voxclone/voices",
    resource_type: "video", // IMPORTANT for audio
    format: "wav"
  }
});

const uploadVoice = multer({ storage });

export default uploadVoice;