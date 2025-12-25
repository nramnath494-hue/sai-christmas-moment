'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cinzel } from 'next/font/google';

const cinzel = Cinzel({ subsets: ['latin'], weight: ['400'] });

interface Props {
  id: number;
  x: number;
  y: number;
  onClick: () => void;
  active: boolean;
  label: string;
  isAligned: boolean;
  alignmentX: number;
  alignmentY: number;
}

export default function Star({ id, x, y, onClick, active, label, isAligned, alignmentX, alignmentY }: Props) {
  const [stardust, setStardust] = useState<number[]>([]);

  const handleTap = () => {
    onClick();
    if (!active) {
      setStardust(prev => [...prev, Date.now()]);
      setTimeout(() => setStardust(prev => prev.slice(1)), 1000);
    }
  };

  return (
    <motion.div
      className="absolute cursor-pointer flex flex-col items-center"
      initial={{ x: `${x}vw`, y: `${y}vh`, opacity: 0 }}
      animate={{
        x: isAligned ? `${alignmentX}vw` : `${x}vw`,
        y: isAligned ? `${alignmentY}vh` : `${y}vh`,
        opacity: 1,
      }}
      transition={{ duration: 2.5, ease: [0.4, 0, 0.2, 1] }} // Changed from spring to ease
      onTap={handleTap}
    >
      {/* Stardust effect on click */}
      <AnimatePresence>
        {stardust.map((particleId) => (
          <motion.div
            key={particleId}
            className="absolute w-1 h-1 bg-yellow-200 rounded-full"
            initial={{ scale: 1, opacity: 1, x: 0, y: 0 }}
            exit={{
              y: (Math.random() - 0.5) * 40,
              x: (Math.random() - 0.5) * 40,
              scale: 0,
              opacity: 0,
            }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>

      <motion.svg
        width="48"
        height="48"
        viewBox="0 0 48 48"
        className="drop-shadow-[0_0_15px_rgba(252,211,77,0.6)]"
        style={{ filter: 'url(#star-glow)' }}
      >
        {/* Classic star shape path */}
        <motion.path
          d="M24 4L28.6 16.4H42L31.7 24.6L36.2 37L24 29.2L11.8 37L16.3 24.6L6 16.4H19.4L24 4Z"
          fill={active ? '#FBBF24' : '#FEF3C7'}
          animate={{ opacity: [0.6, 1, 0.6] }}
          transition={{ duration: Math.random() * 2 + 2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.svg>

      <AnimatePresence>
        {active && !isAligned && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`mt-3 text-base text-amber-100/90 tracking-widest uppercase ${cinzel.className}`}
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}