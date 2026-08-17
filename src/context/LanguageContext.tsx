import React, { createContext, useContext, useState, useEffect } from 'react';
import { Language } from '../types/foundation';
import { translations } from '../i18n/translations';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: typeof translations.ar;
  isRTL: boolean;
  dir: 'rtl' | 'ltr';
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>(() => {
    const saved = localStorage.getItem('askia_foundation_lang');
    if (saved === 'ar' || saved === 'fr' || saved === 'en') {
      return saved as Language;
    }
    return 'ar'; // Default Arabic as requested
  });

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem('askia_foundation_lang', lang);
  };

  const isRTL = language === 'ar';
  const dir = isRTL ? 'rtl' : 'ltr';

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = dir;
    document.body.dir = dir;
    if (language === 'ar') {
      document.body.classList.remove('font-sans-latin');
      document.body.classList.add('font-sans-arabic');
    } else {
      document.body.classList.remove('font-sans-arabic');
      document.body.classList.add('font-sans-latin');
    }
  }, [language, dir]);

  const t = (translations[language] || translations.ar) as typeof translations.ar;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isRTL, dir }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
