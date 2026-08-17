import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TransparencyReport } from '../../types/foundation';
import {
  ShieldCheck,
  FileText,
  Download,
  Lock,
  PieChart,
  Award,
  CheckCircle2,
  ExternalLink,
} from 'lucide-react';

interface TransparencySectionProps {
  reports: TransparencyReport[];
}

export const TransparencySection: React.FC<TransparencySectionProps> = ({ reports }) => {
  const { language, t } = useLanguage();

  return (
    <section id="impact" className="py-20 bg-black border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>الحوكمة والشفافية المالية</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            {t.transparency.title}
          </h2>
          <p className="text-stone-400 text-sm sm:text-base leading-relaxed">
            {t.transparency.subtitle}
          </p>
        </div>

        {/* 100% Model Highlight Box */}
        <div className="bg-gradient-to-r from-stone-900 via-stone-900 to-red-950/30 rounded-3xl border border-stone-800 p-8 mb-12 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold font-mono">
                {t.transparency.hundredPercentModel}
              </div>
              <h3 className="text-2xl sm:text-3xl font-black text-white">
                التزامنا الصارم: 100% من تبرعك يذهب مباشرة للميدان
              </h3>
              <p className="text-stone-300 text-sm leading-relaxed">
                {t.transparency.hundredPercentModelDesc}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                  <div className="text-xl font-black text-emerald-400 font-mono">88.5%</div>
                  <div className="text-xs text-stone-400 mt-0.5">البرامج والمشاريع الميدانية</div>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                  <div className="text-xl font-black text-amber-400 font-mono">7.2%</div>
                  <div className="text-xs text-stone-400 mt-0.5">المتابعة والتقييم الميداني</div>
                </div>
                <div className="p-3.5 rounded-xl bg-stone-950/80 border border-stone-800">
                  <div className="text-xl font-black text-stone-400 font-mono">4.3%</div>
                  <div className="text-xs text-stone-400 mt-0.5">إدارة وتشغيل مغطاة بالوقف</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-4 bg-stone-950 p-6 rounded-2xl border border-stone-800 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-red-950/60 border border-red-800 flex items-center justify-center mx-auto text-red-500">
                <Award className="w-8 h-8" />
              </div>
              <div>
                <h4 className="text-base font-black text-white">معايير حوكمة دولية</h4>
                <p className="text-xs text-stone-400 mt-1 leading-relaxed">
                  تخضع مؤسسة الملك اسكيا للتدقيق المالي السنوي المستقل وفق أعلى معايير الامتثال والنزاهة الإنسانية.
                </p>
              </div>
              <div className="text-xs font-mono text-emerald-400 bg-emerald-950/40 py-1.5 px-3 rounded-lg border border-emerald-900/50">
                ✓ متوافق مع لوائح مكافحة غسيل الأموال
              </div>
            </div>
          </div>
        </div>

        {/* Audited Financial Reports Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-black text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-red-500" />
              <span>{t.transparency.annualReports}</span>
            </h3>
            <span className="text-xs text-stone-400 font-mono">آخر تحديث: 2025/2026</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {reports.map((report) => (
              <div
                key={report.id}
                className="p-5 rounded-2xl bg-stone-900/60 border border-stone-800 hover:border-stone-700 transition flex items-center justify-between group"
              >
                <div className="space-y-1">
                  <div className="text-xs font-mono font-bold text-red-400">
                    تقرير العام {report.year}
                  </div>
                  <div className="text-sm font-bold text-white group-hover:text-red-400 transition-colors">
                    {report.title?.[language] || report.title?.ar || `تقرير العام ${report.year}`}
                  </div>
                  <div className="text-[11px] text-stone-400">
                    المدقق: {report.auditor}
                  </div>
                </div>

                <a
                  href={report.fileUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="p-3 rounded-xl bg-stone-950 hover:bg-red-600 text-stone-300 hover:text-white border border-stone-800 transition flex items-center gap-1.5 text-xs font-bold shadow"
                >
                  <Download className="w-4 h-4" />
                  <span className="hidden sm:inline">تحميل PDF</span>
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
