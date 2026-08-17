import React, { useState } from 'react';
import { PRESET_COMMERCIALS } from '../data/presetAds';
import { PresetCommercial } from '../types';
import { Play, Flame, Copy, Check, Sparkles } from 'lucide-react';

interface PresetsLibraryProps {
  onSelectCommercial: (commercial: PresetCommercial, autoPlay?: boolean) => void;
  activeCommercialId?: string;
  isPlaying?: boolean;
}

export const PresetsLibrary: React.FC<PresetsLibraryProps> = ({
  onSelectCommercial,
  activeCommercialId,
  isPlaying,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('الكل');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = ['الكل', 'عروض وتخفيضات', 'مطاعم ومأكولات', 'عقارات واستثمار', 'تقنية وتطبيقات', 'فعاليات وافتتاح', 'سيارات ونقل'];

  const filteredAds = selectedCategory === 'الكل'
    ? PRESET_COMMERCIALS
    : PRESET_COMMERCIALS.filter(ad => ad.category === selectedCategory);

  const handleCopy = (e: React.MouseEvent, text: string, id: string) => {
    e.stopPropagation();
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div id="presets-library-section" className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-2 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <Flame className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-sm text-stone-100">مكتبة الإعلانات السودانية الجاهزة (Ready-made Commercials)</h3>
        </div>
        <span className="text-xs text-stone-400">نصوص باللهجة الدارجة الأصيلة</span>
      </div>

      {/* Category Pills */}
      <div className="flex gap-1.5 overflow-x-auto pb-1.5 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`text-xs px-3 py-1.5 rounded-xl whitespace-nowrap font-medium transition ${
              selectedCategory === cat
                ? 'bg-amber-500 text-stone-950 font-bold shadow'
                : 'bg-stone-950/70 text-stone-300 hover:bg-stone-800 border border-stone-800'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Ads Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-[420px] overflow-y-auto pr-1">
        {filteredAds.map((ad) => {
          const isActive = activeCommercialId === ad.id;
          return (
            <div
              key={ad.id}
              id={`preset-ad-${ad.id}`}
              onClick={() => onSelectCommercial(ad, false)}
              className={`group p-3.5 rounded-xl border transition-all cursor-pointer relative flex flex-col justify-between ${
                isActive
                  ? 'bg-stone-950 border-amber-500 ring-1 ring-amber-500/50 shadow-lg'
                  : 'bg-stone-950/70 hover:bg-stone-900 border-stone-800/80 hover:border-stone-700'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[10px] bg-amber-500/10 text-amber-400 border border-amber-500/20 px-2 py-0.5 rounded-full font-bold">
                      {ad.category}
                    </span>
                    <span className="text-[10px] bg-red-500/10 text-red-400 border border-red-500/20 px-1.5 py-0.5 rounded font-semibold">
                      {ad.tag}
                    </span>
                  </div>
                  <span className="text-[11px] text-stone-400 font-mono">~{ad.durationEstimate} ثانية</span>
                </div>

                <h4 className="font-bold text-xs text-stone-100 group-hover:text-amber-400 transition mb-2">
                  {ad.title}
                </h4>

                <p className="text-xs text-stone-300 bg-stone-900/60 p-2 rounded-lg border border-stone-800/50 leading-relaxed font-sans mb-3 line-clamp-3">
                  "{ad.script}"
                </p>

                {/* Accent highlights */}
                <div className="flex flex-wrap gap-1 mb-3">
                  {ad.accentHighlights.map((term, i) => (
                    <span key={i} className="text-[10px] bg-amber-950/40 text-amber-300 border border-amber-800/30 px-1.5 py-0.5 rounded">
                      #{term}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-stone-800/60">
                <button
                  type="button"
                  onClick={(e) => handleCopy(e, ad.script, ad.id)}
                  className="text-[11px] text-stone-400 hover:text-stone-200 flex items-center gap-1 py-1 px-2 rounded bg-stone-900 border border-stone-800"
                >
                  {copiedId === ad.id ? (
                    <>
                      <Check className="w-3 h-3 text-green-400" />
                      <span className="text-green-400">تم النسخ</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3" />
                      <span>نسخ النص</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectCommercial(ad, true);
                  }}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                    isActive && isPlaying
                      ? 'bg-red-600 text-white animate-pulse'
                      : 'bg-amber-500 hover:bg-amber-400 text-stone-950'
                  }`}
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>{isActive && isPlaying ? 'جاري التشغيل..' : 'تشغيل فوري بالصوت'}</span>
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
