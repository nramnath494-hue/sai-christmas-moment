'use client';
import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import Holly from './Holly';
import SnowflakeDecoration from './SnowflakeDecoration';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });
const signatureFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

interface Props {
  onStart: () => void;
}

export default function LetterCard({ onStart }: Props) {
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-7deg", "7deg"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div 
      className="absolute inset-0 flex items-center justify-center p-6"
      style={{ perspective: 1000 }}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, scale: 0.95 }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Falling Snowflakes Layer - Outside the card */}
      <SnowflakeDecoration count={20} />

      <motion.div 
        initial={{ rotateX: 5, y: 20, opacity: 0 }}
        animate={{ rotateX: 0, y: 0, opacity: 1 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ duration: 1.5, ease: "easeOut" }}
        className={`max-w-md w-full bg-[#F5F5F7] text-slate-900 p-10 md:p-14 rounded-xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] relative overflow-hidden border border-white/60 ${font.className}`}
      >
        {/* Paper Texture & Warmth */}
        <div className="absolute inset-0 opacity-40 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] pointer-events-none mix-blend-multiply" />
        <motion.div 
          className="absolute inset-0 bg-gradient-to-br from-orange-50/30 via-indigo-50/10 to-blue-50/20 pointer-events-none" 
          animate={{ opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Decorative Holly */}
        <motion.div 
          className="absolute -top-4 -right-4 w-24 h-24 pointer-events-none z-20 drop-shadow-lg"
          animate={{ rotate: [0, 5, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        >
          <Holly className="w-full h-full" />
        </motion.div>
        
        <div className="relative z-10 space-y-8 text-lg md:text-xl leading-relaxed font-medium">
          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.5, duration: 2, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <p className="text-indigo-900/60 text-xs md:text-sm uppercase tracking-[0.25em] mb-4 font-sans font-bold opacity-80">A Note for You</p>
            <p className="text-slate-800 font-normal text-2xl">I kept thinking about what I could give you for Christmas…</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 3.5, duration: 2, ease: [0.2, 0.65, 0.3, 0.9] }} 
            className="space-y-2"
          >
            <p className="text-indigo-950 italic font-medium text-2xl">Something meaningful.</p>
            <p className="text-slate-800 font-normal text-xl">Something that felt like care, not expectation.</p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 7.5, duration: 2, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}>
              <p className="text-slate-800 font-normal text-xl">So I didn’t choose a gift. <br/> I chose a moment.</p>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 10.5, duration: 2, ease: [0.2, 0.65, 0.3, 0.9] }}
          >
            <p className="text-indigo-950 font-medium text-xl">One that moves slowly — the way the best moments do.</p>
            <motion.p 
              className={`mt-8 text-right text-indigo-900 text-5xl ${signatureFont.className}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ 
                opacity: 1,
                y: 0,
                textShadow: ["0px 0px 0px rgba(55, 48, 163, 0)", "0px 0px 15px rgba(55, 48, 163, 0.2)", "0px 0px 0px rgba(55, 48, 163, 0)"],
                scale: [1, 1.02, 1]
              }}
              transition={{ 
                opacity: { delay: 12.5, duration: 2 },
                y: { delay: 12.5, duration: 2 },
                default: { delay: 12.5, duration: 4, repeat: Infinity, ease: "easeInOut" }
              }}
            >For Sai.</motion.p>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 13, duration: 2 }}
            className="pt-8 text-center"
          >
            <button 
              onClick={onStart}
              className="group relative px-10 py-4 bg-white/60 overflow-hidden rounded-full transition-all duration-500 hover:bg-white hover:shadow-[0_0_30px_rgba(199,210,254,0.6)] hover:scale-105 active:scale-95 border border-indigo-100/50"
            >
              <motion.div 
                className="absolute inset-0 bg-gradient-to-r from-transparent via-indigo-100/60 to-transparent"
                initial={{ x: "-100%" }}
                animate={{ x: "200%" }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 1, ease: "easeInOut" }}
              />
              <span className="relative z-10 text-slate-600 text-xs md:text-sm uppercase tracking-[0.25em] group-hover:text-indigo-900 transition-colors duration-500 font-sans font-semibold">
                Stay with me for a moment
              </span>
            </button>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
