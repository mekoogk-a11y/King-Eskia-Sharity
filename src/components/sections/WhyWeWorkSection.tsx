import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  GraduationCap,
  HeartPulse,
  Droplets,
  HeartHandshake,
  Users,
  ShieldCheck,
  Sparkles,
  Layers,
} from 'lucide-react';

export const WhyWeWorkSection: React.FC = () => {
  const { t } = useLanguage();

  const pillars = [
    {
      id: 'water',
      title: t.whyWeWork.waterTitle,
      desc: t.whyWeWork.waterDesc,
      icon: Droplets,
      color: 'text-cyan-400',
      border: 'hover:border-cyan-500/50',
      accentBg: 'bg-cyan-950/30 text-cyan-400 border-cyan-800/40',
      stats: '100% طاقة شمسية',
    },
    {
      id: 'education',
      title: t.whyWeWork.educationTitle,
      desc: t.whyWeWork.educationDesc,
      icon: GraduationCap,
      color: 'text-amber-400',
      border: 'hover:border-amber-500/50',
      accentBg: 'bg-amber-950/30 text-amber-400 border-amber-800/40',
      stats: 'فصول وبيئة نموذجية',
    },
    {
      id: 'health',
      title: t.whyWeWork.healthTitle,
      desc: t.whyWeWork.healthDesc,
      icon: HeartPulse,
      color: 'text-rose-400',
      border: 'hover:border-rose-500/50',
      accentBg: 'bg-rose-950/30 text-rose-400 border-rose-800/40',
      stats: 'رعاية أمومة وأدوية',
    },
    {
      id: 'relief',
      title: t.whyWeWork.reliefTitle,
      desc: t.whyWeWork.reliefDesc,
      icon: HeartHandshake,
      color: 'text-emerald-400',
      border: 'hover:border-emerald-500/50',
      accentBg: 'bg-emerald-950/30 text-emerald-400 border-emerald-800/40',
      stats: 'أمن غذائي وتمكين',
    },
    {
      id: 'community',
      title: t.whyWeWork.communityTitle,
      desc: t.whyWeWork.communityDesc,
      icon: Users,
      color: 'text-purple-400',
      border: 'hover:border-purple-500/50',
      accentBg: 'bg-purple-950/30 text-purple-400 border-purple-800/40',
      stats: 'استدامة وتدريب',
    },
  ];

  return (
    <section className="py-20 bg-stone-950 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-red-400 text-xs font-bold mb-3">
            <Layers className="w-3.5 h-3.5" />
            <span>محاور العمل الاستراتيجي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            {t.whyWeWork.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.whyWeWork.subtitle}
          </p>
        </div>

        {/* 5 Pillars Bento Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {pillars.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.id}
                className={`p-7 rounded-3xl bg-stone-900/60 border border-stone-800/80 ${pillar.border} transition-all duration-300 flex flex-col justify-between group shadow-xl hover:-translate-y-1`}
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className={`p-3.5 rounded-2xl ${pillar.accentBg} border group-hover:scale-110 transition-transform`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-full bg-stone-950 text-stone-400 border border-stone-800">
                      {pillar.stats}
                    </span>
                  </div>

                  <h3 className="text-xl font-black text-white mb-3 group-hover:text-red-400 transition-colors">
                    {pillar.title}
                  </h3>
                  <p className="text-stone-300 text-xs sm:text-sm leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-stone-800/60 flex items-center gap-2 text-xs font-bold text-stone-400 group-hover:text-stone-200">
                  <ShieldCheck className="w-4 h-4 text-red-500" />
                  <span>معايير جودة واستدامة موثقة</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
