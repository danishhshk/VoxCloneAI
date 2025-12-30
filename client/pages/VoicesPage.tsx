
// import React, { useState } from 'react';
// import { 
//   Plus, 
//   Search, 
//   Mic2, 
//   MoreVertical, 
//   Loader2, 
//   Upload, 
//   Info,
//   CheckCircle2,
//   Trash2
// } from 'lucide-react';
// import { mockVoices } from '../services/mockData';
// import { VoiceProfile } from '../types';

// const VoicesPage: React.FC = () => {
//   const [voices, setVoices] = useState<VoiceProfile[]>(mockVoices);
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>('idle');

//   const handleUpload = () => {
//     setUploadState('uploading');
//     setTimeout(() => {
//         setUploadState('success');
//         setTimeout(() => {
//             const newVoice: VoiceProfile = {
//                 id: `v_${Date.now()}`,
//                 name: "New Voice Clone",
//                 description: "Freshly uploaded custom voice.",
//                 createdAt: new Date().toISOString().split('T')[0],
//                 status: 'processing'
//             };
//             setVoices([newVoice, ...voices]);
//             setIsModalOpen(false);
//             setUploadState('idle');
//         }, 1500);
//     }, 2000);
//   };

//   return (
//     <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
//       <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
//         <div>
//           <h1 className="text-2xl font-bold text-slate-900">Voice Library</h1>
//           <p className="text-slate-500">Manage and create high-fidelity voice models.</p>
//         </div>
//         <button 
//           onClick={() => setIsModalOpen(true)}
//           className="flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-indigo-100"
//         >
//           <Plus className="w-5 h-5" />
//           Add Voice
//         </button>
//       </div>

//       {/* Filter Bar */}
//       <div className="bg-white p-4 rounded-xl border border-slate-200 flex items-center gap-4">
//          <div className="relative flex-1">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
//             <input 
//                 type="text" 
//                 placeholder="Search your voices..." 
//                 className="w-full bg-slate-50 border border-slate-100 rounded-lg py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//             />
//          </div>
//          <select className="bg-slate-50 border border-slate-100 rounded-lg py-2 px-4 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
//             <option>All Status</option>
//             <option>Ready</option>
//             <option>Processing</option>
//          </select>
//       </div>

//       {/* Voice Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {voices.map((voice) => (
//           <div key={voice.id} className="bg-white rounded-2xl border border-slate-200 p-6 flex flex-col shadow-sm hover:shadow-md transition-all group">
//             <div className="flex items-start justify-between mb-4">
//               <div className={`p-3 rounded-2xl ${voice.status === 'ready' ? 'bg-indigo-50' : 'bg-slate-50'}`}>
//                 <Mic2 className={`w-6 h-6 ${voice.status === 'ready' ? 'text-indigo-600' : 'text-slate-400'}`} />
//               </div>
//               <button className="p-1 hover:bg-slate-50 rounded transition-colors text-slate-400">
//                 <MoreVertical className="w-5 h-5" />
//               </button>
//             </div>
            
//             <div className="flex-1">
//               <h3 className="font-bold text-slate-900 mb-1 group-hover:text-indigo-600 transition-colors">{voice.name}</h3>
//               <p className="text-sm text-slate-500 line-clamp-2 leading-relaxed">{voice.description}</p>
//             </div>

//             <div className="mt-6 pt-6 border-t border-slate-50 flex items-center justify-between">
//               <span className={`text-xs font-bold uppercase tracking-wider px-2 py-1 rounded-full ${
//                 voice.status === 'ready' 
//                 ? 'bg-emerald-50 text-emerald-600' 
//                 : 'bg-amber-50 text-amber-600'
//               }`}>
//                 {voice.status}
//               </span>
//               <span className="text-xs text-slate-400 font-medium">Added {voice.createdAt}</span>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Modal - Simulated Voice Upload */}
//       {isModalOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
//             <div className="bg-white w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
//                 <div className="p-6 border-b border-slate-100 flex items-center justify-between">
//                     <h2 className="text-xl font-bold text-slate-900">Create Voice Model</h2>
//                     <button 
//                       onClick={() => !uploadState.includes('uploading') && setIsModalOpen(false)}
//                       className="text-slate-400 hover:text-slate-600"
//                     >
//                       <Plus className="w-6 h-6 rotate-45" />
//                     </button>
//                 </div>
                
//                 <div className="p-8 space-y-6">
//                     <div className="space-y-4">
//                         <label className="block text-sm font-bold text-slate-700">Voice Name</label>
//                         <input 
//                             type="text" 
//                             placeholder="e.g. My Professional Avatar"
//                             className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                         />
//                     </div>

//                     <div className="space-y-4">
//                         <label className="block text-sm font-bold text-slate-700">Sample Audio (WAV/MP3)</label>
//                         <div className="border-2 border-dashed border-slate-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3 hover:border-indigo-300 hover:bg-indigo-50/30 transition-all cursor-pointer group">
//                             <div className="w-12 h-12 bg-indigo-50 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
//                                 <Upload className="w-6 h-6 text-indigo-600" />
//                             </div>
//                             <div>
//                                 <p className="font-bold text-slate-800">Drag and drop file</p>
//                                 <p className="text-xs text-slate-500 mt-1">At least 30 seconds of clear speech recommended.</p>
//                             </div>
//                             <input type="file" className="hidden" />
//                         </div>
//                     </div>

//                     <div className="bg-amber-50 rounded-xl p-4 flex gap-3">
//                         <Info className="w-5 h-5 text-amber-600 flex-shrink-0" />
//                         <p className="text-xs text-amber-800 leading-relaxed">
//                             Ensure the audio is recorded in a quiet environment without background music or noise for best results.
//                         </p>
//                     </div>
//                 </div>

//                 <div className="p-6 bg-slate-50 border-t border-slate-100 flex gap-3">
//                     <button 
//                         onClick={() => setIsModalOpen(false)}
//                         className="flex-1 py-3 bg-white border border-slate-200 text-slate-700 rounded-xl font-bold hover:bg-slate-50"
//                     >
//                         Cancel
//                     </button>
//                     <button 
//                         onClick={handleUpload}
//                         disabled={uploadState === 'uploading'}
//                         className="flex-1 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2"
//                     >
//                         {uploadState === 'uploading' ? (
//                             <>
//                                 <Loader2 className="w-5 h-5 animate-spin" />
//                                 Processing...
//                             </>
//                         ) : uploadState === 'success' ? (
//                             <>
//                                 <CheckCircle2 className="w-5 h-5" />
//                                 Completed
//                             </>
//                         ) : (
//                             'Start Cloning'
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default VoicesPage;


import React, { useEffect, useState } from 'react';
import {
  Plus,
  Search,
  Mic2,
  MoreVertical,
  Loader2,
  Upload,
  Info,
  CheckCircle2
} from 'lucide-react';
import { VoiceProfile } from '../types';
import { getVoices, uploadVoice } from '../services/person';

const VoicesPage: React.FC = () => {
  const [voices, setVoices] = useState<VoiceProfile[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [uploadState, setUploadState] = useState<'idle' | 'uploading' | 'success'>('idle');
  const [voiceName, setVoiceName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  // 🔹 Fetch voices from backend
  useEffect(() => {
    const loadVoices = async () => {
      const data = await getVoices();
      setVoices(
        data.map((v: any) => ({
          id: v._id,
          name: v.name,
          description: 'Custom voice profile',
          createdAt: new Date(v.createdAt || Date.now()).toISOString().split('T')[0],
          status: 'ready'
        }))
      );
    };
    loadVoices();
  }, []);

  // 🔹 Upload voice to backend
  const handleUpload = async () => {
    if (!file || !voiceName) return;

    setUploadState('uploading');

    try {
      const newVoice = await uploadVoice(voiceName, file);

      setVoices(prev => [
        {
          id: newVoice._id,
          name: newVoice.name,
          description: 'Custom voice profile',
          createdAt: new Date().toISOString().split('T')[0],
          status: 'ready'
        },
        ...prev
      ]);

      setUploadState('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setUploadState('idle');
        setVoiceName('');
        setFile(null);
      }, 1200);
    } catch (err) {
      console.error(err);
      setUploadState('idle');
    }
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Voice Library</h1>
          <p className="text-slate-500">Manage and create high-fidelity voice models.</p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 bg-indigo-600 text-white px-5 py-2.5 rounded-xl font-bold"
        >
          <Plus className="w-5 h-5" />
          Add Voice
        </button>
      </div>

      {/* Voice Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {voices.map((voice) => (
          <div key={voice.id} className="bg-white rounded-2xl border p-6 shadow-sm">
            <div className="flex items-start justify-between mb-4">
              <div className="p-3 rounded-2xl bg-indigo-50">
                <Mic2 className="w-6 h-6 text-indigo-600" />
              </div>
              <MoreVertical className="w-5 h-5 text-slate-400" />
            </div>

            <h3 className="font-bold text-slate-900">{voice.name}</h3>
            <p className="text-sm text-slate-500">{voice.description}</p>

            <div className="mt-6 pt-6 border-t flex justify-between">
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                READY
              </span>
              <span className="text-xs text-slate-400">Added {voice.createdAt}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Upload Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4">
          <div className="bg-white w-full max-w-lg rounded-2xl overflow-hidden">
            <div className="p-6 border-b flex justify-between">
              <h2 className="text-xl font-bold">Create Voice Model</h2>
              <button onClick={() => setIsModalOpen(false)}>✕</button>
            </div>

            <div className="p-8 space-y-6">
              <input
                type="text"
                placeholder="Voice name"
                value={voiceName}
                onChange={(e) => setVoiceName(e.target.value)}
                className="w-full border rounded-xl px-4 py-3"
              />

              <input
                type="file"
                accept="audio/*"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
              />

              <div className="bg-amber-50 rounded-xl p-4 flex gap-3">
                <Info className="w-5 h-5 text-amber-600" />
                <p className="text-xs text-amber-800">
                  Upload 20–30 seconds of clean voice audio.
                </p>
              </div>
            </div>

            <div className="p-6 bg-slate-50 flex gap-3">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 bg-white border rounded-xl"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={uploadState === 'uploading'}
                className="flex-1 py-3 bg-indigo-600 text-white rounded-xl flex justify-center"
              >
                {uploadState === 'uploading' ? (
                  <Loader2 className="animate-spin" />
                ) : uploadState === 'success' ? (
                  <CheckCircle2 />
                ) : (
                  'Start Cloning'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoicesPage;
