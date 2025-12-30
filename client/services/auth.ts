import api from "./api";

/* =========================
   SIGNUP
========================= */
export const signupUser = async (
  name: string,
  email: string,
  password: string
) => {
  const res = await api.post("/auth/signup", {
    name,
    email,
    password
  });
  return res.data;
};

/* =========================
   LOGIN
========================= */
export const loginUser = async (email: string, password: string) => {
  const res = await api.post("/auth/login", { email, password });

  // Save JWT token
  localStorage.setItem("token", res.data.token);

  return res.data.user;
};

/* =========================
   RESEND EMAIL VERIFICATION
========================= */
export const resendVerification = async (email: string) => {
  const res = await api.post("/auth/resend-verification", { email });
  return res.data;
};

/* =========================
   FORGOT PASSWORD
========================= */
export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

/* =========================
   RESET PASSWORD
========================= */
export const resetPassword = async (token: string, password: string) => {
  const res = await api.post("/auth/reset-password", {
    token,
    password
  });
  return res.data;
};
