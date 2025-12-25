'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

import FloatingLantern from './FloatingLantern';
interface Props {
  onComplete: () => void;
}

export default function FloatingMessage({ onComplete }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [visibleLanterns, setVisibleLanterns] = useState([false, false, false]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    if (isMobile === null) return;

    if (isMobile) {
      const t1 = setTimeout(() => setVisibleLanterns([true, false, false]), 100);
      const t2 = setTimeout(() => setVisibleLanterns([true, true, false]), 8000);
      const t3 = setTimeout(() => setVisibleLanterns([true, true, true]), 16000);
      const tEnd = setTimeout(onComplete, 25000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(tEnd); };
    } else {
      setVisibleLanterns([true, true, true]);
      const tEnd = setTimeout(onComplete, 22000);
      return () => clearTimeout(tEnd);
    }
  }, [onComplete, isMobile]);

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
      <div className={`absolute inset-0 pointer-events-none ${isMobile ? '[&>*]:scale-50' : '[&>*]:scale-100'} [&>*]:origin-center`}>
        {visibleLanterns[0] && (
          <FloatingLantern 
            message="I liked imagining you here…"
            delay={isMobile ? 0 : 0} duration={isMobile ? 7 : 15} yStart={isMobile ? 70 : 30}
          />
        )}
        {visibleLanterns[1] && (
          <FloatingLantern 
            message="On a quiet Christmas night."
            delay={isMobile ? 0 : 4} duration={isMobile ? 7 : 16} yStart={isMobile ? 70 : 50}
          />
        )}
        {visibleLanterns[2] && (
          <FloatingLantern 
            message="That felt nice."
            delay={isMobile ? 0 : 8} duration={isMobile ? 7 : 14} yStart={isMobile ? 70 : 40}
          />
        )}
      </div>
    </motion.div>
  );
}
