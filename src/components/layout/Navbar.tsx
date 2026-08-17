import React, { useState, useEffect } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../common/Logo';
import { Language } from '../../types/foundation';
import {
  Menu,
  X,
  Heart,
  Globe,
  Lock,
  ChevronDown,
  Mail,
  MessageCircle,
} from 'lucide-react';

interface NavbarProps {
  activeSection: string;
  onNavigate: (section: string) => void;
  onOpenDonate: (campaignId?: string) => void;
  onOpenAdmin?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  activeSection,
  onNavigate,
  onOpenDonate,
  onOpenAdmin,
}) => {
  const { language, setLanguage, t, isRTL } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { id: 'home', label: t.nav.home },
    { id: 'about', label: t.nav.about },
    { id: 'where-we-work', label: t.nav.whereWeWork },
    { id: 'heart-of-mali', label: t.nav.heartOfMali },
    { id: 'campaigns', label: t.nav.campaigns },
    { id: 'projects', label: t.nav.projects },
    { id: 'impact', label: t.nav.impact },
    { id: 'news', label: t.nav.news },
    { id: 'volunteer', label: t.nav.volunteer },
    { id: 'contact', label: t.nav.contact },
  ];

  const handleLinkClick = (id: string) => {
    onNavigate(id);
    setMobileMenuOpen(false);
  };

  const handleLanguageChange = (lang: Language) => {
    setLanguage(lang);
    setLangDropdownOpen(false);
  };

  return (
    <>
      {/* Top Notification / Trust Bar */}
      <div className="bg-stone-950 text-stone-300 text-[11px] py-1.5 px-4 border-b border-stone-800/80 hidden sm:block">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 text-red-500 font-bold">
              <span className="w-2 h-2 rounded-full bg-red-600 animate-pulse" />
              <span>{t.hero.badge.split('•')[0]}</span>
            </span>
            <span className="text-stone-500">•</span>
            <span className="text-stone-400">مالي • بوركينا فاسو • النيجر (Mali, Burkina Faso, Niger)</span>
          </div>

          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/249919980435"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 font-semibold transition"
            >
              <MessageCircle className="w-3 h-3 text-emerald-400" />
              <span>واتساب الإعلام: 00249919980435</span>
            </a>
            <span className="text-stone-700">|</span>
            <span className="flex items-center gap-1 text-stone-400 hover:text-stone-200 transition">
              <Mail className="w-3 h-3 text-red-500" />
              <span>contact@askiafoundation.org</span>
            </span>
            <span className="text-stone-700">|</span>
            <button
              onClick={() => onOpenAdmin ? onOpenAdmin() : onNavigate('admin')}
              className="flex items-center gap-1 text-stone-400 hover:text-red-400 font-medium transition"
            >
              <Lock className="w-3 h-3 text-stone-500" />
              <span>{t.nav.admin}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-black/95 backdrop-blur-md shadow-2xl border-b border-stone-800/90 py-2.5'
            : 'bg-black/90 backdrop-blur-sm border-b border-stone-800/50 py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between">
          {/* Official Brand Logo */}
          <div
            onClick={() => handleLinkClick('home')}
            className="cursor-pointer flex-shrink-0"
          >
            <Logo size={isScrolled ? 'sm' : 'md'} />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 2xl:gap-2">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => handleLinkClick(link.id)}
                  className={`px-2.5 py-1.5 rounded-lg text-xs font-bold transition-colors whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-stone-900 border border-stone-800 shadow-sm'
                      : 'text-stone-300 hover:text-white hover:bg-stone-900/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>

          {/* Right Header Controls (Language Switcher, Donate CTA) */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher Dropdown */}
            <div className="relative">
              <button
                onClick={() => setLangDropdownOpen(!langDropdownOpen)}
                className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs font-bold bg-stone-900 text-stone-200 border border-stone-800 hover:border-stone-700 transition"
              >
                <Globe className="w-3.5 h-3.5 text-red-500" />
                <span className="uppercase font-mono">
                  {language === 'ar' ? 'العربية' : language === 'fr' ? 'Français' : 'English'}
                </span>
                <ChevronDown className="w-3 h-3 text-stone-400" />
              </button>

              {langDropdownOpen && (
                <div
                  className={`absolute mt-2 w-36 bg-stone-950 border border-stone-800 rounded-xl shadow-2xl py-1 z-50 ${
                    isRTL ? 'left-0' : 'right-0'
                  }`}
                >
                  <button
                    onClick={() => handleLanguageChange('ar')}
                    className={`w-full text-right px-3 py-2 text-xs font-bold flex items-center justify-between transition ${
                      language === 'ar' ? 'text-red-500 bg-stone-900' : 'text-stone-300 hover:bg-stone-900'
                    }`}
                  >
                    <span>العربية (AR)</span>
                    {language === 'ar' && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('fr')}
                    className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between transition ${
                      language === 'fr' ? 'text-red-500 bg-stone-900' : 'text-stone-300 hover:bg-stone-900'
                    }`}
                  >
                    <span>Français (FR)</span>
                    {language === 'fr' && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  </button>
                  <button
                    onClick={() => handleLanguageChange('en')}
                    className={`w-full text-left px-3 py-2 text-xs font-bold flex items-center justify-between transition ${
                      language === 'en' ? 'text-red-500 bg-stone-900' : 'text-stone-300 hover:bg-stone-900'
                    }`}
                  >
                    <span>English (EN)</span>
                    {language === 'en' && <span className="w-1.5 h-1.5 rounded-full bg-red-500" />}
                  </button>
                </div>
              )}
            </div>

            {/* High-Contrast Red Donate CTA Button */}
            <button
              onClick={() => onOpenDonate()}
              className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-black text-xs sm:text-sm px-4 sm:px-5 py-2 sm:py-2.5 rounded-xl shadow-lg shadow-red-700/30 flex items-center gap-2 transition-all transform active:scale-95 border border-red-500/40"
            >
              <Heart className="w-3.5 h-3.5 fill-current text-white animate-pulse" />
              <span>{t.nav.donateNow}</span>
            </button>

            {/* Mobile Hamburger Menu Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2 rounded-xl text-stone-300 hover:text-white bg-stone-900 border border-stone-800 transition"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="xl:hidden bg-stone-950 border-b border-stone-800 px-4 py-4 space-y-2 max-h-[80vh] overflow-y-auto animate-fadeIn">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-stone-800">
              {navLinks.map((link) => {
                const isActive = activeSection === link.id;
                return (
                  <button
                    key={link.id}
                    onClick={() => handleLinkClick(link.id)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-start transition ${
                      isActive
                        ? 'bg-red-600 text-white shadow'
                        : 'bg-stone-900 text-stone-200 hover:bg-stone-800'
                    }`}
                  >
                    {link.label}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  if (onOpenAdmin) onOpenAdmin();
                  else handleLinkClick('admin');
                }}
                className="text-xs text-stone-400 hover:text-white flex items-center gap-1.5 p-2"
              >
                <Lock className="w-3.5 h-3.5 text-red-500" />
                <span>{t.nav.admin}</span>
              </button>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenDonate();
                }}
                className="w-full bg-red-600 text-white font-bold py-2.5 rounded-xl text-xs flex items-center justify-center gap-2"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>{t.nav.donateNow}</span>
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
