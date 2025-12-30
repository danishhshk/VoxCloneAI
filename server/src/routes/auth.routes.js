import express from "express";
import {
  signup,
  login,
  verifyEmail,
  resendVerification,
  forgotPassword,
  getMe,
  resetPassword
} from "../controllers/auth.controller.js";
import auth from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.get("/verify-email", verifyEmail);
router.post("/resend-verification", resendVerification);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.get("/me", auth , getMe); // ✅ ADD THIS

export default router;
