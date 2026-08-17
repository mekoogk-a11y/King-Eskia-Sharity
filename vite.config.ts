import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import {defineConfig, Plugin} from 'vite';
import {GoogleGenAI} from '@google/genai';

function geminiApiPlugin(): Plugin {
  return {
    name: 'gemini-api-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (!req.url?.startsWith('/api/gemini/')) {
          return next();
        }

        const apiKey = process.env.GEMINI_API_KEY;

        let body = '';
        req.on('data', chunk => {
          body += chunk;
        });

        req.on('end', async () => {
          try {
            const parsedBody = body ? JSON.parse(body) : {};

            if (req.url === '/api/gemini/generate-script') {
              if (!apiKey) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on server' }));
                return;
              }

              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                  headers: { 'User-Agent': 'aistudio-build' },
                },
              });

              const { businessName, offer, category, tone, targetAudience, cta } = parsedBody;

              const prompt = `أنت خبير كاتب إعلانات صوتية وإذاعية محترف متخصص في اللهجة السودانية الدارجة الحماسية (Sudanese Arabic Dialect).
المطلوب: كتابة نص إعلان إذاعي تجاري حماسي جداً ومؤثر بصوت رجل بصياغة سودانية أصيلة 100%، يجذب الانتباه فوراً ويثير الرغبة في الشراء.

معلومات الإعلان:
- اسم النشاط أو المنتج: ${businessName || 'سوق البركة'}
- نوع النشاط: ${category || 'عروض وتخفيضات'}
- تفاصيل العرض: ${offer || 'تخفيضات كبرى تصل إلى 50% على جميع المنتجات'}
- نبرة الإعلان: ${tone || 'حماسية نارية وسريعة'}
- الجمهور المستهدف: ${targetAudience || 'الجميع'}
- الدعوة لاتخاذ إجراء (CTA): ${cta || 'اتصل الآن أو زورونا في موقعنا'}

تعليمات الصياغة:
1. استخدم كلمات وتعبيرات سودانية دارجة أصيلة وحماسية مثل: (يا زول، يا حبيبنا، أسمع الكلام دا، شغل نظيف، سعر في السلك، ما تفوت الفرصة، الحق قوام، كدا تمام، بالواضح، مفاجأة تكسر الأرض).
2. اجعل النص مقسم إلى:
   - عبارة افتتاحية خاطفة (Hook / صرخة الانتباه)
   - تفاصيل العرض الصاعق والمزايا
   - تحفيز فوري (الكمية محدودة / العرض لفترة قصيرة)
   - خاتمة قوية ومعلومات التواصل (CTA).
3. أخرج النتيجة بصيغة JSON فقط:
{
  "title": "عنوان الإعلان",
  "script": "النص الكامل للإعلان باللهجة السودانية",
  "voiceInstructions": "إرشادات الأداء للمؤدي الصوتي",
  "recommendedVoice": "Fenrir",
  "suggestedMusic": "sudanese-beat",
  "durationSeconds": 25
}`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.7-flash',
                contents: prompt,
                config: {
                  responseMimeType: 'application/json',
                },
              });

              const resultText = response.text || '{}';
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(resultText);
              return;
            }

            if (req.url === '/api/gemini/generate-tts') {
              if (!apiKey) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'GEMINI_API_KEY is not configured on server' }));
                return;
              }

              const ai = new GoogleGenAI({
                apiKey,
                httpOptions: {
                  headers: { 'User-Agent': 'aistudio-build' },
                },
              });

              const { text, voiceName = 'Fenrir' } = parsedBody;

              if (!text) {
                res.writeHead(400, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Text is required for TTS' }));
                return;
              }

              const spokenText = text.replace(/\[.*?\]/g, '').replace(/\(.*?\)/g, '').trim();
              const prompt = `Say enthusiastically in a strong, charismatic, high-energy male commercial announcer style with Sudanese Arabic expression: ${spokenText}`;

              const response = await ai.models.generateContent({
                model: 'gemini-3.1-flash-tts-preview',
                contents: [{ parts: [{ text: prompt }] }],
                config: {
                  responseModalities: ['AUDIO'],
                  speechConfig: {
                    voiceConfig: {
                      prebuiltVoiceConfig: { voiceName: voiceName || 'Fenrir' },
                    },
                  },
                },
              });

              const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
              const mimeType = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.mimeType || 'audio/pcm;rate=24000';

              if (!base64Audio) {
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'No audio generated by model' }));
                return;
              }

              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({
                audioBase64: base64Audio,
                mimeType: mimeType,
                sampleRate: 24000,
              }));
              return;
            }

            res.writeHead(404, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'API endpoint not found' }));
          } catch (err: unknown) {
            console.error('API Server Error:', err);
            const errorMessage = err instanceof Error ? err.message : 'Internal server error';
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: errorMessage }));
          }
        });
      });
    },
  };
}

export default defineConfig(() => {
  return {
    plugins: [react(), tailwindcss(), geminiApiPlugin()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      },
    },
    server: {
      hmr: process.env.DISABLE_HMR !== 'true',
      watch: process.env.DISABLE_HMR === 'true' ? null : {},
    },
  };
});
