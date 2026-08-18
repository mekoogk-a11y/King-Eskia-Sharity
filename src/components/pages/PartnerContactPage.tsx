import React, { useState } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import {
  Building,
  Mail,
  Phone,
  MapPin,
  Globe2,
  Handshake,
  Send,
  CheckCircle2,
  ShieldCheck,
  MessageCircle,
  Copy,
  Check,
  Radio,
  ExternalLink,
} from 'lucide-react';

export const PartnerContactPage: React.FC = () => {
  const { t } = useLanguage();
  const [partnerSubmitted, setPartnerSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);
  const [partnerData, setPartnerData] = useState({
    orgName: '',
    contactPerson: '',
    email: '',
    phone: '',
    partnershipType: 'institutional',
    notes: '',
  });

  const handlePartnerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!partnerData.orgName || !partnerData.email) return;
    setPartnerSubmitted(true);
  };

  const handleCopyWhatsapp = () => {
    navigator.clipboard.writeText('00249919980435');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const offices = [
    {
      country: 'جمهورية مالي (Mali)',
      city: 'باماكو (المقر الرئيسي)',
      address: 'حي أكاسيا - شارع النيجر، باماكو',
      phone: '00249919980435',
      email: 'mali@askiafoundation.org',
      flag: 'ML',
    },
    {
      country: 'بوركينا فاسو (Burkina Faso)',
      city: 'واغادوغو (المكتب الميداني)',
      address: 'منطقة كوادوغو - شارع الإنسانية، واغادوغو',
      phone: '00249919980435',
      email: 'burkina@askiafoundation.org',
      flag: 'BF',
    },
    {
      country: 'جمهورية النيجر (Niger)',
      city: 'نيامي (المكتب الإقليمي)',
      address: 'حي البلاطو - قرب طريق النهر، نيامي',
      phone: '00249919980435',
      email: 'niger@askiafoundation.org',
      flag: 'NE',
    },
  ];

  return (
    <div className="py-16 bg-stone-950 text-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 space-y-12">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-950/40 border border-emerald-800 text-emerald-400 text-xs font-bold">
            <Handshake className="w-3.5 h-3.5" />
            <span>الشراكات المؤسسية والتواصل الميداني</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-white">
            {t.contact.title}
          </h1>
          <p className="text-stone-300 text-base leading-relaxed">
            {t.contact.subtitle}
          </p>
        </div>

        {/* Dedicated Media and Public Relations Division WhatsApp Spotlight Card */}
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-emerald-950/60 via-stone-900 to-stone-950 border-2 border-emerald-500/40 p-6 sm:p-8 shadow-2xl">
          <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-start gap-4 sm:gap-5 text-center sm:text-start flex-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-emerald-600/20 border border-emerald-500/40 flex items-center justify-center text-emerald-400 flex-shrink-0 shadow-lg shadow-emerald-950/50">
                <MessageCircle className="w-8 h-8" />
              </div>
              <div className="space-y-1.5">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-700/60 text-emerald-300 text-[11px] font-bold">
                  <Radio className="w-3 h-3 animate-pulse text-emerald-400" />
                  <span>{t.contact.mediaDivisionTitle}</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-white">
                  للتواصل مع شعبة الإعلام والعلاقات العامة
                </h3>
                <p className="text-xs sm:text-sm text-stone-300 max-w-2xl leading-relaxed">
                  {t.contact.mediaDivisionSubtitle}
                </p>
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <span className="font-mono text-base sm:text-lg font-black text-emerald-400 bg-stone-950/80 px-3.5 py-1.5 rounded-xl border border-emerald-900/60 inline-flex items-center gap-2">
                    <span dir="ltr">00249919980435</span>
                  </span>
                  <button
                    onClick={handleCopyWhatsapp}
                    className="px-3 py-1.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 hover:text-white text-xs font-bold transition flex items-center gap-1.5 border border-stone-700"
                  >
                    {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copied ? 'تم النسخ' : 'نسخ الرقم'}</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
              <a
                href="https://wa.me/249919980435"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-emerald-700 hover:from-emerald-500 hover:to-emerald-600 text-white font-black py-3.5 px-6 rounded-2xl text-sm flex items-center justify-center gap-2.5 shadow-xl shadow-emerald-950/60 transition transform active:scale-95 border border-emerald-400/40"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>محادثة واتساب مباشرة</span>
                <ExternalLink className="w-4 h-4" />
              </a>

              <a
                href="tel:00249919980435"
                className="w-full sm:w-auto bg-stone-900 hover:bg-stone-800 text-stone-200 hover:text-white font-bold py-3.5 px-5 rounded-2xl text-sm flex items-center justify-center gap-2 border border-stone-700 transition"
              >
                <Phone className="w-4 h-4 text-emerald-400" />
                <span dir="ltr">00249919980435</span>
              </a>
            </div>
          </div>
        </div>

        {/* 3 Regional Sahel Headquarters Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offices.map((office, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-stone-900/60 border border-stone-800 space-y-4 shadow-xl"
            >
              <div className="flex items-center justify-between pb-3 border-b border-stone-800">
                <div className="font-bold text-white text-base">{office.city}</div>
                <span className="w-8 h-8 rounded-full bg-stone-950 border border-stone-700 flex items-center justify-center font-mono text-xs font-bold text-emerald-400">
                  {office.flag}
                </span>
              </div>

              <div className="space-y-3 text-xs text-stone-400">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                  <span>{office.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span dir="ltr" className="font-mono">{office.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                  <span className="font-mono">{office.email}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Strategic Partnership Inquiry Form */}
        <div className="bg-stone-900/80 rounded-3xl border border-stone-800 p-8 sm:p-12 shadow-2xl max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 rounded-2xl bg-emerald-950/60 border border-emerald-800 text-emerald-400">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-white">
                طلب شراكة استراتيجية أو تمويل برامجي
              </h2>
              <p className="text-xs text-stone-400">
                مخصص للمنظمات الإنسانية الدولية، الصناديق التنموية، وسفارات الدول المانحة.
              </p>
            </div>
          </div>

          {partnerSubmitted ? (
            <div className="text-center py-10 space-y-3 animate-fadeIn">
              <div className="w-14 h-14 rounded-full bg-emerald-950 border border-emerald-800 text-emerald-400 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white">تم استلام طلب الشراكة بنجاح</h3>
              <p className="text-xs text-stone-400 max-w-sm mx-auto">
                سيقوم مكتب العلاقات الدولية والتعاون الاستراتيجي بالتواصل معكم خلال 48 ساعة عمل.
              </p>
            </div>
          ) : (
            <form onSubmit={handlePartnerSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                    اسم المنظمة / الجهة المانحة *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerData.orgName}
                    onChange={(e) => setPartnerData({ ...partnerData, orgName: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                    اسم المسؤول والمسمى الوظيفي *
                  </label>
                  <input
                    type="text"
                    required
                    value={partnerData.contactPerson}
                    onChange={(e) => setPartnerData({ ...partnerData, contactPerson: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                    البريد الإلكتروني المؤسسي *
                  </label>
                  <input
                    type="email"
                    required
                    value={partnerData.email}
                    onChange={(e) => setPartnerData({ ...partnerData, email: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                    طبيعة الشراكة المستهدفة
                  </label>
                  <select
                    value={partnerData.partnershipType}
                    onChange={(e) => setPartnerData({ ...partnerData, partnershipType: e.target.value })}
                    className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500 font-bold"
                  >
                    <option value="institutional">تمويل برامجي ومشاريع تنموية كبرى</option>
                    <option value="water">شراكة حفر مجمعات مياه بالطاقة الشمسية</option>
                    <option value="education">منح وبناء مدارس ومراكز تدريب مهني</option>
                    <option value="medical">تجهيز قوافل طبية ومراكز صحية</option>
                    <option value="relief">استجابة طارئة وإغاثة غذائية</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-400 uppercase tracking-wider mb-2">
                  تفاصيل إضافية أو مقترح الشراكة
                </label>
                <textarea
                  rows={3}
                  value={partnerData.notes}
                  onChange={(e) => setPartnerData({ ...partnerData, notes: e.target.value })}
                  placeholder="أهداف التعاون، الميزانية التقديرية، النطاق الجغرافي المقترح..."
                  className="w-full bg-stone-950 border border-stone-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-emerald-500"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-4 px-6 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-xl shadow-emerald-950/60 transition"
              >
                <Send className="w-4 h-4" />
                <span>إرسال مقترح الشراكة</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

