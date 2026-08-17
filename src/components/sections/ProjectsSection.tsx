import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Project, CountryCode, Sector } from '../../types/foundation';
import {
  Briefcase,
  Clock,
  CheckCircle2,
  Droplets,
  GraduationCap,
  HeartPulse,
  Flame,
  ArrowRight,
  ArrowLeft,
  X,
  Target,
} from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
  initialCountryFilter?: CountryCode;
  onOpenDonate: (projectId?: string) => void;
}

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({
  projects,
  initialCountryFilter,
  onOpenDonate,
}) => {
  const { language, t, isRTL } = useLanguage();
  const [selectedCountry, setSelectedCountry] = useState<'all' | CountryCode>(initialCountryFilter || 'all');
  const [selectedSector, setSelectedSector] = useState<'all' | Sector>('all');
  const [selectedStatus, setSelectedStatus] = useState<'all' | 'planned' | 'in_progress' | 'completed'>('all');
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);
  const ArrowIcon = isRTL ? ArrowLeft : ArrowRight;

  const normalizeStatus = (status?: string) => {
    if (status === 'planning' || status === 'planned') return 'planned';
    if (status === 'in-progress' || status === 'in_progress') return 'in_progress';
    if (status === 'completed') return 'completed';
    return 'in_progress';
  };

  const filteredProjects = projects.filter((p) => {
    if (selectedCountry !== 'all' && p.country !== selectedCountry) return false;
    if (selectedSector !== 'all' && p.sector !== selectedSector) return false;
    if (selectedStatus !== 'all' && normalizeStatus(p.status) !== selectedStatus) return false;
    return true;
  });

  const getStatusBadge = (status?: string) => {
    const s = normalizeStatus(status);
    switch (s) {
      case 'completed':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-bold font-mono">
            <CheckCircle2 className="w-3 h-3" />
            <span>{t.projects.statusCompleted}</span>
          </span>
        );
      case 'in_progress':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-bold font-mono">
            <Clock className="w-3 h-3 animate-spin" />
            <span>{t.projects.statusInProgress}</span>
          </span>
        );
      case 'planned':
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-stone-900 text-stone-400 border border-stone-800 text-[10px] font-bold font-mono">
            <span>{t.projects.statusPlanning}</span>
          </span>
        );
    }
  };

  const getSectorIcon = (sector: Sector) => {
    switch (sector) {
      case 'water':
        return <Droplets className="w-3.5 h-3.5 text-cyan-400" />;
      case 'education':
        return <GraduationCap className="w-3.5 h-3.5 text-amber-400" />;
      case 'health':
        return <HeartPulse className="w-3.5 h-3.5 text-rose-400" />;
      default:
        return <Flame className="w-3.5 h-3.5 text-orange-400" />;
    }
  };

  return (
    <section id="projects" className="py-20 bg-stone-950 border-b border-stone-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-4 border-b border-stone-800 gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-stone-900 border border-stone-800 text-red-400 text-xs font-bold mb-3">
              <Briefcase className="w-3.5 h-3.5" />
              <span>سجل المشاريع الميدانية</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-white">
              {t.projects.title}
            </h2>
          </div>
          <p className="text-sm sm:text-base text-stone-400 max-w-lg leading-relaxed">
            {t.projects.subtitle}
          </p>
        </div>

        {/* Multi-tier Filter Bar */}
        <div className="bg-stone-900/90 rounded-2xl border border-stone-800 p-4 mb-10 space-y-3">
          {/* Country Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs text-stone-400 font-bold me-2">الدولة:</span>
            <button
              onClick={() => setSelectedCountry('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCountry === 'all' ? 'bg-red-600 text-white' : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {t.projects.allCountries}
            </button>
            <button
              onClick={() => setSelectedCountry('mali')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCountry === 'mali' ? 'bg-red-600 text-white' : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {t.whereWeWork.mali}
            </button>
            <button
              onClick={() => setSelectedCountry('burkina')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCountry === 'burkina' ? 'bg-red-600 text-white' : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {t.whereWeWork.burkina}
            </button>
            <button
              onClick={() => setSelectedCountry('niger')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                selectedCountry === 'niger' ? 'bg-red-600 text-white' : 'bg-stone-950 text-stone-400 hover:text-stone-200 border border-stone-800'
              }`}
            >
              {t.whereWeWork.niger}
            </button>
          </div>

          {/* Sector Filters */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone-800/60">
            <span className="text-xs text-stone-400 font-bold me-2">القطاع:</span>
            <button
              onClick={() => setSelectedSector('all')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                selectedSector === 'all' ? 'bg-stone-200 text-black' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              الكل
            </button>
            <button
              onClick={() => setSelectedSector('water')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                selectedSector === 'water' ? 'bg-stone-200 text-black' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {t.whyWeWork.waterTitle}
            </button>
            <button
              onClick={() => setSelectedSector('education')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                selectedSector === 'education' ? 'bg-stone-200 text-black' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {t.whyWeWork.educationTitle}
            </button>
            <button
              onClick={() => setSelectedSector('health')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                selectedSector === 'health' ? 'bg-stone-200 text-black' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {t.whyWeWork.healthTitle}
            </button>
            <button
              onClick={() => setSelectedSector('relief')}
              className={`px-3 py-1 rounded-lg text-[11px] font-bold transition ${
                selectedSector === 'relief' ? 'bg-stone-200 text-black' : 'bg-stone-950 text-stone-400 hover:text-white border border-stone-800'
              }`}
            >
              {t.whyWeWork.reliefTitle}
            </button>
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => {
            const title = project.title[language] || project.title.ar;
            const desc = project.description[language] || project.description.ar;
            const beneficiaries = project.beneficiariesEstimated || project.beneficiariesTarget || 0;

            return (
              <div
                key={project.id}
                className="group bg-stone-900/60 rounded-3xl border border-stone-800 hover:border-stone-700 transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xl hover:-translate-y-1"
              >
                {/* Image */}
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-transparent to-black/40" />

                  <div className="absolute top-3 start-3 flex items-center gap-2">
                    {getStatusBadge(project.status)}
                  </div>

                  <div className="absolute bottom-3 start-3 flex items-center gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-sm border border-stone-700 text-xs font-bold text-stone-200">
                      {getSectorIcon(project.sector)}
                      <span>{project.city || project.locationName}</span>
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <h3 className="text-lg font-black text-white group-hover:text-red-400 transition-colors line-clamp-2">
                      {title}
                    </h3>
                    <p className="text-stone-400 text-xs leading-relaxed mt-2 line-clamp-3">
                      {desc}
                    </p>
                  </div>

                  {/* Impact quick metric */}
                  <div className="p-3 rounded-xl bg-stone-950 border border-stone-800/80 flex items-center justify-between text-xs font-mono">
                    <span className="text-stone-400">المستفيدون المقدرون:</span>
                    <span className="text-amber-400 font-bold">{beneficiaries.toLocaleString()}</span>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-3 pt-2">
                    <button
                      onClick={() => setActiveProjectModal(project)}
                      className="flex-1 bg-stone-800 hover:bg-stone-700 text-white font-bold py-2.5 px-3 rounded-xl text-xs flex items-center justify-center gap-1.5 transition border border-stone-700"
                    >
                      <span>{t.projects.viewDetails}</span>
                      <ArrowIcon className="w-3 h-3" />
                    </button>
                    <button
                      onClick={() => onOpenDonate(project.id)}
                      className="bg-red-600 hover:bg-red-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs transition shadow-lg shadow-red-950/40"
                    >
                      {t.projects.supportProject}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Deep Project Detail Modal */}
      {activeProjectModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
          <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-scaleUp">
            <div className="relative h-64 sm:h-72">
              <img
                src={activeProjectModal.image}
                alt={activeProjectModal.title[language] || activeProjectModal.title.ar}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent" />
              <button
                onClick={() => setActiveProjectModal(null)}
                className="absolute top-4 end-4 p-2 rounded-full bg-black/80 text-stone-300 hover:text-white border border-stone-700 transition"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 start-6">
                <div className="flex items-center gap-2 mb-1">
                  {getStatusBadge(activeProjectModal.status)}
                  <span className="text-xs text-stone-300 font-mono">
                    {activeProjectModal.city || activeProjectModal.locationName} • {activeProjectModal.country.toUpperCase()}
                  </span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black text-white">
                  {activeProjectModal.title[language] || activeProjectModal.title.ar}
                </h3>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-6">
              <div>
                <h4 className="text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  وصف المشروع وأهدافه الميدانية
                </h4>
                <p className="text-stone-300 text-sm leading-relaxed">
                  {activeProjectModal.description[language] || activeProjectModal.description.ar}
                </p>
              </div>

              {/* Objectives List */}
              {activeProjectModal.objectives && activeProjectModal.objectives.length > 0 && (
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-xs font-bold text-white uppercase tracking-wider">
                    <Target className="w-4 h-4 text-red-500" />
                    <span>{t.projects.objectives}</span>
                  </div>
                  <ul className="space-y-2">
                    {activeProjectModal.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-xs text-stone-300 bg-stone-900/60 p-3 rounded-xl border border-stone-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                        <span>{obj}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Key Financial & Field Info */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 rounded-2xl bg-stone-900 border border-stone-800">
                <div>
                  <div className="text-[11px] text-stone-400">{t.projects.estimatedCost}</div>
                  <div className="text-base font-black text-white font-mono mt-0.5">
                    ${(activeProjectModal.estimatedCost || activeProjectModal.budgetUsd || 0).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-400">{t.projects.beneficiaries}</div>
                  <div className="text-base font-black text-amber-400 font-mono mt-0.5">
                    {(activeProjectModal.beneficiariesEstimated || activeProjectModal.beneficiariesTarget || 0).toLocaleString()}
                  </div>
                </div>
                <div>
                  <div className="text-[11px] text-stone-400">تاريخ الإطلاق</div>
                  <div className="text-xs font-bold text-stone-300 font-mono mt-1">
                    {activeProjectModal.startDate || '2025/2026'}
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-stone-800">
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="px-5 py-2.5 rounded-xl bg-stone-900 text-stone-300 hover:bg-stone-800 text-xs font-bold"
                >
                  {t.projects.closeModal}
                </button>

                <button
                  onClick={() => {
                    const id = activeProjectModal.id;
                    setActiveProjectModal(null);
                    onOpenDonate(id);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white text-xs font-bold shadow-lg shadow-red-950/60"
                >
                  {t.projects.supportProject}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
