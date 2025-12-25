'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, useMotionValue, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';
import Snow from './Snow';
import MiniatureTree from './MiniatureTree';
import GlobeBackground from './GlobeBackground';
import SnowflakeDecoration from './SnowflakeDecoration';
import MiniatureSky from './MiniatureSky';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });

interface Props {
  onNext: () => void;
}

export default function SnowGlobe({ onNext }: Props) {
  const [shakeSpeed, setShakeSpeed] = useState(1);
  const [isShaking, setIsShaking] = useState(false);
  const [treeInteraction, setTreeInteraction] = useState(0);
  const [lightsOn, setLightsOn] = useState(false);
  const [hintState, setHintState] = useState<'none' | 'touch' | 'shake' | 'done'>('none');
  const [hasShaken, setHasShaken] = useState(false);
  const hintTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Device Motion for Shake
  useEffect(() => {
    const handleMotion = (event: DeviceMotionEvent) => {
      const { acceleration } = event;
      if (!acceleration) return;
      
      // Calculate total acceleration (ignoring gravity usually gives cleaner shake data, but support varies)
      const accel = Math.abs(acceleration.x || 0) + Math.abs(acceleration.y || 0) + Math.abs(acceleration.z || 0);
      
      if (accel > 15) { // Shake threshold
        triggerShake();
      }
    };

    if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) {
      window.addEventListener('devicemotion', handleMotion);
    }
    return () => { if (typeof window !== 'undefined' && 'DeviceMotionEvent' in window) window.removeEventListener('devicemotion', handleMotion); };
  }, []);

  // Hint Timer
  useEffect(() => {
    hintTimerRef.current = setTimeout(() => {
      setHintState(prev => prev === 'none' ? 'touch' : prev);
    }, 10000); // Show hint after 10s (after main text loads)
    return () => { if (hintTimerRef.current) clearTimeout(hintTimerRef.current); };
  }, []);

  // Mouse parallax logic for the globe
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  
  const mouseXSpring = useSpring(x, { stiffness: 50, damping: 20 });
  const mouseYSpring = useSpring(y, { stiffness: 50, damping: 20 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);
  
  // Glare position
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const touch = e.touches[0];
    const touchX = touch.clientX - rect.left;
    const touchY = touch.clientY - rect.top;
    x.set(touchX / width - 0.5);
    y.set(touchY / height - 0.5);
  };

  const triggerShake = () => {
    setIsShaking(true);
    setShakeSpeed(5);
    setHasShaken(true);
    setTimeout(() => { setIsShaking(false); setShakeSpeed(1); }, 1500);
    
    if (hintState === 'shake') setHintState('done');
  };

  const handleTreeTap = (e: React.MouseEvent | React.TouchEvent | any) => {
    e.stopPropagation(); // Prevent triggering the globe shake
    setTreeInteraction(prev => prev + 1);
    setLightsOn(prev => !prev);
    
    if (hintTimerRef.current) clearTimeout(hintTimerRef.current);
    if (hintState === 'touch' || hintState === 'none') setHintState('shake');
  };

  return (
    <motion.div 
      className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden perspective-[1000px] touch-none"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
      onMouseLeave={handleMouseLeave}
      onTouchEnd={handleMouseLeave}
    >
      {/* Background */}
      <GlobeBackground />

      <motion.div 
        className="relative z-10 mb-8"
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        animate={isShaking ? { rotate: [0, -3, 3, -3, 3, 0], scale: 1.02 } : { rotate: 0, scale: 1 }}
        onTap={() => triggerShake()}
      >
        {/* Globe Container */}
        <div className="relative w-72 h-72 md:w-96 md:h-96 rounded-full border border-indigo-200/10 bg-gradient-to-b from-indigo-950/30 to-indigo-900/10 backdrop-blur-[1px] overflow-hidden shadow-[0_0_60px_-10px_rgba(199,210,254,0.1),inset_0_0_50px_rgba(255,255,255,0.05)]">
          
          {/* Snow Pile (Ground) */}
          <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-[120%] h-24 bg-white blur-xl opacity-60 z-0" />
          <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-white blur-lg opacity-80 z-0" />

          {/* Miniature Sky (Moon & Stars) */}
          <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
            <MiniatureSky className="w-full h-full opacity-90" />
          </div>

          {/* Miniature Tree */}
          <motion.div 
            className="absolute bottom-8 left-1/2 -translate-x-1/2 w-40 h-40 z-10 opacity-90 cursor-pointer"
            key={treeInteraction}
            animate={treeInteraction > 0 ? { scale: [1, 1.1, 1], rotate: [0, -5, 5, 0], filter: ["brightness(1)", "brightness(1.3)", "brightness(1)"] } : {}}
            transition={{ duration: 0.5 }}
            onTap={handleTreeTap}
          >
            <MiniatureTree className="w-full h-full drop-shadow-[0_0_15px_rgba(134,239,172,0.2)] pointer-events-auto" lightsOn={lightsOn} />
          </motion.div>

          {/* Snow inside */}
          <Snow intensity="globe" speed={shakeSpeed} />
          
          {/* Detailed Snowflakes (Scaled down for inside globe) */}
          <div className="absolute inset-0 scale-50 opacity-60 pointer-events-none z-0">
            <SnowflakeDecoration count={8} />
          </div>
          
          {/* Atmosphere */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(199,210,254,0.15),transparent_70%)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

          {/* Dynamic Glare */}
          <motion.div 
            className="absolute inset-0 bg-[radial-gradient(circle_at_var(--x)_var(--y),rgba(255,255,255,0.1)_0%,transparent_50%)] pointer-events-none"
            style={{ 
              // @ts-ignore
              "--x": glareX, 
              "--y": glareY 
            }}
          />
          
          {/* Static Highlights */}
          <div className="absolute top-10 left-10 w-32 h-16 bg-white/5 blur-2xl rounded-full rotate-[-45deg]" />
        </div>

        {/* Base */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-40 h-8 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 rounded-[50%] shadow-2xl z-[-1] border-t border-white/5">
           <div className="absolute inset-0 bg-indigo-500/5 rounded-[50%]" />
        </div>

        {/* Interactive Hints */}
        <AnimatePresence>
          {(hintState === 'touch' || hintState === 'shake') && (
            <motion.div
              initial={{ opacity: 0, y: 10, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              className="absolute bottom-48 left-1/2 -translate-x-1/2 bg-white/90 text-indigo-900 px-4 py-2 rounded-full text-sm font-serif shadow-lg pointer-events-none z-30 whitespace-nowrap"
            >
              {hintState === 'touch' ? "Touch me" : "Shake me"}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/90 rotate-45" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
      
      <div className={`text-center space-y-3 max-w-md px-6 relative z-20 ${font.className}`}>
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.5, duration: 1.5 }}
        >
          <p className="text-xl md:text-2xl text-indigo-100/90 font-medium tracking-wide drop-shadow-lg">Some people change the feeling of winter…</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 2.5, duration: 1.5 }}
        >
          <p className="text-xl md:text-2xl text-indigo-200/90 italic drop-shadow-md">They make it softer.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, filter: "blur(4px)" }} 
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }} 
          transition={{ delay: 4.5, duration: 1.5 }}
        >
          <p className="text-4xl md:text-5xl text-white font-bold drop-shadow-[0_0_20px_rgba(199,210,254,0.5)]">You do that.</p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 6.5, duration: 1.5 }}
        >
          <p className="text-indigo-200/70 tracking-[0.2em] uppercase text-xs font-sans mt-4 font-medium">Especially at this time of year.</p>
        </motion.div>
        
        <motion.button 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8.5, duration: 1.5 }}
          onClick={hasShaken ? onNext : undefined}
          className={`group relative px-10 py-3 overflow-hidden rounded-full transition-all duration-500 mt-6 border backdrop-blur-sm ${hasShaken ? 'bg-white/10 border-white/20 hover:bg-white/20 hover:border-white/30 hover:shadow-[0_0_30px_rgba(199,210,254,0.4)] hover:scale-105 active:scale-95 cursor-pointer' : 'bg-white/5 border-white/5 opacity-50 cursor-default'}`}
        >
           <span className={`relative z-10 text-xs uppercase tracking-[0.3em] transition-colors duration-500 font-sans font-semibold ${hasShaken ? 'text-indigo-100 group-hover:text-white' : 'text-indigo-200/50'}`}>
            {hasShaken ? "Step into the warmth" : "Look up"}
          </span>
          {/* Shimmer effect */}
          {hasShaken && (
            <motion.div 
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }}
            />
          )}
        </motion.button>
      </div>
    </motion.div>
  );
}
