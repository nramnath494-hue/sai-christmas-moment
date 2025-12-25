'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Cormorant_Garamond } from 'next/font/google';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });

export const PLAYLIST = [
  "/song1.mp3",
  "/song2.mp3"
];

interface Props {
  onPlay: () => void;
}

export default function RecordPlayer({ onPlay }: Props) {
  const [isPlaced, setIsPlaced] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePlace = () => setIsPlaced(true);
  
  const handlePlayClick = () => {
    if (!isPlaced) return;
    setIsPlaying(true);
    // Delay actual callback to let animation play
    setTimeout(onPlay, 4000); 
  };

  return (
    <motion.div 
      className={`absolute inset-0 flex flex-col items-center justify-center bg-[#0a0a0a] ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
       {/* Instructions */}
       <div className="absolute top-12 md:top-24 text-center space-y-4 z-20 w-full px-4">
          {!isPlaced && (
            <motion.p 
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className="text-xl md:text-3xl text-amber-100/80 tracking-wide italic"
            >
              Let's set the mood...
            </motion.p>
          )}
          {isPlaced && !isPlaying && (
             <motion.p 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
             className="text-xl md:text-3xl text-amber-100/80 tracking-wide italic"
           >
             Press play.
           </motion.p>
          )}
       </div>

       {/* Player Base */}
       <div className="relative w-80 h-80 md:w-96 md:h-96 bg-[#2c1810] rounded-xl shadow-[0_20px_50px_rgba(0,0,0,0.8)] flex items-center justify-center border-t border-white/10 scale-[0.65] sm:scale-75 md:scale-100 transition-transform duration-500">
          {/* Wood Texture Overlay */}
          <div className="absolute inset-0 opacity-40 rounded-xl" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/wood-pattern.png')" }} />
          
          {/* Platter */}
          <div className="relative w-64 h-64 bg-[#111] rounded-full shadow-inner flex items-center justify-center border-4 border-[#333]">
             {/* Spindle */}
             <div className="w-3 h-3 bg-gray-400 rounded-full z-20 shadow-sm" />
             
             {/* Record */}
             <motion.div
               className="absolute w-60 h-60 rounded-full bg-black cursor-pointer shadow-xl"
               style={{ 
                 background: 'conic-gradient(#111 0deg, #222 45deg, #111 90deg, #222 135deg, #111 180deg, #222 225deg, #111 270deg, #222 315deg, #111 360deg)'
               }}
               initial={{ x: 300, rotate: 0, opacity: 0 }}
               animate={isPlaced 
                 ? (isPlaying ? { x: 0, y: 0, opacity: 1, rotate: 360 } : { x: 0, y: 0, opacity: 1, rotate: 0 }) 
                 : (isMobile 
                     ? { x: 0, y: 240, opacity: 1, scale: 0.8, rotate: 15 } 
                     : { x: 250, y: 0, opacity: 1, scale: 0.8, rotate: 15 })
               }
               whileHover={!isPlaced ? (isMobile ? { scale: 0.85, y: 220 } : { scale: 0.85, x: 230 }) : {}}
               onClick={!isPlaced ? handlePlace : undefined}
               transition={isPlaying 
                 ? { rotate: { duration: 2, repeat: Infinity, ease: "linear" } }
                 : { duration: 1, ease: "easeInOut" }
               }
             >
                {/* Record Grooves */}
                <div className="absolute inset-2 rounded-full border border-white/5 opacity-50" />
                <div className="absolute inset-4 rounded-full border border-white/5 opacity-50" />
                <div className="absolute inset-6 rounded-full border border-white/5 opacity-50" />
                <div className="absolute inset-8 rounded-full border border-white/5 opacity-50" />
                
                {/* Label */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-amber-700 rounded-full flex items-center justify-center shadow-md border border-amber-600/30">
                   <span className="text-[10px] text-amber-100 uppercase tracking-widest opacity-80 font-sans">Sai's Song</span>
                </div>
             </motion.div>
          </div>

          {/* Tone Arm */}
          <motion.div 
            className="absolute top-8 right-6 w-6 h-48 origin-top-center z-30 pointer-events-none"
            initial={{ rotate: -35 }}
            animate={isPlaying ? { rotate: -15 } : { rotate: -35 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
          >
             <div className="w-2 h-40 bg-gradient-to-b from-gray-300 to-gray-500 mx-auto rounded-full shadow-lg" />
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-10 h-10 bg-gradient-to-br from-gray-400 to-gray-600 rounded-full shadow-md border border-gray-300/20" /> {/* Pivot */}
             <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-8 h-12 bg-gray-700 rounded-md shadow-md" /> {/* Head */}
          </motion.div>

          {/* Play Button */}
          <div className="absolute bottom-6 right-6">
             <button 
               onClick={handlePlayClick}
               disabled={!isPlaced || isPlaying}
               className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${isPlaced && !isPlaying ? 'bg-amber-600 hover:bg-amber-500 shadow-[0_0_20px_rgba(217,119,6,0.4)] cursor-pointer scale-100' : 'bg-gray-800 opacity-50 cursor-default scale-95'}`}
             >
               <div className="w-0 h-0 border-l-[14px] border-l-white border-y-[8px] border-y-transparent ml-1" />
             </button>
          </div>
       </div>
    </motion.div>
  );
}