import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { store } from '../../services/store';
import { ImpactStats, Campaign, Project, VolunteerApplication, DonationRecord, ProjectStatus } from '../../types/foundation';
import {
  Settings,
  Database,
  Briefcase,
  Flame,
  HeartHandshake,
  Receipt,
  Save,
  Plus,
  Trash2,
  CheckCircle2,
  X,
} from 'lucide-react';

interface AdminDashboardProps {
  onClose: () => void;
  onDataUpdated: () => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({ onClose, onDataUpdated }) => {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'stats' | 'campaigns' | 'projects' | 'volunteers' | 'donations'>('stats');

  // Stats State
  const [stats, setStats] = useState<ImpactStats>(store.getStats());
  const [statsSaved, setStatsSaved] = useState(false);

  // Campaigns State
  const [campaigns, setCampaigns] = useState<Campaign[]>(store.getCampaigns());
  const [newCampaign, setNewCampaign] = useState<Partial<Campaign>>({
    title: { ar: '', fr: '', en: '' },
    description: { ar: '', fr: '', en: '' },
    targetAmount: 10000,
    raisedAmount: 0,
    donorsCount: 0,
    country: 'mali',
    city: 'باماكو',
    sector: 'water',
    urgent: false,
    image: 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80',
  });
  const [showAddCampaign, setShowAddCampaign] = useState(false);

  // Projects State
  const [projects, setProjects] = useState<Project[]>(store.getProjects());

  // Volunteers State
  const [volunteers, setVolunteers] = useState<VolunteerApplication[]>(store.getVolunteerApplications());

  // Donations State
  const [donations, setDonations] = useState<DonationRecord[]>(store.getDonations());

  const handleSaveStats = (e: React.FormEvent) => {
    e.preventDefault();
    store.updateStats(stats);
    setStatsSaved(true);
    onDataUpdated();
    setTimeout(() => setStatsSaved(false), 2500);
  };

  const handleAddCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCampaign.title?.ar) return;

    const camp: Campaign = {
      id: `camp_${Date.now()}`,
      title: {
        ar: newCampaign.title.ar,
        fr: newCampaign.title.fr || newCampaign.title.ar,
        en: newCampaign.title.en || newCampaign.title.ar,
      },
      description: {
        ar: newCampaign.description?.ar || '',
        fr: newCampaign.description?.fr || newCampaign.description?.ar || '',
        en: newCampaign.description?.en || newCampaign.description?.ar || '',
      },
      targetAmount: Number(newCampaign.targetAmount) || 10000,
      raisedAmount: Number(newCampaign.raisedAmount) || 0,
      donorsCount: Number(newCampaign.donorsCount) || 0,
      country: (newCampaign.country as any) || 'mali',
      city: newCampaign.city || 'باماكو',
      sector: (newCampaign.sector as any) || 'water',
      urgent: !!newCampaign.urgent,
      currency: 'USD',
      status: 'active',
      startDate: new Date().toISOString().split('T')[0],
      image: newCampaign.image || 'https://images.unsplash.com/photo-1541252260730-0412e8e2108e?auto=format&fit=crop&w=800&q=80',
    };

    store.addCampaign(camp);
    setCampaigns(store.getCampaigns());
    setShowAddCampaign(false);
    onDataUpdated();
  };

  const handleDeleteCampaign = (id: string) => {
    store.deleteCampaign(id);
    setCampaigns(store.getCampaigns());
    onDataUpdated();
  };

  const handleToggleProjectStatus = (id: string, currentStatus: Project['status']) => {
    const nextStatus: ProjectStatus =
      currentStatus === 'planned' || currentStatus === 'planning'
        ? 'in_progress'
        : currentStatus === 'in_progress' || currentStatus === 'in-progress'
        ? 'completed'
        : 'planned';

    store.updateProjectStatus(id, nextStatus);
    setProjects(store.getProjects());
    onDataUpdated();
  };

  const handleResetToBaseline = () => {
    if (window.confirm('هل تود استعادة الإحصائيات الأولية المعتمدة للمؤسسة؟')) {
      store.resetAll();
      setStats(store.getStats());
      setCampaigns(store.getCampaigns());
      setProjects(store.getProjects());
      setVolunteers(store.getVolunteerApplications());
      setDonations(store.getDonations());
      onDataUpdated();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-fadeIn">
      <div className="bg-stone-950 border border-stone-800 rounded-3xl max-w-5xl w-full h-[90vh] flex flex-col overflow-hidden shadow-2xl text-stone-200">
        {/* Admin Header */}
        <div className="p-5 bg-stone-900 border-b border-stone-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-red-600/20 text-red-500 border border-red-500/30">
              <Settings className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>لوحة التحكم الإدارية • مؤسسة الملك اسكيا الخيرية</span>
                <span className="text-xs font-mono px-2 py-0.5 rounded bg-stone-800 text-stone-300">v2.0</span>
              </h3>
              <p className="text-xs text-stone-400">
                إدارة الأرقام الميدانية والمشاريع والتبرعات المعتمدة
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleResetToBaseline}
              className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-red-950 text-stone-300 hover:text-red-400 text-xs font-mono transition border border-stone-700"
            >
              استعادة الأرقام الرسمية
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-stone-800 text-stone-400 hover:text-white transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 py-3 bg-stone-900/50 border-b border-stone-800 text-xs font-bold overflow-x-auto">
          <button
            onClick={() => setActiveTab('stats')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === 'stats' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Database className="w-4 h-4" />
            <span>إحصائيات الأثر الميداني</span>
          </button>

          <button
            onClick={() => setActiveTab('campaigns')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === 'campaigns' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Flame className="w-4 h-4" />
            <span>الحملات الإغاثية ({campaigns.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === 'projects' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Briefcase className="w-4 h-4" />
            <span>سجل المشاريع ({projects.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('volunteers')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === 'volunteers' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <HeartHandshake className="w-4 h-4" />
            <span>طلبات التطوع ({volunteers.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('donations')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl transition ${
              activeTab === 'donations' ? 'bg-red-600 text-white' : 'text-stone-400 hover:text-white'
            }`}
          >
            <Receipt className="w-4 h-4" />
            <span>سجل التبرعات ({donations.length})</span>
          </button>
        </div>

        {/* Tab Body */}
        <div className="p-6 flex-1 overflow-y-auto">
          {/* TAB 1: Impact Stats Management */}
          {activeTab === 'stats' && (
            <form onSubmit={handleSaveStats} className="space-y-6 max-w-3xl">
              <div className="bg-stone-900/60 p-4 rounded-2xl border border-stone-800 text-xs text-stone-300">
                <span className="font-bold text-white">تنويه التدقيق:</span> يتم تحديث هذه الأرقام بناءً على محاضر التدقيق الميداني المعتمدة من مكاتب المؤسسة في باماكو وواغادوغو ونيامي.
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">المستفيدون (Beneficiaries)</label>
                  <input
                    type="number"
                    value={stats.beneficiariesCount}
                    onChange={(e) => setStats({ ...stats, beneficiariesCount: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">المشاريع الميدانية (Projects)</label>
                  <input
                    type="number"
                    value={stats.projectsCount}
                    onChange={(e) => setStats({ ...stats, projectsCount: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">الدول المخدومة (Countries)</label>
                  <input
                    type="number"
                    value={stats.countriesCount}
                    onChange={(e) => setStats({ ...stats, countriesCount: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">المتطوعون (Volunteers)</label>
                  <input
                    type="number"
                    value={stats.volunteersCount}
                    onChange={(e) => setStats({ ...stats, volunteersCount: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">آبار ومجمعات مياه (Wells)</label>
                  <input
                    type="number"
                    value={stats.waterWellsCount}
                    onChange={(e) => setStats({ ...stats, waterWellsCount: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">مدارس ومراكز تعليم (Schools)</label>
                  <input
                    type="number"
                    value={stats.schoolsSupported}
                    onChange={(e) => setStats({ ...stats, schoolsSupported: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">مراكز وقوافل صحية (Clinics)</label>
                  <input
                    type="number"
                    value={stats.healthClinicsSupported}
                    onChange={(e) => setStats({ ...stats, healthClinicsSupported: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 mb-1">وجبات وسلال غذائية (Meals)</label>
                  <input
                    type="number"
                    value={stats.mealsDistributed}
                    onChange={(e) => setStats({ ...stats, mealsDistributed: Number(e.target.value) })}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3 py-2 text-sm text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-3 pt-4">
                <button
                  type="submit"
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-3 px-6 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-red-950/40"
                >
                  <Save className="w-4 h-4" />
                  <span>حفظ الأرقام ونشرها على الموقع</span>
                </button>
                {statsSaved && (
                  <span className="text-emerald-400 text-xs font-bold flex items-center gap-1">
                    <CheckCircle2 className="w-4 h-4" /> تم الحفظ بنجاح!
                  </span>
                )}
              </div>
            </form>
          )}

          {/* TAB 2: Campaigns Management */}
          {activeTab === 'campaigns' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-white">قائمة الحملات الإغاثية النشطة</h4>
                <button
                  onClick={() => setShowAddCampaign(!showAddCampaign)}
                  className="bg-red-600 hover:bg-red-500 text-white font-bold py-2 px-4 rounded-xl text-xs flex items-center gap-1.5"
                >
                  <Plus className="w-4 h-4" />
                  <span>إضافة حملة جديدة</span>
                </button>
              </div>

              {showAddCampaign && (
                <form onSubmit={handleAddCampaign} className="p-5 rounded-2xl bg-stone-900 border border-stone-800 space-y-4">
                  <div className="font-bold text-sm text-white">إضافة حملة جديدة</div>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <input
                      type="text"
                      required
                      placeholder="عنوان الحملة بالعربية"
                      value={newCampaign.title?.ar}
                      onChange={(e) => setNewCampaign({ ...newCampaign, title: { ...newCampaign.title, ar: e.target.value } as any })}
                      className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                    <input
                      type="number"
                      required
                      placeholder="المبلغ المستهدف ($)"
                      value={newCampaign.targetAmount}
                      onChange={(e) => setNewCampaign({ ...newCampaign, targetAmount: Number(e.target.value) })}
                      className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white font-mono"
                    />
                    <input
                      type="text"
                      placeholder="المدينة / المنطقة"
                      value={newCampaign.city}
                      onChange={(e) => setNewCampaign({ ...newCampaign, city: e.target.value })}
                      className="bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <textarea
                    rows={2}
                    placeholder="وصف الحملة بالعربية"
                    value={newCampaign.description?.ar}
                    onChange={(e) => setNewCampaign({ ...newCampaign, description: { ...newCampaign.description, ar: e.target.value } as any })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-3 py-2 text-xs text-white"
                  />

                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-xs text-stone-300 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={newCampaign.urgent}
                        onChange={(e) => setNewCampaign({ ...newCampaign, urgent: e.target.checked })}
                        className="rounded bg-stone-950 border-stone-700 text-red-600"
                      />
                      <span>تمييز كـ "نداء طارئ"</span>
                    </label>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => setShowAddCampaign(false)}
                        className="px-4 py-2 rounded-xl bg-stone-800 text-xs font-bold"
                      >
                        إلغاء
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 rounded-xl bg-red-600 text-white text-xs font-bold"
                      >
                        نشر الحملة
                      </button>
                    </div>
                  </div>
                </form>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {campaigns.map((camp) => (
                  <div key={camp.id} className="p-4 rounded-2xl bg-stone-900/70 border border-stone-800 flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="font-bold text-sm text-white">{camp.title.ar}</div>
                      <div className="text-xs text-stone-400 font-mono">
                        المجموع: ${camp.raisedAmount.toLocaleString()} / ${camp.targetAmount.toLocaleString()} ({camp.city})
                      </div>
                    </div>
                    <button
                      onClick={() => handleDeleteCampaign(camp.id)}
                      className="p-2 rounded-lg bg-stone-800 text-stone-400 hover:text-red-400 transition"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: Projects Management */}
          {activeTab === 'projects' && (
            <div className="space-y-4">
              <div className="text-xs text-stone-400 mb-2">
                انقر على حالة المشروع لتغييرها بين: (قيد التخطيط ➔ قيد التنفيذ ➔ مكتمل ومعتمد)
              </div>
              <div className="space-y-3">
                {projects.map((proj) => (
                  <div key={proj.id} className="p-4 rounded-2xl bg-stone-900/60 border border-stone-800 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-sm text-white">{proj.title.ar}</div>
                      <div className="text-xs text-stone-400 font-mono">
                        {proj.city || proj.locationName} • ${(proj.estimatedCost || proj.budgetUsd || 0).toLocaleString()} • المستفيدون: {(proj.beneficiariesEstimated || proj.beneficiariesTarget || 0).toLocaleString()}
                      </div>
                    </div>

                    <button
                      onClick={() => handleToggleProjectStatus(proj.id, proj.status)}
                      className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition border ${
                        proj.status === 'completed'
                          ? 'bg-emerald-950 text-emerald-400 border-emerald-800'
                          : proj.status === 'in_progress' || proj.status === 'in-progress'
                          ? 'bg-amber-950 text-amber-400 border-amber-800'
                          : 'bg-stone-950 text-stone-400 border-stone-800'
                      }`}
                    >
                      {proj.status.toUpperCase()} (تغيير)
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: Volunteers Applications */}
          {activeTab === 'volunteers' && (
            <div className="space-y-4">
              {volunteers.length === 0 ? (
                <div className="text-center py-10 text-stone-400 text-sm">
                  لا توجد طلبات تطوع مسجلة حالياً
                </div>
              ) : (
                <div className="space-y-3">
                  {volunteers.map((vol) => (
                    <div key={vol.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-white text-sm">{vol.fullName}</span>
                        <span className="text-xs font-mono text-stone-400">{vol.specialty || vol.sectorInterest}</span>
                      </div>
                      <div className="text-xs text-stone-400 font-mono">
                        {vol.email} • {vol.phone}
                      </div>
                      {(vol.motivation || vol.message) && (
                        <p className="text-xs text-stone-300 italic bg-stone-950 p-2.5 rounded-xl border border-stone-800">
                          "{vol.motivation || vol.message}"
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* TAB 5: Donations Audit Log */}
          {activeTab === 'donations' && (
            <div className="space-y-4">
              {donations.length === 0 ? (
                <div className="text-center py-10 text-stone-400 text-sm">
                  لا توجد سجلات تبرع حالية
                </div>
              ) : (
                <div className="space-y-3 font-mono text-xs">
                  {donations.map((don) => (
                    <div key={don.id} className="p-4 rounded-2xl bg-stone-900 border border-stone-800 flex items-center justify-between">
                      <div className="space-y-1">
                        <div className="font-bold text-emerald-400">
                          +{don.amount} {don.currency} ({don.donorName})
                        </div>
                        <div className="text-stone-400 text-[11px]">
                          سند رقم: {don.receiptNumber} • طريقة الدفع: {don.paymentMethod}
                        </div>
                      </div>
                      <div className="text-stone-400 text-[11px]">
                        {new Date(don.createdAt).toLocaleDateString()}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
