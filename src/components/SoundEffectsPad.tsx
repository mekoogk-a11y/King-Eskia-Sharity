import React, { useState } from 'react';
import { SOUND_EFFECTS } from '../data/presetAds';
import { SoundEffectId } from '../types';
import { audioEngine } from '../utils/audioSynthesizer';

export const SoundEffectsPad: React.FC = () => {
  const [activeEffect, setActiveEffect] = useState<SoundEffectId | null>(null);

  const handleTrigger = (id: SoundEffectId) => {
    setActiveEffect(id);
    audioEngine.playSoundEffect(id);
    setTimeout(() => {
      setActiveEffect(prev => (prev === id ? null : prev));
    }, 400);
  };

  return (
    <div id="sound-effects-pad" className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">🎛️</span>
          <h3 className="font-bold text-sm text-stone-100">لوحة المؤثرات الإعلانية الفورية (SFX Pad)</h3>
        </div>
        <span className="text-[11px] text-amber-400/90 bg-amber-950/40 px-2 py-0.5 rounded border border-amber-800/30">
          انقر للإطلاق الفوري أثناء التشغيل
        </span>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
        {SOUND_EFFECTS.map((fx) => {
          const isActive = activeEffect === fx.id;
          return (
            <button
              key={fx.id}
              id={`sfx-btn-${fx.id}`}
              onClick={() => handleTrigger(fx.id)}
              className={`flex flex-col items-center justify-center p-2.5 rounded-xl border transition-all active:scale-95 text-center ${
                isActive
                  ? 'bg-amber-500 text-stone-950 border-amber-400 shadow-lg shadow-amber-500/30 scale-105'
                  : 'bg-stone-950/80 hover:bg-stone-800/80 text-stone-200 border-stone-800 hover:border-amber-500/50'
              }`}
            >
              <span className="text-xl mb-1">{fx.icon}</span>
              <span className="text-[11px] font-semibold truncate w-full">{fx.nameAr}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
