'use client';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Cormorant_Garamond, Great_Vibes } from 'next/font/google';
import { Snowflake, Trees, RefreshCw, Download, ArrowRight, Trophy } from 'lucide-react';

const font = Cormorant_Garamond({ subsets: ['latin'], weight: ['400', '600', '700'] });
const scriptFont = Great_Vibes({ subsets: ['latin'], weight: ['400'] });

// USER: REPLACE THESE WITH YOUR 23-24 IMAGE PATHS (e.g., from public folder)
const RARE_PICTURES = [
  "/pic5.png",
  "/pic6.png",
  "/pic7.png",
  "/pic8.png",
  "/pic9.png",
  "/pic10.png",
  "/pic11.png",
  "/pic12.png",
  "/pic13.png",
  "/pic14.png",
  "/pic15.png",
  "/pic16.png",
  "/pic17.png",
  "/pic18.png",
  "/pic19.png",
  "/pic20.png",
  "/pic21.png",
  "/pic22.png",

  // Add all your images here...
  // "/pic5.png", "/pic6.png", ... up to 24
];

interface Props {
  onComplete: () => void;
}

type Player = 'USER' | 'SANTA' | null;

export default function SantaGame({ onComplete }: Props) {
  const [board, setBoard] = useState<Player[]>(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [winner, setWinner] = useState<Player | 'DRAW' | null>(null);
  const [gameState, setGameState] = useState<'INTRO' | 'PLAYING' | 'WON'>('INTRO');

  const checkWinner = (squares: Player[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }
    return squares.includes(null) ? null : 'DRAW';
  };

  const handleClick = (index: number) => {
    if (board[index] || winner || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'USER';
    setBoard(newBoard);
    
    const gameResult = checkWinner(newBoard);
    if (gameResult) {
      setWinner(gameResult);
      if (gameResult === 'USER') setTimeout(() => setGameState('WON'), 1000);
    } else {
      setIsPlayerTurn(false);
    }
  };

  // Santa's AI (Fairly Easy)
  useEffect(() => {
    if (!isPlayerTurn && !winner) {
      const timer = setTimeout(() => {
        const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(val => val !== null) as number[];
        
        if (emptyIndices.length > 0) {
          // Simple AI: Pick random empty spot (makes it easy to beat)
          const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
          
          const newBoard = [...board];
          newBoard[randomIndex] = 'SANTA';
          setBoard(newBoard);

          const gameResult = checkWinner(newBoard);
          if (gameResult) setWinner(gameResult);
          setIsPlayerTurn(true);
        }
      }, 600); // Delay for realism
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, board, winner]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setWinner(null);
    setIsPlayerTurn(true);
  };

  const handleDownloadAll = async () => {
    for (let i = 0; i < RARE_PICTURES.length; i++) {
      try {
        const response = await fetch(RARE_PICTURES[i]);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `Narendra-Journey-${i + 1}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        await new Promise(resolve => setTimeout(resolve, 800)); // Slight delay to prevent browser throttling
      } catch (error) {
        console.error("Error downloading image:", error);
      }
    }
  };

  return (
    <motion.div 
      className={`absolute inset-0 bg-[#0f172a] flex flex-col items-center justify-center p-4 ${font.className}`}
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-red-900/20 via-[#0f172a] to-black pointer-events-none" />

      <AnimatePresence mode="wait">
        {gameState === 'INTRO' && (
          <motion.div 
            key="intro"
            initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 1.1, opacity: 0 }}
            className="text-center max-w-md bg-white/5 backdrop-blur-md p-8 rounded-2xl border border-white/10 shadow-2xl"
          >
            <Trophy className="w-16 h-16 text-amber-400 mx-auto mb-4" />
            <h2 className={`text-4xl text-amber-100 mb-4 ${scriptFont.className}`}>Santa's Challenge</h2>
            <p className="text-indigo-100/80 text-lg mb-8">
              Beat Santa in a quick game of Tic-Tac-Toe to unlock a special, unseen gift!
            </p>
            <button 
              onClick={() => setGameState('PLAYING')}
              className="px-8 py-3 bg-red-600 hover:bg-red-500 text-white rounded-full font-semibold transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
            >
              Start Game
            </button>
          </motion.div>
        )}

        {gameState === 'PLAYING' && (
          <motion.div 
            key="game"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="flex flex-col items-center"
          >
            <div className="mb-8 text-center">
              <h3 className={`text-3xl text-amber-100 ${scriptFont.className}`}>
                {winner ? (winner === 'USER' ? "You Won!" : winner === 'SANTA' ? "Santa Won!" : "It's a Draw!") : (isPlayerTurn ? "Your Turn (Snowflakes)" : "Santa is thinking...")}
              </h3>
            </div>

            <div className="grid grid-cols-3 gap-2 md:gap-4 bg-white/10 p-2 md:p-4 rounded-xl backdrop-blur-sm">
              {board.map((cell, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleClick(idx)}
                  className={`w-20 h-20 md:w-24 md:h-24 bg-slate-800/50 rounded-lg flex items-center justify-center text-4xl border border-white/5 transition-colors ${!cell && !winner && isPlayerTurn ? 'hover:bg-slate-700/50' : ''}`}
                  whileTap={{ scale: 0.95 }}
                >
                  {cell === 'USER' && <Snowflake className="text-cyan-300 w-10 h-10 md:w-12 md:h-12" />}
                  {cell === 'SANTA' && <Trees className="text-green-400 w-10 h-10 md:w-12 md:h-12" />}
                </motion.button>
              ))}
            </div>

            {winner && winner !== 'USER' && (
              <motion.button
                initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                onClick={resetGame}
                className="mt-8 flex items-center gap-2 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-full transition-all"
              >
                <RefreshCw size={16} /> Try Again
              </motion.button>
            )}
          </motion.div>
        )}

        {gameState === 'WON' && (
          <motion.div 
            key="won"
            initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="text-center max-w-md md:max-w-2xl w-full bg-white p-6 rounded-2xl shadow-2xl mx-4 flex flex-col max-h-[85vh]"
          >
            <div className="mb-6 relative">
              <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 p-3 rounded-full shadow-lg">
                <Trophy size={32} />
              </div>
            </div>
            
            <h2 className={`text-4xl text-slate-800 mt-4 mb-2 ${scriptFont.className}`}>You Won!</h2>
            <div className="space-y-2 mb-6">
              <p className="text-slate-600 text-sm uppercase tracking-widest font-semibold">A Journey Through Time</p>
              <p className="text-slate-500 text-sm md:text-base italic px-4">
                From the very beginning, step by step, growing into the person who is so happy to have met you.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-6 overflow-y-auto pr-2 scrollbar-hide flex-1 min-h-0">
              {RARE_PICTURES.map((src, idx) => (
                <div key={idx} className="flex flex-col gap-2">
                  <div className="relative aspect-[3/4] bg-slate-100 rounded-lg overflow-hidden shadow-inner">
                    <img src={src} alt={`Prize ${idx + 1}`} className="w-full h-full object-cover" />
                  </div>
                  <a 
                    href={src} 
                    download={`Rare-Picture-${idx + 1}.png`}
                    className="flex items-center justify-center gap-2 w-full py-2 bg-slate-900 text-white rounded-lg hover:bg-slate-800 transition-all text-xs"
                  >
                    <Download size={12} /> Save
                  </a>
                </div>
              ))}
            </div>

            <div className="flex flex-col gap-3 mt-auto">
              <button 
                onClick={handleDownloadAll}
                className="flex items-center justify-center gap-2 w-full py-3 bg-amber-100 text-amber-900 rounded-xl hover:bg-amber-200 transition-all font-semibold"
              >
                <Download size={18} /> Download All Memories
              </button>
              <button 
                onClick={onComplete}
                className="flex items-center justify-center gap-2 w-full py-3 text-slate-500 hover:text-slate-800 transition-all text-sm uppercase tracking-widest"
              >
                Return to the Magic <ArrowRight size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}