'use client';
import { motion } from 'framer-motion';
import { VolumeX } from 'lucide-react';
import { Cormorant_Garamond } from 'next/font/google';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });

interface Props {
  onStop: () => void;
}

export default function FinalStop({ onStop }: Props) {
  return (
    <div className={`absolute inset-0 z-50 flex flex-col items-center justify-end pb-16 pointer-events-none ${font.className}`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 2, duration: 1.5 }}
        className="pointer-events-auto text-center space-y-6 max-w-lg px-6"
      >
        <div className="space-y-3 text-indigo-100/90 text-lg md:text-xl leading-relaxed drop-shadow-lg">
          <p className="italic">"Every good and perfect gift is from above..."</p>
          <p>I've added a few more songs to keep you company. Feel free to stay, breathe, and let the music wrap around you for as long as you like.</p>
          <p>May God bless you with peace, warmth, and beautiful moments.</p>
        </div>

        <button 
          onClick={onStop}
          className="bg-white/5 hover:bg-white/10 backdrop-blur-md text-white/40 hover:text-white/80 px-6 py-2 rounded-full text-[10px] uppercase tracking-widest transition-all border border-white/5 flex items-center gap-2 mx-auto mt-8"
        >
          <VolumeX size={12} /> Silence the Night
        </button>
      </motion.div>
    </div>
  );
}