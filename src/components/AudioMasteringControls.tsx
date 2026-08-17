import React from 'react';
import { AudioSettings, MusicTrackId } from '../types';
import { MUSIC_TRACKS } from '../data/presetAds';
import { Volume2, Zap, Flame, Radio } from 'lucide-react';

interface AudioMasteringControlsProps {
  settings: AudioSettings;
  onChange: (newSettings: AudioSettings) => void;
  isPlaying: boolean;
}

export const AudioMasteringControls: React.FC<AudioMasteringControlsProps> = ({
  settings,
  onChange,
  isPlaying,
}) => {
  const updateSetting = <K extends keyof AudioSettings>(key: K, value: AudioSettings[K]) => {
    onChange({
      ...settings,
      [key]: value,
    });
  };

  return (
    <div id="audio-mastering-controls" className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-800">
        <div className="flex items-center gap-2 text-stone-100 font-bold text-sm">
          <Radio className="w-4 h-4 text-amber-500" />
          <span>مكسر الاستوديو والتحكم الصوتي (Sound Mastering)</span>
        </div>
        <span className="text-xs text-stone-400 font-mono">24-bit / 48kHz DSP</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Voice speed & pitch */}
        <div className="space-y-3 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-stone-300 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>سرعة الإلقاء الحماسي (Speed / Tempo):</span>
            </label>
            <span className="text-xs font-bold text-amber-400 font-mono">{settings.speed}x</span>
          </div>
          <input
            id="speed-slider"
            type="range"
            min="0.75"
            max="1.4"
            step="0.05"
            value={settings.speed}
            onChange={(e) => updateSetting('speed', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
          <div className="flex justify-between text-[10px] text-stone-500">
            <span>رزين ومهيب (0.8x)</span>
            <span>طبيعي (1.0x)</span>
            <span>صاروخي حارق (1.4x)</span>
          </div>

          <div className="pt-2 border-t border-stone-800/60 flex items-center justify-between">
            <label className="text-xs font-semibold text-stone-300">
              نبرة الصوت (Pitch):
            </label>
            <span className="text-xs font-bold text-amber-400 font-mono">{settings.pitch}x</span>
          </div>
          <input
            id="pitch-slider"
            type="range"
            min="0.8"
            max="1.2"
            step="0.05"
            value={settings.pitch}
            onChange={(e) => updateSetting('pitch', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />
        </div>

        {/* Music selector and mixer */}
        <div className="space-y-3 bg-stone-950/60 p-3 rounded-xl border border-stone-800/80">
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1.5">
              الموسيقى التصويرية الخلفية (BGM Track):
            </label>
            <select
              id="bgm-track-select"
              value={settings.musicTrackId}
              onChange={(e) => updateSetting('musicTrackId', e.target.value as MusicTrackId)}
              className="w-full bg-stone-900 border border-stone-700 text-stone-200 text-xs rounded-lg p-2 focus:ring-1 focus:ring-amber-500 outline-none"
            >
              {MUSIC_TRACKS.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nameAr} {t.bpm ? `(${t.bpm} BPM)` : ''}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-stone-300 flex items-center gap-1">
              <Volume2 className="w-3.5 h-3.5 text-stone-400" />
              <span>مستوى صوت الموسيقى الخلفية:</span>
            </label>
            <span className="text-xs font-bold text-stone-300 font-mono">{Math.round(settings.musicVolume * 100)}%</span>
          </div>
          <input
            id="music-volume-slider"
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={settings.musicVolume}
            onChange={(e) => updateSetting('musicVolume', parseFloat(e.target.value))}
            className="w-full h-1.5 bg-stone-800 rounded-lg appearance-none cursor-pointer accent-amber-500"
          />

          {/* Quick Audio Enhancers */}
          <div className="flex items-center gap-3 pt-2">
            <button
              id="toggle-bass-btn"
              onClick={() => updateSetting('bassBoost', !settings.bassBoost)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                settings.bassBoost
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <Flame className="w-3.5 h-3.5 text-amber-500" />
              <span>تضخيم الباس (Bass Boost)</span>
            </button>
            <button
              id="toggle-reverb-btn"
              onClick={() => updateSetting('reverb', !settings.reverb)}
              className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold border transition flex items-center justify-center gap-1.5 ${
                settings.reverb
                  ? 'bg-orange-500/20 border-orange-500 text-orange-300'
                  : 'bg-stone-900 border-stone-800 text-stone-400 hover:text-stone-200'
              }`}
            >
              <span>🏛️ صدى الاستوديو (Echo)</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
