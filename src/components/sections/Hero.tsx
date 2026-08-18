import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Heart,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Globe,
  Activity,
  Droplets,
  GraduationCap,
  Sparkles,
} from 'lucide-react';

interface HeroProps {
  onNavigate: (section: string) => void;
  onOpenDonate: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenDonate }) => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section className="relative min-h-[85vh] lg:min-h-[90vh] flex items-center justify-center bg-black overflow-hidden">
      {/* Dynamic Background Image with Sahelian African human imagery */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=2000&q=85"
          alt="Sahel Africa Humanitarian Impact"
          className="w-full h-full object-cover object-center opacity-30 scale-105 transition-transform duration-1000 ease-out"
        />
        {/* Cinematic Dual Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/85 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-emerald-950/20" />

        {/* Subtle geometric pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 py-20 lg:py-28 text-center sm:text-start flex flex-col items-center sm:items-start justify-center">
        {/* Official Mali Flag & Certification Badge */}
        <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-stone-900/90 border border-stone-700/80 text-stone-200 text-xs sm:text-sm font-bold mb-6 shadow-xl backdrop-blur-md animate-fadeIn">
          {/* Stylized Mali Flag Emblem */}
          <div className="flex items-center h-4 w-6 rounded overflow-hidden shadow-inner border border-stone-600/60 flex-shrink-0">
            <span className="w-1/3 h-full bg-emerald-500" />
            <span className="w-1/3 h-full bg-amber-400" />
            <span className="w-1/3 h-full bg-red-500" />
          </div>
          <span className="text-emerald-400 font-extrabold">{t.hero.badge.split('•')[0]}</span>
          <span className="text-stone-500">•</span>
          <span className="text-stone-300">{t.hero.badge.split('•')[1] || 'جمهورية مالي والساحل الإفريقي'}</span>
        </div>

        {/* Main Royal Humanitarian Headline */}
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black text-white leading-[1.15] tracking-tight max-w-4xl mb-6">
          <span className="block text-stone-100">
            {t.hero.title}
          </span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-amber-400">
            مؤسسة الملك اسكيا الخيرية
          </span>
        </h1>

        {/* Comprehensive Subtitle */}
        <p className="text-stone-300 text-base sm:text-lg lg:text-xl font-normal leading-relaxed max-w-3xl mb-10 text-stone-300/90">
          {t.hero.subtitle}
        </p>

        {/* 3 Call-To-Action Action Buttons */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-4 w-full sm:w-auto mb-14">
          {/* Primary Donate CTA (Calm Emerald Theme) */}
          <button
            onClick={onOpenDonate}
            className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black text-base px-8 py-4 rounded-2xl shadow-xl shadow-emerald-950/60 border border-emerald-400/40 flex items-center justify-center gap-3 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Heart className="w-5 h-5 fill-current text-white animate-pulse" />
            <span>{t.hero.donateBtn}</span>
          </button>

          {/* Secondary Explore Projects CTA */}
          <button
            onClick={() => onNavigate('projects')}
            className="w-full sm:w-auto bg-stone-900/90 hover:bg-stone-800 text-white font-bold text-base px-7 py-4 rounded-2xl border border-stone-700/80 hover:border-stone-600 flex items-center justify-center gap-3 transition-all backdrop-blur-md"
          >
            <span>{t.hero.projectsBtn}</span>
            <ArrowIcon className="w-4 h-4 text-stone-400 group-hover:text-white" />
          </button>

          {/* Tertiary Partner CTA */}
          <button
            onClick={() => onNavigate('partners')}
            className="w-full sm:w-auto bg-transparent hover:bg-stone-900/50 text-stone-300 hover:text-white font-bold text-sm px-5 py-4 rounded-2xl border border-stone-800 hover:border-stone-700 transition"
          >
            <span>{t.hero.partnerBtn}</span>
          </button>
        </div>

        {/* Live Sahel Focus Indicators & Trust Badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 w-full max-w-3xl pt-4 border-t border-stone-800/80">
          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 flex-shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div className="text-start">
              <div className="text-xs font-bold text-white">{t.hero.transparentBadge}</div>
              <div className="text-[11px] text-stone-400">تقارير مدققة وحوكمة معتمدة</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-amber-950/50 text-amber-400 border border-amber-900/50 flex-shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-start">
              <div className="text-xs font-bold text-white">{t.hero.countriesServed}</div>
              <div className="text-[11px] text-stone-400">مالي • بوركينا فاسو • النيجر</div>
            </div>
          </div>

          <div className="flex items-center gap-3 p-3.5 rounded-xl bg-stone-950/70 border border-stone-800/80 backdrop-blur-sm">
            <div className="p-2 rounded-lg bg-emerald-950/50 text-emerald-400 border border-emerald-900/50 flex-shrink-0">
              <Activity className="w-5 h-5" />
            </div>
            <div className="text-start">
              <div className="text-xs font-bold text-white">{t.hero.liveImpact}</div>
              <div className="text-[11px] text-stone-400">مياه • تعليم • صحة • إغاثة</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
