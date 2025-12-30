
// import React from 'react';
// import { 
//   User, 
//   Mail, 
//   Shield, 
//   Settings, 
//   LogOut, 
//   Key,
//   BadgeCheck,
//   Globe
// } from 'lucide-react';
// import { useAuth } from '../App';

// const ProfilePage: React.FC = () => {
//   const { user, logout } = useAuth();

//   return (
//     <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
//       <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>

//       <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
//         {/* Navigation Sidebar */}
//         <div className="space-y-2">
//             {[
//                 { name: 'General', icon: User, active: true },
//                 { name: 'Security', icon: Shield },
//                 { name: 'Billing', icon: Settings },
//                 { name: 'Integrations', icon: Globe }
//             ].map((item) => (
//                 <button 
//                     key={item.name}
//                     className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
//                         item.active 
//                         ? 'bg-white text-indigo-600 shadow-sm border border-slate-200' 
//                         : 'text-slate-500 hover:bg-slate-50'
//                     }`}
//                 >
//                     <item.icon className="w-5 h-5" />
//                     {item.name}
//                 </button>
//             ))}
//             <div className="pt-4 mt-4 border-t border-slate-200">
//                 <button 
//                     onClick={logout}
//                     className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
//                 >
//                     <LogOut className="w-5 h-5" />
//                     Sign Out
//                 </button>
//             </div>
//         </div>

//         {/* Content Area */}
//         <div className="md:col-span-2 space-y-6">
//             <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
//                 <div className="flex flex-col sm:flex-row items-center gap-6">
//                     <div className="relative">
//                         <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
//                              <img 
//                                 src={`https://ui-avatars.com/api/?name=${user?.name}&background=6366f1&color=fff&size=128`} 
//                                 alt="Avatar" 
//                             />
//                         </div>
//                         <button className="absolute bottom-0 right-0 p-2 bg-indigo-600 rounded-full text-white shadow-lg hover:bg-indigo-700 transition-all">
//                             <Settings className="w-4 h-4" />
//                         </button>
//                     </div>
//                     <div className="text-center sm:text-left">
//                         <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2 justify-center sm:justify-start">
//                             {user?.name}
//                             <BadgeCheck className="w-5 h-5 text-indigo-500 fill-current" />
//                         </h2>
//                         <p className="text-slate-500">{user?.email}</p>
//                         <div className="mt-2 flex items-center gap-2 justify-center sm:justify-start">
//                             <span className="text-xs font-bold uppercase bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">{user?.plan} Membership</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
//                     <div className="space-y-2">
//                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Full Name</label>
//                         <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
//                             <User className="w-4 h-4 text-slate-400" />
//                             <span className="text-sm font-medium text-slate-800">{user?.name}</span>
//                         </div>
//                     </div>
//                     <div className="space-y-2">
//                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Email Address</label>
//                         <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
//                             <Mail className="w-4 h-4 text-slate-400" />
//                             <span className="text-sm font-medium text-slate-800">{user?.email}</span>
//                         </div>
//                     </div>
//                     <div className="space-y-2">
//                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Company</label>
//                         <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
//                             <BadgeCheck className="w-4 h-4 text-slate-400" />
//                             <span className="text-sm font-medium text-slate-800">VoxClone Labs Inc.</span>
//                         </div>
//                     </div>
//                     <div className="space-y-2">
//                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Default Language</label>
//                         <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3">
//                             <Globe className="w-4 h-4 text-slate-400" />
//                             <span className="text-sm font-medium text-slate-800">English (US)</span>
//                         </div>
//                     </div>
//                 </div>

//                 <div className="pt-6 border-t border-slate-100 flex justify-end">
//                     <button className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all">
//                         Save Changes
//                     </button>
//                 </div>
//             </div>

//             <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
//                 <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
//                     <Key className="w-5 h-5 text-indigo-600" />
//                     Security
//                 </h3>
//                 <div className="flex items-center justify-between p-4 bg-slate-50 rounded-xl border border-slate-100">
//                     <div className="space-y-1">
//                         <p className="text-sm font-bold text-slate-800">Two-Factor Authentication</p>
//                         <p className="text-xs text-slate-500">Secure your account with an extra layer of protection.</p>
//                     </div>
//                     <button className="text-indigo-600 font-bold text-sm hover:underline">Enable</button>
//                 </div>
//             </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default ProfilePage;


import React from 'react';
import {
  User,
  Mail,
  Shield,
  Settings,
  LogOut,
  Key,
  BadgeCheck,
  Globe
} from 'lucide-react';
import { useAuth } from '../App';

const ProfilePage: React.FC = () => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h1 className="text-2xl font-bold text-slate-900">Account Settings</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

        {/* Sidebar */}
        <div className="space-y-2">
          {[
            { name: 'General', icon: User, active: true },
            { name: 'Security', icon: Shield },
            { name: 'Billing', icon: Settings },
            { name: 'Integrations', icon: Globe }
          ].map((item) => (
            <button
              key={item.name}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-all ${
                item.active
                  ? 'bg-white text-indigo-600 shadow-sm border border-slate-200'
                  : 'text-slate-500 hover:bg-slate-50'
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </button>
          ))}

          <div className="pt-4 mt-4 border-t border-slate-200">
            <button
              onClick={logout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-red-500 hover:bg-red-50 transition-all"
            >
              <LogOut className="w-5 h-5" />
              Sign Out
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm space-y-8">
            <div className="flex flex-col sm:flex-row items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center border-4 border-white shadow-md overflow-hidden">
                  <img
                    src={`https://ui-avatars.com/api/?name=${user.name}&background=6366f1&color=fff&size=128`}
                    alt="Avatar"
                  />
                </div>
              </div>

              <div className="text-center sm:text-left">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  {user.name}
                  <BadgeCheck className="w-5 h-5 text-indigo-500 fill-current" />
                </h2>
                <p className="text-slate-500">{user.email}</p>
                <div className="mt-2">
                  <span className="text-xs font-bold uppercase bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full">
                    {user.plan} Membership
                  </span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Full Name
                </label>
                <div className="flex items-center gap-3 bg-slate-50 border rounded-xl px-4 py-3">
                  <User className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">{user.name}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Email Address
                </label>
                <div className="flex items-center gap-3 bg-slate-50 border rounded-xl px-4 py-3">
                  <Mail className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">{user.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Company
                </label>
                <div className="flex items-center gap-3 bg-slate-50 border rounded-xl px-4 py-3">
                  <BadgeCheck className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">VoxClone Labs</span>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-500 uppercase">
                  Default Language
                </label>
                <div className="flex items-center gap-3 bg-slate-50 border rounded-xl px-4 py-3">
                  <Globe className="w-4 h-4 text-slate-400" />
                  <span className="text-sm font-medium">English (US)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Security */}
          <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
            <h3 className="text-lg font-bold mb-6 flex items-center gap-2">
              <Key className="w-5 h-5 text-indigo-600" />
              Security
            </h3>

            <div className="flex justify-between p-4 bg-slate-50 rounded-xl border">
              <div>
                <p className="text-sm font-bold">Two-Factor Authentication</p>
                <p className="text-xs text-slate-500">
                  Extra security for your account
                </p>
              </div>
              <span className="text-indigo-600 font-bold text-sm">
                Coming Soon
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
