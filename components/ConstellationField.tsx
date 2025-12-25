'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Star from './Star';
import { Cinzel, Cormorant_Garamond } from 'next/font/google';
import SantaSleigh from './SantaSleigh';

interface Props {
  onComplete: () => void;
}

const cinzel = Cinzel({ subsets: ['latin'], weight: ['700'] });
const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });

export default function ConstellationField({ onComplete }: Props) {
  const [starsClicked, setStarsClicked] = useState<number[]>([]);
  const [isAligned, setIsAligned] = useState(false);
  const [showIllustrious, setShowIllustrious] = useState(false);

  const starData = [
    { id: 1, x: 20, y: 30, label: "Warmth" },
    { id: 2, x: 80, y: 25, label: "Curiosity" },
    { id: 3, x: 50, y: 15, label: "Stillness" },
    { id: 4, x: 30, y: 70, label: "Light" },
    { id: 5, x: 70, y: 65, label: "Possibility" },
  ];

  const handleStarClick = (id: number) => {
    if (!starsClicked.includes(id)) {
      const newClicked = [...starsClicked, id];
      setStarsClicked(newClicked);
      
      if (newClicked.length === starData.length) { // Must click ALL stars now
        setTimeout(() => setIsAligned(true), 1500);
      }
    }
  };

  useEffect(() => {
    if (isAligned) {
      setTimeout(() => setShowIllustrious(true), 2500);
      setTimeout(onComplete, 8000);
    }
  }, [isAligned, onComplete]);

  return (
    <motion.div 
      className="absolute inset-0 bg-black overflow-hidden"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* SVG filter definition for star glow - needs to be in the parent DOM */}
      <svg width="0" height="0">
        <defs>
          <filter id="star-glow">
            <feGaussianBlur stdDeviation="3.5" result="coloredBlur" />
            <feMerge>
              <feMergeNode in="coloredBlur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>
      </svg>

      {/* Deep Space Background */}
      <div className="absolute inset-0">
        {/* Aurora Borealis - Enhanced */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-tr from-emerald-900/20 via-indigo-900/20 to-fuchsia-900/20 blur-[100px] opacity-60"
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div 
          className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-[conic-gradient(from_0deg,transparent_0deg,rgba(76,29,149,0.1)_90deg,transparent_180deg,rgba(13,148,136,0.1)_270deg,transparent_360deg)] blur-[120px]"
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        />

        {/* Stars */}
        {[...Array(100)].map((_, i) => (
          <motion.div
            key={`bg-star-${i}`}
            className="absolute bg-white rounded-full"
            initial={{ x: `${Math.random() * 100}vw`, y: `${Math.random() * 100}vh`, scale: 0 }}
            animate={{ scale: [0, Math.random() * 1, 0], opacity: [0, 0.8, 0] }}
            transition={{ duration: Math.random() * 4 + 4, repeat: Infinity, delay: Math.random() * 5 }}
            style={{ width: Math.random() > 0.9 ? '3px' : '1px', height: Math.random() > 0.9 ? '3px' : '1px' }}
          />
        ))}
      </div>

      {/* Santa Animation */}
      <SantaSleigh />

      {starData.map((star) => (
        <Star
          key={star.id}
          {...star}
          active={starsClicked.includes(star.id)}
          onClick={() => handleStarClick(star.id)}
          isAligned={isAligned}
          alignmentX={50 + (star.id - 3) * 15}
          alignmentY={30 + Math.abs(star.id - 3) * 3}
        />
      ))}

      {/* Prompt to click stars */}
      {starsClicked.length === 0 && (
        <motion.div
          className="absolute top-1/4 w-full text-center pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 4, duration: 2 }}
        >
          <p className={`text-indigo-200/80 text-xl tracking-wide ${cormorant.className}`}>Tap the glowing stars to reveal their secrets...</p>
        </motion.div>
      )}

      {/* Hidden Message */}
      {starsClicked.includes(3) && !isAligned && (
        <motion.div 
          className="absolute bottom-10 w-full text-center"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <p className={`text-indigo-200 text-xl tracking-wide ${cormorant.className}`}>Thinking of you makes December feel warmer 🌙</p>
        </motion.div>
      )}

      {/* Alignment Text */}
      {showIllustrious && (
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none pt-32">
          <motion.h1 
            initial={{ opacity: 0, filter: 'blur(10px)' }}
            animate={{ 
              opacity: 1, 
              filter: 'blur(0px)',
              textShadow: ['0 0 30px rgba(252, 211, 77, 0.1)', '0 0 15px rgba(252, 211, 77, 0.5)', '0 0 30px rgba(252, 211, 77, 0.1)']
            }}
            transition={{ filter: { duration: 4, ease: "circOut" }, opacity: { duration: 4, ease: "circOut" }, textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
            className={`text-4xl md:text-7xl text-amber-100 uppercase tracking-[0.2em] ${cinzel.className}`}
          >
            Illustrious
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0, y: 10 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 1.5, duration: 2 }}
            className={`mt-8 text-center space-y-2 ${cormorant.className}`}
          >
            <p className="text-xl font-light tracking-wide text-indigo-100/80">In a way that doesn’t ask for attention.</p>
            <p className="text-2xl italic text-amber-100/90">Just appreciation.</p>
          </motion.div>
        </div>
      )}
    </motion.div>
  );
}
