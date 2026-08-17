import React, { useState, useRef, useEffect } from 'react';
import { Mic, Square, Play, RotateCcw, Volume2, Download, X, Sparkles } from 'lucide-react';
import { audioEngine } from '../utils/audioSynthesizer';

interface RecordBoothModalProps {
  isOpen: boolean;
  onClose: () => void;
  scriptText: string;
  title: string;
}

export const RecordBoothModal: React.FC<RecordBoothModalProps> = ({
  isOpen,
  onClose,
  scriptText,
  title,
}) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [recordingSeconds, setRecordingSeconds] = useState(0);
  const [isPlayingRecorded, setIsPlayingRecorded] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const timerRef = useRef<number | null>(null);
  const audioElementRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, []);

  if (!isOpen) return null;

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioChunksRef.current = [];
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        const url = URL.createObjectURL(audioBlob);
        setRecordedAudioUrl(url);
        stream.getTracks().forEach((track) => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setRecordingSeconds(0);

      // Start background beat for energetic rhythm during recording
      audioEngine.startBackgroundMusic('sudanese-rhythm', 0.2);

      timerRef.current = window.setInterval(() => {
        setRecordingSeconds((prev) => prev + 1);
      }, 1000);
    } catch (err) {
      console.error('Microphone error:', err);
      alert('يرجى السماح بصلاحية المايكروفون لبدء التسجيل الصوتي.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
      audioEngine.stopBackgroundMusic();
    }
  };

  const playRecorded = () => {
    if (!recordedAudioUrl) return;
    if (audioElementRef.current) {
      audioElementRef.current.pause();
    }

    const audio = new Audio(recordedAudioUrl);
    audioElementRef.current = audio;
    setIsPlayingRecorded(true);

    audio.onended = () => {
      setIsPlayingRecorded(false);
    };

    audio.play();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-stone-900 border border-stone-800 rounded-3xl w-full max-w-xl p-6 shadow-2xl space-y-4 text-stone-100 relative">
        <button
          onClick={onClose}
          className="absolute top-4 left-4 text-stone-400 hover:text-stone-100 p-2 rounded-xl bg-stone-950/80 border border-stone-800"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center gap-2 pb-3 border-b border-stone-800">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-amber-500 to-red-600 flex items-center justify-center font-bold">
            <Mic className="w-5 h-5 text-stone-950" />
          </div>
          <div>
            <h3 className="font-black text-sm">كابينة التسجيل الصوتي المباشر (Mic Recording Booth)</h3>
            <p className="text-[11px] text-stone-400">سجّل صوتك الحماسي مباشرة مع نغمات الاستوديو</p>
          </div>
        </div>

        {/* Script Display for Prompter */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs font-semibold text-amber-400">
            <span>النص الإعلاني المقترح للتسجيل:</span>
            <span className="text-stone-400 font-normal">{title}</span>
          </div>
          <div className="bg-stone-950 p-4 rounded-2xl border border-stone-800 max-h-48 overflow-y-auto font-sans leading-relaxed text-sm text-stone-200">
            {scriptText}
          </div>
        </div>

        {/* Recording Controls */}
        <div className="bg-stone-950/80 p-4 rounded-2xl border border-stone-800/80 flex flex-col items-center justify-center gap-3">
          <div className="flex items-center gap-2">
            <span className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-ping' : 'bg-stone-600'}`} />
            <span className="text-sm font-mono font-bold">
              {isRecording ? `جاري التسجيل: ${recordingSeconds}s` : recordedAudioUrl ? 'تم التسجيل بنجاح' : 'جاهز للتسجيل'}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {!isRecording ? (
              <button
                onClick={startRecording}
                className="bg-red-600 hover:bg-red-500 text-white font-bold px-6 py-3 rounded-2xl flex items-center gap-2 shadow-lg shadow-red-600/30 transition active:scale-95"
              >
                <Mic className="w-4 h-4" />
                <span>ابدأ التسجيل بالمايك</span>
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="bg-stone-800 hover:bg-stone-700 text-red-400 font-bold px-6 py-3 rounded-2xl flex items-center gap-2 border border-red-500/40 animate-pulse transition"
              >
                <Square className="w-4 h-4 fill-current" />
                <span>إيقاف وحفظ التسجيل</span>
              </button>
            )}

            {recordedAudioUrl && !isRecording && (
              <button
                onClick={playRecorded}
                className="bg-amber-500 hover:bg-amber-400 text-stone-950 font-bold px-5 py-3 rounded-2xl flex items-center gap-2 shadow-lg transition"
              >
                <Play className="w-4 h-4 fill-current" />
                <span>{isPlayingRecorded ? 'جاري الاستماع...' : 'استمع لصوتك'}</span>
              </button>
            )}
          </div>

          {recordedAudioUrl && (
            <div className="flex gap-2 pt-2">
              <a
                href={recordedAudioUrl}
                download="My_Sudanese_Ad_Voice.webm"
                className="text-xs text-stone-300 hover:text-white bg-stone-900 border border-stone-800 px-3 py-1.5 rounded-xl flex items-center gap-1.5 transition"
              >
                <Download className="w-3 h-3" />
                <span>تحميل تسجيلك المباشر</span>
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
