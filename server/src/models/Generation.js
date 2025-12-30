import mongoose from "mongoose";

const generationSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    voiceId: { type: mongoose.Schema.Types.ObjectId, ref: "Person" },
    voiceName: String,
    text: String,
    audioUrl: String,
    duration: Number
  },
  { timestamps: true }
);

export default mongoose.model("Generation", generationSchema);
