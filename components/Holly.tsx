'use client';
import { motion } from 'framer-motion';

export default function Holly({ className }: { className?: string }) {
  return (
    <motion.svg 
      viewBox="0 0 24 24" 
      className={className} 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      initial={{ scale: 0, rotate: -45 }}
      animate={{ scale: 1, rotate: 0 }}
      transition={{ delay: 1, type: "spring", stiffness: 200 }}
    >
      {/* Leaves */}
      <path d="M12 2C12 2 14 6 17 6C20 6 22 4 22 4C22 4 21 8 22 11C23 14 20 15 20 15C20 15 16 14 14 16C12 18 12 22 12 22C12 22 10 18 8 16C6 14 2 15 2 15C2 15 1 14 0 11C-1 8 2 4 2 4C2 4 4 6 7 6C10 6 12 2 12 2Z" fill="#2F5A35" stroke="#1A3820" strokeWidth="0.5"/>
      <path d="M12 22C12 22 14 18 17 18C20 18 22 20 22 20C22 20 21 16 22 13C23 10 20 9 20 9C20 9 16 10 14 8C12 6 12 2 12 2C12 2 10 6 8 8C6 10 2 9 2 9C2 9 1 10 0 13C-1 16 2 20 2 20C2 20 4 18 7 18C10 18 12 22 12 22Z" fill="#3A6B40" stroke="#1A3820" strokeWidth="0.5" opacity="0.8"/>
      
      {/* Berries */}
      <circle cx="12" cy="12" r="2.5" fill="#C41E3A" stroke="#800000" strokeWidth="0.5" />
      <circle cx="14.5" cy="10.5" r="2" fill="#D62845" stroke="#800000" strokeWidth="0.5" />
      <circle cx="9.5" cy="10.5" r="2" fill="#A01830" stroke="#800000" strokeWidth="0.5" />
    </motion.svg>
  );
}