'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import FloatingLantern from './FloatingLantern';
interface Props {
  onComplete: () => void;
}

export default function FloatingMessage({ onComplete }: Props) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const timer = setTimeout(onComplete, 18000); // Increased duration for the new sequence
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div 
      className="absolute inset-0 overflow-hidden bg-gradient-to-b from-[#0c143e] to-[#020617]"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Background Elements */}
      <motion.div 
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(254,249,195,0.2)_0%,transparent_40%)] opacity-50"
        animate={{ scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute -bottom-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-white rounded-full blur-3xl opacity-20"
      />

      {/* Drifting Clouds */}
      <motion.div 
        className="absolute bottom-0 left-0 w-[200%] h-48 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] opacity-20"
        animate={{ x: ['-50%', '0%'] }}
        transition={{ duration: 60, repeat: Infinity, ease: 'linear', repeatType: 'mirror' }}
      />
      <motion.div 
        className="absolute bottom-10 left-0 w-[200%] h-32 bg-[url('https://www.transparenttextures.com/patterns/fog.png')] opacity-10"
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 80, repeat: Infinity, ease: 'linear', repeatType: 'mirror' }}
      />

      {/* Floating Lanterns */}
      <div className="absolute inset-0 [&>*]:scale-[0.65] md:[&>*]:scale-100 [&>*]:origin-center pointer-events-none">
        <FloatingLantern 
          message="I liked imagining you here…"
          delay={0} duration={15} yStart={isMobile ? 25 : 30}
        />
        <FloatingLantern 
          message="On a quiet Christmas night."
          delay={4} duration={16} yStart={50}
        />
        <FloatingLantern 
          message="That felt nice."
          delay={8} duration={14} yStart={isMobile ? 75 : 40}
        />
      </div>
    </motion.div>
  );
}
