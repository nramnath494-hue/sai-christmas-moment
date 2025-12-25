'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const SnowflakeSVG = ({ className }: { className?: string }) => (
  <svg 
    viewBox="0 0 24 24" 
    className={className} 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M12 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M2 12H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.92993 4.92993L19.0721 19.0721" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M4.92993 19.0721L19.0721 4.92993" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 12L18.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M16 12L18.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12L5.5 9.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M8 12L5.5 14.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 16L9.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 16L14.5 18.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8L9.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    <path d="M12 8L14.5 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

export default function SnowflakeDecoration({ count = 12 }: { count?: number }) {
  const [flakes, setFlakes] = useState<Array<{ id: number; x: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setFlakes(Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      size: Math.random() * 40 + 20, // Bigger: 20px to 60px
      duration: Math.random() * 10 + 15, // Slower, majestic fall
      delay: Math.random() * 5,
    })));
  }, [count]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute text-cyan-200"
          initial={{ top: "-20%", left: `${flake.x}%`, opacity: 0, rotate: 0 }}
          animate={{ 
            top: "120%", 
            opacity: [0, 1, 1, 0], 
            rotate: 360,
            x: [0, 50, -50, 0] // Swaying motion
          }}
          transition={{ 
            duration: flake.duration, 
            delay: flake.delay, 
            repeat: Infinity, 
            ease: "linear",
            x: { duration: flake.duration / 2, repeat: Infinity, ease: "easeInOut", repeatType: "mirror" }
          }}
          style={{ 
            width: `${flake.size}px`, 
            height: `${flake.size}px`,
            filter: "drop-shadow(0 0 8px rgba(165, 243, 252, 0.8))" // Sharp icy glow
          }}
        >
          <SnowflakeSVG className="w-full h-full" />
        </motion.div>
      ))}
    </div>
  );
}