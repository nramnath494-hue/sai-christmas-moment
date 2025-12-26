'use client';
import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Playfair_Display, Great_Vibes } from 'next/font/google';
import { Snowflake } from 'lucide-react';
import MiniatureSnowman from './MiniatureSnowman';

const playfair = Playfair_Display({ subsets: ['latin'], weight: ['400', '600'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

interface Props {
  onComplete: () => void;
}

export default function MomentFreeze({ onComplete }: Props) {
  useEffect(() => {
    const timer = setTimeout(onComplete, 14000); // Increased duration for new animation
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center bg-black"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Twinkling Starfield Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Pulsating Nebulas */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl"
          animate={{ scale: [1, 1.1, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 3 }}
        />

        {/* Twinkling Stars */}
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white rounded-full"
            initial={{ 
              x: `${Math.random() * 100}vw`,
              y: `${Math.random() * 100}vh`,
              scale: 0,
              opacity: 0
            }}
            animate={{
              scale: [0, Math.random() * 1.2, 0],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: Math.random() * 3 + 3,
              repeat: Infinity,
              delay: Math.random() * 5
            }}
            style={{ width: '2px', height: '2px' }}
          />
        ))}

        {/* Shooting Stars */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={`shooting-${i}`}
            className="absolute h-0.5 w-24 bg-gradient-to-l from-white/50 to-transparent"
            initial={{ x: '110vw', y: `${Math.random() * 100}vh`, rotate: -45 }}
            animate={{ x: '-50vw' }}
            transition={{
              duration: Math.random() * 2 + 1,
              repeat: Infinity,
              delay: Math.random() * 10 + 2,
              ease: "linear"
            }}
          />
        ))}
      </div>

      {/* Darkening Overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Frost Overlay Effect */}
      <motion.div 
        className="absolute inset-0 backdrop-blur-sm"
        style={{
          maskImage: "url('https://www.transparenttextures.com/patterns/ice-age.png')",
          maskSize: '300px 300px',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: [0, 0.8, 0.5] }}
        transition={{ duration: 2, ease: "circOut" }}
      />

      {/* 3D Card */}
      <div style={{ perspective: 2000 }} className="z-10">
        <motion.div
          className="relative w-[90vw] max-w-[340px] h-[220px] md:max-w-none md:w-[600px] md:h-[400px] drop-shadow-2xl"
          initial={{ scale: 0.8, opacity: 0, y: 50 }}
          animate={{ 
            scale: 1, 
            opacity: 1, 
            y: 0,
            boxShadow: ["0px 0px 0px rgba(252, 211, 77, 0)", "0px 0px 80px rgba(252, 211, 77, 0.2)", "0px 0px 30px rgba(252, 211, 77, 0.1)"]
          }}
          transition={{ 
            default: { duration: 1.5, delay: 0.5, ease: "easeOut" },
            boxShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          {/* Inside of the Card (Stationary) */}
          <div className="absolute inset-0 flex w-full h-full">
            {/* Inside Left Panel (with Snowman) */}
            <div className="w-1/2 h-full bg-[#0f1d4a] rounded-l-lg flex items-center justify-center p-4 md:p-8">
              <MiniatureSnowman className="w-16 h-16 md:w-full md:h-full opacity-80" />
            </div>
            {/* Inside Right Panel (with Text) */}
            <div className="w-1/2 h-full bg-[#0f1d4a] rounded-r-lg p-3 md:p-12 flex flex-col justify-center text-center">
              <div className={`relative z-10 space-y-3 md:space-y-6 ${playfair.className}`}>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.5, duration: 1.5 }} className="text-[10px] sm:text-xs md:text-2xl text-indigo-100/90 leading-relaxed">
                  There is a quiet beauty in simply pausing…<br/>
                  in letting the noise fade away,<br/>
                  and letting the rest of the world wait.<br/>
                  To find a stillness that feels like ours,<br/>
                  and simply exist in the now.
                </motion.p>
                <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5.5, duration: 1.5 }} className={`text-base md:text-4xl text-amber-200 drop-shadow-lg ${scriptFont.className}`}>
                  I found myself wishing we could stay right here.
                </motion.p>
              </div>
            </div>
          </div>

          {/* Cover of the Card (Animated) */}
          <motion.div
            className="absolute w-1/2 h-full"
            style={{ transformStyle: "preserve-3d", transformOrigin: "right" }}
            initial={{ rotateY: 0 }}
            animate={{ rotateY: -180 }}
            transition={{ delay: 2, duration: 2, ease: [0.32, 0, 0.67, 0] }}
          >
            {/* Front of the cover */}
            <div className="absolute w-full h-full bg-[#0c1a3e] rounded-l-lg flex items-center justify-center shadow-2xl" style={{ backfaceVisibility: "hidden" }}>
              <Snowflake size={60} className="md:w-[100px] md:h-[100px] text-indigo-200/20" />
            </div>
            {/* Back of the cover (inside left) */}
            <div className="absolute w-full h-full bg-[#0f1d4a] rounded-l-lg" style={{ transform: "rotateY(180deg)", backfaceVisibility: "hidden" }} />
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
