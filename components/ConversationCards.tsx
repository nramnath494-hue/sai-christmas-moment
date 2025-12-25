'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import { ArrowRight, Sparkles } from 'lucide-react';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

interface Props {
  onComplete: () => void;
}

const cards = [
  { id: 1, text: "What is a song that always makes you smile?" },
  { id: 2, text: "What is your favorite feeling in the world?" },
  { id: 3, text: "I'm really glad our paths crossed this year." },
];

export default function ConversationCards({ onComplete }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleNext = () => {
    if (currentIndex < cards.length - 1) {
      setIsFlipped(false);
      setTimeout(() => setCurrentIndex(prev => prev + 1), 300);
    } else {
      onComplete();
    }
  };

  const currentCard = cards[currentIndex];

  return (
    <motion.div 
      className={`absolute inset-0 bg-[#1a120b] flex flex-col items-center justify-center overflow-hidden ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Background Texture (Wood Table) */}
      <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60 pointer-events-none" />

      {/* Ambient Light */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-orange-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 text-center mb-12">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} 
          className={`text-4xl md:text-5xl text-amber-100 ${scriptFont.className}`}
        >
          A thought for us...
        </motion.h2>
        <p className="text-amber-200/60 text-sm tracking-widest uppercase mt-2">Tap the card to reveal</p>
      </div>

      {/* Card Container */}
      <div className="relative w-72 h-96 perspective-[1000px] cursor-pointer group" onClick={() => setIsFlipped(!isFlipped)}>
        <motion.div
          className="w-full h-full relative preserve-3d transition-all duration-700"
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* Card Back (Pattern) */}
          <div className="absolute inset-0 backface-hidden bg-[#2c1810] rounded-xl border-2 border-[#4a2c20] shadow-2xl flex items-center justify-center" style={{ backfaceVisibility: 'hidden' }}>
             <div className="absolute inset-2 border border-[#8b5e3c] rounded-lg opacity-50" />
             <div className="absolute inset-0 opacity-20 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')]" />
             <Sparkles className="text-amber-200/40 w-12 h-12" />
          </div>

          {/* Card Front (Text) */}
          <div 
            className="absolute inset-0 backface-hidden bg-[#fdfbf7] rounded-xl shadow-xl flex flex-col items-center justify-center p-8 text-center border border-gray-200"
            style={{ transform: "rotateY(180deg)", backfaceVisibility: 'hidden' }}
          >
             <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]" />
             <p className="text-2xl md:text-3xl text-slate-800 font-medium leading-relaxed">
               {currentCard.text}
             </p>
             <div className="absolute bottom-6 w-full flex justify-center">
               <span className="text-slate-400 text-xs uppercase tracking-widest">{currentIndex + 1} / {cards.length}</span>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Controls */}
      <AnimatePresence>
        {isFlipped && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
            className="mt-12 relative z-20"
          >
            <button 
              onClick={(e) => { e.stopPropagation(); handleNext(); }}
              className="flex items-center gap-2 px-8 py-3 bg-amber-900/40 hover:bg-amber-900/60 border border-amber-500/30 text-amber-100 rounded-full transition-all backdrop-blur-sm"
            >
              {currentIndex < cards.length - 1 ? "Next Card" : "Continue Journey"} <ArrowRight size={18} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}