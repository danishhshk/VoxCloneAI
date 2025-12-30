
export interface User {
  id: string;
  name: string;
  email: string;
  plan: 'free' | 'pro' | 'enterprise';
  usage: {
    clonesCount: number;
    secondsGenerated: number;
    limit: number;
  };
}

export interface VoiceProfile {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  status: 'ready' | 'processing' | 'error';
  sampleUrl?: string;
}

export interface GeneratedAudio {
  id: string;
  voiceId: string;
  voiceName: string;
  text: string;
  audioUrl: string;
  createdAt: string;
  duration: number;
}

export interface AuthResponse {
  token: string;
  user: User;
}

export enum SubscriptionPlan {
  FREE = 'free',
  PRO = 'pro',
  ENTERPRISE = 'enterprise'
}
