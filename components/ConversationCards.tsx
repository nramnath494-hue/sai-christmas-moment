'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import { Send, Sparkles, Lock, ArrowRight } from 'lucide-react';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

const questions = [
  "What is one wish you have for the coming year?",
  "What is your happiest memory?",
  "What makes you feel most loved?",
  "If we could go anywhere right now, where would it be?",
  "What is a secret dream you've never told anyone?"
];

interface Props {
  onComplete: () => void;
}

export default function ConversationCards({ onComplete }: Props) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNext = () => {
    if (!answer.trim()) return;
    
    setIsSubmitting(true);
    
    // Simulate "sending to the stars"
    setTimeout(() => {
      setAnswer("");
      setIsSubmitting(false);
      if (index < questions.length - 1) {
        setIndex(index + 1);
      } else {
        onComplete();
      }
    }, 1500);
  };

  return (
    <motion.div 
      className={`absolute inset-0 bg-slate-950 flex flex-col items-center justify-center p-6 ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-950 to-black pointer-events-none" />
      
      <div className="w-full max-w-md relative z-10">
        <motion.div 
          className="text-center mb-8"
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
        >
          <h2 className={`text-4xl text-indigo-200 ${scriptFont.className}`}>Whispers & Wishes</h2>
          <p className="text-indigo-300/50 text-sm tracking-widest uppercase mt-2">Card {index + 1} of {questions.length}</p>
        </motion.div>

        <div className="relative h-96 w-full perspective-[1000px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, x: 50, rotateY: -10 }}
              animate={{ opacity: 1, x: 0, rotateY: 0 }}
              exit={{ opacity: 0, x: -50, rotateY: 10 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 flex flex-col justify-between shadow-2xl"
            >
              <div>
                <Sparkles className="text-amber-300/50 mb-4" size={24} />
                <h3 className="text-2xl md:text-3xl text-indigo-100 leading-relaxed">
                  {questions[index]}
                </h3>
              </div>

              <div className="space-y-4">
                <div className="relative">
                  <textarea
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    placeholder="Type your answer here..."
                    className="w-full bg-black/20 border border-white/10 rounded-xl p-4 text-indigo-100 placeholder:text-indigo-400/30 focus:outline-none focus:border-indigo-400/50 transition-colors resize-none h-32"
                    disabled={isSubmitting}
                  />
                  <div className="absolute bottom-3 right-3">
                    <Lock size={14} className="text-indigo-400/30" />
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-xs text-indigo-400/40 flex items-center gap-1">
                    <Lock size={10} /> Your answer is a secret
                  </span>
                  
                  <button
                    onClick={handleNext}
                    disabled={!answer.trim() || isSubmitting}
                    className={`
                      flex items-center gap-2 px-6 py-2 rounded-full transition-all
                      ${!answer.trim() 
                        ? 'bg-white/5 text-white/20 cursor-not-allowed' 
                        : 'bg-indigo-500 hover:bg-indigo-400 text-white shadow-[0_0_15px_rgba(99,102,241,0.5)]'}
                    `}
                  >
                    {isSubmitting ? (
                      <motion.div 
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        className="flex items-center gap-2"
                      >
                        <Sparkles size={16} className="animate-spin" /> Sending...
                      </motion.div>
                    ) : (
                      <>Next <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}