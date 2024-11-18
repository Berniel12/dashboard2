'use client';

import React, { useEffect, useRef } from 'react';

interface AudioVisualizerProps {
  isListening: boolean;
  isSpeaking: boolean;
  analyser: AnalyserNode | null;
}

export default function AudioVisualizer({ isListening, isSpeaking, analyser }: AudioVisualizerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const draw = () => {
      if (!ctx) return;

      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      if ((isListening || isSpeaking) && analyser) {
        const bufferLength = analyser.frequencyBinCount;
        const dataArray = new Uint8Array(bufferLength);
        analyser.getByteFrequencyData(dataArray);

        const barWidth = width / bufferLength;
        const centerY = height / 2;
        const maxHeight = height / 2;

        ctx.beginPath();
        ctx.moveTo(0, centerY);

        for (let i = 0; i < bufferLength; i++) {
          const x = i * barWidth;
          const amplitude = dataArray[i] / 255;
          const y = centerY + (Math.sin(i + Date.now() / 200) * amplitude * maxHeight);

          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        for (let i = bufferLength - 1; i >= 0; i--) {
          const x = i * barWidth;
          const amplitude = dataArray[i] / 255;
          const y = centerY - (Math.sin(i + Date.now() / 200) * amplitude * maxHeight);
          ctx.lineTo(x, y);
        }

        ctx.closePath();
        
        const gradient = ctx.createLinearGradient(0, 0, width, 0);
        if (isListening) {
          gradient.addColorStop(0, 'rgba(59, 130, 246, 0.2)');
          gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.4)');
          gradient.addColorStop(1, 'rgba(59, 130, 246, 0.2)');
        } else {
          gradient.addColorStop(0, 'rgba(52, 211, 153, 0.2)');
          gradient.addColorStop(0.5, 'rgba(52, 211, 153, 0.4)');
          gradient.addColorStop(1, 'rgba(52, 211, 153, 0.2)');
        }
        
        ctx.fillStyle = gradient;
        ctx.fill();
      } else {
        // Idle animation
        ctx.beginPath();
        ctx.moveTo(0, height / 2);
        
        for (let i = 0; i < width; i++) {
          const y = height / 2 + Math.sin(i * 0.05 + Date.now() / 1000) * 2;
          ctx.lineTo(i, y);
        }
        
        ctx.strokeStyle = 'rgba(156, 163, 175, 0.3)';
        ctx.lineWidth = 2;
        ctx.stroke();
      }

      animationRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isListening, isSpeaking, analyser]);

  return (
    <canvas
      ref={canvasRef}
      width={300}
      height={60}
      className="w-full h-[30px]"
    />
  );
} 