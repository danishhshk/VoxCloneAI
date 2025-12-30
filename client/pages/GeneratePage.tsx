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
