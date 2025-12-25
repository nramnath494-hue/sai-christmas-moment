'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import { Send, Sparkles } from 'lucide-react';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

const FLOATING_MESSAGES = [
  "Hope", "Love", "Joy", "Peace", "Dreams", "Magic", "Forever", "Sparkle", "Wishes"
];

const SPECIAL_MESSAGES = [
  "I liked imagining you here…",
  "On a quiet Christmas night.",
  "That felt nice."
];

interface Props {
  onComplete: () => void;
}

export default function FloatingLanterns({ onComplete }: Props) {
  const [wish, setWish] = useState("");
  const [released, setReleased] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const lanternsRef = useRef<{ x: number; y: number; speed: number; size: number; wobble: number; text?: string; isSpecial?: boolean }[]>([]);

  // Background Lantern Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    // Animation Loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Draw gradient sky
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#0f172a');
      gradient.addColorStop(1, '#1e1b4b');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lanternsRef.current.forEach(l => {
        l.y -= l.speed;
        l.x += Math.sin(l.wobble) * 0.5;
        l.wobble += 0.02;

        // Reset if off screen
        if (l.y < -50) {
          l.y = canvas.height + 50;
          l.x = Math.random() * canvas.width;
        }

        // Draw Lantern
        ctx.shadowBlur = l.isSpecial ? 30 : 15;
        ctx.shadowColor = l.isSpecial ? '#ffaa00' : '#fbbf24';
        ctx.fillStyle = 'rgba(251, 191, 36, 0.8)';
        ctx.beginPath();
        ctx.ellipse(l.x, l.y, l.size * 0.6, l.size, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw Text if present
        if (l.text) {
          const fontSize = l.isSpecial ? 16 : l.size * 0.6;
          ctx.fillStyle = l.isSpecial ? 'rgba(255, 255, 255, 0.95)' : 'rgba(255, 255, 255, 0.6)';
          ctx.font = `${l.isSpecial ? 'italic ' : ''}${fontSize}px serif`;
          ctx.textAlign = 'center';
          ctx.fillText(l.text, l.x, l.y + l.size * 2.5);
        }
      });

      requestAnimationFrame(animate);
    };
    animate();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Populate lanterns ONLY after release
  useEffect(() => {
    if (released) {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // 1. Special Messages (In Order)
      SPECIAL_MESSAGES.forEach((msg, index) => {
        lanternsRef.current.push({
          x: canvas.width / 2 + (Math.random() - 0.5) * 200, // Centered-ish
          y: canvas.height + 100 + (index * 350), // Spaced out vertically in order
          speed: 0.5, // Consistent speed
          size: 22, // Slightly larger
          wobble: Math.random() * Math.PI * 2,
          text: msg,
          isSpecial: true
        });
      });

      // 2. Random Messages (After special ones)
      for (let i = 0; i < 35; i++) {
        const text = Math.random() > 0.6 ? FLOATING_MESSAGES[Math.floor(Math.random() * FLOATING_MESSAGES.length)] : undefined;
        lanternsRef.current.push({
          x: Math.random() * canvas.width,
          y: canvas.height + 100 + (SPECIAL_MESSAGES.length * 350) + (Math.random() * 1200), // Start after special messages
          speed: Math.random() * 0.3 + 0.3,
          size: Math.random() * 10 + 15,
          wobble: Math.random() * Math.PI * 2,
          text: text,
          isSpecial: false
        });
      }
    }
  }, [released]);

  const handleRelease = () => {
    if (!wish.trim()) return;
    setReleased(true);
    setTimeout(onComplete, 25000); // Wait 25s to ensure they reach the top
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
              transition={{ duration: 15, ease: "easeInOut" }}
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