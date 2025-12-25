'use client';
import { motion } from 'framer-motion';

export default function GlobeBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-10">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#1e1b4b_0%,#020617_100%)]" />
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{ 
          backgroundImage: 'radial-gradient(circle at 50% 50%, rgba(129, 140, 248, 0.15) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}
        animate={{ opacity: [0.2, 0.4, 0.2], scale: [1, 1.05, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-indigo-600/10 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/10 rounded-full blur-[150px]" />
    </div>
  );
}