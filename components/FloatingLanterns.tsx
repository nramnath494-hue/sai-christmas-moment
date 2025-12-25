'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import { Send, Sparkles } from 'lucide-react';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

interface Props {
  onComplete: () => void;
}

export default function FloatingLanterns({ onComplete }: Props) {
  const [wish, setWish] = useState("");
  const [released, setReleased] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Background Lantern Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const lanterns: { x: number; y: number; speed: number; size: number; wobble: number }[] = [];

    for (let i = 0; i < 50; i++) {
      lanterns.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height + canvas.height, // Start below or scattered
        speed: Math.random() * 1 + 0.5,
        size: Math.random() * 20 + 10,
        wobble: Math.random() * Math.PI * 2
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient sky
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lanterns.forEach(l => {
        l.y -= l.speed;
        l.x += Math.sin(l.wobble) * 0.5;
        l.wobble += 0.02;

        // Reset if off screen
        if (l.y < -50) {
          l.y = canvas.height + 50;
          l.x = Math.random() * canvas.width;
        }

        // Draw Lantern
        ctx.shadowBlur = 15;
        ctx.shadowColor = '#fbbf24';
        ctx.fillStyle = 'rgba(251, 191, 36, 0.8)';
        ctx.beginPath();
        ctx.ellipse(l.x, l.y, l.size * 0.6, l.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      requestAnimationFrame(animate);
    };
    animate();
  }, []);

  const handleRelease = () => {
    if (!wish.trim()) return;
    setReleased(true);
    setTimeout(onComplete, 4000); // Wait for animation before moving on
  };

  return (
    <motion.div 
      className={`absolute inset-0 overflow-hidden ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <canvas ref={canvasRef} className="absolute inset-0 z-0" />

      <div className="absolute inset-0 z-10 flex flex-col items-center justify-center p-6">
        <AnimatePresence mode="wait">
          {!released ? (
            <motion.div 
              key="input"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ y: -500, opacity: 0, transition: { duration: 2, ease: "easeIn" } }}
              className="w-full max-w-md bg-black/30 backdrop-blur-sm border border-amber-500/30 p-8 rounded-t-full rounded-b-2xl shadow-[0_0_50px_rgba(245,158,11,0.2)] flex flex-col items-center text-center"
            >
              <h2 className={`text-4xl text-amber-100 mb-2 ${scriptFont.className}`}>Make a Wish</h2>
              <p className="text-amber-200/70 text-sm mb-6 uppercase tracking-widest">Light it up & let it go</p>
              
              <input
                type="text"
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                placeholder="I wish for..."
                className="w-full bg-transparent border-b border-amber-500/50 text-center text-amber-100 text-xl py-2 focus:outline-none focus:border-amber-300 placeholder:text-amber-500/30 mb-8"
                autoFocus
              />

              <button
                onClick={handleRelease}
                disabled={!wish.trim()}
                className={`
                  group relative px-8 py-3 rounded-full transition-all duration-500
                  ${wish.trim() ? 'bg-amber-500 text-amber-950 shadow-[0_0_20px_rgba(245,158,11,0.6)] hover:shadow-[0_0_40px_rgba(245,158,11,0.8)] hover:scale-105' : 'bg-white/5 text-white/20'}
                `}
              >
                <span className="flex items-center gap-2 font-semibold tracking-wide">
                  Release Lantern <Send size={16} className={wish.trim() ? "group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" : ""} />
                </span>
              </button>
            </motion.div>
          ) : (
            <motion.div
              key="flying"
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: -window.innerHeight / 2, opacity: 1 }}
              transition={{ duration: 3, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              {/* The User's Lantern Flying Up */}
              <div className="relative">
                <div className="w-32 h-48 bg-gradient-to-b from-amber-200 to-amber-600 rounded-full opacity-90 blur-sm animate-pulse" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <p className={`text-amber-900 text-lg font-bold ${scriptFont.className} rotate-[-5deg]`}>
                    {wish}
                  </p>
                </div>
              </div>
              <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }}
                className="mt-8 text-amber-100/80 text-xl tracking-widest uppercase font-light"
              >
                May it come true...
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}