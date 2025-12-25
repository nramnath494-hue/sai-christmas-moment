'use client';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const cormorant = Cormorant_Garamond({ subsets: ['latin'], weight: ['600'] });

interface Props {
  message: string;
  delay: number;
  duration: number;
  yStart: number;
}

export default function FloatingLantern({ message, delay, duration, yStart }: Props) {
  return (
    <motion.div
      className="absolute flex flex-col items-center"
      initial={{ x: '-20vw', y: `${yStart}vh`, opacity: 0 }}
      animate={{ x: '110vw', opacity: [0, 1, 1, 0] }}
      transition={{ duration, ease: 'linear', delay, opacity: { duration: duration, times: [0, 0.1, 0.9, 1] } }}
    >
      <motion.div
        className="relative w-40 h-56 bg-gradient-to-t from-amber-400/80 to-yellow-200/80 rounded-t-full rounded-b-lg shadow-[0_0_30px_rgba(251,191,36,0.6)]"
        animate={{ y: [0, -10, 0], rotate: [0, 2, -2, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'mirror' }}
      >
        {/* Inner Glow */}
        <div className="absolute inset-0 bg-amber-300/50 rounded-full blur-xl" />
        {/* Text */}
        <div className={`absolute inset-0 flex items-center justify-center p-4 text-center text-amber-950 text-xl tracking-wide ${cormorant.className}`}>
          {message}
        </div>
      </motion.div>
      {/* Base */}
      <div className="w-12 h-4 bg-yellow-900 rounded-b-md mt-[-2px]" />
    </motion.div>
  );
}