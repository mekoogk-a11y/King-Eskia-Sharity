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
  Compass,
  Sparkles,
  ShieldCheck,
  Building2,
  Phone,
  MessageCircle,
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
  const [activeRegionFilter, setActiveRegionFilter] = useState<'all' | 'sahel' | 'west' | 'east'>('sahel');
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const countries = [
    {
      id: 'mali' as CountryCode,
      name: t.whereWeWork.mali,
      capital: 'باماكو (Bamako)',
      desc: 'المركز التاريخي والتشغيلي الرئيسي لمؤسسة الملك اسكيا، حيث تتركز مشاريع حفر الآبار الارتوازية بالطاقة الشمسية، بناء الفصول الدراسية النموذجية في غاو وتمبكتو، ودعم المراكز الصحية الريفية.',
      flagCode: 'ML',
      flagColors: ['#10B981', '#F59E0B', '#EF4444'],
      regionTag: 'حزام الساحل • المركز الرئيسي',
      activeProjectsCount: 14,
      completedProjectsCount: 28,
      populationServed: '45,000+',
      prioritySectors: [
        { name: t.whyWeWork.waterTitle, icon: Droplets, color: 'text-cyan-400' },
        { name: t.whyWeWork.educationTitle, icon: GraduationCap, color: 'text-amber-400' },
        { name: t.whyWeWork.healthTitle, icon: HeartPulse, color: 'text-emerald-400' },
      ],
      regions: ['باماكو', 'تمبكتو', 'غاو', 'موبتي', 'سيغو', 'سيكاسو', 'كايس', 'كيدال'],
      coordinates: '17.5707° N, 3.9962° W',
    },
    {
      id: 'burkina' as CountryCode,
      name: t.whereWeWork.burkina,
      capital: 'واغادوغو (Ouagadougou)',
      desc: 'مشاريع رائدة في رعاية الأمومة والطفولة في إقليم الساحل (دوري) وتأمين شبكات المياه النظيفة والتدريب المهني الزراعي للأسر المتعففة.',
      flagCode: 'BF',
      flagColors: ['#EF4444', '#10B981', '#F59E0B'],
      regionTag: 'حزام الساحل • غرب إفريقيا',
      activeProjectsCount: 8,
      completedProjectsCount: 12,
      populationServed: '18,000+',
      prioritySectors: [
        { name: t.whyWeWork.healthTitle, icon: HeartPulse, color: 'text-emerald-400' },
        { name: t.whyWeWork.waterTitle, icon: Droplets, color: 'text-cyan-400' },
        { name: t.whyWeWork.reliefTitle, icon: Flame, color: 'text-amber-400' },
      ],
      regions: ['واغادوغو', 'دوري', 'بوبوديولاسو', 'كايس الساحل'],
      coordinates: '12.2383° N, 1.5616° W',
    },
    {
      id: 'niger' as CountryCode,
      name: t.whereWeWork.niger,
      capital: 'نيامي (Niamey)',
      desc: 'محطات مياه شمسية عميقة لمواجهة التصحر في تيلابيري وأغاديز، وقوافل إغاثية لتوزيع السلال الغذائية الأساسية ورعاية التجمعات الرعوية.',
      flagCode: 'NE',
      flagColors: ['#F97316', '#FFFFFF', '#10B981'],
      regionTag: 'حزام الساحل • وسط الصحراء',
      activeProjectsCount: 9,
      completedProjectsCount: 16,
      populationServed: '22,000+',
      prioritySectors: [
        { name: t.whyWeWork.waterTitle, icon: Droplets, color: 'text-cyan-400' },
        { name: t.whyWeWork.reliefTitle, icon: Flame, color: 'text-amber-400' },
        { name: t.whyWeWork.educationTitle, icon: GraduationCap, color: 'text-teal-400' },
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
    <section id="where-we-work" className="py-20 bg-stone-900/40 border-b border-stone-800 relative overflow-hidden">
      {/* Soft background aura */}
      <div className="absolute top-1/3 end-0 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/60 text-emerald-400 text-xs font-bold mb-3 border border-emerald-800/80 shadow-sm">
            <Globe className="w-3.5 h-3.5" />
            <span>خريطة القارة الإفريقية ونطاق العمل الإنساني</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            {t.whereWeWork.title}
          </h2>
          <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
            {t.whereWeWork.subtitle}
          </p>
        </div>

        {/* Africa Region Quick Filter */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          <button
            onClick={() => setActiveRegionFilter('sahel')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeRegionFilter === 'sahel'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 border border-emerald-500'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            🌿 دول حزام الساحل الإفريقي (التركيز الميداني)
          </button>
          <button
            onClick={() => setActiveRegionFilter('all')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeRegionFilter === 'all'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 border border-emerald-500'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            🌍 القارة الإفريقية كاملة (Africa Overview)
          </button>
          <button
            onClick={() => setActiveRegionFilter('west')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
              activeRegionFilter === 'west'
                ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-950/50 border border-emerald-500'
                : 'bg-stone-900/80 text-stone-300 hover:text-white border border-stone-800'
            }`}
          >
            📍 غرب إفريقيا ونهر النيجر
          </button>
        </div>

        {/* 3 Core Focus Countries Quick Selectors */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 max-w-4xl mx-auto">
          {countries.map((country) => {
            const isSelected = selectedCountry === country.id;
            return (
              <button
                key={country.id}
                onClick={() => handleCountryClick(country.id)}
                className={`p-4 rounded-2xl border text-start transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-emerald-950/50 border-emerald-500 shadow-xl shadow-emerald-950/40 text-white'
                    : 'bg-stone-950/80 border-stone-800 hover:border-stone-700 text-stone-300'
                }`}
              >
                <div className="flex items-center gap-3">
                  {/* Flag Capsule */}
                  <div className="w-10 h-7 rounded-lg border border-stone-700 overflow-hidden flex shadow-inner flex-shrink-0">
                    {country.flagColors.map((c, i) => (
                      <span key={i} className="flex-1 h-full" style={{ backgroundColor: c }} />
                    ))}
                  </div>
                  <div>
                    <div className="font-bold text-sm text-white group-hover:text-emerald-300 transition">
                      {country.name}
                    </div>
                    <div className="text-[11px] text-stone-400">{country.capital}</div>
                  </div>
                </div>
                {isSelected && (
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 ring-4 ring-emerald-500/20 animate-pulse" />
                )}
              </button>
            );
          })}
        </div>

        {/* Main Grid: Africa Vector Map & Deep Country Dossier */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch bg-stone-950 rounded-3xl border border-stone-800 p-6 sm:p-8 shadow-2xl">
          {/* Left / Top: Interactive Full African Continent Vector Map */}
          <div className="lg:col-span-7 bg-stone-900/60 rounded-2xl border border-stone-800/90 p-4 sm:p-6 flex flex-col justify-between relative overflow-hidden">
            {/* Map Top Bar */}
            <div className="flex items-center justify-between mb-3 text-xs font-mono">
              <span className="text-emerald-400 font-bold flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-emerald-400" />
                <span>AFRICA CONTINENTAL HUMANITARIAN MAP</span>
              </span>
              <span className="text-stone-400 hidden sm:inline">انقر على الدولة لاستعراض المشاريع</span>
            </div>

            {/* Rich African Continent Vector SVG */}
            <div className="relative w-full aspect-[4/3] max-h-[420px] flex items-center justify-center my-auto">
              <svg
                viewBox="0 0 800 700"
                className="w-full h-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Active Country Emerald Gradient */}
                  <linearGradient id="africaActiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#059669" />
                    <stop offset="100%" stopColor="#047857" />
                  </linearGradient>
                  {/* Inactive Country Stone Gradient */}
                  <linearGradient id="africaInactiveGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#292524" />
                    <stop offset="100%" stopColor="#1C1917" />
                  </linearGradient>
                  {/* Sahel Belt Glowing Gradient */}
                  <linearGradient id="sahelBeltGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                    <stop offset="50%" stopColor="#F59E0B" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#10B981" stopOpacity="0.3" />
                  </linearGradient>
                </defs>

                {/* Ocean / Grid Canvas */}
                <rect width="800" height="700" rx="16" fill="#0C0A09" />
                <path
                  d="M50 150 H750 M50 300 H750 M50 450 H750 M50 600 H750 M200 50 V650 M400 50 V650 M600 50 V650"
                  stroke="#1c1917"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />

                {/* --- Continental Africa Base Silhouette Outlines --- */}
                {/* North Africa (Morocco, Algeria, Tunisia, Libya, Egypt) */}
                <path
                  d="M170 120 L240 80 L350 80 L440 90 L520 100 L560 140 L540 180 L450 190 L340 190 L240 180 L180 160 Z"
                  fill="#1c1917"
                  stroke="#3f3f46"
                  strokeWidth="1.2"
                />
                <text x="350" y="140" fill="#71717a" fontSize="12" fontWeight="bold">شمال إفريقيا (North Africa)</text>

                {/* Central & Southern Africa Outline */}
                <path
                  d="M260 380 L340 370 L430 380 L480 430 L500 500 L460 580 L400 640 L350 660 L330 620 L300 520 L270 440 Z"
                  fill="#18181b"
                  stroke="#3f3f46"
                  strokeWidth="1.2"
                />
                <text x="350" y="520" fill="#52525b" fontSize="11">وسط وجنوب إفريقيا</text>

                {/* Horn of Africa & East Africa (Sudan, Ethiopia, Kenya) */}
                <g
                  className="cursor-pointer group"
                  onClick={() => handleCountryClick('mali')}
                >
                  <path
                    d="M450 190 L540 180 L620 250 L590 340 L520 370 L450 340 L430 260 Z"
                    fill="#27272a"
                    stroke="#52525b"
                    strokeWidth="1.2"
                    className="hover:fill-stone-800 transition"
                  />
                  {/* Sudan Hub */}
                  <circle cx="510" cy="240" r="4.5" fill="#34D399" />
                  <text x="520" y="245" fill="#A7F3D0" fontSize="10" fontWeight="bold">
                    السودان 🇸🇩 (شعبة الإعلام)
                  </text>
                </g>

                {/* Sahel Belt Highlight Corridor */}
                <path
                  d="M120 240 Q 350 200 600 250 L590 320 Q 350 280 120 310 Z"
                  fill="url(#sahelBeltGradient)"
                  stroke="#10B981"
                  strokeWidth="1.5"
                  strokeDasharray="6 3"
                />
                <text x="300" y="235" fill="#FCD34D" fontSize="11" fontWeight="bold" letterSpacing="1">
                  حزام الساحل الإفريقي • SAHEL HUMANITARIAN BELT
                </text>

                {/* Senegal & Atlantic Coast */}
                <path
                  d="M120 250 L170 230 L180 280 L140 310 L110 280 Z"
                  fill="#27272a"
                  stroke="#44403c"
                  strokeWidth="1"
                />
                <text x="90" y="265" fill="#a1a1aa" fontSize="9">السنغال (SN)</text>

                {/* --- CORE FOCAL NATIONS --- */}

                {/* MALI (Center Heartland of Songhai & Askia Foundation) */}
                <g
                  onClick={() => handleCountryClick('mali')}
                  className="cursor-pointer group transition-all duration-300"
                >
                  <path
                    d="M160 210 L250 170 L340 180 L360 250 L310 320 L240 350 L190 310 L170 240 Z"
                    fill={selectedCountry === 'mali' ? 'url(#africaActiveGradient)' : 'url(#africaInactiveGradient)'}
                    stroke={selectedCountry === 'mali' ? '#34D399' : '#52525b'}
                    strokeWidth={selectedCountry === 'mali' ? '3' : '1.5'}
                    className="filter group-hover:brightness-125 transition-all duration-300"
                  />
                  {/* Capital Bamako */}
                  <circle cx="210" cy="300" r="5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1.5" />
                  <text x="220" y="305" fill="#FFFFFF" fontSize="12" fontWeight="bold">
                    🇲🇱 مالي: باماكو
                  </text>

                  {/* Timbuktu */}
                  <circle cx="270" cy="220" r="4" fill="#38BDF8" />
                  <text x="280" y="225" fill="#E2E8F0" fontSize="10">تمبكتو (Timbuktu)</text>

                  {/* Gao */}
                  <circle cx="320" cy="250" r="4.5" fill="#34D399" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="328" y="255" fill="#FDE68A" fontSize="10" fontWeight="bold">غاو (Gao)</text>
                </g>

                {/* BURKINA FASO */}
                <g
                  onClick={() => handleCountryClick('burkina')}
                  className="cursor-pointer group transition-all duration-300"
                >
                  <path
                    d="M245 350 L315 325 L345 370 L300 410 L235 390 Z"
                    fill={selectedCountry === 'burkina' ? 'url(#africaActiveGradient)' : 'url(#africaInactiveGradient)'}
                    stroke={selectedCountry === 'burkina' ? '#34D399' : '#52525b'}
                    strokeWidth={selectedCountry === 'burkina' ? '3' : '1.5'}
                    className="filter group-hover:brightness-125 transition-all duration-300"
                  />
                  <circle cx="285" cy="365" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="270" y="385" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                    🇧🇫 بوركينا فاسو
                  </text>
                </g>

                {/* NIGER */}
                <g
                  onClick={() => handleCountryClick('niger')}
                  className="cursor-pointer group transition-all duration-300"
                >
                  <path
                    d="M360 245 L460 215 L510 270 L470 340 L380 360 L345 310 Z"
                    fill={selectedCountry === 'niger' ? 'url(#africaActiveGradient)' : 'url(#africaInactiveGradient)'}
                    stroke={selectedCountry === 'niger' ? '#34D399' : '#52525b'}
                    strokeWidth={selectedCountry === 'niger' ? '3' : '1.5'}
                    className="filter group-hover:brightness-125 transition-all duration-300"
                  />
                  {/* Niamey */}
                  <circle cx="375" cy="335" r="4.5" fill="#F59E0B" stroke="#FFFFFF" strokeWidth="1" />
                  <text x="385" y="340" fill="#FFFFFF" fontSize="11" fontWeight="bold">
                    🇳🇪 النيجر: نيامي
                  </text>

                  {/* Agadez */}
                  <circle cx="440" cy="260" r="3.5" fill="#38BDF8" />
                  <text x="448" y="265" fill="#E2E8F0" fontSize="9">أغاديز (Agadez)</text>
                </g>

                {/* Chad */}
                <path
                  d="M510 270 L580 250 L600 340 L540 390 L480 360 Z"
                  fill="#22201e"
                  stroke="#44403c"
                  strokeWidth="1"
                />
                <text x="535" y="310" fill="#a1a1aa" fontSize="10">تشاد (Chad)</text>

                {/* Nigeria & Gulf of Guinea */}
                <path
                  d="M340 375 L430 365 L440 430 L350 440 L310 405 Z"
                  fill="#22201e"
                  stroke="#44403c"
                  strokeWidth="1"
                />
                <text x="360" y="410" fill="#a1a1aa" fontSize="10">نيجيريا (NG)</text>

                {/* Niger River Flow Path in Blue */}
                <path
                  d="M170 300 Q 230 250 270 210 T 330 260 T 375 340 T 400 430"
                  fill="none"
                  stroke="#0284C7"
                  strokeWidth="3"
                  strokeDasharray="4 2"
                  opacity="0.85"
                />
                <text x="180" y="235" fill="#38BDF8" fontSize="9" fontStyle="italic" fontWeight="bold">
                  مسار نهر النيجر (Fleuve Niger) 💧
                </text>
              </svg>
            </div>

            {/* Map Legend */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-stone-800 text-[11px] text-stone-400">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                  <span className="text-stone-300">الدولة المحددة ومشاريعها</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                  <span className="text-stone-300">العواصم والمراكز الإدارية</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
                  <span className="text-stone-300">محطات المياه والآبار</span>
                </span>
              </div>
              <span className="text-emerald-400 font-mono">100% مشاريع موثقة بالأقمار والإحداثيات</span>
            </div>
          </div>

          {/* Right / Bottom: Country Detailed Dossier */}
          <div className="lg:col-span-5 space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div>
                  <span className="text-[11px] text-emerald-400 font-bold font-mono uppercase tracking-wider">
                    {currentCountry.regionTag}
                  </span>
                  <h3 className="text-2xl sm:text-3xl font-black text-white mt-0.5">
                    {currentCountry.name}
                  </h3>
                </div>
                <div className="text-end">
                  <span className="text-[10px] text-stone-400 font-mono">الإحداثيات الجغرافية</span>
                  <div className="text-xs font-bold text-emerald-400 font-mono">{currentCountry.coordinates}</div>
                </div>
              </div>

              <p className="text-stone-300 text-sm leading-relaxed">
                {currentCountry.desc}
              </p>

              {/* Quick Metrics */}
              <div className="grid grid-cols-3 gap-3 pt-1">
                <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
                  <div className="text-[11px] text-stone-400 font-bold">{t.whereWeWork.activeProjects}</div>
                  <div className="text-xl font-black text-emerald-400 mt-0.5 font-mono">{currentCountry.activeProjectsCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
                  <div className="text-[11px] text-stone-400 font-bold">{t.whereWeWork.completedProjects}</div>
                  <div className="text-xl font-black text-teal-400 mt-0.5 font-mono">{currentCountry.completedProjectsCount}</div>
                </div>
                <div className="p-3 rounded-xl bg-stone-900/90 border border-stone-800">
                  <div className="text-[11px] text-stone-400 font-bold">المستفيدون</div>
                  <div className="text-xl font-black text-amber-400 mt-0.5 font-mono">{currentCountry.populationServed}</div>
                </div>
              </div>

              {/* Priority Sectors */}
              <div className="space-y-2 pt-1">
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

              {/* Key Regions Covered */}
              <div className="space-y-1.5 pt-1">
                <div className="text-xs font-bold text-stone-400">الأقاليم والمحافظات المستهدفة:</div>
                <div className="flex flex-wrap gap-1.5">
                  {currentCountry.regions.map((reg, i) => (
                    <span
                      key={i}
                      className="px-2.5 py-1 rounded-lg bg-stone-900/60 border border-stone-800 text-[11px] text-stone-300 font-medium"
                    >
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Media WhatsApp & Project Navigation CTAs */}
            <div className="space-y-3 pt-2">
              <button
                onClick={() => onNavigateToProjects(currentCountry.id)}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/60 border border-emerald-400/40 transition-all transform hover:-translate-y-0.5"
              >
                <span>{t.whereWeWork.viewProjects} ({currentCountry.name})</span>
                <ArrowIcon className="w-4 h-4" />
              </button>

              <a
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-stone-900 hover:bg-stone-800 text-emerald-400 hover:text-emerald-300 border border-stone-800 hover:border-emerald-700/60 font-bold py-3 px-4 rounded-2xl text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>للتواصل مع شعبة الإعلام والعلاقات العامة (واتساب: 00249919980435)</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

