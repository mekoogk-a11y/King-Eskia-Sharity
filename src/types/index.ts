export type VoiceId = 'Fenrir' | 'Puck' | 'Charon' | 'Zephyr' | 'Orus';

export interface VoiceProfile {
  id: VoiceId;
  nameAr: string;
  nameEn: string;
  description: string;
  character: string;
  energyLevel: 'عالي جداً (ناري)' | 'سريع وخاطف' | 'فخم ووقور' | 'شبابي وعصري' | 'إذاعي جهوري';
  avatarColor: string;
  pitchOffset: number; // for local synthesis adjustment
  rateOffset: number;
}

export type MusicTrackId = 'none' | 'sudanese-rhythm' | 'fast-promo' | 'cinematic-hype' | 'corporate-tech' | 'afro-groove';

export interface MusicTrack {
  id: MusicTrackId;
  nameAr: string;
  genre: string;
  bpm: number;
  description: string;
}

export type SoundEffectId = 'whoosh' | 'cash' | 'boom' | 'cheer' | 'horn' | 'laser';

export interface SoundEffect {
  id: SoundEffectId;
  nameAr: string;
  icon: string;
}

export interface PresetCommercial {
  id: string;
  title: string;
  category: 'عروض وتخفيضات' | 'مطاعم ومأكولات' | 'سيارات ونقل' | 'عقارات واستثمار' | 'تقنية وتطبيقات' | 'فعاليات وافتتاح' | 'خدمات وشركات';
  tag: string;
  hook: string;
  script: string;
  voiceId: VoiceId;
  musicTrackId: MusicTrackId;
  durationEstimate: number; // in seconds
  voiceInstructions: string;
  accentHighlights: string[];
}

export interface AudioSettings {
  speed: number; // 0.75 - 1.5
  pitch: number; // 0.8 - 1.3
  bassBoost: boolean;
  reverb: boolean;
  voiceVolume: number; // 0 - 1
  musicVolume: number; // 0 - 1
  musicTrackId: MusicTrackId;
}

export interface GeneratedCommercial {
  id: string;
  title: string;
  script: string;
  category: string;
  voiceInstructions?: string;
  recommendedVoice: VoiceId;
  suggestedMusic: MusicTrackId;
  durationSeconds?: number;
  audioBase64?: string;
  createdAt: number;
}
