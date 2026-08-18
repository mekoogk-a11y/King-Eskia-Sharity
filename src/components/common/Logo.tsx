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

            {/* Calming Emerald Gradient */}
            <linearGradient id="emeraldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#34D399" />
              <stop offset="50%" stopColor="#10B981" />
              <stop offset="100%" stopColor="#047857" />
            </linearGradient>

            {/* Shield Dark Gradient */}
            <linearGradient id="shieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1C1917" />
              <stop offset="100%" stopColor="#0C0A09" />
            </linearGradient>

            {/* Clip path for Mali Flag inside the Shield */}
            <clipPath id="maliFlagShieldClip">
              <path d="M50 12C68 12 80 20 80 38C80 58 50 82 50 82C50 82 20 58 20 38C20 20 32 12 50 12Z" />
            </clipPath>
          </defs>

          {/* Outer Royal African Shield */}
          <path
            d="M50 4C73 4 88 16 88 38C88 64 50 94 50 94C50 94 12 64 12 38C12 16 27 4 50 4Z"
            fill="url(#shieldGrad)"
            stroke="url(#goldGrad)"
            strokeWidth="2.5"
          />

          {/* Inner Calming Emerald Concentric Border */}
          <path
            d="M50 8C70 8 84 18 84 38C84 60 50 88 50 88C50 88 16 60 16 38C16 18 30 8 50 8Z"
            fill="#09090b"
            stroke="url(#emeraldGrad)"
            strokeWidth="1.5"
          />

          {/* OFFICIAL FLAG OF MALI (Vertical Tricolor: Green, Yellow/Gold, Red) */}
          <g clipPath="url(#maliFlagShieldClip)">
            {/* Green Stripe (Left / First) */}
            <rect x="20" y="10" width="20" height="75" fill="#10B981" />
            {/* Yellow / Gold Stripe (Middle) */}
            <rect x="40" y="10" width="20" height="75" fill="#F59E0B" />
            {/* Red Stripe (Right / Third) */}
            <rect x="60" y="10" width="20" height="75" fill="#DC2626" />
          </g>

          {/* Golden Shield Inner Trim */}
          <path
            d="M50 12C68 12 80 20 80 38C80 58 50 82 50 82C50 82 20 58 20 38C20 20 32 12 50 12Z"
            fill="none"
            stroke="url(#goldGrad)"
            strokeWidth="1.5"
            opacity="0.9"
          />

          {/* Center Royal Seal / Star of Hope in Pure Gold */}
          <circle cx="50" cy="46" r="9" fill="#0C0A09" stroke="url(#goldGrad)" strokeWidth="1.8" />
          <polygon
            points="50,39 52.5,43.5 57,44 53.8,47 54.8,51.5 50,49 45.2,51.5 46.2,47 43,44 47.5,43.5"
            fill="#F59E0B"
          />

          {/* Three Stars Representing Unity, Dignity, Peace */}
          <circle cx="34" cy="72" r="2.2" fill="#F59E0B" />
          <circle cx="50" cy="76" r="2.8" fill="#10B981" />
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
          <span className="w-1.5 h-1.5 rounded-full bg-amber-500" title="Niger" />
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" title="Sahel" />
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
                  <span className="text-emerald-400 font-bold">FONDATION ROYALE ASKIA</span>
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
                  <span className="text-emerald-400 font-bold">Mali • Burkina Faso • Niger</span>
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
                  <span className="text-emerald-400 font-bold">FOUNDATION</span> • Sahel Humanitarian
                </span>
              )}
            </>
          )}
        </div>
      )}
    </div>
  );
};
