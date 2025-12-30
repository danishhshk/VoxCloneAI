
// // import React, { useState } from 'react';
// // import { Link } from 'react-router-dom';
// // import { Waves, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
// // import { useAuth } from '../App';
// // import { mockUser } from '../services/mockData';

// // const SignupPage: React.FC = () => {
// //   const [name, setName] = useState('');
// //   const [email, setEmail] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [isLoading, setIsLoading] = useState(false);
// //   const { login } = useAuth();

// //   const handleSubmit = (e: React.FormEvent) => {
// //     e.preventDefault();
// //     setIsLoading(true);
// //     // Simulate API delay
// //     setTimeout(() => {
// //         login('fake-jwt-token', { ...mockUser, name, email });
// //         setIsLoading(false);
// //     }, 1500);
// //   };

// //   return (
// //     <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
// //       <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
// //         {/* Branding/Visual Side */}
// //         <div className="hidden md:flex flex-col justify-between bg-indigo-600 p-12 text-white relative">
// //             <Link to="/" className="inline-flex items-center gap-2">
// //                 <Waves className="w-8 h-8" />
// //                 <span className="text-xl font-bold">VoxClone AI</span>
// //             </Link>

// //             <div className="space-y-6">
// //                 <h2 className="text-4xl font-bold leading-tight">Start generating high-fidelity voices in minutes.</h2>
// //                 <div className="space-y-4">
// //                     {[
// //                         "30 seconds to a perfect clone",
// //                         "Emotional control and intonation",
// //                         "Support for 40+ languages",
// //                         "Enterprise-grade IP protection"
// //                     ].map(feat => (
// //                         <div key={feat} className="flex items-center gap-3">
// //                             <CheckCircle2 className="w-5 h-5 text-indigo-300" />
// //                             <span className="text-indigo-50 font-medium">{feat}</span>
// //                         </div>
// //                     ))}
// //                 </div>
// //             </div>

// //             <p className="text-indigo-200 text-sm italic opacity-80">
// //                 Join 50,000+ creators and studios building the future of audio.
// //             </p>

// //             <div className="absolute top-1/2 -right-24 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
// //         </div>

// //         {/* Form Side */}
// //         <div className="p-8 md:p-12">
// //             <div className="mb-10 text-center md:text-left">
// //                 <h2 className="text-3xl font-bold text-slate-900">Get Started</h2>
// //                 <p className="text-slate-500 mt-2">Create your account and explore the studio.</p>
// //             </div>

// //             <form onSubmit={handleSubmit} className="space-y-6">
// //                 <div className="space-y-2">
// //                     <label className="text-sm font-bold text-slate-700">Full Name</label>
// //                     <div className="relative">
// //                         <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
// //                         <input 
// //                             type="text" 
// //                             value={name}
// //                             onChange={(e) => setName(e.target.value)}
// //                             placeholder="John Doe"
// //                             required
// //                             className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
// //                         />
// //                     </div>
// //                 </div>

// //                 <div className="space-y-2">
// //                     <label className="text-sm font-bold text-slate-700">Work Email</label>
// //                     <div className="relative">
// //                         <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
// //                         <input 
// //                             type="email" 
// //                             value={email}
// //                             onChange={(e) => setEmail(e.target.value)}
// //                             placeholder="name@company.com"
// //                             required
// //                             className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
// //                         />
// //                     </div>
// //                 </div>

// //                 <div className="space-y-2">
// //                     <label className="text-sm font-bold text-slate-700">Password</label>
// //                     <div className="relative">
// //                         <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
// //                         <input 
// //                             type="password" 
// //                             value={password}
// //                             onChange={(e) => setPassword(e.target.value)}
// //                             placeholder="At least 8 characters"
// //                             required
// //                             className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
// //                         />
// //                     </div>
// //                 </div>

// //                 <button 
// //                     type="submit"
// //                     disabled={isLoading}
// //                     className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 transition-all flex items-center justify-center gap-3 mt-4"
// //                 >
// //                     {isLoading ? (
// //                         <Loader2 className="w-5 h-5 animate-spin" />
// //                     ) : (
// //                         <>
// //                             Create Workspace
// //                             <ArrowRight className="w-5 h-5" />
// //                         </>
// //                     )}
// //                 </button>
// //             </form>

// //             <div className="mt-8 pt-8 border-t border-slate-100 text-center">
// //                 <p className="text-slate-500 text-sm">
// //                     Already have an account? <Link to="/login" className="text-indigo-600 font-bold hover:underline">Sign In</Link>
// //                 </p>
// //             </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default SignupPage;


// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { Waves, Mail, Lock, User, ArrowRight, Loader2, CheckCircle2 } from 'lucide-react';
// import { useAuth } from '../App';
// import { signupUser, loginUser } from '../services/auth';

// const SignupPage: React.FC = () => {
//   const [name, setName] = useState('');
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
//       // 1️⃣ Signup
//       await signupUser(name, email, password);

//       // 2️⃣ Auto login
//       const user = await loginUser(email, password);
//       setUser(user);

//       navigate('/dashboard');
//     } catch (err: any) {
//       setError(err.response?.data?.message || 'Signup failed');
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
//       <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">
        
//         {/* Branding Side */}
//         <div className="hidden md:flex flex-col justify-between bg-indigo-600 p-12 text-white relative">
//           <Link to="/" className="inline-flex items-center gap-2">
//             <Waves className="w-8 h-8" />
//             <span className="text-xl font-bold">VoxClone AI</span>
//           </Link>

//           <div className="space-y-6">
//             <h2 className="text-4xl font-bold leading-tight">
//               Start generating high-fidelity voices in minutes.
//             </h2>
//             <div className="space-y-4">
//               {[
//                 "30 seconds to a perfect clone",
//                 "Emotional control and intonation",
//                 "Support for 40+ languages",
//                 "Enterprise-grade IP protection"
//               ].map(feat => (
//                 <div key={feat} className="flex items-center gap-3">
//                   <CheckCircle2 className="w-5 h-5 text-indigo-300" />
//                   <span className="text-indigo-50 font-medium">{feat}</span>
//                 </div>
//               ))}
//             </div>
//           </div>

//           <p className="text-indigo-200 text-sm italic opacity-80">
//             Join 50,000+ creators and studios building the future of audio.
//           </p>
//         </div>

//         {/* Form Side */}
//         <div className="p-8 md:p-12">
//           <div className="mb-10 text-center md:text-left">
//             <h2 className="text-3xl font-bold text-slate-900">Get Started</h2>
//             <p className="text-slate-500 mt-2">
//               Create your account and explore the studio.
//             </p>
//           </div>

//           <form onSubmit={handleSubmit} className="space-y-6">
//             {error && (
//               <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
//                 {error}
//               </p>
//             )}

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700">Full Name</label>
//               <div className="relative">
//                 <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
//                 <input
//                   type="text"
//                   value={name}
//                   onChange={(e) => setName(e.target.value)}
//                   required
//                   className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                 />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <label className="text-sm font-bold text-slate-700">Work Email</label>
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
//               className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 mt-4"
//             >
//               {isLoading ? (
//                 <Loader2 className="w-5 h-5 animate-spin" />
//               ) : (
//                 <>
//                   Create Workspace
//                   <ArrowRight className="w-5 h-5" />
//                 </>
//               )}
//             </button>
//           </form>

//           <div className="mt-8 pt-8 border-t border-slate-100 text-center">
//             <p className="text-slate-500 text-sm">
//               Already have an account?{' '}
//               <Link to="/login" className="text-indigo-600 font-bold hover:underline">
//                 Sign In
//               </Link>
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SignupPage;


import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Waves,
  Mail,
  Lock,
  User,
  ArrowRight,
  Loader2,
  CheckCircle2
} from 'lucide-react';
import { signupUser } from '../services/auth';

const SignupPage: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setSuccess('');

    try {
      await signupUser(name, email, password);

      setSuccess(
        'Signup successful! Please check your email and verify your account before logging in.'
      );

      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate('/login');
      }, 3000);

    } catch (err: any) {
      setError(err.response?.data?.message || 'Signup failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-slate-50">
      <div className="w-full max-w-4xl grid md:grid-cols-2 bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200">

        {/* Branding Side */}
        <div className="hidden md:flex flex-col justify-between bg-indigo-600 p-12 text-white relative">
          <Link to="/" className="inline-flex items-center gap-2">
            <Waves className="w-8 h-8" />
            <span className="text-xl font-bold">VoxClone AI</span>
          </Link>

          <div className="space-y-6">
            <h2 className="text-4xl font-bold leading-tight">
              Start generating high-fidelity voices in minutes.
            </h2>

            <div className="space-y-4">
              {[
                '30 seconds to a perfect clone',
                'Emotional control and intonation',
                'Support for 40+ languages',
                'Enterprise-grade IP protection'
              ].map((feat) => (
                <div key={feat} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-indigo-300" />
                  <span className="text-indigo-50 font-medium">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <p className="text-indigo-200 text-sm italic opacity-80">
            Join 50,000+ creators and studios building the future of audio.
          </p>
        </div>

        {/* Form Side */}
        <div className="p-8 md:p-12">
          <div className="mb-10 text-center md:text-left">
            <h2 className="text-3xl font-bold text-slate-900">Get Started</h2>
            <p className="text-slate-500 mt-2">
              Create your account and explore the studio.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Error Message */}
            {error && (
              <p className="text-sm text-red-600 bg-red-50 p-3 rounded-lg">
                {error}
              </p>
            )}

            {/* Success Message */}
            {success && (
              <p className="text-sm text-green-700 bg-green-50 p-3 rounded-lg">
                {success}
              </p>
            )}

            {/* Name */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">
                Work Email
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
              className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-200 flex items-center justify-center gap-3 mt-4 disabled:opacity-70"
            >
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  Create Workspace
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm">
              Already have an account?{' '}
              <Link
                to="/login"
                className="text-indigo-600 font-bold hover:underline"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
