'use client';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import { Gift, Download, ArrowRight, Heart, X, Watch, Clock, Sparkles, ChevronDown } from 'lucide-react';
import { toPng } from 'html-to-image';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600', '700'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

// USER: REPLACE THIS URL WITH YOUR IMAGE PATH (e.g., "/sai-photo.jpg" if inside the public folder)
const LOCKET_IMAGE_SRC = "/sai.jpeg";

interface Props {
  onComplete: () => void;
}

type GiftType = {
  id: number;
  name: string;
  type: 'image' | 'locket' | 'letter';
  src?: string;
  content?: string;
  color: string;
};

const gifts: GiftType[] = [
  { 
    id: 1, 
    name: "A Bracelet", 
    type: 'image', 
    src: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&w=600&q=80",
    color: "bg-rose-100"
  },
  { 
    id: 2, 
    name: "For Your Time", 
    type: 'image', 
    src: "https://images.unsplash.com/photo-1619134778706-7015533a6150?q=80&w=600&auto=format&fit=crop",
    color: "bg-indigo-100"
  },
  { 
    id: 3, 
    name: "A Cuddly Friend", 
    type: 'image', 
    src: "/teddy2.jpg",
    color: "bg-amber-100"
  },
  { 
    id: 4, 
    name: "A Letter", 
    type: 'letter', 
    content: "Dear Sai,\n\nAs the year softens into winter and the lights glow a little brighter, I found myself thinking of you.\n\nI wanted to share a few small tokens that remind me of the spark you carry, the way you make time feel a little more special, and the quiet warmth you bring just by being yourself.\n\nThis season is full of magic, but I think the truest magic is found in simple moments and the beauty of getting to know someone new.\n\nI hope these gifts bring a smile to your face. It hasn't been long, but you've already become a beautiful part of my story this year.\n\nMerry Christmas.\n\n- Narendra",
    color: "bg-slate-100"
  },
  { 
    id: 5, 
    name: "Open My Heart", 
    type: 'locket', 
    color: "bg-red-100"
  },
  {
    id: 6,
    name: "Sweet Treats",
    type: 'image',
    src: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?q=80&w=600&auto=format&fit=crop",
    color: "bg-pink-100"
  },
];

export default function GiftUnboxing({ onComplete }: Props) {
  const [openedGifts, setOpenedGifts] = useState<number[]>([]);
  const [locketOpen, setLocketOpen] = useState(false);
  const [letterRead, setLetterRead] = useState(false);
  const [showSavePrompt, setShowSavePrompt] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const allOpened = openedGifts.length === gifts.length;

  useEffect(() => {
    if (allOpened && letterRead) {
      setTimeout(() => setShowSavePrompt(true), 1500);
    }
  }, [allOpened, letterRead]);

  const handleOpen = (id: number) => {
    if (!openedGifts.includes(id)) {
      setOpenedGifts([...openedGifts, id]);
    }
  };

  const handleSave = async () => {
    if (!containerRef.current) return;
    setIsSaving(true);
    try {
      const dataUrl = await toPng(containerRef.current, { 
        cacheBust: true, 
        pixelRatio: 2,
        filter: (node) => {
          return !node.classList?.contains('exclude-from-save');
        }
      });
      const link = document.createElement('a');
      link.download = 'Christmas-Gifts-From-Narendra.png';
      link.href = dataUrl;
      link.click();
      setTimeout(onComplete, 1500);
    } catch (err) {
      console.error("Failed to save image", err);
      onComplete();
    }
    setIsSaving(false);
  };

  return (
    <motion.div 
      ref={containerRef}
      className={`absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-[#0f172a] to-black overflow-y-auto overflow-x-hidden ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="min-h-full p-6 md:p-12 flex flex-col items-center pb-32">
        
        <motion.div 
          initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
          className="text-center mb-8 md:mb-12 space-y-2 relative z-10"
        >
          <h1 className={`text-4xl md:text-6xl text-amber-100 ${scriptFont.className}`}>Gifts for You</h1>
          <p className="text-indigo-200/80 text-sm md:text-lg tracking-widest uppercase">Tap to unwrap</p>
          <div className="w-32 h-1 bg-white/10 rounded-full mx-auto mt-4 overflow-hidden">
            <motion.div 
              className="h-full bg-amber-500"
              initial={{ width: 0 }}
              animate={{ width: `${(openedGifts.length / gifts.length) * 100}%` }}
            />
          </div>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 w-full max-w-5xl">
          {gifts.map((gift, index) => (
            <GiftBox 
              key={gift.id} 
              gift={gift} 
              isOpen={openedGifts.includes(gift.id)} 
              onOpen={() => handleOpen(gift.id)}
              index={index}
              locketOpen={locketOpen}
              setLocketOpen={setLocketOpen}
              onLetterRead={() => setLetterRead(true)}
            />
          ))}
        </div>

        {/* Save Prompt / Footer */}
        <AnimatePresence>
          {showSavePrompt && (
            <motion.div 
              initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
              className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/90 to-transparent z-50 flex flex-col items-center gap-4 exclude-from-save"
            >
              <p className="text-white text-lg md:text-xl text-center mb-2">
                Do you want to save these memories?
              </p>
              <div className="flex gap-4">
                <button 
                  onClick={handleSave}
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-3 bg-amber-600 hover:bg-amber-500 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)]"
                >
                  {isSaving ? "Saving..." : <><Download size={18} /> Yes, Save Gifts</>}
                </button>
                <button 
                  onClick={onComplete}
                  className="px-6 py-3 bg-white/10 hover:bg-white/20 text-white rounded-full font-semibold transition-all backdrop-blur-sm"
                >
                  No, Continue <ArrowRight size={18} className="inline ml-1" />
                </button>
              </div>
              <p className="text-white/30 text-xs mt-2">From Narendra &lt;3</p>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </motion.div>
  );
}

function GiftBox({ gift, isOpen, onOpen, index, locketOpen, setLocketOpen, onLetterRead }: any) {
  const [hasScrolled, setHasScrolled] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      className={`relative aspect-square ${isOpen ? 'z-10' : 'z-0'}`}
    >
      <AnimatePresence mode="wait">
        {!isOpen ? (
          <motion.button
            key="box"
            onClick={onOpen}
            exit={{ scale: 1.1, opacity: 0, rotate: 10 }}
            whileHover={{ scale: 1.05, rotate: 2 }}
            whileTap={{ scale: 0.95 }}
            className={`w-full h-full rounded-2xl shadow-xl relative overflow-hidden group ${gift.color}`}
          >
            <motion.div 
              className="w-full h-full flex flex-col items-center justify-center"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: index * 0.2 }}
            >
              {/* Ribbon */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-4 md:w-8 h-full bg-black/10" />
                <div className="absolute w-full h-4 md:h-8 bg-black/10" />
              </div>
              <Gift size={48} className="text-slate-800/50 mb-2 relative z-10" />
              <span className="text-slate-800/70 font-semibold uppercase tracking-widest text-xs md:text-sm relative z-10 flex items-center gap-2">
                Tap to Open <Sparkles size={12} />
              </span>
            </motion.div>
          </motion.button>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            transition={{ type: "spring", damping: 12 }}
            className="w-full h-full bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex flex-col items-center justify-center relative overflow-hidden shadow-2xl"
          >
            {/* Content based on type */}
            {gift.type === 'image' && (
              <>
                <div className="relative w-full h-3/4 rounded-lg overflow-hidden mb-2 shadow-inner">
                  <img src={gift.src} alt={gift.name} className="w-full h-full object-cover" />
                </div>
                <p className="text-amber-100 text-sm md:text-lg font-medium">{gift.name}</p>
              </>
            )}

            {gift.type === 'letter' && (
              <>
                <div className="w-full h-full bg-[#fdfbf7] text-slate-800 p-2 md:p-4 rounded-lg shadow-inner relative overflow-hidden z-10">
                <div 
                  className="overflow-y-auto h-full text-center flex flex-col items-center py-4 px-2 scrollbar-hide"
                  onScroll={(e) => {
                    const target = e.currentTarget;
                    if (!hasScrolled && target.scrollTop > 5) {
                      setHasScrolled(true);
                    }
                    // Check if scrolled to bottom (with small buffer)
                    if (target.scrollHeight - target.scrollTop <= target.clientHeight + 100) {
                      onLetterRead();
                    }
                  }}
                >
                  <p className="whitespace-pre-wrap text-[10px] md:text-xs leading-relaxed font-serif italic pb-4">
                    {gift.content}
                  </p>
                </div>
                </div>
                <AnimatePresence>
                  {!hasScrolled && (
                    <motion.div 
                      initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }}
                      className="absolute bottom-2 left-0 right-0 flex justify-center pointer-events-none z-20"
                    >
                      <div className="bg-black/80 text-white px-3 py-1 rounded-full text-[10px] uppercase tracking-widest flex items-center gap-1 shadow-lg backdrop-blur-sm">
                        Scroll to read <ChevronDown size={10} />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </>
            )}

            {gift.type === 'locket' && (
              <div className="flex flex-col items-center justify-center h-full w-full">
                <div className="relative w-32 h-32 md:w-56 md:h-56 cursor-pointer perspective-[1000px]" onClick={() => setLocketOpen(!locketOpen)}>
                  {/* Necklace Chain */}
                  <svg className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-32 pointer-events-none z-0 opacity-80" viewBox="0 0 200 100">
                    {/* V-Shape Chain */}
                    <path d="M0 0 Q 100 120 200 0" fill="none" stroke="url(#chainGradient)" strokeWidth="1.5" strokeDasharray="3 2" />
                    <defs>
                      <linearGradient id="chainGradient" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="transparent" />
                        <stop offset="20%" stopColor="#FDB931" />
                        <stop offset="50%" stopColor="#FFD700" />
                        <stop offset="80%" stopColor="#FDB931" />
                        <stop offset="100%" stopColor="transparent" />
                      </linearGradient>
                    </defs>
                  </svg>
                  
                  {/* Locket Container */}
                  <motion.div 
                    className="w-full h-full relative preserve-3d"
                    animate={{ rotateY: locketOpen ? 180 : 0 }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    {/* Front of Locket */}
                    <div 
                      className="absolute inset-0 backface-hidden"
                      style={{ backfaceVisibility: 'hidden' }}
                    >
                       <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-xl">
                         <path d="M50 90 C 20 70 0 50 0 30 C 0 10 20 0 50 20 C 80 0 100 10 100 30 C 100 50 80 70 50 90" fill="url(#goldGradient)" stroke="#B8860B" strokeWidth="2" />
                         <defs>
                           <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                             <stop offset="0%" stopColor="#FFD700" />
                             <stop offset="50%" stopColor="#FDB931" />
                             <stop offset="100%" stopColor="#B8860B" />
                           </linearGradient>
                         </defs>
                       </svg>
                       <div className="absolute inset-0 flex items-center justify-center">
                         <span className="text-[10px] text-yellow-900/50 font-bold uppercase tracking-widest">Tap Me</span>
                       </div>
                    </div>

                    {/* Inside Left (Mirror/Gold) */}
                    <div 
                      className="absolute inset-0"
                      style={{ 
                        transform: "rotateY(180deg)", 
                        backfaceVisibility: 'hidden',
                        clipPath: "path('M50 90 C 20 70 0 50 0 30 C 0 10 20 0 50 20 C 80 0 100 10 100 30 C 100 50 80 70 50 90')"
                      }}
                    >
                       <div className="w-full h-full bg-yellow-100 flex items-center justify-center overflow-hidden p-2 md:p-4">
                          <img 
                            src={LOCKET_IMAGE_SRC} 
                            alt="Her" 
                            className="w-full h-full object-contain opacity-90 drop-shadow-md"
                          />
                       </div>
                    </div>
                  </motion.div>
                </div>
                <p className="text-amber-100 text-xs md:text-sm mt-4 font-medium">
                  {locketOpen ? "You are the heart." : "Open the locket"}
                </p>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}