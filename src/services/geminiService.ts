import { VoiceId, MusicTrackId } from '../types';

export interface GenerateScriptParams {
  businessName: string;
  category: string;
  offer: string;
  tone: string;
  targetAudience?: string;
  cta?: string;
}

export interface GeneratedScriptResponse {
  title: string;
  script: string;
  voiceInstructions: string;
  recommendedVoice: VoiceId;
  suggestedMusic: MusicTrackId;
  durationSeconds: number;
}

export interface GenerateTtsResponse {
  audioBase64: string;
  mimeType: string;
  sampleRate: number;
}

export async function generateSudaneseScript(params: GenerateScriptParams): Promise<GeneratedScriptResponse> {
  try {
    const response = await fetch('/api/gemini/generate-script', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      const errJson = await response.json().catch(() => ({}));
      throw new Error(errJson.error || `HTTP error ${response.status}`);
    }

    const data = await response.json();
    return {
      title: data.title || `إعلان حماسي: ${params.businessName}`,
      script: data.script || '',
      voiceInstructions: data.voiceInstructions || 'نبرة حماسية قوية بالعامية السودانية',
      recommendedVoice: (data.recommendedVoice as VoiceId) || 'Fenrir',
      suggestedMusic: (data.suggestedMusic as MusicTrackId) || 'sudanese-rhythm',
      durationSeconds: data.durationSeconds || 25,
    };
  } catch (error) {
    console.warn('Backend Gemini API script generation failed or offline, using high-energy fallback template:', error);
    // Dynamic authentic fallback script in high-energy Sudanese dialect
    const templates = [
      `يا زووول! أسمع الكلام دا كويس وركز معاي!
الليلة جايبين ليك المفاجأة الكبرى من "${params.businessName}"!
${params.offer || 'عروض نارية وتخفيضات تكسر السوق كسر تصل لغاية 50%'}!
شغل نظيف وعلى أصولو.. وسعر في السلك ما حتلقى زيو في أي مكان تاني!
ما تقعد تفكر كتير، الكمية محدودة والطلب بالكوم!
${params.cta || 'ألحق قوااام، اتصل هسع والطلب بصلك لحدي باب بيتك'}!
${params.businessName}.. كدا تمام ومية مية!`,
      `يا حبيبنا، العرض دا معمول مخصوص عشانك!
مع "${params.businessName}" ودّع الغلاء وعيش الراحة الحقيقية!
بنقدّم ليك: ${params.offer || 'أقوى العروض الحصرية مع هدايا فورية وسحب على جوائز قيمة'}!
جودة مضمونة وخدمة ود بلد أصيل وسريعة جداً!
الفرصة بتجي مرة واحدة وما بتتفوت..
${params.cta || 'زورنا اليوم أو تواصل معانا عبر الواتساب واحجز طلبك فورا'}!
${params.businessName}.. اختيارك الأكيد!`,
    ];

    return {
      title: `إعلان حماسي لـ ${params.businessName}`,
      script: templates[Math.floor(Math.random() * templates.length)],
      voiceInstructions: 'نبرة صوت رجالي سوداني جهوري عالي الحماس والسرعة والتشويق.',
      recommendedVoice: 'Fenrir',
      suggestedMusic: 'sudanese-rhythm',
      durationSeconds: 28,
    };
  }
}

export async function generateSudaneseTtsVoice(text: string, voiceName: VoiceId): Promise<GenerateTtsResponse | null> {
  try {
    const response = await fetch('/api/gemini/generate-tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, voiceName }),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.warn('TTS Server Endpoint Response:', err);
      return null;
    }

    const data = await response.json();
    if (data.audioBase64) {
      return {
        audioBase64: data.audioBase64,
        mimeType: data.mimeType || 'audio/pcm;rate=24000',
        sampleRate: data.sampleRate || 24000,
      };
    }
    return null;
  } catch (error) {
    console.warn('TTS request error, using Web Audio speech engine fallback:', error);
    return null;
  }
}
