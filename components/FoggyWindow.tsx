'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });

interface Props {
  onComplete: () => void;
}

export default function FoggyWindow({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [opacity, setOpacity] = useState(1);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      
      // Redraw fog on resize
      ctx.fillStyle = 'rgba(200, 210, 230, 0.85)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Add some "condensation" noise
      for (let i = 0; i < 500; i++) {
        ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
        ctx.beginPath();
        ctx.arc(Math.random() * canvas.width, Math.random() * canvas.height, Math.random() * 2, 0, Math.PI * 2);
        ctx.fill();
      }
    };
    
    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  const handleDraw = (x: number, y: number) => {
    const canvas = canvasRef.current;
    if (!canvas || isComplete) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.globalCompositeOperation = 'destination-out';
    ctx.beginPath();
    ctx.arc(x, y, 40, 0, Math.PI * 2);
    ctx.fill();

    // Check progress
    checkCompletion();
  };

  const checkCompletion = () => {
    // Simple heuristic: Decrease opacity based on interaction count or just trigger after some time
    // For performance, we won't scan pixel data on every move. 
    // Instead, we'll just fade out the whole window once the user has interacted enough.
  };

  // We'll use a simpler interaction counter for performance on mobile
  const interactionCount = useRef(0);
  const handleInteraction = (x: number, y: number) => {
    handleDraw(x, y);
    interactionCount.current += 1;
    
    if (interactionCount.current > 50 && !isComplete) {
      setIsComplete(true);
      setTimeout(onComplete, 1500); // Wait a bit then finish
    }
  };

  return (
    <motion.div 
      className="absolute inset-0 z-50 overflow-hidden bg-[url('https://images.unsplash.com/photo-1517639493569-5666a780fd6c?q=80&w=2560&auto=format&fit=crop')] bg-cover bg-center"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, transition: { duration: 2 } }}
    >
      {/* The "View" behind the window (Blurred initially) */}
      <div className="absolute inset-0 bg-black/20 backdrop-blur-[2px]" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 touch-none cursor-crosshair"
        onMouseMove={(e) => handleInteraction(e.clientX, e.clientY)}
        onTouchMove={(e) => handleInteraction(e.touches[0].clientX, e.touches[0].clientY)}
      />

      {/* Hint Text */}
      {!isComplete && (
        <motion.div 
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-slate-600 pointer-events-none ${font.className}`}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          <p className="text-2xl md:text-4xl tracking-widest uppercase font-bold opacity-50 mix-blend-overlay">Wipe the glass</p>
        </motion.div>
      )}
      
      {isComplete && (
        <motion.div 
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
      )}
    </motion.div>
  );
}
