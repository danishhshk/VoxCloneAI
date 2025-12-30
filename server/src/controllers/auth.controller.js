// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import User from "../models/User.js";

// export const signup = async (req, res) => {
//   try {
//     const { email, password, name } = req.body;

//     if (!email || !password) {
//       return res.status(400).json({ message: "Email and password required" });
//     }

//     const existing = await User.findOne({ email });
//     if (existing) {
//       return res.status(409).json({ message: "Email already in use" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await User.create({
//       email,
//       password: hashedPassword,
//       name
//     });

//     const userObj = user.toObject();
//     delete userObj.password;

//     return res.status(201).json(userObj);
//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ message: "Signup failed" });
//   }
// };

// export const login = async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (!user) return res.status(400).json({ message: "Invalid" });

//   const ok = await bcrypt.compare(req.body.password, user.password);
//   if (!ok) return res.status(400).json({ message: "Invalid" });

//   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
//   res.json({ token, user });
// };


import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import User from "../models/User.js";
import { sendEmail } from "../utils/sendEmail.js";

/* SIGNUP */
export const signup = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.status(409).json({ message: "Email already exists" });

  const hashed = await bcrypt.hash(password, 10);
  const token = crypto.randomBytes(32).toString("hex");

  await User.create({
    name,
    email,
    password: hashed,
    emailVerificationToken: token,
    emailVerificationExpires: Date.now() + 24 * 60 * 60 * 1000
  });

const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

await sendEmail(
  email,
  "Verify your VoxClone AI account",
  `
    <h2>Email Verification</h2>
    <p>Click the link below to verify your account:</p>
    <a href="${link}">${link}</a>
    <p>This link is valid for 24 hours.</p>
  `
);

  res.status(201).json({ message: "Verification email sent" });
};

/* VERIFY EMAIL */
// export const verifyEmail = async (req, res) => {
//   const { token } = req.query;

//   const user = await User.findOne({
//     emailVerificationToken: token,
//     emailVerificationExpires: { $gt: Date.now() }
//   });

//   if (!user) return res.status(400).json({ message: "Invalid token" });

//   user.emailVerified = true;
//   user.emailVerificationToken = undefined;
//   user.emailVerificationExpires = undefined;
//   await user.save();

//   res.redirect(`${process.env.FRONTEND_URL}/email-verified`);
// };

export const verifyEmail = async (req, res) => {
  const { token } = req.query;

  const user = await User.findOne({
    emailVerificationToken: token,
    emailVerificationExpires: { $gt: Date.now() }
  });

  if (!user) {
    return res.status(400).json({ message: "Invalid or expired token" });
  }

  user.emailVerified = true;
  user.emailVerificationToken = undefined;
  user.emailVerificationExpires = undefined;
  await user.save();

  return res.json({ message: "Email verified successfully" });
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch user" });
  }
};
/* LOGIN */
export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "Invalid credentials" });

  if (!user.emailVerified)
    return res.status(403).json({ message: "Please verify your email first" });

  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(400).json({ message: "Invalid credentials" });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);

  user.password = undefined;
  res.json({ token, user });
};

/* RESEND VERIFICATION */
export const resendVerification = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user || user.emailVerified)
    return res.json({ message: "No action required" });

  const token = crypto.randomBytes(32).toString("hex");

  user.emailVerificationToken = token;
  user.emailVerificationExpires = Date.now() + 24 * 60 * 60 * 1000;
  await user.save();

  const link = `${process.env.FRONTEND_URL}/verify-email?token=${token}`;

  await sendEmail(email, "Verify your email", `<a href="${link}">${link}</a>`);

  res.json({ message: "Verification email resent" });
};

/* FORGOT PASSWORD */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) return res.json({ message: "If exists, email sent" });

  const token = crypto.randomBytes(32).toString("hex");

  user.resetPasswordToken = token;
  user.resetPasswordExpires = Date.now() + 60 * 60 * 1000;
  await user.save();

  const link = `${process.env.FRONTEND_URL}/reset-password?token=${token}`;

  await sendEmail(email, "Reset Password", `<a href="${link}">${link}</a>`);

  res.json({ message: "Reset email sent" });
};

/* RESET PASSWORD */
export const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  const user = await User.findOne({
    resetPasswordToken: token,
    resetPasswordExpires: { $gt: Date.now() }
  });

  if (!user) return res.status(400).json({ message: "Invalid token" });

  user.password = await bcrypt.hash(password, 10);
  user.resetPasswordToken = undefined;
  user.resetPasswordExpires = undefined;
  await user.save();

  res.json({ message: "Password reset successful" });
};


console.log("FRONTEND_URL:", process.env.FRONTEND_URL);
