import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ImpactStats } from '../../types/foundation';
import {
  Users,
  Briefcase,
  Globe2,
  HeartHandshake,
  Droplets,
  GraduationCap,
  HeartPulse,
  Utensils,
  CheckCircle2,
} from 'lucide-react';

interface ImpactStatsSectionProps {
  stats: ImpactStats;
}

export const ImpactStatsSection: React.FC<ImpactStatsSectionProps> = ({ stats }) => {
  const { t } = useLanguage();

  const statCards = [
    {
      id: 'beneficiaries',
      icon: Users,
      value: stats.beneficiariesCount.toLocaleString(),
      label: t.impactStats.beneficiaries,
      color: 'text-red-500',
      bg: 'bg-red-950/30 border-red-900/40',
      badge: '+0 معتمد',
    },
    {
      id: 'projects',
      icon: Briefcase,
      value: stats.projectsCount.toLocaleString(),
      label: t.impactStats.projects,
      color: 'text-amber-500',
      bg: 'bg-amber-950/30 border-amber-900/40',
      badge: 'ميداني',
    },
    {
      id: 'countries',
      icon: Globe2,
      value: stats.countriesCount.toLocaleString(),
      label: t.impactStats.countries,
      color: 'text-emerald-500',
      bg: 'bg-emerald-950/30 border-emerald-900/40',
      badge: 'الساحل',
    },
    {
      id: 'volunteers',
      icon: HeartHandshake,
      value: stats.volunteersCount.toLocaleString(),
      label: t.impactStats.volunteers,
      color: 'text-blue-500',
      bg: 'bg-blue-950/30 border-blue-900/40',
      badge: 'متطوع',
    },
    {
      id: 'wells',
      icon: Droplets,
      value: stats.waterWellsCount.toLocaleString(),
      label: t.impactStats.waterWells,
      color: 'text-cyan-500',
      bg: 'bg-cyan-950/30 border-cyan-900/40',
      badge: 'مياه نظيفة',
    },
    {
      id: 'schools',
      icon: GraduationCap,
      value: stats.schoolsSupported.toLocaleString(),
      label: t.impactStats.schools,
      color: 'text-yellow-500',
      bg: 'bg-yellow-950/30 border-yellow-900/40',
      badge: 'تعليم',
    },
    {
      id: 'clinics',
      icon: HeartPulse,
      value: stats.healthClinicsSupported.toLocaleString(),
      label: t.impactStats.clinics,
      color: 'text-rose-500',
      bg: 'bg-rose-950/30 border-rose-900/40',
      badge: 'رعاية صحية',
    },
    {
      id: 'meals',
      icon: Utensils,
      value: stats.mealsDistributed.toLocaleString(),
      label: t.impactStats.meals,
      color: 'text-orange-500',
      bg: 'bg-orange-950/30 border-orange-900/40',
      badge: 'إغاثة',
    },
  ];

  return (
    <section className="py-16 bg-stone-950 border-y border-stone-800/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 pb-4 border-b border-stone-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-950/50 border border-red-800 text-red-400 text-xs font-bold mb-2">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>بيانات موثقة ميدانياً</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              {t.impactStats.title}
            </h2>
          </div>
          <p className="text-xs sm:text-sm text-stone-400 max-w-lg leading-relaxed">
            {t.impactStats.subtitle}
          </p>
        </div>

        {/* 8 Stats Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3 sm:gap-4">
          {statCards.map((card) => {
            const Icon = card.icon;
            return (
              <div
                key={card.id}
                className={`p-4 rounded-2xl bg-stone-900/90 border border-stone-800 hover:border-stone-700 transition-all flex flex-col items-center text-center group hover:bg-stone-850 shadow-lg`}
              >
                <div className={`p-2.5 rounded-xl ${card.bg} ${card.color} mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-1 font-mono">
                  {card.value}
                </div>
                <div className="text-[11px] font-bold text-stone-400 leading-tight">
                  {card.label}
                </div>
              </div>
            );
          })}
        </div>

        {/* Audit Disclaimer Note */}
        <div className="mt-6 text-center text-stone-400 text-xs font-mono">
          {t.impactStats.note}
        </div>
      </div>
    </section>
  );
};
