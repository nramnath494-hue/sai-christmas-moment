'use client';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });

interface Props {
  onStop: () => void;
}

export default function FinalStop({ onStop }: Props) {
  return (
    <motion.div 
      className={`absolute inset-0 flex flex-col items-center justify-center bg-black/90 z-50 ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }}
    >
      <p className="text-3xl text-white/80 mb-10 italic tracking-wide">Until next time...</p>
      <button 
        onClick={onStop}
        className="px-10 py-3 border border-white/20 rounded-full text-white/60 hover:bg-white/10 hover:text-white transition-all uppercase tracking-[0.2em] text-sm"
      >
        Stop Music
      </button>
    </motion.div>
  );
}