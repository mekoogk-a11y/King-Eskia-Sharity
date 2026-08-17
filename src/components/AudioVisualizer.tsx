import React, { useEffect, useRef } from 'react';
import { audioEngine } from '../utils/audioSynthesizer';

interface AudioVisualizerProps {
  isPlaying: boolean;
  voiceName: string;
}

export const AudioVisualizer: React.FC<AudioVisualizerProps> = ({ isPlaying, voiceName }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const analyser = audioEngine.getAnalyser();

      if (analyser && isPlaying) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const barCount = 48;
        const barWidth = (width / barCount) - 3;
        let x = 0;

        for (let i = 0; i < barCount; i++) {
          const dataIndex = Math.floor((i / barCount) * (bufferLength * 0.75));
          const value = dataArray[dataIndex] || 0;
          const percent = value / 255;
          const barHeight = Math.max(6, percent * (height * 0.85));
          const y = height - barHeight;

          // Gradient from intense amber/orange to hot red
          const gradient = ctx.createLinearGradient(0, height, 0, 0);
          gradient.addColorStop(0, '#d97706'); // amber-600
          gradient.addColorStop(0.6, '#f97316'); // orange-500
          gradient.addColorStop(1, '#ef4444'); // red-500

          ctx.fillStyle = gradient;
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0]);
          ctx.fill();

          // Top glow cap
          if (barHeight > 15) {
            ctx.fillStyle = '#fef08a'; // yellow glow
            ctx.fillRect(x, y, barWidth, 3);
          }

          x += barWidth + 3;
        }

        // Center Waveform overlay
        const timeDomainData = new Uint8Array(bufferLength);
        analyser.getByteTimeDomainData(timeDomainData);

        ctx.lineWidth = 2;
        ctx.strokeStyle = 'rgba(254, 240, 138, 0.45)';
        ctx.beginPath();
        const sliceWidth = width / bufferLength;
        let waveX = 0;
        for (let i = 0; i < bufferLength; i++) {
          const v = timeDomainData[i] / 128.0;
          const waveY = (v * height) / 2;
          if (i === 0) {
            ctx.moveTo(waveX, waveY);
          } else {
            ctx.lineTo(waveX, waveY);
          }
          waveX += sliceWidth;
        }
        ctx.stroke();
      } else {
        // Idle ambient subtle pulse
        const barCount = 48;
        const barWidth = (width / barCount) - 3;
        let x = 0;
        const time = Date.now() * 0.003;

        for (let i = 0; i < barCount; i++) {
          const wave = Math.sin(time + i * 0.25) * 0.5 + 0.5;
          const barHeight = 8 + wave * 16;
          const y = height - barHeight;

          ctx.fillStyle = 'rgba(217, 119, 6, 0.25)';
          ctx.beginPath();
          ctx.roundRect(x, y, barWidth, barHeight, [3, 3, 0, 0]);
          ctx.fill();

          x += barWidth + 3;
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isPlaying]);

  return (
    <div id="audio-visualizer-container" className="relative w-full bg-gradient-to-b from-stone-900 to-stone-950 border border-stone-800 rounded-2xl p-4 overflow-hidden shadow-2xl">
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(249,115,22,0.15),transparent_70%)] pointer-events-none" />
      
      <div className="flex items-center justify-between mb-3 z-10 relative">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${isPlaying ? 'bg-red-500 animate-ping' : 'bg-stone-600'}`} />
          <span className="text-xs font-semibold uppercase tracking-wider text-stone-300">
            {isPlaying ? 'بث مباشر للاستوديو • ON AIR' : 'الاستوديو جاهز • READY'}
          </span>
        </div>
        <div className="text-xs text-amber-400 font-medium bg-amber-950/60 border border-amber-800/40 px-2.5 py-1 rounded-full flex items-center gap-1.5">
          <span>🎙️</span>
          <span>{voiceName}</span>
        </div>
      </div>

      <div className="relative h-28 w-full">
        <canvas
          id="audio-canvas"
          ref={canvasRef}
          width={700}
          height={120}
          className="w-full h-full block rounded-lg"
        />
      </div>

      <div className="flex justify-between items-center mt-2 text-[11px] text-stone-400 border-t border-stone-800/80 pt-2 font-mono">
        <span>20 Hz (SUB BASS)</span>
        <span className="text-amber-500 font-semibold">{isPlaying ? '🔥 إيقاع وحماس ناري' : 'وضع الاستعداد'}</span>
        <span>20 kHz (HIGH AIR)</span>
      </div>
    </div>
  );
};
