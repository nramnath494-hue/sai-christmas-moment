'use client';
import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send } from 'lucide-react';
import { Cormorant_Garamond } from 'next/font/google';

import FloatingLantern from './FloatingLantern';
interface Props {
  onComplete: () => void;
}

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });

export default function FloatingMessage({ onComplete }: Props) {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);
  const [visibleLanterns, setVisibleLanterns] = useState([false, false, false]);
  const [showInput, setShowInput] = useState(false);
  const [wish, setWish] = useState("");
  const [wishSent, setWishSent] = useState(false);

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
      const tInput = setTimeout(() => setShowInput(true), 24000);
      return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(tInput); };
    } else {
      setVisibleLanterns([true, true, true]);
      const tInput = setTimeout(() => setShowInput(true), 18000);
      return () => clearTimeout(tInput);
    }
  }, [onComplete, isMobile]);

  const handleSendWish = () => {
    if (!wish.trim()) return;
    setShowInput(false);
    setWishSent(true);
    // Allow time for the wish lantern to float up before completing
    setTimeout(onComplete, 12000);
  };

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
        
        {/* User Wish Lantern */}
        {wishSent && (
          <FloatingLantern 
            message={wish}
            delay={0} 
            duration={15} 
            yStart={80}
          />
        )}
      </div>

      {/* Make a Wish Input */}
      <AnimatePresence>
        {showInput && !wishSent && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            exit={{ opacity: 0, y: -20 }}
            className={`absolute bottom-32 left-0 right-0 flex flex-col items-center justify-center z-50 px-6 ${font.className}`}
          >
            <p className="text-amber-100/80 text-lg md:text-2xl mb-4 italic tracking-wide text-center">
              Make a wish for the coming year...
            </p>
            <div className="relative w-full max-w-md">
              <input 
                type="text" 
                value={wish}
                onChange={(e) => setWish(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendWish()}
                placeholder="Type your wish here..."
                className="w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-full py-3 px-6 pr-12 text-white placeholder:text-white/30 focus:outline-none focus:border-amber-200/50 focus:bg-white/15 transition-all text-center md:text-left"
                autoFocus
              />
              <button 
                onClick={handleSendWish}
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-amber-100/70 hover:text-amber-100 hover:bg-white/10 rounded-full transition-all"
              >
                <Send size={20} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
