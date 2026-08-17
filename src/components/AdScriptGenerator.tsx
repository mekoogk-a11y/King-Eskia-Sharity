import React, { useState } from 'react';
import { generateSudaneseScript } from '../services/geminiService';
import { GeneratedCommercial, VoiceId, MusicTrackId } from '../types';
import { Sparkles, Wand2, Loader2, Play, Flame } from 'lucide-react';

interface AdScriptGeneratorProps {
  onCommercialGenerated: (commercial: GeneratedCommercial, autoPlay?: boolean) => void;
  selectedVoiceId: VoiceId;
}

export const AdScriptGenerator: React.FC<AdScriptGeneratorProps> = ({
  onCommercialGenerated,
  selectedVoiceId,
}) => {
  const [businessName, setBusinessName] = useState('');
  const [category, setCategory] = useState('عروض وتخفيضات');
  const [offer, setOffer] = useState('');
  const [tone, setTone] = useState('حماسي ناري وسريع (ود بلد)');
  const [cta, setCta] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [lastGenerated, setLastGenerated] = useState<GeneratedCommercial | null>(null);

  const categories = [
    'عروض وتخفيضات',
    'مطاعم ومأكولات ومقاهي',
    'سيارات ونقل وخدمات صيانة',
    'عقارات ومخططات سكنية',
    'تقنية وتطبيقات وتوصيل',
    'مهرجانات واحتفالات وافتتاح',
    'صحة وعيادات وأدوية',
    'ملابس وأزياء وساعات',
  ];

  const tones = [
    'حماسي ناري وسريع (ود بلد)',
    'إيقاع صاروخي عاجل (تخفيضات خاطفة)',
    'فخم ووقور ومقنع (استثمار وشركات)',
    'شبابي عصري ومرح (تطبيقات وتوصيل)',
    'مذيع تلفزيوني وإذاعي جهوري',
  ];

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!businessName.trim()) return;

    setIsGenerating(true);
    try {
      const res = await generateSudaneseScript({
        businessName,
        category,
        offer,
        tone,
        cta,
      });

      const newCommercial: GeneratedCommercial = {
        id: `custom-${Date.now()}`,
        title: res.title,
        script: res.script,
        category,
        voiceInstructions: res.voiceInstructions,
        recommendedVoice: res.recommendedVoice || selectedVoiceId,
        suggestedMusic: res.suggestedMusic || 'sudanese-rhythm',
        durationSeconds: res.durationSeconds,
        createdAt: Date.now(),
      };

      setLastGenerated(newCommercial);
      onCommercialGenerated(newCommercial, true);
    } catch (err) {
      console.error(err);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleQuickTemplate = (name: string, cat: string, off: string, callToAction: string) => {
    setBusinessName(name);
    setCategory(cat);
    setOffer(off);
    setCta(callToAction);
  };

  return (
    <div id="ai-script-generator-panel" className="bg-stone-900/90 border border-stone-800 rounded-2xl p-4 shadow-xl space-y-4">
      <div className="flex items-center justify-between pb-2 border-b border-stone-800">
        <div className="flex items-center gap-2">
          <Wand2 className="w-4 h-4 text-amber-500" />
          <h3 className="font-bold text-sm text-stone-100">مولّد الإعلانات الذكي بالعامية السودانية (AI Ad Copywriter)</h3>
        </div>
        <span className="text-[11px] text-amber-400 bg-amber-950/40 border border-amber-800/30 px-2 py-0.5 rounded">
          مدعوم بنموذج Gemini 3.7
        </span>
      </div>

      {/* Quick inspiration chips */}
      <div className="space-y-1.5">
        <span className="text-[11px] text-stone-400 font-medium">أفكار سريعة جاهزة للتعبئة:</span>
        <div className="flex flex-wrap gap-1.5">
          <button
            type="button"
            onClick={() => handleQuickTemplate('سوبرماركت التوفير', 'عروض وتخفيضات', 'خصومات 40% على جميع المواد الغذائية واشترِ كيس سكر واحصل على زيت مجاناً', 'اتصل الآن للتوصيل السريع 0912345678')}
            className="text-[11px] bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-amber-500/40 px-2.5 py-1 rounded-lg transition"
          >
            🛒 سوبرماركت التوفير
          </button>
          <button
            type="button"
            onClick={() => handleQuickTemplate('مطعم شيّة ود الحلال', 'مطاعم ومأكولات ومقاهي', 'شية جمر وسلات وأقاشي ضان بلدي مع صوصات خاصة وعصير مجاني', 'موقعنا شارع النيل، تفضلوا بزيارتنا الليلة')}
            className="text-[11px] bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-amber-500/40 px-2.5 py-1 rounded-lg transition"
          >
            🥩 مطعم شية بلدي
          </button>
          <button
            type="button"
            onClick={() => handleQuickTemplate('تطبيق واصل للتوصيل', 'تقنية وتطبيقات وتوصيل', 'توصيل مجاني لأول 3 طلبات وخصم 20% بكود (سودان2026)', 'حمّل التطبيق الآن من متجر بلاي')}
            className="text-[11px] bg-stone-950 hover:bg-stone-800 text-stone-300 border border-stone-800 hover:border-amber-500/40 px-2.5 py-1 rounded-lg transition"
          >
            📱 تطبيق توصيل سريع
          </button>
        </div>
      </div>

      <form onSubmit={handleGenerate} className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              اسم المتجر / الشركة / المنتج:
            </label>
            <input
              id="business-name-input"
              type="text"
              required
              placeholder="مثلاً: محلات البركة للإلكترونيات"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-100 text-xs rounded-xl p-2.5 focus:border-amber-500 outline-none placeholder:text-stone-600"
            />
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              المجال أو النشاط التجاري:
            </label>
            <select
              id="category-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-100 text-xs rounded-xl p-2.5 focus:border-amber-500 outline-none"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="text-xs font-semibold text-stone-300 block mb-1">
            العرض الخارق أو الميزة التنافسية:
          </label>
          <textarea
            id="offer-input"
            rows={2}
            placeholder="مثلاً: خصومات تصل لـ 50% وضمان سنة كاملة وتوصيل مجاني لباب البيت..."
            value={offer}
            onChange={(e) => setOffer(e.target.value)}
            className="w-full bg-stone-950 border border-stone-800 text-stone-100 text-xs rounded-xl p-2.5 focus:border-amber-500 outline-none placeholder:text-stone-600 resize-none"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              نبرة الإلقاء الحماسي:
            </label>
            <select
              id="tone-select"
              value={tone}
              onChange={(e) => setTone(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-100 text-xs rounded-xl p-2.5 focus:border-amber-500 outline-none"
            >
              {tones.map((t) => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-semibold text-stone-300 block mb-1">
              رقم التواصل / مكان المعرض (CTA):
            </label>
            <input
              id="cta-input"
              type="text"
              placeholder="مثلاً: اتصل هسع 09xxxxxxx أو زورونا في السوق العربي"
              value={cta}
              onChange={(e) => setCta(e.target.value)}
              className="w-full bg-stone-950 border border-stone-800 text-stone-100 text-xs rounded-xl p-2.5 focus:border-amber-500 outline-none placeholder:text-stone-600"
            />
          </div>
        </div>

        <button
          type="submit"
          id="generate-ad-btn"
          disabled={isGenerating || !businessName.trim()}
          className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-500 via-orange-500 to-red-600 hover:from-amber-400 hover:to-red-500 text-stone-950 font-black text-sm shadow-lg shadow-amber-500/20 flex items-center justify-center gap-2 transition disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.99]"
        >
          {isGenerating ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>جاري صياغة وتوليد الإعلان السوداني الحماسي...</span>
            </>
          ) : (
            <>
              <Sparkles className="w-4 h-4 fill-stone-950" />
              <span>توليد إعلان حماسي جديد بصوت سوداني 🎙️</span>
            </>
          )}
        </button>
      </form>

      {lastGenerated && (
        <div className="bg-stone-950 border border-amber-500/40 rounded-xl p-3.5 space-y-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5" />
              <span>{lastGenerated.title}</span>
            </span>
            <span className="text-[11px] text-stone-400">~{lastGenerated.durationSeconds} ثانية</span>
          </div>

          <p className="text-xs text-stone-200 bg-stone-900/80 p-3 rounded-lg border border-stone-800 leading-relaxed font-sans whitespace-pre-line">
            {lastGenerated.script}
          </p>

          <div className="flex justify-end">
            <button
              onClick={() => onCommercialGenerated(lastGenerated, true)}
              className="text-xs font-bold bg-amber-500 text-stone-950 px-3 py-1.5 rounded-lg flex items-center gap-1.5 hover:bg-amber-400 transition"
            >
              <Play className="w-3 h-3 fill-current" />
              <span>تشغيل الإعلان المولد الآن</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
