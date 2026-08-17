import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { MaliRegion } from '../../types/foundation';
import {
  Landmark,
  MapPin,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  X,
  Compass,
} from 'lucide-react';

interface HeartOfMaliSectionProps {
  regions: MaliRegion[];
  onOpenDonate: () => void;
}

export const HeartOfMaliSection: React.FC<HeartOfMaliSectionProps> = ({
  regions,
  onOpenDonate,
}) => {
  const { language, t, isRTL } = useLanguage();
  const [activeRegionModal, setActiveRegionModal] = useState<MaliRegion | null>(null);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  return (
    <section id="heart-of-mali" className="py-20 bg-black relative overflow-hidden">
      {/* Subtle background ornamentation */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-red-950/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 pb-4 border-b border-stone-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold mb-3">
              <Landmark className="w-3.5 h-3.5" />
              <span>أقاليم ومدن مالي التاريخية</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t.heartOfMali.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-stone-400 max-w-lg leading-relaxed">
            {t.heartOfMali.subtitle}
          </p>
        </div>

        {/* 8 Regions Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {regions.map((region) => {
            const name = region.name[language] || region.name.ar;
            const desc = region.description[language] || region.description.ar;
            const history = region.historicalContext[language] || region.historicalContext.ar;

            return (
              <div
                key={region.id}
                className="group bg-stone-950 rounded-2xl border border-stone-800 hover:border-red-600/60 transition-all duration-300 overflow-hidden flex flex-col shadow-xl hover:-translate-y-1"
              >
                {/* Image & Overlay */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={region.image}
                    alt={name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />

                  <div className="absolute top-3 start-3">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-stone-700 text-[11px] font-bold text-amber-400">
                      <MapPin className="w-3 h-3 text-red-500" />
                      <span>{region.activeInitiativesCount} {t.heartOfMali.initiatives}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors">
                      {name}
                    </h3>
                    <p className="text-stone-400 text-xs leading-relaxed mt-2 line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-2 border-t border-stone-800/80 flex items-center justify-between">
                    <button
                      onClick={() => setActiveRegionModal(region)}
                      className="text-xs font-bold text-red-400 hover:text-red-300 flex items-center gap-1 transition"
                    >
                      <span>{t.heartOfMali.discoverRegion}</span>
                      <ArrowIcon className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-[10px] text-stone-400 font-mono">
                      {region.coordinates[0].toFixed(2)}°, {region.coordinates[1].toFixed(2)}°
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Geographic Disclaimer */}
        <div className="mt-8 text-center text-xs text-stone-400 font-mono">
          {t.heartOfMali.disclaimer}
        </div>
      </div>

      {/* Region Detailed Modal */}
      {activeRegionModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl animate-scaleUp">
            <div className="relative h-64">
              <img
                src={activeRegionModal.image}
                alt={activeRegionModal.name[language] || activeRegionModal.name.ar}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <button
                onClick={() => setActiveRegionModal(null)}
                className="absolute top-4 end-4 p-2 rounded-full bg-black/80 text-stone-300 hover:text-white border border-stone-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 start-6">
                <span className="text-xs text-red-500 font-bold font-mono uppercase">MALI REGIONAL HERITAGE</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {activeRegionModal.name[language] || activeRegionModal.name.ar}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  الواقع التنموي والاحتياج الميداني
                </h4>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {activeRegionModal.description[language] || activeRegionModal.description.ar}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-stone-900 border border-stone-800">
                <div className="flex items-center gap-2 text-xs font-bold text-amber-400 mb-1">
                  <Sparkles className="w-4 h-4" />
                  <span>السياق التاريخي والحضاري للمنطقة</span>
                </div>
                <p className="text-xs text-stone-400 leading-relaxed">
                  {activeRegionModal.historicalContext[language] || activeRegionModal.historicalContext.ar}
                </p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                <button
                  onClick={() => setActiveRegionModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-stone-300 hover:bg-stone-800 text-xs font-bold"
                >
                  {t.projects.closeModal}
                </button>

                <button
                  onClick={() => {
                    setActiveRegionModal(null);
                    onOpenDonate();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-950/60"
                >
                  {t.donation.modalTitle}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
