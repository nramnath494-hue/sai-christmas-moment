'use client';
import { motion } from 'framer-motion';

export default function Fireplace() {
  return (
    <div className="relative w-64 h-48 md:w-80 md:h-64 flex flex-col items-center justify-end">
      {/* Mantle/Frame */}
      <div className="w-full h-full bg-[#1a1a1a] rounded-t-lg border-[12px] border-[#2d1b14] shadow-2xl relative overflow-hidden flex items-end justify-center">
         {/* Inner Brick Texture */}
         <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "url('https://www.transparenttextures.com/patterns/brick-wall-dark.png')" }} />
         
         {/* Fire Glow on Walls */}
         <motion.div 
           className="absolute inset-0 bg-orange-900/20"
           animate={{ opacity: [0.1, 0.3, 0.1] }}
           transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
         />

         {/* Hearth */}
         <div className="relative w-3/4 h-4/5 bg-black/80 rounded-t-full flex justify-center items-end pb-2 shadow-[inset_0_0_30px_rgba(0,0,0,0.9)]">
            {/* Logs - Textured */}
            <div className="absolute bottom-2 w-24 h-5 bg-[#2d1b14] rounded-full rotate-[-5deg] shadow-lg border-t border-white/5" />
            <div className="absolute bottom-5 w-24 h-5 bg-[#3e2723] rounded-full rotate-[5deg] shadow-lg border-t border-white/5" />
            
            {/* Flames */}
            <div className="relative mb-4 w-full h-full flex justify-center items-end overflow-hidden rounded-t-full">
               {/* Back Flames (Darker/Redder) */}
               {[...Array(8)].map((_, i) => (
                 <motion.div
                   key={`back-${i}`}
                   className="absolute bottom-0 w-8 h-16 bg-gradient-to-t from-red-700 via-orange-600 to-transparent rounded-full blur-[4px] opacity-70"
                   style={{ left: `${30 + Math.random() * 40}%` }}
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{
                     height: [40, 80, 50],
                     y: [0, -10, 0],
                     scaleX: [1, 1.2, 0.9],
                     opacity: [0.5, 0.8, 0.4],
                   }}
                   transition={{
                     duration: 0.5 + Math.random() * 0.5,
                     repeat: Infinity,
                     ease: "easeInOut",
                     delay: Math.random()
                   }}
                 />
               ))}

               {/* Main Flames (Orange/Yellow) */}
               {[...Array(12)].map((_, i) => (
                 <motion.div
                   key={`main-${i}`}
                   className="absolute bottom-0 w-6 h-12 bg-gradient-to-t from-orange-500 via-yellow-500 to-transparent rounded-t-full blur-[2px]"
                   style={{ left: `${35 + Math.random() * 30}%` }}
                   initial={{ scale: 0, opacity: 0 }}
                   animate={{
                     height: [30, 90, 40],
                     y: [0, -20, 0],
                     opacity: [0.6, 1, 0.5],
                     scale: [0.8, 1.2, 0.9],
                   }}
                   transition={{
                     duration: 0.3 + Math.random() * 0.4,
                     repeat: Infinity,
                     ease: "easeOut",
                     delay: Math.random()
                   }}
                 />
               ))}

               {/* Core Heat */}
               <motion.div 
                 className="absolute bottom-0 w-24 h-24 bg-orange-500 blur-2xl rounded-full opacity-30"
                 animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                 transition={{ duration: 0.2, repeat: Infinity }}
               />
            </div>
         </div>
      </div>
      {/* Hearth Base */}
      <div className="w-[110%] h-6 bg-[#1e1e1e] rounded-sm shadow-lg border-t-4 border-[#3d2820]" />
    </div>
  );
}