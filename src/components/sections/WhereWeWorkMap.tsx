import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { CountryCode } from '../../types/foundation';
import {
  Globe,
  MapPin,
  CheckCircle,
  Droplets,
  GraduationCap,
  HeartPulse,
  Flame,
  ArrowRight,
  ArrowLeft,
} from 'lucide-react';

interface WhereWeWorkMapProps {
  onSelectCountry?: (country: CountryCode) => void;
  onNavigateToProjects: (country?: CountryCode) => void;
}

export const WhereWeWorkMap: React.FC<WhereWeWorkMapProps> = ({
  onSelectCountry,
  onNavigateToProjects,
}) => {
  const { t, isRTL } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<CountryCode>('mali');
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const countries = [
    {
      id: 'mali' as CountryCode,
      name: t.whereWeWork.mali,
      capital: 'باماكو (Bamako)',
      desc: t.whereWeWork.maliDesc,
      flagCode: 'ML',
      activeProjectsCount: 14,
      completedProjectsCount: 28,
      populationServed: '35,000+',
      prioritySectors: [
        { name: t.whyWeWork.waterTitle, icon: Droplets, color: 'text-cyan-400' },
        { name: t.whyWeWork.educationTitle, icon: GraduationCap, color: 'text-amber-400' },
        { name: t.whyWeWork.healthTitle, icon: HeartPulse, color: 'text-rose-400' },
      ],
      regions: ['باماكو', 'تمبكتو', 'غاو', 'موبتي', 'سيغو', 'سيكاسو', 'كايس', 'كيدال'],
      coordinates: '17.5707° N, 3.9962° W',
    },
    {
      id: 'burkina' as CountryCode,
      name: t.whereWeWork.burkina,
      capital: 'واغادوغو (Ouagadougou)',
      desc: t.whereWeWork.burkinaDesc,
      flagCode: 'BF',
      activeProjectsCount: 8,
      completedProjectsCount: 12,
      populationServed: '18,000+',
      prioritySectors: [
        { name: t.whyWeWork.healthTitle, icon: HeartPulse, color: 'text-rose-400' },
        { name: t.whyWeWork.waterTitle, icon: Droplets, color: 'text-cyan-400' },
        { name: t.whyWeWork.reliefTitle, icon: Flame, color: 'text-orange-400' },
      ],
      regions: ['واغادوغو', 'دوري', 'بوبوديولاسو', 'كايس الساحل'],
      coordinates: '12.2383° N, 1.5616° W',
    },
    {
      id: 'niger' as CountryCode,
      name: t.whereWeWork.niger,
      capital: 'نيامي (Niamey)',
      desc: t.whereWeWork.nigerDesc,
      flagCode: 'NE',
      activeProjectsCount: 9,
      completedProjectsCount: 16,
      populationServed: '22,000+',
      prioritySectors: [
        { name: t.whyWeWork.waterTitle, icon: Droplets, color: 'text-cyan-400' },
        { name: t.whyWeWork.reliefTitle, icon: Flame, color: 'text-orange-400' },
        { name: t.whyWeWork.educationTitle, icon: GraduationCap, color: 'text-amber-400' },
      ],
      regions: ['نيامي', 'تيلابيري', 'مارادي', 'أغاديز'],
      coordinates: '17.6078° N, 8.0817° E',
    },
  ];

  const currentCountry = countries.find((c) => c.id === selectedCountry) || countries[0];

  const handleCountryClick = (id: CountryCode) => {
    setSelectedCountry(id);
    if (onSelectCountry) onSelectCountry(id);
  };

  return (
    <section id="where-we-work" className="py-20 bg-stone-900/50 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-800 text-stone-300 text-xs font-bold mb-3 border border-stone-700">
            <Globe className="w-3.5 h-3.5 text-red-500" />
            <span>نطاق العمل الجغرافي • منطقة الساحل الإفريقي</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            {t.whereWeWork.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.whereWeWork.subtitle}
          </p>
        </div>

        {/* 3 Country Selector Tabs */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-3xl mx-auto">
          {countries.map((country) => {
            const isSelected = selectedCountry === country.id;
            return (
              <button
                key={country.id}
                onClick={() => handleCountryClick(country.id)}
                className={`p-4 rounded-2xl border text-start transition-all flex items-center justify-between ${
                  isSelected
                    ? 'bg-red-950/40 border-red-600 shadow-xl shadow-red-950/40 text-white'
                    : 'bg-stone-950/70 border-stone-800 hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-stone-900 border border-stone-700 flex items-center justify-center font-bold text-xs font-mono text-red-400">
                    {country.flagCode}
                  </div>
                  <div>
                    <div className="font-bold text-sm">{country.name}</div>
                    <div className="text-[11px] text-stone-400">{country.capital}</div>
                  </div>
                </div>
                {isSelected && <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />}
              </button>
            );
          })}
        </div>

        {/* Interactive Map & Detail Bento Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-stone-950 rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-2xl">
          {/* Left / Top: Interactive SVG Map of the 3 Sahel Sister Nations */}
          <div className="lg:col-span-6 bg-stone-900/60 rounded-2xl border border-stone-800/80 p-4 sm:p-6 flex flex-col items-center justify-center relative min-h-[340px]">
            <div className="w-full text-center text-xs font-mono text-stone-400 mb-2">
              {t.whereWeWork.clickCountryHint}
            </div>

            {/* Stylized SVG Map of Sahel / West Africa focus */}
            <svg
              viewBox="0 0 600 400"
              className="w-full h-auto max-h-[300px] select-none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <linearGradient id="activeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#DC2626" />
                  <stop offset="100%" stopColor="#991B1B" />
                </linearGradient>
                <linearGradient id="inactiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#292524" />
                  <stop offset="100%" stopColor="#1C1917" />
                </linearGradient>
              </defs>

              {/* Background continental shadow */}
              <rect x="20" y="20" width="560" height="360" rx="16" fill="#0C0A09" stroke="#27272a" strokeWidth="1" strokeDasharray="3 3" />

              {/* MALI Shape */}
              <g
                onClick={() => handleCountryClick('mali')}
                className="cursor-pointer group"
              >
                <path
                  d="M100 120 L180 80 L280 100 L300 180 L250 240 L190 280 L140 240 L130 170 Z"
                  fill={selectedCountry === 'mali' ? 'url(#activeGradient)' : 'url(#inactiveGradient)'}
                  stroke={selectedCountry === 'mali' ? '#EF4444' : '#44403C'}
                  strokeWidth={selectedCountry === 'mali' ? '3' : '1.5'}
                  className="transition-all duration-300"
                />
                <circle cx="160" cy="220" r="5" fill="#F59E0B" />
                <text x="175" y="225" fill="#FFFFFF" fontSize="12" fontWeight="bold">باماكو (Bamako)</text>

                <circle cx="230" cy="140" r="4" fill="#60A5FA" />
                <text x="240" y="145" fill="#E2E8F0" fontSize="10">تمبكتو (Timbuktu)</text>

                <circle cx="270" cy="190" r="4" fill="#34D399" />
                <text x="278" y="195" fill="#E2E8F0" fontSize="10">غاو (Gao)</text>
              </g>

              {/* BURKINA FASO Shape */}
              <g
                onClick={() => handleCountryClick('burkina')}
                className="cursor-pointer group"
              >
                <path
                  d="M200 280 L280 250 L310 300 L260 340 L190 320 Z"
                  fill={selectedCountry === 'burkina' ? 'url(#activeGradient)' : 'url(#inactiveGradient)'}
                  stroke={selectedCountry === 'burkina' ? '#EF4444' : '#44403C'}
                  strokeWidth={selectedCountry === 'burkina' ? '3' : '1.5'}
                  className="transition-all duration-300"
                />
                <circle cx="250" cy="295" r="5" fill="#F59E0B" />
                <text x="235" y="315" fill="#FFFFFF" fontSize="11" fontWeight="bold">واغادوغو (Ouaga)</text>
              </g>

              {/* NIGER Shape */}
              <g
                onClick={() => handleCountryClick('niger')}
                className="cursor-pointer group"
              >
                <path
                  d="M310 180 L440 160 L500 220 L450 300 L350 320 L310 270 Z"
                  fill={selectedCountry === 'niger' ? 'url(#activeGradient)' : 'url(#inactiveGradient)'}
                  stroke={selectedCountry === 'niger' ? '#EF4444' : '#44403C'}
                  strokeWidth={selectedCountry === 'niger' ? '3' : '1.5'}
                  className="transition-all duration-300"
                />
                <circle cx="340" cy="290" r="5" fill="#F59E0B" />
                <text x="350" y="295" fill="#FFFFFF" fontSize="11" fontWeight="bold">نيامي (Niamey)</text>

                <circle cx="430" cy="220" r="4" fill="#34D399" />
                <text x="440" y="225" fill="#E2E8F0" fontSize="10">أغاديز (Agadez)</text>
              </g>

              {/* Niger River Flow Path in Blue */}
              <path
                d="M120 260 Q 180 200 230 150 T 300 220 T 350 320"
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.5"
                strokeDasharray="4 2"
                opacity="0.7"
              />
              <text x="140" y="180" fill="#38BDF8" fontSize="9" fontStyle="italic">نهر النيجر (Fleuve Niger)</text>
            </svg>
          </div>

          {/* Right / Bottom: Country Detailed Profile */}
          <div className="lg:col-span-6 space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-xs text-red-500 font-bold font-mono">COUNTRY DOSSIER</span>
                <h3 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                  {currentCountry.name}
                </h3>
              </div>
              <div className="text-end">
                <span className="text-xs text-stone-400 font-mono">الإحداثيات</span>
                <div className="text-xs font-bold text-stone-300 font-mono">{currentCountry.coordinates}</div>
              </div>
            </div>

            <p className="text-stone-300 text-sm leading-relaxed">
              {currentCountry.desc}
            </p>

            {/* Quick Metrics */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <div className="text-xs text-stone-400 font-bold">{t.whereWeWork.activeProjects}</div>
                <div className="text-xl font-black text-red-400 mt-1 font-mono">{currentCountry.activeProjectsCount}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <div className="text-xs text-stone-400 font-bold">{t.whereWeWork.completedProjects}</div>
                <div className="text-xl font-black text-emerald-400 mt-1 font-mono">{currentCountry.completedProjectsCount}</div>
              </div>
              <div className="p-3.5 rounded-xl bg-stone-900 border border-stone-800">
                <div className="text-xs text-stone-400 font-bold">المستفيدون</div>
                <div className="text-xl font-black text-amber-400 mt-1 font-mono">{currentCountry.populationServed}</div>
              </div>
            </div>

            {/* Priority Sectors */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-stone-400 uppercase tracking-wider">
                {t.whereWeWork.prioritySectors}
              </div>
              <div className="flex flex-wrap gap-2">
                {currentCountry.prioritySectors.map((sector, idx) => {
                  const SectorIcon = sector.icon;
                  return (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs font-bold text-stone-200"
                    >
                      <SectorIcon className={`w-3.5 h-3.5 ${sector.color}`} />
                      <span>{sector.name}</span>
                    </span>
                  );
                })}
              </div>
            </div>

            {/* CTA to view projects in this country */}
            <div className="pt-2">
              <button
                onClick={() => onNavigateToProjects(currentCountry.id)}
                className="w-full bg-red-600 hover:bg-red-500 text-white font-bold py-3.5 px-6 rounded-xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950/50 transition-all"
              >
                <span>{t.whereWeWork.viewProjects}</span>
                <ArrowIcon className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
