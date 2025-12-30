import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import api from "../services/api";
import { Loader2, CheckCircle2, XCircle } from "lucide-react";

const VerifyEmailPage = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState<"loading" | "success" | "error">("loading");

  useEffect(() => {
    const token = params.get("token");

    if (!token) {
      setStatus("error");
      return;
    }

    api
      .get(`/auth/verify-email?token=${token}`)
      .then(() => {
        setStatus("success");
        setTimeout(() => {
          navigate("/email-verified");
        }, 1500);
      })
      .catch(() => {
        setStatus("error");
      });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg text-center max-w-md">
        {status === "loading" && (
          <>
            <Loader2 className="w-10 h-10 animate-spin mx-auto text-indigo-600" />
            <p className="mt-4 text-slate-600">Verifying your email...</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="w-10 h-10 mx-auto text-green-600" />
            <p className="mt-4 text-green-700 font-bold">
              Email verified successfully
            </p>
          </>
        )}

        {status === "error" && (
          <>
            <XCircle className="w-10 h-10 mx-auto text-red-600" />
            <p className="mt-4 text-red-700 font-bold">
              Invalid or expired verification link
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default VerifyEmailPage;
