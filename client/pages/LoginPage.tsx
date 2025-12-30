
// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Waves, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
// // import { useAuth } from '../App';
// // import { mockUser } from '../services/mockData';

// // const LoginPage: React.FC = () => {
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const { login } = useAuth();

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     // Simulate API delay
// //     setTimeout(() => {
// //         login('fake-jwt-token', mockUser);
// //         setIsLoading(false);
// //     }, 1500);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
// //       <div className="w-full max-w-md space-y-8">
// //         <div className="text-center">
// //           <Link to="/" className="inline-flex items-center gap-2 mb-8">
// //             <Waves className="text-indigo-600 w-10 h-10" />
// //             <span className="text-2xl font-bold tracking-tight">VoxClone AI</span>
// //           </Link>
// //           <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
// //           <p className="text-slate-500 mt-2">Log in to your workspace to continue cloning.</p>
// //         </div>

// //         <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 animate-in fade-in zoom-in-95 duration-500">
// //           <form onSubmit={handleSubmit} className="space-y-6">
// //             <div className="space-y-2">
// //               <label className="text-sm font-bold text-slate-700">Email Address</label>
// //               <div className="relative">
// //                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
// //                 <input 
// //                   type="email" 
// //                   value={email}
// //                   onChange={(e) => setEmail(e.target.value)}
// //                   placeholder="name@company.com"
// //                   required
// //                   className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
// //                 />
// //               </div>
// //             </div>

// //             <div className="space-y-2">
// //               <div className="flex justify-between">
// //                 <label className="text-sm font-bold text-slate-700">Password</label>
// //                 <a href="#" className="text-xs font-bold text-indigo-600 hover:underline">Forgot?</a>
// //               </div>
// //               <div className="relative">
// //                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
// //                 <input 
// //                   type="password" 
// //                   value={password}
// //                   onChange={(e) => setPassword(e.target.value)}
// //                   placeholder="••••••••"
// //                   required
// //                   className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
// //                 />
// //               </div>
// //             </div>

// //             <button 
// //               type="submit"
// //               disabled={isLoading}
// //               className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-3"
// //             >
// //               {isLoading ? (
// //                 <Loader2 className="w-5 h-5 animate-spin" />
// //               ) : (
// //                 <>
// //                     Sign In
// //                     <ArrowRight className="w-5 h-5" />
// //                 </>
// //               )}
// //             </button>
// //           </form>

// //           <div className="mt-8 pt-8 border-t border-slate-100 text-center">
// //             <p className="text-slate-500 text-sm">
// //               Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold hover:underline">Create Account</Link>
// //             </p>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default LoginPage;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Waves, Mail, Lock, ArrowRight, Loader2 } from 'lucide-react';
// import { useAuth } from '../App';
// import { loginUser } from '../services/auth';

// const LoginPage: React.FC = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState('');
//   const { setUser } = useAuth();
//   const navigate = useNavigate();

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setIsLoading(true);
//     setError('');

//     try {
//       const user = await loginUser(email, password);
//       setUser(user);
//       navigate('/dashboard');
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Login failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
//       <div className="w-full max-w-md space-y-8">
//         <div className="text-center">
//           <Link to="/" className="inline-flex items-center gap-2 mb-8">
//             <Waves className="text-indigo-600 w-10 h-10" />
//             <span className="text-2xl font-bold tracking-tight">VoxClone AI</span>
//           </Link>
//           <h2 className="text-3xl font-bold text-slate-900">Welcome Back</h2>
//           <p className="text-slate-500 mt-2">Log in to your workspace to continue cloning.</p>
//         </div>

//         <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 animate-in fade-in zoom-in-95 duration-500">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
//                 {error}
//               </p>
//             )}

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700">Email Address</label>
//               <div className="relative">
//                 <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                 <input
//                   type="email"
//                   value={email}
//                   onChange={(e) => setEmail(e.target.value)}
//                   required
//                   className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700">Password</label>
//               <div className="relative">
//                 <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                 <input
//                   type="password"
//                   value={password}
//                   onChange={(e) => setPassword(e.target.value)}
//                   required
//                   className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                 />
//               </div>
//             </div>

//             <button
//               type="submit"
//               disabled={isLoading}
//               className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-3"
//             >
//               {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>Sign In <ArrowRight className="w-5 h-5" /></>}
//             </button>
//           </form>

//           <div className="mt-8 pt-8 border-t border-slate-100 text-center">
//             <p className="text-slate-500 text-sm">
//               Don't have an account? <Link to="/signup" className="text-indigo-600 font-bold">Create Account</Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LoginPage;




import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Waves, Mail, Lock, ArrowRight, Loader2, AlertCircle } from 'lucide-react';
import { useAuth } from '../App';
import { loginUser } from '../services/auth';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { setUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const user = await loginUser(email, password);
      setUser(user);
      navigate('/dashboard');
    } catch (err: any) {
      // Handles "Please verify your email first" from backend
      setError(err.response?.data?.message || 'Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-md space-y-8">

        {/* Header */}
        <div className="text-center">
          <Link to="/" className="inline-flex items-center gap-2 mb-8">
            <Waves className="text-indigo-600 w-10 h-10" />
            <span className="text-2xl font-bold tracking-tight">VoxClone AI</span>
          </Link>

          <h2 className="text-3xl font-bold text-slate-900">
            Welcome Back
          </h2>
          <p className="text-slate-500 mt-2">
            Log in to your workspace to continue cloning.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-200 animate-in fade-in zoom-in-95 duration-500">

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Error Message */}
            {error && (
              <div className="flex items-start gap-3 text-sm text-red-700 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="w-5 h-5 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-indigo-600 font-bold hover:underline">
                Create Account
              </Link>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default LoginPage;
