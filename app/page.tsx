'use client';
import { useState, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Snow from '@/components/Snow';
import LetterCard from '@/components/LetterCard';
import SnowGlobe from '@/components/SnowGlobe';
import Candle from '@/components/Candle';
import MomentFreeze from '@/components/MomentFreeze';
import ConstellationField from '@/components/ConstellationField';
import FloatingMessage from '@/components/FloatingMessage';
import ReflectionOverlay from '@/components/ReflectionOverlay';
import RecordPlayer from '@/components/RecordPlayer';
import GiftUnboxing from '@/components/GiftUnboxing';
import FinalStop from '@/components/FinalStop';

export const force_dynamic = 'force-dynamic'; // Ensures animations work correctly on Vercel

const AUDIO_URL = "/O Come, All Ye Faithful - Christmas piano instrumental with lyrics.mp3"; // Path relative to the public folder

export default function Home() {
  const [act, setAct] = useState(1);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const startMusic = () => {
    if (audioRef.current) {
      audioRef.current.volume = 0;
      audioRef.current.play().catch(e => console.log("Audio play failed", e));
      
      // Fade in audio
      let vol = 0;
      const fade = setInterval(() => {
        if (vol < 0.5) {
          vol += 0.05;
          if(audioRef.current) audioRef.current.volume = vol;
        } else {
          clearInterval(fade);
        }
      }, 200);
    }
    setAct(3); // Move to SnowGlobe after music starts
  };

  const stopMusic = () => {
    if (audioRef.current) {
      const fadeOut = setInterval(() => {
        if (audioRef.current && audioRef.current.volume > 0.05) {
          audioRef.current.volume -= 0.05;
        } else {
          if (audioRef.current) audioRef.current.pause();
          clearInterval(fadeOut);
        }
      }, 200);
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050814] selection:bg-indigo-500/30">
      <audio ref={audioRef} src={AUDIO_URL} loop />
      
      {/* Global Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050814] to-[#050814]" />
      
      {/* Snow is global but freezes in Act 5 (MomentFreeze) */}
      {act > 2 && act !== 3 && <Snow frozen={act === 5} />}

      <AnimatePresence mode="wait">
        {act === 1 && <LetterCard key="act1" onStart={() => setAct(2)} />}
        {act === 2 && <RecordPlayer key="act2" onPlay={startMusic} />}
        {act === 3 && <SnowGlobe key="act3" onNext={() => setAct(4)} />}
        {act === 4 && <Candle key="act4" onComplete={() => setAct(5)} />}
        {act === 5 && <MomentFreeze key="act5" onComplete={() => setAct(6)} />}
        {act === 6 && <ConstellationField key="act6" onComplete={() => setAct(7)} />}
        {act === 7 && <FloatingMessage key="act7" onComplete={() => setAct(8)} />}
        {act === 8 && <ReflectionOverlay key="act8" />}
        {act === 9 && <GiftUnboxing key="act9" onComplete={() => setAct(10)} />}
        {/* Final Stop */}
        {act === 10 && <FinalStop key="act10" onStop={stopMusic} />}
      </AnimatePresence>
      
      {/* Optional: Floating Stop Button for Act 8 */}
      {act === 8 && (
        <motion.div 
          className="absolute bottom-10 right-10 z-50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 5 }}
        >
          <button 
            onClick={() => setAct(9)}
            className="text-white/30 hover:text-white/80 text-xs uppercase tracking-widest transition-colors"
          >
            One Last Surprise
          </button>
        </motion.div>
      )}
    </main>
  );
}
