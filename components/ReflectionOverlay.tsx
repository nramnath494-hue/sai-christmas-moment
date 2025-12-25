'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Playfair_Display } from 'next/font/google';
import Snow from './Snow';

const playfair = Playfair_Display({ subsets: ['latin'] });

export default function ReflectionOverlay() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 20 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        duration: Math.random() * 15 + 10,
        delay: Math.random() * 10,
      }))
    );
  }, []);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-4 md:p-6 overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    >
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1478265409131-1f65c88f965c?q=80&w=2565&auto=format&fit=crop')] bg-cover bg-center"
        initial={{ scale: 1.1, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 2.5, ease: "easeOut" }}
      />

      {/* Dark Overlay */}
      <motion.div className="absolute inset-0 bg-black/60" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 2 }} />

      {/* Snow Animation */}
      <Snow />

      {/* Memory Motes */}
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute w-1 h-1 bg-amber-100/30 rounded-full blur-[1px]"
          initial={{ x: `${p.x}vw`, y: "110vh", opacity: 0 }}
          animate={{ y: "-10vh", opacity: [0, 1, 0] }}
          transition={{ 
            duration: p.duration, 
            delay: p.delay, 
            repeat: Infinity, 
            ease: "linear" 
          }}
        />
      ))}

      {/* Glassmorphism Text Container */}
      <motion.div 
        className={`relative z-10 text-center w-full max-w-3xl p-6 md:p-20 rounded-2xl md:rounded-[3rem] border border-white/10 bg-black/30 backdrop-blur-2xl shadow-2xl space-y-6 md:space-y-12 ${playfair.className}`}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.5, delay: 0.5, ease: "easeOut" }}
      >
        <motion.p 
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }} 
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} 
          transition={{ delay: 0.5, duration: 2 }}
          className="text-xl md:text-4xl text-white font-medium italic tracking-wide leading-relaxed drop-shadow-md"
        >
          Some moments aren’t meant to be held onto.<br/>
          They’re meant to be felt…
        </motion.p>
        <motion.p 
          initial={{ opacity: 0, filter: "blur(10px)", y: 20 }} 
          animate={{ opacity: 1, filter: "blur(0px)", y: 0 }} 
          transition={{ delay: 4, duration: 2 }}
          className="text-base md:text-2xl text-indigo-100/80 font-light tracking-widest leading-relaxed"
        >
          And remembered when the lights grow quiet.
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, filter: "blur(5px)" }} 
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
          transition={{ delay: 7.5, duration: 2.5 }}
          className="pt-8 md:pt-12"
        >
          <motion.h1 
            className="text-3xl md:text-6xl text-[#D4AF37] drop-shadow-[0_0_25px_rgba(212,175,55,0.6)] font-bold leading-tight"
            animate={{ textShadow: ["0 0 15px rgba(212,175,55,0.3)", "0 0 25px rgba(212,175,55,0.6)", "0 0 15px rgba(212,175,55,0.3)"] }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Merry Christmas, Sai ✨
          </motion.h1>
          <p className="text-white/50 text-right mt-4 text-xs md:text-base">
            From Narendra &lt;3
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
