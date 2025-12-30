import mongoose from "mongoose";

const PersonSchema = new mongoose.Schema({
  name: String,
  voicePath: String,
  userId: mongoose.Schema.Types.ObjectId
});

export default mongoose.model("Person", PersonSchema);
