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
      <div style="font-family: Arial, Helvetica, sans-serif; background-color:#f4f6f8; padding:30px;">
        <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:8px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
          
          <h1 style="color:#111827; text-align:center; margin-bottom:10px;">
            🔊 VoxClone AI
          </h1>

          <p style="color:#374151; font-size:16px; text-align:center; margin-bottom:30px;">
            Verify your email to start cloning voices 🚀
          </p>

          <hr style="border:none; border-top:1px solid #e5e7eb; margin:20px 0;" />

          <p style="color:#374151; font-size:15px;">
            Hi there 👋,
          </p>

          <p style="color:#374151; font-size:15px; line-height:1.6;">
            Thanks for signing up for <strong>VoxClone AI</strong>.  
            Please confirm your email address by clicking the button below.
          </p>

          <div style="text-align:center; margin:30px 0;">
            <a href="${link}" 
               style="background:#2563eb; color:#ffffff; padding:14px 28px; 
                      text-decoration:none; font-size:16px; border-radius:6px; 
                      display:inline-block;">
              Verify Email
            </a>
          </div>

          <p style="color:#6b7280; font-size:14px; line-height:1.6;">
            This verification link is valid for <strong>24 hours</strong>.
            If you did not create a VoxClone AI account, you can safely ignore this email.
          </p>

          <p style="color:#6b7280; font-size:14px;">
            Having trouble with the button? Copy and paste this link into your browser:
          </p>

          <p style="word-break:break-all; font-size:13px; color:#2563eb;">
            ${link}
          </p>

          <hr style="border:none; border-top:1px solid #e5e7eb; margin:30px 0;" />

          <p style="font-size:13px; color:#9ca3af; text-align:center;">
            © ${new Date().getFullYear()} VoxClone AI. All rights reserved.
          </p>
        </div>
      </div>
    `
  });
};
