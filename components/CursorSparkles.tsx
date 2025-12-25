'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CursorSparkles() {
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number; color: string; size: number }[]>([]);

  useEffect(() => {
    const colors = ['#fbbf24', '#fcd34d', '#ffffff', '#fef3c7', '#dbeafe']; // Gold, Amber, White, Blue-ish

    const addSparkle = (x: number, y: number) => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x,
        y,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 10 + 5, // Random size between 5px and 15px
      };
      // Keep only the last 20 sparkles to prevent lag
      setSparkles(prev => [...prev.slice(-20), newSparkle]);
    };

    const handleMouseMove = (e: MouseEvent) => {
      // Throttle: Only add sparkle 30% of the time for a scattered trail effect
      if (Math.random() > 0.7) {
        addSparkle(e.clientX, e.clientY);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (Math.random() > 0.7) {
        addSparkle(e.touches[0].clientX, e.touches[0].clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparkles.map(sparkle => (
          <motion.div
            key={sparkle.id}
            initial={{ opacity: 1, scale: 0, x: sparkle.x, y: sparkle.y, rotate: 0 }}
            animate={{ opacity: 0, scale: 1, y: sparkle.y + 50, rotate: 180 }} // Fall down and rotate
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="absolute"
            style={{ color: sparkle.color, width: sparkle.size, height: sparkle.size }}
            onAnimationComplete={() => setSparkles(prev => prev.filter(s => s.id !== sparkle.id))}
          >
             {/* Star Shape SVG */}
             <svg viewBox="0 0 24 24" className="w-full h-full drop-shadow-md" fill="currentColor">
               <path d="M12 0L14.59 9.41L24 12L14.59 14.59L12 24L9.41 14.59L0 12L9.41 9.41L12 0Z" />
             </svg>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}