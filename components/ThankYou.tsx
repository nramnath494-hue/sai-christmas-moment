'use client';
import { motion } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import { Sparkles, Heart, VolumeX } from 'lucide-react';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

interface Props {
  onStop?: () => void;
}

export default function ThankYou({ onStop }: Props) {
  return (
    <motion.div 
      className={`absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 text-center ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }}
    >
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519681393784-d120267933ba?q=80&w=2000&auto=format&fit=crop')] bg-cover bg-center opacity-20" />
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent" />
      
      <div className="relative z-10 max-w-lg space-y-8">
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.5 }}
          className="w-16 h-16 mx-auto bg-amber-500/10 rounded-full flex items-center justify-center border border-amber-500/30 shadow-[0_0_30px_rgba(245,158,11,0.2)]"
        >
          <Sparkles className="text-amber-200" size={32} />
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 1 }}
          className={`text-5xl md:text-7xl text-amber-100 ${scriptFont.className}`}
        >
          Merry Christmas
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="space-y-6 text-indigo-100/90 text-lg md:text-xl leading-relaxed"
        >
          <p>
            Thank you for walking through this little winter garden with me.
          </p>
          <p>
            I hope these moments brought a smile to your face, just as you bring light to those around you.
          </p>
          <p>
            Here is to the journey, the magic of the season, and the beautiful mystery of what comes next.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 3 }}
          className="pt-8"
        >
          <p className="text-amber-500/60 text-sm tracking-[0.2em] uppercase flex items-center justify-center gap-2 mb-4">
            With Love <Heart size={12} className="fill-amber-500/60" />
          </p>

          {onStop && (
            <button 
              onClick={onStop}
              className="text-indigo-300/50 hover:text-indigo-200 text-xs uppercase tracking-widest flex items-center gap-2 mx-auto transition-colors border border-indigo-500/20 px-4 py-2 rounded-full hover:bg-indigo-500/10"
            >
              <VolumeX size={12} /> Stop Music
            </button>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
}