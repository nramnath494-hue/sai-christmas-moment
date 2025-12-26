'use client';
import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

// Components
import Snow from '@/components/Snow';
import LetterCard from '@/components/LetterCard';
import SnowGlobe from '@/components/SnowGlobe';
import Candle from '@/components/Candle';
import MomentFreeze from '@/components/MomentFreeze';
import ConstellationField from '@/components/ConstellationField';
import FloatingLanterns from '@/components/FloatingLanterns';
import ReflectionOverlay from '@/components/ReflectionOverlay';
import RecordPlayer, { PLAYLIST } from '@/components/RecordPlayer';
import GiftUnboxing from '@/components/GiftUnboxing';
import ThankYou from '@/components/ThankYou';
import FinalStop from '@/components/FinalStop';
import CursorSparkles from '@/components/CursorSparkles';
import Fireworks from '@/components/Fireworks';
import FoggyWindow from '@/components/FoggyWindow';
import ConversationCards from '@/components/ConversationCards';
import FutureVisions from '@/components/FutureVisions';
import FireflyGarden from '@/components/FireflyGarden';
import SantaGame from '@/components/SantaGame';

export const force_dynamic = 'force-dynamic'; // Ensures animations work correctly on Vercel

export default function Home() {
  const [act, setAct] = useState(1);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
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

  const nextSong = () => {
    if (audioRef.current) {
      const nextIndex = (currentSongIndex + 1) % PLAYLIST.length;
      setCurrentSongIndex(nextIndex);
      // Small timeout to allow src change to propagate
      setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().catch(e => console.log("Audio play failed", e));
        }
      }, 100);
    }
  };

  return (
    <main className="relative w-full h-screen overflow-hidden bg-[#050814] selection:bg-indigo-500/30">
      {/* Audio Element with onEnded listener to auto-play next song */}
      <audio ref={audioRef} src={PLAYLIST[currentSongIndex]} onEnded={nextSong} />
      
      {/* Global Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-[#050814] to-[#050814]" />
      
      {/* Snow is global but freezes in Act 5 (MomentFreeze) */}
      {act > 2 && act !== 3 && <Snow frozen={act === 5} />}

      {/* Magical Cursor Trail (Global) */}
      <CursorSparkles />

      <AnimatePresence mode="wait">
        {act === 1 && <LetterCard key="act1" onStart={() => setAct(2)} />}
        {act === 2 && <RecordPlayer key="act2" onPlay={startMusic} />}
        {act === 3 && <SnowGlobe key="act3" onNext={() => setAct(4)} />}
        {act === 4 && <Candle key="act4" onComplete={() => setAct(5)} />}
        {act === 5 && <MomentFreeze key="act5" onComplete={() => setAct(6)} />}
        {act === 6 && <ConstellationField key="act6" onComplete={() => setAct(7)} />}
        {act === 7 && <FloatingLanterns key="act7" onComplete={() => setAct(8)} />}
        {act === 8 && <FoggyWindow key="act8" onComplete={() => setAct(9)} />}
        {act === 9 && <SantaGame key="act9" onComplete={() => setAct(10)} />}
        {act === 10 && <ConversationCards key="act10" onComplete={() => setAct(11)} />}
        {act === 11 && <FutureVisions key="act11" onComplete={() => setAct(12)} />}
        {act === 12 && <FireflyGarden key="act12" onComplete={() => setAct(13)} />}
        {act === 13 && <ReflectionOverlay key="act13" />}
        {act === 14 && <GiftUnboxing key="act14" onComplete={() => setAct(15)} />}
          
        {act === 15 && <ThankYou key="act15" onComplete={() => setAct(16)} />}
        
        {act === 16 && (
          <>
            <Fireworks />
            <FinalStop key="act16" onStop={stopMusic} />
          </>
        )}
      </AnimatePresence>
      
      {/* Optional: Floating Stop Button for Reflection Act */}
      {act === 13 && (
        <motion.div 
          className="absolute bottom-10 right-10 z-50"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 8 }}
        >
          <button 
            onClick={() => setAct(14)}
            className="text-white/30 hover:text-white/80 text-xs uppercase tracking-widest transition-colors"
          >
            One Last Surprise
          </button>
        </motion.div>
      )}
    </main>
  );
}
