'use client';
import { motion } from 'framer-motion';
import { VolumeX } from 'lucide-react';

interface Props {
  onStop: () => void;
}

export default function FinalStop({ onStop }: Props) {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-end pb-20 pointer-events-none">
      <motion.div 
        initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}
        className="pointer-events-auto"
      >
        <button 
          onClick={onStop}
          className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white/50 hover:text-white px-6 py-2 rounded-full text-xs uppercase tracking-widest transition-all border border-white/5 flex items-center gap-2"
        >
          <VolumeX size={14} /> Silence the Night
        </button>
      </motion.div>
    </div>
  );
}