'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cormorant_Garamond, Dancing_Script } from 'next/font/google';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });
const scriptFont = Dancing_Script({ subsets: ['latin'], weight: ['700'] });

interface Props {
  onComplete: () => void;
}

export default function CookiesAndMilk({ onComplete }: Props) {
  const [cookies, setCookies] = useState([1, 2, 3, 4, 5]);
  const [milkFull, setMilkFull] = useState(true);
  const [message, setMessage] = useState("");
  const [showHint, setShowHint] = useState(true);

  const cookieMessages = [
    "Your kindness has a way of softening the world around you.",
    "You are effortlessly beautiful, inside and out.",
    "Your laugh is quickly becoming my favorite sound.",
    "I admire the beautiful way you see the world.",
    "I really appreciate you, exactly as you are."
  ];

  const handleCookieClick = (id: number) => {
    setShowHint(false);
    setMessage(cookieMessages[Math.min(4, 5 - cookies.length)]);
    setCookies(prev => prev.filter(c => c !== id));
  };

  const handleMilkClick = () => {
    if (!milkFull) return;
    setShowHint(false);
    setMessage("To wash it all down with care.");
    setMilkFull(false);
  };

  useEffect(() => {
    if (cookies.length === 0 && !milkFull) {
      setTimeout(() => {
        setMessage("Ready to move on...");
        setTimeout(onComplete, 2000);
      }, 1000);
    }
  }, [cookies, milkFull, onComplete]);

  return (
    <motion.div 
      className={`relative w-72 h-40 flex items-end justify-center gap-6 ${font.className}`}
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
      {/* Message Popup */}
      <AnimatePresence mode="wait">
        {(message || showHint) && (
          <motion.div
            key={message || "hint"}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 text-center pointer-events-none z-50"
          >
            <p className={`text-orange-50 text-4xl md:text-5xl drop-shadow-[0_4px_8px_rgba(0,0,0,0.9)] tracking-wide leading-tight ${scriptFont.className}`}>
              {message || "Please, have a treat..."}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Milk Glass */}
      <div 
        className="relative w-14 h-24 cursor-pointer group hover:scale-105 transition-transform duration-300"
        onClick={handleMilkClick}
      >
        <div className="absolute inset-0 bg-blue-100/10 border-2 border-white/20 rounded-b-lg shadow-[0_0_15px_rgba(255,255,255,0.1)]" />
        <motion.div 
          className="absolute bottom-1 left-1 right-1 bg-white/90 rounded-b-md backdrop-blur-sm"
          initial={{ height: "85%" }}
          animate={{ height: milkFull ? "85%" : "5%" }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
        />
        {/* Glass Highlight */}
        <div className="absolute top-2 right-2 w-1 h-16 bg-white/30 rounded-full blur-[1px]" />
      </div>

      {/* Plate of Cookies */}
      <div className="relative w-40 h-12">
        {/* Plate */}
        <div className="absolute bottom-0 w-full h-full bg-white/90 rounded-[50%] shadow-[0_10px_20px_rgba(0,0,0,0.5)] border-b-4 border-gray-300" />
        
        {/* Cookies */}
        <AnimatePresence>
          {cookies.map((id, index) => (
            <motion.div
              key={id}
              className="absolute w-12 h-12 bg-[#8D6E63] rounded-full cursor-pointer shadow-md hover:scale-110 hover:brightness-110 transition-all"
              style={{
                left: `${15 + (index % 3) * 25}%`,
                top: `${-20 - Math.floor(index / 3) * 15}%`,
                zIndex: 10 - index
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0, y: -20 }}
              onClick={() => handleCookieClick(id)}
            >
              {/* Chocolate Chips */}
              <div className="absolute top-3 left-3 w-2 h-2 bg-[#3E2723] rounded-full opacity-70" />
              <div className="absolute top-6 left-6 w-2 h-2 bg-[#3E2723] rounded-full opacity-70" />
              <div className="absolute top-4 right-4 w-2 h-2 bg-[#3E2723] rounded-full opacity-70" />
              {/* Texture */}
              <div className="absolute inset-0 bg-black/10 rounded-full pointer-events-none" />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}