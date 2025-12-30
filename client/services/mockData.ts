
import { User, VoiceProfile, GeneratedAudio } from '../types';

export const mockUser: User = {
  id: 'usr_123',
  name: 'Alex Johnson',
  email: 'alex@example.com',
  plan: 'pro',
  usage: {
    clonesCount: 3,
    secondsGenerated: 1450,
    limit: 5000
  }
};

export const mockVoices: VoiceProfile[] = [
  {
    id: 'v_1',
    name: 'Professional Narrator',
    description: 'Deep, authoritative male voice for documentaries.',
    createdAt: '2023-10-15',
    status: 'ready'
  },
  {
    id: 'v_2',
    name: 'Cheerful Sarah',
    description: 'Energetic female voice suitable for commercials.',
    createdAt: '2023-11-02',
    status: 'ready'
  },
  {
    id: 'v_3',
    name: 'Corporate CEO',
    description: 'Neutral, professional tone for presentations.',
    createdAt: '2023-12-10',
    status: 'processing'
  }
];

export const mockGeneratedHistory: GeneratedAudio[] = [
  {
    id: 'a_1',
    voiceId: 'v_1',
    voiceName: 'Professional Narrator',
    text: 'Welcome to our annual company gala.',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    createdAt: '2024-01-20',
    duration: 12
  },
  {
    id: 'a_2',
    voiceId: 'v_2',
    voiceName: 'Cheerful Sarah',
    text: 'Try our new coffee blend today!',
    audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    createdAt: '2024-01-21',
    duration: 8
  }
];

export const mockEnterpriseRequests: Array<{ name: string; email: string; company?: string; message?: string; createdAt?: string }> = [];
