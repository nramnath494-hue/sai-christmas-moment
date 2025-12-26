'use client';
import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import Fireplace from './Fireplace';
import CookiesAndMilk from './CookiesAndMilk';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['300', '400', '500', '600', '700'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

interface Props {
  onComplete: () => void;
}

export default function Candle({ onComplete }: Props) {
  const [height, setHeight] = useState(100);
  const [message, setMessage] = useState("");
  const [isExtinguished, setIsExtinguished] = useState(false);
  const [embers, setEmbers] = useState<Array<{ id: number; x: number; y: number; scale: number; opacity: number }>>([]);
  const [showTreats, setShowTreats] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Mouse interaction for flame flicker (Wind effect)
  const mouseX = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 100, damping: 15 });
  const flameRotate = useTransform(springX, [-0.5, 0.5], [15, -15]); // Tilt opposite to movement

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX } = e;
    const { innerWidth } = window;
    const pct = (clientX / innerWidth) - 0.5;
    mouseX.set(pct);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const { clientX } = e.touches[0];
    const { innerWidth } = window;
    const pct = (clientX / innerWidth) - 0.5;
    mouseX.set(pct);
  };

  const handleOrientation = (event: DeviceOrientationEvent) => {
    // gamma is the left-to-right tilt in degrees, where range is [-180, 180]
    const gamma = event.gamma;
    if (gamma === null) return;

    // We'll use a range of -30 to 30 degrees for full effect
    const tilt = Math.max(-30, Math.min(30, gamma));
    
    // Map the tilt from [-30, 30] to [-0.5, 0.5] for our motion value
    const pct = tilt / 60;
    mouseX.set(pct);
  };

  useEffect(() => {
    window.addEventListener('deviceorientation', handleOrientation);
    return () => window.removeEventListener('deviceorientation', handleOrientation);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setHeight((prev) => {
        const newHeight = prev - 0.2; // Slower, more meditative burn
        if (newHeight <= 0) {
          clearInterval(interval);
          return 0;
        }
        return newHeight;
      });
    }, 50); // Smoother updates
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Generate embers occasionally
    if (isExtinguished) return;
    const emberInterval = setInterval(() => {
      if (Math.random() > 0.7) {
        setEmbers(prev => [
          ...prev.slice(-10), 
          { id: Date.now(), x: (Math.random() - 0.5) * 20, y: 0, scale: Math.random() * 0.5 + 0.5, opacity: 1 }
        ]);
      }
    }, 200);
    return () => clearInterval(emberInterval);
  }, [isExtinguished]);

  useEffect(() => {
    if (height < 85 && height > 84) setMessage("The quietest moments often carry the deepest warmth...");
    if (height < 60 && height > 59) setMessage("There is a simple magic in just sharing this moment with you.");
    if (height < 35 && height > 34) setMessage("I hope this stillness feels like a gentle embrace.");
    if (height < 15 && height > 14) setMessage("Let the light linger just a moment more...");

    if (height <= 0 && !isExtinguished) {
      setIsExtinguished(true);
      setTimeout(() => setShowTreats(true), 4000); // Wait for smoke animation then show treats
    }
  }, [height, onComplete, isExtinguished]);

  return (
    <motion.div 
      className={`absolute inset-0 flex flex-col items-center overflow-hidden bg-black ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      onMouseMove={handleMouseMove}
      onTouchMove={handleTouchMove}
    >
      {/* Room Background */}
      <div className="absolute inset-0 bg-black" />
      <motion.div 
        className="absolute inset-0 bg-cover bg-center opacity-30"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1513297887119-d46091b24bfa?q=80&w=2670&auto=format&fit=crop')" }}
        initial={{ scale: 1.05, opacity: 0.3 }}
        animate={{ scale: 1.1, opacity: [0.3, 0.4, 0.3] }}
        transition={{ scale: { duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }, opacity: { duration: 3, repeat: Infinity, ease: "easeInOut" } }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/50" />
      
      {/* Subtle Dust Motes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-amber-50/10 rounded-full blur-[0.5px]"
            style={{
              width: Math.random() * 3 + 1 + 'px',
              height: Math.random() * 3 + 1 + 'px',
              left: Math.random() * 100 + '%',
              top: Math.random() * 100 + '%',
            }}
            animate={{ y: [0, -30, 0], opacity: [0, 0.4, 0] }}
            transition={{ duration: Math.random() * 10 + 10, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
          />
        ))}
      </div>

      {/* Fireplace in Background */}
      <div className="absolute bottom-20 -right-8 md:bottom-40 md:right-10 opacity-90 scale-[0.6] md:scale-90 drop-shadow-[0_0_50px_rgba(234,88,12,0.2)] origin-bottom-right pointer-events-none">
        <Fireplace />
      </div>

      {/* Table Surface */}
      <div className="absolute bottom-0 w-full h-24 bg-[#1a0f0a] shadow-[0_-10px_50px_rgba(0,0,0,1)] border-t border-[#3d2820]">
        <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" }} />
        {/* Reflection of fire on table */}
        <motion.div 
            className="absolute top-0 right-20 w-64 h-12 bg-orange-500/10 blur-xl rounded-full"
            animate={{ opacity: [0.1, 0.3, 0.1], scaleX: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Treats Section (Left of Candle) */}
        {showTreats && (
          <div className={`absolute z-40 transition-all duration-1000 ${
            isMobile 
              ? "bottom-12 left-1/2 -translate-x-1/2 scale-90 origin-bottom" 
              : "bottom-4 left-4 md:bottom-8 md:left-20 md:-translate-x-0 scale-75 md:scale-100 origin-bottom-left"
          }`}>
            <CookiesAndMilk onComplete={onComplete} />
          </div>
        )}
      </div>

      <div className="absolute top-[15%] text-center w-full px-6 h-32 z-30">
         <AnimatePresence mode="wait">
           {message && (
             <motion.div
               key={message}
               initial={{ opacity: 0, y: 20, filter: "blur(5px)" }}
               animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
               exit={{ opacity: 0, y: -20, filter: "blur(5px)" }}
               transition={{ duration: 1.5 }}
               className="flex flex-col items-center gap-2"
             >
               <p className={`text-3xl md:text-6xl text-orange-50 drop-shadow-[0_0_20px_rgba(251,146,60,0.3)] leading-tight max-w-xs md:max-w-4xl mx-auto ${scriptFont.className}`}>
                 {message}
               </p>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      <AnimatePresence>
      {(!isMobile || !showTreats) && (
      <motion.div 
        key="candle-container"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, filter: "blur(10px)", y: 20 }}
        transition={{ duration: 1.5 }}
        className="absolute bottom-12 md:bottom-20 flex flex-col items-center justify-end h-[500px] w-40 z-20 scale-75 md:scale-100 origin-bottom"
      >
        {/* Smoke (Only when extinguished) */}
        {isExtinguished && (
           <>
             {[...Array(6)].map((_, i) => (
               <motion.div 
                 key={i}
                 className="absolute bottom-[20px] w-4 h-4 bg-gray-400/50 rounded-full blur-md"
                 initial={{ opacity: 0, y: 0, scale: 1 }}
                 animate={{ 
                   opacity: [0, 0.4, 0], 
                   y: -150 - Math.random() * 100, 
                   x: (Math.random() - 0.5) * 50,
                   scale: [1, 3, 5] 
                 }}
                 transition={{ duration: 3 + Math.random(), delay: i * 0.2, ease: "easeOut" }}
               />
             ))}
           </>
        )}

        {/* Flame Container */}
        {!isExtinguished && (
          <motion.div
            className="absolute z-20 flex flex-col items-center origin-bottom"
            style={{ 
              bottom: `calc(120px + (256px * ${height} / 100))`, // 120px (holder height) + wax height
              rotate: flameRotate 
            }}
          >
            {/* Outer Glow */}
            <motion.div 
              className="absolute w-32 h-32 bg-orange-500/20 rounded-full blur-2xl -translate-y-10"
              animate={{ scale: [1, 1.1, 1], opacity: [0.5, 0.7, 0.5] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            
            {/* Main Flame */}
            <motion.div
              className="relative w-6 h-20 bg-gradient-to-t from-orange-600 via-orange-300 to-yellow-100 rounded-[50%_50%_50%_50%_/_60%_60%_40%_40%] blur-[1px] shadow-[0_0_20px_rgba(251,146,60,0.6)]"
              animate={{ 
                scaleY: [1, 1.1, 0.95, 1.05, 1],
                scaleX: [1, 0.9, 1.05, 0.95, 1],
                borderRadius: ["50% 50% 50% 50% / 60% 60% 40% 40%", "50% 50% 20% 20% / 70% 70% 30% 30%", "50% 50% 50% 50% / 60% 60% 40% 40%"]
              }}
              transition={{ duration: 0.8, repeat: Infinity, ease: "easeInOut" }}
            >
               {/* Inner Core */}
               <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-2 h-10 bg-white rounded-full blur-[1px] opacity-90" />
            </motion.div>

            {/* Rising Embers */}
            {embers.map((ember) => (
              <motion.div
                key={ember.id}
                className="absolute bottom-20 w-1 h-1 bg-orange-200 rounded-full blur-[0.5px]"
                initial={{ opacity: 1, y: 0, x: ember.x }}
                animate={{ opacity: 0, y: -100 - Math.random() * 50, x: ember.x + (Math.random() - 0.5) * 20 }}
                transition={{ duration: 2 + Math.random(), ease: "easeOut" }}
                onAnimationComplete={() => setEmbers(prev => prev.filter(e => e.id !== ember.id))}
              />
            ))}
          </motion.div>
        )}
        
        {/* Wick */}
        <motion.div 
          className="w-1 bg-black/60 absolute z-10"
          style={{ 
            height: '12px',
            bottom: `calc(120px + (256px * ${height} / 100) - 10px)`
          }}
        />
        
        {/* Candle Body */}
        <div className="w-20 relative h-64 flex items-end justify-center z-10 mb-[120px]">
            <motion.div 
              className="w-full bg-gradient-to-r from-slate-200 via-slate-100 to-slate-300 rounded-t-lg shadow-[inset_0_-10px_20px_rgba(0,0,0,0.1),0_0_15px_rgba(255,255,255,0.1)] relative overflow-hidden"
              style={{ height: `${height}%` }}
            >
               {/* Wax Pool Effect at top */}
               <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-b from-white/90 to-transparent blur-[1px]" />
               
               {/* Subsurface Scattering Glow */}
               <div className="absolute top-0 left-1/2 -translate-x-1/2 w-12 h-20 bg-orange-100/40 blur-lg rounded-full pointer-events-none" />

               {/* Melting Wax Drips */}
               {!isExtinguished && height < 95 && (
                 <>
                   <motion.div 
                     className="absolute top-0 left-2 w-1.5 bg-slate-200/80 rounded-full opacity-90"
                     initial={{ height: 0 }}
                     animate={{ height: [0, 40, 40], opacity: [0.8, 0.8, 0] }}
                     transition={{ duration: 4, repeat: Infinity, repeatDelay: 2 }}
                   />
                   <motion.div 
                     className="absolute top-0 right-3 w-1 bg-slate-200/80 rounded-full opacity-90"
                     initial={{ height: 0 }}
                     animate={{ height: [0, 25, 25], opacity: [0.8, 0.8, 0] }}
                     transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, delay: 1 }}
                   />
                 </>
               )}
            </motion.div>
        </div>

        {/* Candle Holder */}
        <div className="absolute bottom-0 flex flex-col items-center z-0">
            {/* Cup (Rim) */}
            <div className="w-24 h-6 bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900 rounded-[50%] mb-[-3px] shadow-lg border-t border-yellow-400/30" />
            
            {/* Stem */}
            <div className="w-4 h-16 bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900 shadow-[inset_0_0_10px_rgba(0,0,0,0.5)]" />
            
            {/* Base Detail */}
            <div className="w-8 h-2 bg-yellow-700 rounded-full mb-[-1px]" />
            
            {/* Base */}
            <div className="w-32 h-8 bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-900 rounded-[50%] shadow-[0_10px_20px_rgba(0,0,0,0.8),inset_0_2px_5px_rgba(255,255,255,0.2)] border-t border-yellow-400/20" />
        </div>
      </motion.div>
      )}
      </AnimatePresence>
    </motion.div>
  );
}
