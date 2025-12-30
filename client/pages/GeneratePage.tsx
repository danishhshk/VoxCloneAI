
// import React, { useState } from 'react';
// import { 
//   Play, 
//   Download, 
//   Wand2, 
//   Settings2, 
//   Volume2, 
//   RefreshCcw,
//   Loader2,
//   Trash2,
//   Share2
// } from 'lucide-react';
// import { mockVoices, mockGeneratedHistory } from '../services/mockData';
// import { GeneratedAudio } from '../types';

// const GeneratePage: React.FC = () => {
//   const [selectedVoice, setSelectedVoice] = useState(mockVoices[0].id);
//   const [text, setText] = useState('');
//   const [isGenerating, setIsGenerating] = useState(false);
//   const [history, setHistory] = useState<GeneratedAudio[]>(mockGeneratedHistory);
//   const [result, setResult] = useState<GeneratedAudio | null>(null);

//   const handleGenerate = () => {
//     if (!text) return;
//     setIsGenerating(true);
    
//     // Simulate API call to Node.js backend
//     setTimeout(() => {
//         const newAudio: GeneratedAudio = {
//             id: `a_${Date.now()}`,
//             voiceId: selectedVoice,
//             voiceName: mockVoices.find(v => v.id === selectedVoice)?.name || 'Unknown',
//             text: text,
//             audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
//             createdAt: new Date().toLocaleTimeString(),
//             duration: Math.ceil(text.length / 15)
//         };
//         setResult(newAudio);
//         setHistory([newAudio, ...history]);
//         setIsGenerating(false);
//     }, 3000);
//   };

//   return (
//     <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">
      
//       {/* Input Section */}
//       <div className="lg:col-span-8 space-y-6">
//         <div className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm overflow-hidden flex flex-col h-full">
//             <div className="flex items-center justify-between mb-6">
//                 <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
//                     <Wand2 className="w-5 h-5 text-indigo-600" />
//                     Speech Generator
//                 </h2>
//                 <div className="flex gap-2">
//                     <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-all">
//                         <Settings2 className="w-5 h-5" />
//                     </button>
//                     <button 
//                         onClick={() => setText('')}
//                         className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
//                     >
//                         <RefreshCcw className="w-5 h-5" />
//                     </button>
//                 </div>
//             </div>

//             <div className="space-y-6 flex-1 flex flex-col">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                     <div className="space-y-2">
//                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Select Voice Model</label>
//                         <select 
//                             value={selectedVoice}
//                             onChange={(e) => setSelectedVoice(e.target.value)}
//                             className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
//                         >
//                             {mockVoices.map(v => (
//                                 <option key={v.id} value={v.id} disabled={v.status !== 'ready'}>
//                                     {v.name} {v.status !== 'ready' ? '(Processing...)' : ''}
//                                 </option>
//                             ))}
//                         </select>
//                     </div>
//                     <div className="space-y-2">
//                         <label className="text-xs font-bold text-slate-500 uppercase tracking-wider">Output Quality</label>
//                         <select className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20">
//                             <option>High Definition (48kHz)</option>
//                             <option>Standard (24kHz)</option>
//                             <option>Fast (8kHz)</option>
//                         </select>
//                     </div>
//                 </div>

//                 <div className="space-y-2 flex-1 flex flex-col min-h-[300px]">
//                     <label className="text-xs font-bold text-slate-500 uppercase tracking-wider flex justify-between">
//                         Input Text
//                         <span>{text.length} / 5000</span>
//                     </label>
//                     <textarea 
//                         value={text}
//                         onChange={(e) => setText(e.target.value)}
//                         placeholder="Type or paste the script you want to turn into speech..."
//                         className="w-full flex-1 bg-slate-50 border border-slate-200 rounded-2xl p-6 text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 resize-none leading-relaxed"
//                     ></textarea>
//                 </div>

//                 <div className="flex items-center justify-between pt-4 border-t border-slate-100">
//                     <div className="flex gap-4">
//                          <div className="flex items-center gap-2 text-slate-500">
//                             <Volume2 className="w-4 h-4" />
//                             <span className="text-sm font-medium">Auto-intonation: ON</span>
//                          </div>
//                     </div>
//                     <button 
//                         onClick={handleGenerate}
//                         disabled={isGenerating || !text}
//                         className="px-8 py-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-slate-200 text-white rounded-xl font-bold shadow-lg shadow-indigo-100 transition-all flex items-center justify-center gap-3 min-w-[200px]"
//                     >
//                         {isGenerating ? (
//                             <>
//                                 <Loader2 className="w-5 h-5 animate-spin" />
//                                 Generating...
//                             </>
//                         ) : (
//                             <>
//                                 <Wand2 className="w-5 h-5" />
//                                 Generate Audio
//                             </>
//                         )}
//                     </button>
//                 </div>
//             </div>
//         </div>
//       </div>

//       {/* History / Preview Section */}
//       <div className="lg:col-span-4 space-y-6">
//         {/* Latest Result */}
//         {result && (
//             <div className="bg-indigo-600 rounded-2xl p-6 text-white shadow-xl shadow-indigo-100 animate-in zoom-in-95 duration-300">
//                 <div className="flex items-center justify-between mb-4">
//                     <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold">LATEST RESULT</span>
//                     <button className="p-1.5 hover:bg-white/10 rounded-lg transition-colors">
//                         <Share2 className="w-4 h-4" />
//                     </button>
//                 </div>
//                 <p className="text-sm text-indigo-100 line-clamp-3 mb-6">"{result.text}"</p>
//                 <div className="bg-white/10 rounded-xl p-4 space-y-4">
//                     <div className="flex items-center gap-3">
//                         <button className="w-10 h-10 bg-white text-indigo-600 rounded-full flex items-center justify-center shadow-sm hover:scale-105 transition-transform">
//                             <Play className="w-4 h-4 fill-current" />
//                         </button>
//                         <div className="flex-1 h-1 bg-white/20 rounded-full overflow-hidden">
//                             <div className="w-1/3 h-full bg-white rounded-full"></div>
//                         </div>
//                         <span className="text-xs font-bold">{result.duration}s</span>
//                     </div>
//                     <div className="flex gap-2">
//                         <button className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm font-bold transition-all">
//                             <Download className="w-4 h-4" />
//                             WAV
//                         </button>
//                         <button className="flex-1 flex items-center justify-center gap-2 bg-white/20 hover:bg-white/30 py-2 rounded-lg text-sm font-bold transition-all">
//                             <Download className="w-4 h-4" />
//                             MP3
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         )}

//         {/* History List */}
//         <div className="bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col max-h-[600px]">
//             <div className="p-5 border-b border-slate-100 flex items-center justify-between">
//                 <h3 className="font-bold text-slate-900">History</h3>
//                 <span className="text-xs text-slate-400 font-bold">{history.length} ITEMS</span>
//             </div>
//             <div className="flex-1 overflow-y-auto divide-y divide-slate-50">
//                 {history.map((item) => (
//                     <div key={item.id} className="p-4 hover:bg-slate-50 transition-all flex flex-col gap-2 group">
//                         <div className="flex items-center justify-between">
//                             <span className="text-xs font-bold text-indigo-600 truncate max-w-[150px]">{item.voiceName}</span>
//                             <span className="text-[10px] text-slate-400 font-medium">{item.createdAt}</span>
//                         </div>
//                         <p className="text-sm text-slate-600 line-clamp-2 italic leading-snug">"{item.text}"</p>
//                         <div className="flex items-center gap-3 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
//                             <button className="text-xs font-bold text-indigo-600 hover:underline flex items-center gap-1">
//                                 <Play className="w-3 h-3" /> Play
//                             </button>
//                             <button className="text-xs font-bold text-slate-400 hover:text-indigo-600 flex items-center gap-1">
//                                 <Download className="w-3 h-3" /> Download
//                             </button>
//                             <button className="ml-auto text-slate-300 hover:text-red-500">
//                                 <Trash2 className="w-4 h-4" />
//                             </button>
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default GeneratePage;


import React, { useEffect, useState } from 'react';
import {
  Play,
  Download,
  Wand2,
  Settings2,
  Volume2,
  RefreshCcw,
  Loader2,
  Trash2,
  Share2
} from 'lucide-react';
import { GeneratedAudio, VoiceProfile } from '../types';
import { getVoices } from '../services/person';
import { generateVoice } from '../services/clone';

const GeneratePage: React.FC = () => {
  const [voices, setVoices] = useState<VoiceProfile[]>([]);
  const [selectedVoice, setSelectedVoice] = useState('');
  const [text, setText] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [history, setHistory] = useState<GeneratedAudio[]>([]);
  const [result, setResult] = useState<GeneratedAudio | null>(null);

  // 🔹 Load voices from backend
  useEffect(() => {
    const loadVoices = async () => {
      const data = await getVoices();
      const mapped = data.map((v: any) => ({
        id: v._id,
        name: v.name,
        status: 'ready'
      }));
      setVoices(mapped);
      if (mapped.length > 0) setSelectedVoice(mapped[0].id);
    };
    loadVoices();
  }, []);

  // 🔹 Generate audio using backend
  const handleGenerate = async () => {
    if (!text || !selectedVoice) return;

    setIsGenerating(true);

    try {
      const audioUrl = await generateVoice(text, selectedVoice);

      const voiceName =
        voices.find(v => v.id === selectedVoice)?.name || 'Unknown';

      const newAudio: GeneratedAudio = {
        id: `a_${Date.now()}`,
        voiceId: selectedVoice,
        voiceName,
        text,
        audioUrl,
        createdAt: new Date().toLocaleTimeString(),
        duration: Math.ceil(text.length / 15)
      };

      setResult(newAudio);
      setHistory(prev => [newAudio, ...prev]);
    } catch (err) {
      console.error('Generation failed', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in fade-in slide-in-from-right-4 duration-500">

      {/* INPUT SECTION */}
      <div className="lg:col-span-8 space-y-6">
        <div className="bg-white rounded-2xl border p-6 shadow-sm flex flex-col h-full">
          <div className="flex justify-between mb-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Wand2 className="w-5 h-5 text-indigo-600" />
              Speech Generator
            </h2>
            <button onClick={() => setText('')} className="p-2 text-slate-400 hover:text-red-500">
              <RefreshCcw className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6 flex-1 flex flex-col">
            <select
              value={selectedVoice}
              onChange={(e) => setSelectedVoice(e.target.value)}
              className="w-full bg-slate-50 border rounded-xl px-4 py-3"
            >
              {voices.map(v => (
                <option key={v.id} value={v.id}>
                  {v.name}
                </option>
              ))}
            </select>

            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Enter text to generate speech..."
              className="flex-1 bg-slate-50 border rounded-2xl p-6 resize-none"
            />

            <button
              onClick={handleGenerate}
              disabled={isGenerating || !text}
              className="px-8 py-4 bg-indigo-600 text-white rounded-xl font-bold flex items-center justify-center gap-3"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Generating...
                </>
              ) : (
                <>
                  <Wand2 className="w-5 h-5" />
                  Generate Audio
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* RESULT + HISTORY */}
      <div className="lg:col-span-4 space-y-6">
        {result && (
          <div className="bg-indigo-600 text-white rounded-2xl p-6 shadow-xl">
            <p className="text-sm mb-4 italic">"{result.text}"</p>
            <audio src={result.audioUrl} controls className="w-full" />
          </div>
        )}

        <div className="bg-white rounded-2xl border shadow-sm max-h-[600px] overflow-y-auto">
          {history.map(item => (
            <div key={item.id} className="p-4 border-b">
              <p className="text-xs font-bold text-indigo-600">{item.voiceName}</p>
              <p className="text-sm italic">"{item.text}"</p>
              <audio src={item.audioUrl} controls className="w-full mt-2" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GeneratePage;
