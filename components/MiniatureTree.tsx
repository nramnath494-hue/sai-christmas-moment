'use client';
import { motion } from 'framer-motion';

export default function MiniatureTree({ className, lightsOn = false }: { className?: string, lightsOn?: boolean }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 2, ease: "easeOut" }}
    >
      {/* Glow */}
      <circle cx="50" cy="50" r="30" fill="#4ade80" fillOpacity="0.1" filter="blur(10px)" />
      
      {/* Tree Layers */}
      <path d="M50 15 L25 55 H40 L20 85 H80 L60 55 H75 L50 15Z" fill="#1a472a" stroke="#86efac" strokeWidth="0.5" strokeOpacity="0.4" />
      
      {/* Snow Details */}
      <path d="M50 15 L35 40 H65 L50 15Z" fill="white" fillOpacity="0.9" />
      <path d="M40 55 L30 70 H50 L40 55Z" fill="white" fillOpacity="0.8" />
      <path d="M60 55 L70 70 H50 L60 55Z" fill="white" fillOpacity="0.8" />
      
      {/* Trunk */}
      <path d="M46 85 H54 V95 H46 V85Z" fill="#3E2723" />
      
      {/* Star */}
      <path d="M50 10 L52 14 L56 14 L53 17 L54 21 L50 19 L46 21 L47 17 L44 14 L48 14 L50 10Z" fill="#FCD34D" />

      {/* Christmas Lights */}
      <g className={lightsOn ? "animate-pulse" : "opacity-30 grayscale"}>
        <circle cx="40" cy="50" r="2" fill="#ef4444" />
        <circle cx="60" cy="50" r="2" fill="#3b82f6" />
        <circle cx="50" cy="35" r="2" fill="#eab308" />
        <circle cx="30" cy="70" r="2" fill="#eab308" />
        <circle cx="70" cy="70" r="2" fill="#ef4444" />
        <circle cx="50" cy="65" r="2" fill="#a855f7" />
        <circle cx="40" cy="80" r="2" fill="#3b82f6" />
        <circle cx="60" cy="80" r="2" fill="#ef4444" />
      </g>
    </motion.svg>
  );
}