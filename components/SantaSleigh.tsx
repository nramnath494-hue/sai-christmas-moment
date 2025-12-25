'use client';
import { motion } from 'framer-motion';

export default function SantaSleigh() {
  return (
    <motion.div
      className="absolute top-20 left-0 z-0 pointer-events-none"
      initial={{ x: '110vw', y: '20vh', opacity: 0, scale: 0.5, rotate: 5 }}
      animate={{ 
        x: '-30vw', 
        opacity: [0, 1, 0],
      }}
      transition={{ 
        duration: 8, 
        ease: "linear", 
        delay: 6 
      }}
    >
       {/* Silhouette of Santa & Reindeer */}
       <svg width="400" height="100" viewBox="0 0 400 100" fill="currentColor" className="text-indigo-950 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
          {/* Reindeers */}
          <path d="M20,60 Q30,50 40,60 T60,60 L55,70 L45,70 Z" opacity="0.8" />
          <path d="M60,65 Q70,55 80,65 T100,65 L95,75 L85,75 Z" opacity="0.8" />
          <path d="M100,60 Q110,50 120,60 T140,60 L135,70 L125,70 Z" opacity="0.9" />
          <circle cx="138" cy="62" r="1.5" fill="#ef4444" className="animate-pulse" /> {/* Rudolph Nose */}
          
          {/* Sleigh */}
          <path d="M180,65 L180,75 Q180,85 190,85 L220,85 Q230,85 230,75 L230,60 Z" />
          <path d="M175,85 L235,85" stroke="currentColor" strokeWidth="2" />
          
          {/* Santa */}
          <circle cx="205" cy="60" r="12" />
          <path d="M205,50 L215,60 L195,60 Z" />
          <path d="M180,65 L140,62" stroke="currentColor" strokeWidth="1" opacity="0.5" /> {/* Reins */}
       </svg>
    </motion.div>
  );
}