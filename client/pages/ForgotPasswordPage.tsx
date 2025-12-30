// ForgotPasswordPage.tsx
import { useState } from "react";
import { forgotPassword } from "../services/auth";

export default () => {
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState("");

  const submit = async (e:any) => {
    e.preventDefault();
    await forgotPassword(email);
    setMsg("If account exists, reset link sent");
  };

  return (
    <form onSubmit={submit}>
      <input value={email} onChange={e=>setEmail(e.target.value)} />
      <button>Send Reset Link</button>
      {msg}
    </form>
  );
};
