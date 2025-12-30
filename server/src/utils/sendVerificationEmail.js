import nodemailer from "nodemailer";

export const sendVerificationEmail = async (email, link) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });

  await transporter.sendMail({
    from: "VoxClone AI <no-reply@voxclone.ai>",
    to: email,
    subject: "Verify your VoxClone AI account",
    html: `
      <h2>Email Verification</h2>
      <p>Click the link below to verify your account:</p>
      <a href="${link}">${link}</a>
      <p>This link is valid for 24 hours.</p>
    `
  });
};
