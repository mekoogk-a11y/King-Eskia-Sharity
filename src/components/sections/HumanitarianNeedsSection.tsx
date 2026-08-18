import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Heart,
  Droplets,
  GraduationCap,
  HeartPulse,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface HumanitarianNeedsSectionProps {
  onOpenDonate: (cause?: string) => void;
}

export const HumanitarianNeedsSection: React.FC<HumanitarianNeedsSectionProps> = ({
  onOpenDonate,
}) => {
  const { t, isRTL } = useLanguage();
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const needs = [
    {
      id: 'water',
      title: 'سقيا الماء النظيف',
      desc: t.humanitarianNeeds.waterCardDesc,
      icon: Droplets,
      image: 'https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&w=800&q=80',
      urgentTag: 'أولوية قصوى',
      color: 'from-cyan-600 to-blue-700',
    },
    {
      id: 'education',
      title: 'التعليم وبناء المدارس',
      desc: t.humanitarianNeeds.educationCardDesc,
      icon: GraduationCap,
      image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?auto=format&fit=crop&w=800&q=80',
      urgentTag: 'فرص تعليم',
      color: 'from-amber-600 to-yellow-700',
    },
    {
      id: 'health',
      title: 'الصحة ورعاية الأمهات والأطفال',
      desc: t.humanitarianNeeds.healthCardDesc,
      icon: HeartPulse,
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
      urgentTag: 'إنقاذ حياة',
      color: 'from-emerald-600 to-teal-700',
    },
    {
      id: 'relief',
      title: 'السلال الغذائية والإغاثة العاجلة',
      desc: t.humanitarianNeeds.reliefCardDesc,
      icon: ShoppingBag,
      image: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?auto=format&fit=crop&w=800&q=80',
      urgentTag: 'أمن غذائي',
      color: 'from-emerald-600 to-teal-700',
    },
  ];

  return (
    <section className="py-20 bg-black border-b border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs font-bold mb-3">
            <Heart className="w-3.5 h-3.5 fill-current" />
            <span>دعوة إنسانية عاجلة</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            {t.humanitarianNeeds.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.humanitarianNeeds.subtitle}
          </p>
        </div>

        {/* 4 Needs Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {needs.map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.id}
                className="group relative rounded-3xl overflow-hidden bg-stone-950 border border-stone-800 hover:border-emerald-700/60 transition-all duration-300 flex flex-col justify-between shadow-2xl hover:-translate-y-1"
              >
                {/* Visual Header */}
                <div className="relative h-44 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-transparent" />

                  <div className="absolute top-3 end-3">
                    <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-black uppercase tracking-wider shadow">
                      {item.urgentTag}
                    </span>
                  </div>

                  <div className="absolute bottom-3 start-4 flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-black/80 backdrop-blur-md text-white border border-stone-700">
                      <Icon className="w-4 h-4 text-emerald-400" />
                    </div>
                    <span className="text-sm font-black text-white">{item.title}</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <p className="text-stone-300 text-xs leading-relaxed">
                    {item.desc}
                  </p>

                  <button
                    onClick={() => onOpenDonate(item.id)}
                    className="w-full bg-stone-900 hover:bg-emerald-600 text-stone-200 hover:text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 border border-stone-800 hover:border-emerald-500 transition-all shadow"
                  >
                    <span>{t.humanitarianNeeds.contributeNow}</span>
                    <ArrowIcon className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
