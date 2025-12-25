'use client';
import { motion } from 'framer-motion';

export default function MiniatureSnowman({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.5, delay: 3.2 }} // Delay to appear after card opens
    >
      {/* Body */}
      <circle cx="50" cy="75" r="20" fill="white" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))" />
      <circle cx="50" cy="45" r="15" fill="white" filter="drop-shadow(0 2px 2px rgba(0,0,0,0.2))" />
      
      {/* Scarf */}
      <path d="M40 55 C 45 65, 55 65, 60 55" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />
      <path d="M58 56 L 65 70" stroke="#ef4444" strokeWidth="4" strokeLinecap="round" />

      {/* Hat */}
      <rect x="40" y="20" width="20" height="15" fill="#374151" />
      <rect x="35" y="35" width="30" height="5" fill="#374151" />

      {/* Eyes & Mouth */}
      <circle cx="46" cy="45" r="1" fill="black" />
      <circle cx="54" cy="45" r="1" fill="black" />
      <path d="M47 50 Q 50 52 53 50" stroke="black" strokeWidth="1" fill="none" />

      {/* Carrot Nose */}
      <path d="M50 47 L 60 48 L 50 49 Z" fill="#f97316" />

      {/* Buttons */}
      <circle cx="50" cy="68" r="1.5" fill="black" />
      <circle cx="50" cy="78" r="1.5" fill="black" />
    </motion.svg>
  );
}