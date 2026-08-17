import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { VolunteerApplication } from '../../types/foundation';
import { store } from '../../services/store';
import {
  HeartHandshake,
  CheckCircle2,
  Stethoscope,
  GraduationCap,
  Wrench,
  Globe,
  Camera,
  Send,
} from 'lucide-react';

export const VolunteerPage: React.FC = () => {
  const { t } = useLanguage();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState<Partial<VolunteerApplication>>({
    fullName: '',
    email: '',
    phone: '',
    country: '',
    specialty: 'medical',
    skills: '',
    motivation: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email) return;

    store.submitVolunteerApplication({
      id: `vol_${Date.now()}`,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone || '',
      country: formData.country || 'Mali',
      specialty: formData.specialty as any,
      skills: formData.skills || '',
      motivation: formData.motivation || '',
      createdAt: new Date().toISOString(),
    });

    setSubmitted(true);
  };

  return (
    <div className="py-16 bg-stone-950 text-stone-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="text-center space-y-4 mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-950/40 border border-red-800 text-red-400 text-xs font-bold">
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>برنامج التطوع الميداني والتقني</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white">
            {t.volunteer.title}
          </h1>
          <p className="text-stone-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            {t.volunteer.subtitle}
          </p>
        </div>

        {/* Volunteer Application Form Card */}
        <div className="bg-stone-900/80 rounded-3xl border border-stone-800 p-6 sm:p-10 shadow-2xl">
          {submitted ? (
            <div className="text-center py-12 space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black text-white">
                {t.volunteer.successMsg}
              </h3>
              <p className="text-stone-400 text-sm max-w-md mx-auto">
                سيتواصل معك فريق العلاقات الميدانية لمناقشة فرص التطوع المناسبة لتخصصك وجدولك.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-white text-xs font-bold"
              >
                تقديم طلب آخر
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                    {t.volunteer.fullName} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                    {t.volunteer.email} *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                    {t.volunteer.phone}
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                    {t.volunteer.specialty}
                  </label>
                  <select
                    value={formData.specialty}
                    onChange={(e) => setFormData({ ...formData, specialty: e.target.value as any })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500 font-bold"
                  >
                    <option value="medical">الطب والرعاية الصحية (أطباء وممرضون)</option>
                    <option value="education">التعليم والتدريب الأكاديمي</option>
                    <option value="engineering">الهندسة المائية والطاقة الشمسية</option>
                    <option value="logistics">الإغاثة واللوجستيات الميدانية</option>
                    <option value="media">الإعلام والتوثيق وصناعة المحتوى</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  {t.volunteer.skills}
                </label>
                <textarea
                  rows={2}
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="اللغات التي تتقنها، سنوات الخبرة، المهارات التقنية الميدانية..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  {t.volunteer.motivation}
                </label>
                <textarea
                  rows={3}
                  value={formData.motivation}
                  onChange={(e) => setFormData({ ...formData, motivation: e.target.value })}
                  placeholder="ما الذي يدفعك للمشاركة في خدمة شعوب الساحل الإفريقي؟"
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-red-600 hover:bg-red-500 text-white font-black py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-950/60 transition"
              >
                <Send className="w-4 h-4" />
                <span>{t.volunteer.submitBtn}</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
