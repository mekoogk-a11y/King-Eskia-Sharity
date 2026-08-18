import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Logo } from '../common/Logo';
import {
  Heart,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Globe,
  ArrowUpRight,
  Sparkles,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (section: string) => void;
  onOpenDonate: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenDonate }) => {
  const { t, isRTL } = useLanguage();

  return (
    <footer className="bg-stone-950 text-stone-300 border-t border-stone-800 relative overflow-hidden">
      {/* Subtle background calm emerald glow */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-emerald-950/20 rounded-full blur-3xl pointer-events-none" />

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-16 pb-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Column 1: Organization Identity */}
          <div className="lg:col-span-2 space-y-4">
            <Logo size="lg" showSubtitle={true} />
            <p className="text-stone-400 text-sm leading-relaxed max-w-md pt-2">
              {t.footer.aboutOrg}
            </p>

            <div className="flex items-center gap-3 pt-2">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>{t.transparency.governanceCharter}</span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-stone-900 border border-stone-800 text-xs text-stone-300">
                <Globe className="w-4 h-4 text-amber-500" />
                <span>{t.hero.countriesServed}</span>
              </div>
            </div>

            {/* Sahel Flag Indicators */}
            <div className="flex items-center gap-2 pt-2 text-xs text-stone-400 font-mono">
              <span className="flex items-center gap-1 bg-stone-900/80 px-2 py-1 rounded border border-stone-800">
                <span className="w-2 h-2 rounded-full bg-emerald-500" /> Mali
              </span>
              <span className="flex items-center gap-1 bg-stone-900/80 px-2 py-1 rounded border border-stone-800">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Niger
              </span>
              <span className="flex items-center gap-1 bg-stone-900/80 px-2 py-1 rounded border border-stone-800">
                <span className="w-2 h-2 rounded-full bg-emerald-600" /> Sahel
              </span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide uppercase border-b border-stone-800 pb-2">
              {t.footer.quickLinks}
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li>
                <button
                  onClick={() => onNavigate('home')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span>{t.nav.home}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('about')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span>{t.nav.about}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('where-we-work')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span>{t.nav.whereWeWork}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('heart-of-mali')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span>{t.nav.heartOfMali}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('projects')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span>{t.nav.projects}</span>
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('impact')}
                  className="hover:text-emerald-400 transition flex items-center gap-1.5"
                >
                  <span>{t.nav.impact}</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Work Sectors */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide uppercase border-b border-stone-800 pb-2">
              {t.footer.sectors}
            </h3>
            <ul className="space-y-2.5 text-xs text-stone-400">
              <li className="flex items-center gap-1.5 hover:text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                <span>{t.whyWeWork.waterTitle}</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                <span>{t.whyWeWork.educationTitle}</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>{t.whyWeWork.healthTitle}</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-teal-500" />
                <span>{t.whyWeWork.reliefTitle}</span>
              </li>
              <li className="flex items-center gap-1.5 hover:text-stone-200">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                <span>{t.whyWeWork.communityTitle}</span>
              </li>
              <li className="pt-2">
                <button
                  onClick={() => onNavigate('volunteer')}
                  className="text-emerald-400 font-bold hover:underline flex items-center gap-1 text-xs"
                >
                  <span>{t.nav.volunteer}</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Contact & Locations */}
          <div className="space-y-4">
            <h3 className="text-white font-bold text-sm tracking-wide uppercase border-b border-stone-800 pb-2">
              {t.footer.contactInfo}
            </h3>
            <ul className="space-y-3 text-xs text-stone-400">
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{t.contact.addressBamako}</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span>contact@askiafoundation.org</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                <span dir="ltr">00249919980435</span>
              </li>
              {/* Media & Public Relations WhatsApp Link */}
              <li className="pt-1">
                <a
                  href="https://wa.me/249919980435"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-xl bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 hover:text-white hover:bg-emerald-900/80 transition group"
                >
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <div className="flex-1 min-w-0">
                    <div className="text-[10px] text-emerald-400 font-bold uppercase tracking-wider">
                      {t.contact.mediaDivisionTitle}
                    </div>
                    <div dir="ltr" className="font-mono text-xs font-bold text-white group-hover:text-emerald-200">
                      واتساب: 00249919980435
                    </div>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
                </a>
              </li>
              <li className="pt-1">
                <button
                  onClick={onOpenDonate}
                  className="w-full bg-gradient-to-r from-emerald-600 via-emerald-600 to-teal-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-950/40 border border-emerald-500/30"
                >
                  <Heart className="w-3.5 h-3.5 fill-current" />
                  <span>{t.nav.donateNow}</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Legal & Copyright Bar */}
        <div className="mt-12 pt-6 border-t border-stone-800/80 flex flex-col md:flex-row items-center justify-between text-xs text-stone-400 gap-4">
          <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-4 text-center sm:text-start">
            <span className="text-white font-bold">
              {t.footer.copyright}
            </span>
            <span className="hidden sm:inline text-stone-700">•</span>
            <span className="text-stone-400 font-mono text-[11px]">
              {t.footer.officialName}
            </span>
          </div>

          <div className="flex items-center gap-4 text-[11px] text-stone-400">
            <button onClick={() => onNavigate('about')} className="hover:text-stone-200">
              {t.footer.privacyPolicy}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('impact')} className="hover:text-stone-200">
              {t.footer.financialAudit}
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('admin')} className="text-stone-400 hover:text-emerald-400 font-mono">
              {t.nav.admin}
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
