'use client';
import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import { ArrowRight } from 'lucide-react';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

interface Props {
  onComplete: () => void;
}

export default function FireflyGarden({ onComplete }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };

    const fireflies: Firefly[] = [];
    let mouseX = width / 2;
    let mouseY = height / 2;

    class Firefly {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      t: number;
      color: string;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.vx = (Math.random() - 0.5) * 2;
        this.vy = (Math.random() - 0.5) * 2;
        this.size = Math.random() * 2 + 1;
        this.alpha = Math.random();
        this.t = Math.random() * 100;
        const colors = [
          '253, 224, 71', // Gold
          '239, 68, 68',  // Red
          '34, 197, 94',  // Green
          '255, 255, 255' // White
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        // Attract to mouse
        const dx = mouseX - this.x;
        const dy = mouseY - this.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist > 50) {
          this.vx += dx * 0.0001;
          this.vy += dy * 0.0001;
        }

        // Random movement
        this.vx += (Math.random() - 0.5) * 0.05;
        this.vy += (Math.random() - 0.5) * 0.05;

        // Dampen
        this.vx *= 0.99;
        this.vy *= 0.99;

        this.x += this.vx;
        this.y += this.vy;
        this.t += 0.05;
        this.alpha = 0.5 + 0.5 * Math.sin(this.t);
      }

      draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
        // Glow
        ctx.fillStyle = `rgba(${this.color}, ${this.alpha * 0.3})`;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size * 4, 0, Math.PI * 2);
        ctx.fill();
      }
    }

    const particleCount = width < 768 ? 80 : 150;
    for (let i = 0; i < particleCount; i++) {
      fireflies.push(new Firefly());
    }

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      fireflies.forEach(f => {
        f.update();
        f.draw(ctx);
      });
      requestAnimationFrame(animate);
    };
    animate();

    const handleMove = (e: MouseEvent | TouchEvent) => {
      if ('touches' in e) {
        mouseX = e.touches[0].clientX;
        mouseY = e.touches[0].clientY;
      } else {
        mouseX = (e as MouseEvent).clientX;
        mouseY = (e as MouseEvent).clientY;
      }
    };

    window.addEventListener('mousemove', handleMove);
    window.addEventListener('touchmove', handleMove);
    window.addEventListener('resize', handleResize);
    setTimeout(() => setShowButton(true), 6000);

    return () => {
      window.removeEventListener('mousemove', handleMove);
      window.removeEventListener('touchmove', handleMove);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <motion.div 
      className={`absolute inset-0 bg-[#020617] overflow-hidden ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1543589077-47d81606c1bf?q=80&w=2546&auto=format&fit=crop')] bg-cover bg-center opacity-30" />
      <canvas ref={canvasRef} className="absolute inset-0 z-10" />
      
      <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
        <motion.h2 
          initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 2, delay: 1 }}
          className={`text-4xl md:text-6xl text-amber-100 text-center px-4 drop-shadow-[0_0_15px_rgba(251,191,36,0.5)] ${scriptFont.className}`}
        >
          Wishing you a magical Christmas...
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3 }}
          className="text-amber-200/60 mt-4 text-sm md:text-lg tracking-widest uppercase"
        >
          Touch the screen to guide the light...
        </motion.p>
      </div>

      {showButton && (
        <motion.div 
          className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30"
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
        >
          <button 
            onClick={onComplete}
            className="flex items-center gap-2 px-8 py-3 bg-amber-500/20 hover:bg-amber-500/30 text-amber-100 rounded-full backdrop-blur-md border border-amber-500/30 transition-all"
          >
            See what awaits <ArrowRight size={18} />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
