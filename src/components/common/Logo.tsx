import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface LogoProps {
  variant?: 'full' | 'icon' | 'white' | 'dark';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({
  variant = 'full',
  size = 'md',
  showSubtitle = true,
  className = '',
}) => {
  const { language } = useLanguage();

  const iconSizes = {
    sm: 'w-8 h-8',
    md: 'w-11 h-11',
    lg: 'w-14 h-14',
    xl: 'w-20 h-20',
  };

  const titleSizes = {
    sm: 'text-sm',
    md: 'text-base font-black',
    lg: 'text-xl font-black',
    xl: 'text-2xl font-black',
  };

  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      {/* Official Askia Royal Seal / Emblem SVG */}
      <div className={`relative flex-shrink-0 ${iconSizes[size]} transition-transform duration-300 hover:scale-105`}>
        <svg
          viewBox="0 0 100 100"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full drop-shadow-md"
        >
          <defs>
            {/* Royal Gold / Amber Gradient */}
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F59E0B" />
              <stop offset="50%" stopColor="#D97706" />
              <stop offset="100%" stopColor="#92400E" />
            </linearGradient>

            {/* Radiant Askia Red Gradient */}
            <linearGradient id="redGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#EF4444" />
              <stop offset="50%" stopColor="#DC2626" />
              <stop offset="100%" stopColor="#991B1B" />
            </linearGradient>

            {/* Shield Dark Gradient */}
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C1917" />
              <stop offset="100%" stopColor="#0C0A09" />
            </linearGradient>
          </defs>

          {/* Outer Royal African Shield */}
          <path
            d="M50 4C73 4 88 16 88 38C88 64 50 94 50 94C50 94 12 64 12 38C12 16 27 4 50 4Z"
            fill="url(#shieldGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
          />

          {/* Inner Red Concentric Border */}
          <path
            d="M50 9C70 9 83 19 83 38C83 60 50 87 50 87C50 87 17 60 17 38C17 19 30 9 50 9Z"
            fill="#09090b"
            stroke="url(#redGrad)"
            strokeWidth="1.8"
            strokeDasharray="2 1"
          />

          {/* Historic Tomb of Askia / Songhai Pyramidal Minaret Silhouette */}
          {/* Base stepped pyramid */}
          <path
            d="M26 62L74 62L68 44L32 44L26 62Z"
            fill="url(#goldGrad)"
            opacity="0.95"
          />
          {/* Middle step */}
          <path
            d="M32 44L68 44L62 30L38 30L32 44Z"
            fill="url(#goldGrad)"
            opacity="0.9"
          />
          {/* Top spire */}
          <path
            d="M38 30L62 30L54 18L46 18L38 30Z"
            fill="url(#goldGrad)"
          />
          {/* Crown Spire / Minaret Peak */}
          <polygon points="50,11 46,18 54,18" fill="#FDE68A" />

          {/* Historic Wooden Beams (Toron) Motifs of Sudano-Sahelian Architecture */}
          <line x1="28" y1="54" x2="72" y2="54" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="34" y1="38" x2="66" y2="38" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="40" y1="24" x2="60" y2="24" stroke="#78350F" strokeWidth="1.5" strokeLinecap="round" />

          {/* Central Humanitarian Flame / Heart in Crimson */}
          <circle cx="50" cy="48" r="8" fill="#0C0A09" stroke="url(#redGrad)" strokeWidth="1.5" />
          <path
            d="M50 43C53 43 55 45 55 48C55 52 50 55 50 55C50 55 45 52 45 48C45 45 47 43 50 43Z"
            fill="url(#redGrad)"
          />

          {/* Three Stars Representing Mali, Burkina Faso, Niger */}
          <circle cx="34" cy="72" r="2.2" fill="#F59E0B" />
          <circle cx="50" cy="76" r="2.8" fill="#EF4444" />
          <circle cx="66" cy="72" r="2.2" fill="#F59E0B" />

          {/* Laurel / Olive branches of peace around bottom */}
          <path
            d="M28 66C23 72 26 80 34 84"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <path
            d="M72 66C77 72 74 80 66 84"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
        </svg>

        {/* Small Sahel Flag Color Accent Dots */}
        <div className="absolute -bottom-0.5 -right-0.5 flex items-center space-x-0.5 rtl:space-x-reverse bg-black/90 p-0.5 rounded-full border border-stone-800">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Mali" />
          <span className="w-1.5 h-1.5 rounded-full bg-red-600" title="Burkina Faso" />
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Niger" />
        </div>
      </div>

      {/* Typography Label */}
      {variant !== 'icon' && (
        <div className="flex flex-col text-start">
          {language === 'ar' ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className={`${titleSizes[size]} text-white tracking-tight leading-none font-bold`}>
                  مؤسسة الملك اسكيا الخيرية
                </span>
              </div>
              {showSubtitle && (
                <span className="text-[10px] sm:text-[11px] text-stone-400 font-mono uppercase tracking-wider mt-0.5 flex items-center gap-1">
                  <span className="text-red-500 font-bold">FONDATION ROYALE ASKIA</span>
                  <span className="text-stone-600">•</span>
                  <span>SAHEL</span>
                </span>
              )}
            </>
          ) : language === 'fr' ? (
            <>
              <div className="flex items-center gap-1.5">
                <span className={`${titleSizes[size]} text-white tracking-tight leading-none font-black`}>
                  FONDATION ROYALE ASKIA
                </span>
              </div>
              {showSubtitle && (
                <span className="text-[10px] sm:text-[11px] text-stone-400 font-medium tracking-wide mt-0.5">
                  <span className="text-red-500 font-bold">Mali • Burkina Faso • Niger</span>
                </span>
              )}
            </>
          ) : (
            <>
              <div className="flex items-center gap-1.5">
                <span className={`${titleSizes[size]} text-white tracking-tight leading-none font-black`}>
                  ASKIA ROYAL CHARITY
                </span>
              </div>
              {showSubtitle && (
                <span className="text-[10px] sm:text-[11px] text-stone-400 font-medium tracking-wide mt-0.5">
                  <span className="text-red-500 font-bold">FOUNDATION</span> • Sahel Humanitarian
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
