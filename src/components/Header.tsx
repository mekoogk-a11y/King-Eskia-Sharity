import React from 'react';
import { Flame, Radio, Mic2, Sparkles } from 'lucide-react';

interface HeaderProps {
  onOpenBooth: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenBooth }) => {
  return (
    <header className="border-b border-stone-800 bg-stone-950/90 backdrop-blur-md sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
        {/* Brand & Sudanese Identity */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-amber-500 via-orange-600 to-red-600 flex items-center justify-center shadow-lg shadow-orange-500/20 text-stone-950 font-black">
              <Flame className="w-6 h-6 fill-stone-950" />
            </div>
            {/* Sudan Flag Micro Accent */}
            <div className="absolute -bottom-1 -right-1 flex rounded-sm overflow-hidden border border-stone-800 shadow">
              <div className="w-1.5 h-3 bg-red-600" />
              <div className="w-1.5 h-3 bg-white" />
              <div className="w-1.5 h-3 bg-black" />
            </div>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-black text-stone-100 tracking-tight">
                استوديو الصوت الإعلاني السوداني الحماسي
              </h1>
              <span className="hidden sm:inline-block text-[10px] bg-red-600/20 text-red-400 border border-red-500/30 px-2 py-0.5 rounded-full font-bold">
                صوت رجالي ناري 🔥
              </span>
            </div>
            <p className="text-xs text-stone-400 font-medium">
              إنتاج وتوليد نصوص وأصوات إعلانية بالعامية السودانية مع مؤثرات وإيقاعات
            </p>
          </div>
        </div>

        {/* Quick Top Actions */}
        <div className="flex items-center gap-2.5">
          <button
            onClick={onOpenBooth}
            className="text-xs font-bold bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-700/80 px-3.5 py-2 rounded-xl flex items-center gap-1.5 transition active:scale-95 shadow"
          >
            <Mic2 className="w-3.5 h-3.5 text-amber-500" />
            <span className="hidden sm:inline">كابينة التسجيل</span>
          </button>

          <div className="hidden md:flex items-center gap-1.5 bg-amber-950/50 border border-amber-800/40 text-amber-300 text-xs px-3 py-1.5 rounded-xl font-bold">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <span>محرك الذكاء الصوتي جاهز</span>
          </div>
        </div>
      </div>
    </header>
  );
};
