import React from 'react';
import { VoiceId, VoiceProfile } from '../types';
import { VOICE_PROFILES } from '../data/presetAds';
import { Sparkles, Mic } from 'lucide-react';

interface VoiceSelectorProps {
  selectedVoiceId: VoiceId;
  onSelectVoice: (id: VoiceId) => void;
}

export const VoiceSelector: React.FC<VoiceSelectorProps> = ({
  selectedVoiceId,
  onSelectVoice,
}) => {
  return (
    <div id="voice-selector-panel" className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Mic className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-sm text-stone-100">شخصية الصوت الرجالي الإعلاني (Voice Persona)</h3>
        </div>
        <span className="text-xs text-stone-400">اللهجة السودانية الحماسية</span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
        {VOICE_PROFILES.map((profile: VoiceProfile) => {
          const isSelected = profile.id === selectedVoiceId;
          return (
            <button
              key={profile.id}
              id={`voice-card-${profile.id}`}
              onClick={() => onSelectVoice(profile.id)}
              className={`text-right p-3 rounded-xl border transition-all relative overflow-hidden flex flex-col justify-between ${
                isSelected
                  ? 'bg-gradient-to-br from-stone-900 to-amber-950/40 border-amber-500 shadow-md shadow-amber-500/10'
                  : 'bg-stone-950/60 hover:bg-stone-800/60 border-stone-800 text-stone-300'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-lg bg-gradient-to-br ${profile.avatarColor} flex items-center justify-center text-white text-xs font-bold shadow`}>
                      🎙️
                    </div>
                    <span className={`text-xs font-bold ${isSelected ? 'text-amber-400' : 'text-stone-200'}`}>
                      {profile.nameAr.split('(')[0]}
                    </span>
                  </div>
                  {isSelected && (
                    <span className="text-[10px] bg-amber-500 text-stone-950 font-black px-1.5 py-0.5 rounded">
                      محدد
                    </span>
                  )}
                </div>

                <p className="text-[11px] text-stone-400 line-clamp-2 leading-relaxed mb-2">
                  {profile.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800/70 text-[10px]">
                <span className="text-amber-400/90 font-medium">⚡ {profile.energyLevel}</span>
                <span className="text-stone-400">{profile.character}</span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
