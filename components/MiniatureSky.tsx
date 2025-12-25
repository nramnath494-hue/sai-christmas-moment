'use client';
import { motion } from 'framer-motion';

const StarShape = ({ cx, cy, size, delay, duration }: { cx: number, cy: number, size: number, delay: number, duration: number }) => (
  <motion.path
    d={`M ${cx} ${cy - size} L ${cx + size * 0.2} ${cy - size * 0.2} L ${cx + size} ${cy} L ${cx + size * 0.2} ${cy + size * 0.2} L ${cx} ${cy + size} L ${cx - size * 0.2} ${cy + size * 0.2} L ${cx - size} ${cy} L ${cx - size * 0.2} ${cy - size * 0.2} Z`}
    fill="white"
    initial={{ opacity: 0.4, scale: 0.8 }}
    animate={{ opacity: [0.4, 1, 0.4], scale: [0.8, 1.2, 0.8] }}
    transition={{ duration, repeat: Infinity, delay, ease: "easeInOut" }}
  />
);

export default function MiniatureSky({ className }: { className?: string }) {
  return (
    <motion.svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2, delay: 0.5 }}
    >
      {/* Crescent Moon */}
      <motion.path
        d="M82 18 C 82 18 79 15 74 15 C 69 15 65 19 65 24 C 65 29 69 33 74 33 C 79 33 82 30 82 30 C 82 30 79 31 74 28 C 70 25 70 21 74 18 C 78 15 82 18 82 18 Z"
        fill="#FEF3C7"
        filter="drop-shadow(0 0 4px rgba(253, 230, 138, 0.5))"
      />
      
      {/* Stars */}
      <StarShape cx={20} cy={20} size={1.5} delay={0} duration={3} />
      <StarShape cx={35} cy={15} size={1} delay={1} duration={4} />
      <StarShape cx={15} cy={35} size={1.2} delay={0.5} duration={2.5} />
      <StarShape cx={85} cy={30} size={1} delay={2} duration={5} />
      <StarShape cx={50} cy={10} size={1.5} delay={1.5} duration={3.5} />
    </motion.svg>
  );
}