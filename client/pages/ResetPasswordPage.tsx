// ResetPasswordPage.tsx
import { useSearchParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { resetPassword } from "../services/auth";

export default () => {
  const [password, setPassword] = useState("");
  const [params] = useSearchParams();
  const navigate = useNavigate();

  const submit = async (e:any) => {
    e.preventDefault();
    await resetPassword(params.get("token")!, password);
    navigate("/login");
  };

  return (
    <form onSubmit={submit}>
      <input type="password" onChange={e=>setPassword(e.target.value)} />
      <button>Reset Password</button>
    </form>
  );
};
