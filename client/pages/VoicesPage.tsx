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
