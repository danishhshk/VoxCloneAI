import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: String,

    email: {
      type: String,
      unique: true,
      required: true
    },

    password: String,

    /* ======================
       EMAIL VERIFICATION
    ====================== */
    emailVerified: {
      type: Boolean,
      default: false
    },

    emailVerificationToken: String,
    emailVerificationExpires: Date,

    resetPasswordToken: String,
    resetPasswordExpires: Date,

    /* ======================
       ROLE (ADMIN / USER)
    ====================== */
    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER"
    },

    /* ======================
       SUBSCRIPTION PLAN
    ====================== */
    plan: {
      type: String,
      enum: ["FREE", "PRO", "ENTERPRISE"],
      default: "FREE"
    },

    /* ======================
       USAGE TRACKING
    ====================== */
    usage: {
      secondsGenerated: { type: Number, default: 0 },
      limit: { type: Number, default: 300 },
      clonesCount: { type: Number, default: 0 }
    }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
