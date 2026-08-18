import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Crown,
  Shield,
  Heart,
  Globe2,
  Users,
  Target,
  Sparkles,
  Award,
  CheckCircle2,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="py-16 bg-stone-950 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-16">
        {/* Page Hero */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs font-bold">
            <Crown className="w-3.5 h-3.5" />
            <span>الإرث التاريخي والرسالة الإنسانية</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {t.about.title}
          </h1>
          <p className="text-stone-300 text-base leading-relaxed">
            {t.about.subtitle}
          </p>
        </div>

        {/* Historic Heritage & Songhai Legacy Card */}
        <div className="bg-gradient-to-br from-stone-900 via-stone-900 to-amber-950/20 rounded-3xl border border-stone-800 p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 text-xs font-bold border border-amber-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>إرث حضاري يمتد لأكثر من خمسة قرون</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
                {t.about.historyTitle}
              </h2>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                {t.about.historyText}
              </p>
            </div>

            <div className="lg:col-span-4 relative">
              <div className="relative rounded-2xl overflow-hidden border border-stone-700 shadow-2xl">
                <img
                  src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80"
                  alt="Humanitarian Impact in Mali"
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-transparent" />
                <div className="absolute bottom-3 start-4 end-4 text-xs text-stone-300 font-mono text-center bg-black/80 backdrop-blur-md p-2 rounded-xl border border-stone-700">
                  مبادرات بناء الإنسان والتنمية المجتمعية في مالي والساحل
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-950/60 border border-emerald-800 flex items-center justify-center text-emerald-400">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white">{t.about.visionTitle}</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              {t.about.visionText}
            </p>
          </div>

          <div className="p-8 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-950/60 border border-amber-800 flex items-center justify-center text-amber-500">
              <Globe2 className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-black text-white">{t.about.missionTitle}</h3>
            <p className="text-stone-300 text-sm leading-relaxed">
              {t.about.missionText}
            </p>
          </div>
        </div>

        {/* Core Humanitarian Values */}
        <div className="space-y-6">
          <h3 className="text-2xl font-black text-white text-center">
            {t.about.valuesTitle}
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-2">
              <div className="text-emerald-400 font-bold text-lg font-mono">01. الكرامة الإنسانية</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                تقديم العون دون تمييز أو منّ، وصيانة عزة الإنسان في أصعب الظروف.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-2">
              <div className="text-amber-500 font-bold text-lg font-mono">02. الشفافية التامة</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                مساءلة مالية صارمة، ونشر تقارير التدقيق الميداني والمحاسبي دورياً.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-2">
              <div className="text-emerald-500 font-bold text-lg font-mono">03. الاستدامة والأثر</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                مشاريع تكسر دائرة الفقر وتعتمد على الطاقة الشمسية والحلول طويلة الأمد.
              </p>
            </div>
            <div className="p-6 rounded-2xl bg-stone-900/40 border border-stone-800 space-y-2">
              <div className="text-blue-500 font-bold text-lg font-mono">04. الشراكة المحلية</div>
              <p className="text-xs text-stone-400 leading-relaxed">
                العمل جنباً إلى جنب مع المجتمعات المحلية وقادتها لضمان ملكية المبادرات.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
