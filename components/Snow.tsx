'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Snow({ intensity = "normal", frozen = false, speed = 1 }: { intensity?: "normal" | "globe", frozen?: boolean, speed?: number }) {
  const count = intensity === "globe" ? 300 : 100;
  const [flakes, setFlakes] = useState<Array<{
    id: number;
    x: number;
    scale: number;
    targetY: number;
    targetX: string;
    duration: number;
    delay: number;
    width: number;
    height: number;
  }>>([]);

  useEffect(() => {
    // Generate random values only on the client to prevent hydration mismatch
    const generatedFlakes = Array.from({ length: count }).map((_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      scale: Math.random() * 0.5 + 0.5,
      targetY: window.innerHeight + 10,
      targetX: `calc(${Math.random() * 100}vw + ${Math.random() * 20 - 10}px)`,
      duration: intensity === "globe" ? Math.random() * 3 + 2 : Math.random() * 10 + 10,
      delay: Math.random() * 10,
      width: Math.random() * (intensity === "globe" ? 2 : 3) + 1,
      height: Math.random() * (intensity === "globe" ? 2 : 3) + 1,
    }));
    setFlakes(generatedFlakes);
  }, [count]);
  
  return (
    <div className={`absolute inset-0 pointer-events-none overflow-hidden ${intensity === 'globe' ? 'z-0' : 'z-0'}`}>
      {flakes.map((flake) => (
        <motion.div
          key={flake.id}
          className="absolute bg-white rounded-full opacity-70"
          initial={{
            x: flake.x,
            y: -10,
            scale: flake.scale,
          }}
          animate={frozen ? {} : {
            y: flake.targetY,
            x: flake.targetX,
          }}
          transition={frozen ? { duration: 0 } : {
            duration: flake.duration / speed,
            repeat: Infinity,
            ease: "linear",
            delay: flake.delay,
          }}
          style={{
            width: flake.width + "px",
            height: flake.height + "px",
          }}
        />
      ))}
    </div>
  );
}
