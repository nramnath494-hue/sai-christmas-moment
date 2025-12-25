'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import { ArrowRight } from 'lucide-react';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

interface Props {
  onComplete: () => void;
}

const visions = [
  { id: 1, text: "Coffee dates pending...", src: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=600&q=80" },
  { id: 2, text: "Late night drives", src: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&w=600&q=80" },
  { id: 3, text: "Gym sessions", src: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80" },
  { id: 4, text: "Just existing together", src: "https://images.unsplash.com/photo-1621184455862-c163dfb30e0f?auto=format&fit=crop&w=600&q=80" },
];

export default function FutureVisions({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < visions.length) {
      setCurrentIndex(prev => prev + 1);
    }
  };

  return (
    <motion.div 
      className={`absolute inset-0 bg-[#0c0a09] flex flex-col items-center justify-center overflow-hidden ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_var(--tw-gradient-stops))] from-orange-900/20 via-[#0c0a09] to-[#0c0a09]" />
      
      <div className="relative z-10 text-center mb-8 md:mb-12 px-4">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} 
          className={`text-4xl md:text-5xl text-amber-100 ${scriptFont.className}`}
        >
          Things I look forward to...
        </motion.h2>
      </div>

      {/* Card Stack */}
      <div className="relative w-72 h-96 md:w-80 md:h-[450px] flex items-center justify-center">
        <AnimatePresence mode="popLayout">
          {visions.map((vision, index) => {
            // Only render current and next few cards
            if (index < currentIndex) return null;
            
            const isTop = index === currentIndex;
            const offset = index - currentIndex;
            
            return (
              <motion.div
                key={vision.id}
                className="absolute top-0 w-full bg-white p-4 pb-12 shadow-2xl rounded-sm cursor-pointer"
                style={{ 
                  zIndex: visions.length - index,
                  rotate: isTop ? 0 : (index % 2 === 0 ? 3 : -3) * offset,
                  scale: 1 - offset * 0.05,
                  y: offset * 15,
                  filter: isTop ? 'brightness(1)' : 'brightness(0.7)'
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: offset * 15, scale: 1 - offset * 0.05, rotate: (index % 2 === 0 ? 2 : -2) * offset }}
                exit={{ x: 300, opacity: 0, rotate: 20, transition: { duration: 0.5 } }}
                whileHover={isTop ? { scale: 1.02 } : {}}
                onClick={isTop ? handleNext : undefined}
                drag={isTop ? "x" : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 100) handleNext();
                }}
              >
                <div className="aspect-[4/5] bg-gray-100 overflow-hidden mb-4 relative">
                  <img src={vision.src} alt="Vision" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <p className={`text-center text-slate-800 text-2xl ${scriptFont.className}`}>{vision.text}</p>
              </motion.div>
            );
          })}
        </AnimatePresence>

        {/* Completion State */}
        {currentIndex >= visions.length && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }} 
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <p className="text-indigo-200/80 text-xl mb-8 italic">And so much more.</p>
            <button 
              onClick={onComplete}
              className="group flex items-center gap-3 px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all backdrop-blur-sm border border-white/10"
            >
              Continue <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}