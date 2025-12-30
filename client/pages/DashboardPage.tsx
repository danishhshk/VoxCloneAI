
// import React from 'react';
// import { 
//   Users, 
//   Clock, 
//   Activity, 
//   ArrowUpRight,
//   PlusCircle,
//   PlayCircle,
//   History
// } from 'lucide-react';
// import { useAuth } from '../App';
// import { mockGeneratedHistory } from '../services/mockData';
// import { Link } from 'react-router-dom';

// const DashboardPage: React.FC = () => {
//   const { user } = useAuth();

//   const stats = [
//     { name: 'Active Voices', value: user?.usage.clonesCount, icon: Users, color: 'text-blue-600', bg: 'bg-blue-50' },
//     { name: 'Generated Seconds', value: user?.usage.secondsGenerated, icon: Clock, color: 'text-indigo-600', bg: 'bg-indigo-50' },
//     { name: 'Remaining Credits', value: (user?.usage.limit || 0) - (user?.usage.secondsGenerated || 0), icon: Activity, color: 'text-emerald-600', bg: 'bg-emerald-50' },
//   ];

//   return (
//     <div className="space-y-8 animate-in fade-in duration-500">
//       <div>
//         <h1 className="text-2xl font-bold text-slate-900">Welcome back, {user?.name.split(' ')[0]} 👋</h1>
//         <p className="text-slate-500">Here's what's happening with your voice studio today.</p>
//       </div>

//       {/* Stats Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//         {stats.map((stat) => (
//           <div key={stat.name} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow">
//             <div className="flex items-center justify-between mb-4">
//               <div className={`${stat.bg} p-3 rounded-xl`}>
//                 <stat.icon className={`${stat.color} w-6 h-6`} />
//               </div>
//               <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">THIS MONTH</span>
//             </div>
//             <p className="text-sm font-medium text-slate-500">{stat.name}</p>
//             <h3 className="text-3xl font-bold text-slate-900 mt-1">{stat.value?.toLocaleString()}</h3>
//           </div>
//         ))}
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
//         {/* Quick Actions */}
//         <div className="lg:col-span-1 space-y-6">
//           <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-xl shadow-indigo-100 relative overflow-hidden group">
//             <div className="relative z-10">
//               <h3 className="text-lg font-bold mb-2">Create New Voice</h3>
//               <p className="text-indigo-100 text-sm mb-6">Upload 30 seconds of high quality audio to start cloning.</p>
//               <Link to="/voices" className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm hover:bg-indigo-50 transition-colors">
//                 <PlusCircle className="w-4 h-4" />
//                 Upload WAV
//               </Link>
//             </div>
//             <div className="absolute -bottom-6 -right-6 text-white/10 group-hover:scale-110 transition-transform">
//               <PlusCircle className="w-32 h-32" />
//             </div>
//           </div>

//           <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
//             <h3 className="text-slate-900 font-bold mb-4 flex items-center gap-2">
//                 <Activity className="w-5 h-5 text-indigo-600" />
//                 Usage Limit
//             </h3>
//             <div className="space-y-4">
//                 <div className="flex justify-between text-sm">
//                     <span className="text-slate-500">Seconds Used</span>
//                     <span className="font-bold">{user?.usage.secondsGenerated} / {user?.usage.limit}</span>
//                 </div>
//                 <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
//                     <div 
//                         className="bg-indigo-600 h-full rounded-full transition-all" 
//                         style={{ width: `${((user?.usage.secondsGenerated || 0) / (user?.usage.limit || 1)) * 100}%` }}
//                     ></div>
//                 </div>
//                 <p className="text-xs text-slate-400">Your usage resets on the 1st of next month.</p>
//             </div>
//           </div>
//         </div>

//         {/* Recent Activity */}
//         <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
//           <div className="p-6 border-b border-slate-100 flex items-center justify-between">
//             <h3 className="text-slate-900 font-bold flex items-center gap-2">
//               <History className="w-5 h-5 text-indigo-600" />
//               Recent Generations
//             </h3>
//             <Link to="/generate" className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 flex items-center gap-1 group">
//               View all
//               <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
//             </Link>
//           </div>
//           <div className="flex-1 overflow-y-auto">
//             {mockGeneratedHistory.length > 0 ? (
//                 <div className="divide-y divide-slate-50">
//                     {mockGeneratedHistory.map((gen) => (
//                         <div key={gen.id} className="p-4 flex items-center gap-4 hover:bg-slate-50 transition-colors">
//                             <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center flex-shrink-0">
//                                 <PlayCircle className="w-6 h-6 text-indigo-600" />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                                 <p className="font-semibold text-slate-800 truncate">{gen.text}</p>
//                                 <div className="flex items-center gap-2 mt-0.5 text-xs text-slate-400">
//                                     <span className="font-medium text-slate-600">{gen.voiceName}</span>
//                                     <span>•</span>
//                                     <span>{gen.duration}s</span>
//                                     <span>•</span>
//                                     <span>{gen.createdAt}</span>
//                                 </div>
//                             </div>
//                             <button className="text-indigo-600 hover:text-indigo-800 text-sm font-bold px-3 py-1 bg-indigo-50 rounded-lg">
//                                 Listen
//                             </button>
//                         </div>
//                     ))}
//                 </div>
//             ) : (
//                 <div className="flex flex-col items-center justify-center py-20 text-slate-400">
//                     <History className="w-12 h-12 mb-3 opacity-20" />
//                     <p>No generations yet.</p>
//                 </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardPage;


import React, { useEffect, useState } from 'react';
import {
  Users,
  Clock,
  Activity,
  ArrowUpRight,
  PlusCircle,
  PlayCircle,
  History
} from 'lucide-react';
import { useAuth } from '../App';
import { Link } from 'react-router-dom';
import { getRecentGenerations } from '../services/generation';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    const loadRecent = async () => {
      try {
        const data = await getRecentGenerations();
        setRecent(data);
      } catch {
        setRecent([]);
      }
    };
    loadRecent();
  }, []);

  const stats = [
    {
      name: 'Active Voices',
      value: user?.usage.clonesCount,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50'
    },
    {
      name: 'Generated Seconds',
      value: user?.usage.secondsGenerated,
      icon: Clock,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50'
    },
    {
      name: 'Remaining Credits',
      value: (user?.usage.limit || 0) - (user?.usage.secondsGenerated || 0),
      icon: Activity,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50'
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">
          Welcome back, {user?.name.split(' ')[0]} 👋
        </h1>
        <p className="text-slate-500">
          Here's what's happening with your voice studio today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div
            key={stat.name}
            className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`${stat.bg} p-3 rounded-xl`}>
                <stat.icon className={`${stat.color} w-6 h-6`} />
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">
                THIS MONTH
              </span>
            </div>
            <p className="text-sm font-medium text-slate-500">{stat.name}</p>
            <h3 className="text-3xl font-bold text-slate-900 mt-1">
              {stat.value?.toLocaleString()}
            </h3>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Quick Actions */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-indigo-600 p-6 rounded-2xl text-white shadow-xl shadow-indigo-100">
            <h3 className="text-lg font-bold mb-2">Create New Voice</h3>
            <p className="text-indigo-100 text-sm mb-6">
              Upload 30 seconds of high quality audio to start cloning.
            </p>
            <Link
              to="/voices"
              className="inline-flex items-center gap-2 bg-white text-indigo-600 px-4 py-2 rounded-lg font-bold text-sm"
            >
              <PlusCircle className="w-4 h-4" />
              Upload WAV
            </Link>
          </div>
        </div>

        {/* Recent Generations */}
        <div className="lg:col-span-2 bg-white rounded-2xl border shadow-sm overflow-hidden flex flex-col">
          <div className="p-6 border-b flex justify-between">
            <h3 className="font-bold flex items-center gap-2">
              <History className="w-5 h-5 text-indigo-600" />
              Recent Generations
            </h3>
            <Link to="/generate" className="text-sm font-semibold text-indigo-600">
              View all
            </Link>
          </div>

          <div className="flex-1 overflow-y-auto">
            {recent.length > 0 ? (
              recent.map((gen) => (
                <div key={gen._id} className="p-4 flex gap-4 border-b">
                  <div className="w-12 h-12 rounded-full bg-indigo-50 flex items-center justify-center">
                    <PlayCircle className="w-6 h-6 text-indigo-600" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold truncate">{gen.text}</p>
                    <p className="text-xs text-slate-400">
                      {gen.voiceName} • {gen.duration}s
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-slate-400">
                <History className="w-12 h-12 mb-3 opacity-20" />
                <p>No generations yet.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
