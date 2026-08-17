import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Campaign, Sector } from '../../types/foundation';
import {
  Flame,
  Heart,
  Users,
  MapPin,
  Clock,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
} from 'lucide-react';

interface CampaignsSectionProps {
  campaigns: Campaign[];
  onOpenDonate: (campaignId?: string) => void;
}

export const CampaignsSection: React.FC<CampaignsSectionProps> = ({
  campaigns,
  onOpenDonate,
}) => {
  const { language, t, isRTL } = useLanguage();
  const [selectedFilter, setSelectedFilter] = useState<'all' | Sector>('all');
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const filteredCampaigns = campaigns.filter((c) => {
    if (selectedFilter === 'all') return true;
    return c.sector === selectedFilter;
  });

  return (
    <section id="campaigns" className="py-20 bg-stone-950 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold mb-3">
              <Flame className="w-3.5 h-3.5 animate-bounce" />
              <span>مبادرات عاجلة ذات أولوية</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t.campaigns.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-stone-400 max-w-lg leading-relaxed">
            {t.campaigns.subtitle}
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          <button
            onClick={() => setSelectedFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedFilter === 'all'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {t.campaigns.filterAll} ({campaigns.length})
          </button>
          <button
            onClick={() => setSelectedFilter('water')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedFilter === 'water'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {t.whyWeWork.waterTitle}
          </button>
          <button
            onClick={() => setSelectedFilter('education')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedFilter === 'education'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {t.whyWeWork.educationTitle}
          </button>
          <button
            onClick={() => setSelectedFilter('health')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedFilter === 'health'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {t.whyWeWork.healthTitle}
          </button>
          <button
            onClick={() => setSelectedFilter('relief')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition ${
              selectedFilter === 'relief'
                ? 'bg-red-600 text-white shadow-lg'
                : 'bg-stone-900 text-stone-400 hover:text-stone-200 border border-stone-800'
            }`}
          >
            {t.whyWeWork.reliefTitle}
          </button>
        </div>

        {/* Campaigns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCampaigns.map((camp) => {
            const title = camp.title[language] || camp.title.ar;
            const desc = camp.description[language] || camp.description.ar;
            const percentage = Math.min(Math.round((camp.raisedAmount / camp.targetAmount) * 100), 100);

            return (
              <div
                key={camp.id}
                className="group bg-stone-900/80 rounded-3xl border border-stone-800 hover:border-stone-700 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-2xl hover:-translate-y-1"
              >
                {/* Image & Badges */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={camp.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/40" />

                  {camp.urgent && (
                    <div className="absolute top-3 start-3">
                      <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-black uppercase tracking-wider flex items-center gap-1 shadow-lg">
                        <Flame className="w-3 h-3 fill-current" />
                        <span>{t.campaigns.urgentTag}</span>
                      </span>
                    </div>
                  )}

                  <div className="absolute bottom-3 start-3 flex items-center gap-1.5 text-xs text-stone-300 bg-black/80 backdrop-blur-sm px-2.5 py-1 rounded-full border border-stone-800 font-mono">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>{camp.city || 'الساحل الإفريقي'}</span>
                  </div>
                </div>

                {/* Body Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-base font-black text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-stone-400 text-xs leading-relaxed mt-2 line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  {/* Funding Progress Bar */}
                  <div className="space-y-2 pt-2 border-t border-stone-800">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-emerald-400 font-bold">
                        ${camp.raisedAmount.toLocaleString()}
                      </span>
                      <span className="text-stone-400">
                        {t.campaigns.goal}: ${camp.targetAmount.toLocaleString()}
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full bg-stone-800 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-red-600 via-rose-500 to-amber-500 rounded-full transition-all duration-1000"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-stone-400">
                      <span className="flex items-center gap-1 font-mono">
                        <Users className="w-3 h-3 text-stone-400" />
                        <span>{camp.donorsCount} {t.campaigns.donors}</span>
                      </span>
                      <span className="font-bold text-stone-300 font-mono">{percentage}%</span>
                    </div>
                  </div>

                  {/* Donate CTA Button */}
                  <button
                    onClick={() => onOpenDonate(camp.id)}
                    className="w-full bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-red-950/40 transition-all border border-red-500/30"
                  >
                    <Heart className="w-3.5 h-3.5 fill-current" />
                    <span>{t.campaigns.donateToCampaign}</span>
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
