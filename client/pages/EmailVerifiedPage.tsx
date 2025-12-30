import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const EmailVerifiedPage: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-6">
      <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-200 max-w-md text-center">
        <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto mb-6" />

        <h2 className="text-2xl font-bold text-slate-900">
          Email Verified Successfully
        </h2>

        <p className="text-slate-500 mt-3">
          Your email has been verified. You can now log in to your VoxClone AI account.
        </p>

        <Link
          to="/login"
          className="inline-flex items-center justify-center gap-2 mt-8 w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold"
        >
          Go to Login
          <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
};

export default EmailVerifiedPage;
