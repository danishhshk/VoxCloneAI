import mongoose from "mongoose";

export default mongoose.model("Payment", new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  plan: String,
  amount: Number,
  paymentId: String,
  createdAt: { type: Date, default: Date.now }
}));
