import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const words = ["DESIGNER", "DEVELOPER", "CREATOR", "AYUSH"];

export default function Loader({ onComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onComplete();
          }, 600);
          return 100;
        }
        // Smooth random increment
        const increment = Math.floor(Math.random() * 4) + 1;
        return Math.min(prev + increment, 100);
      });
    }, 60);

    return () => clearInterval(timer);
  }, [onComplete]);

  // Map progress to the words index
  const wordIndex = Math.min(
    Math.floor((progress / 100) * words.length),
    words.length - 1
  );
  const currentWord = words[wordIndex];

  const containerVariants = {
    initial: { y: 0 },
    exit: {
      y: "-100%",
      transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="initial"
      exit="exit"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#eae8ee] text-[#1c1c1f] p-8 select-none overflow-hidden"
    >
      {/* Top Header Section */}
      <div className="w-full flex justify-between items-center z-10">
        {/* Brand/Logo (Left) */}
        <span className="font-extrabold tracking-[0.15em] text-xs md:text-sm">
          AYUSH
        </span>

        {/* Sound Waves & Accent Dot (Right) */}
        <div className="flex flex-col items-center gap-[5px] pr-2">
          <div className="flex items-end gap-[3px] h-5">
            {[0, 1, 2, 3, 4].map((i) => (
              <motion.div
                key={i}
                className="w-[2px] bg-[#1c1c1f] rounded-full"
                animate={{
                  height: i === 0 ? [4, 16, 8, 12, 4] :
                          i === 1 ? [8, 20, 12, 16, 8] :
                          i === 2 ? [12, 8, 20, 10, 12] :
                          i === 3 ? [6, 14, 8, 18, 6] :
                                    [10, 6, 12, 8, 10]
                }}
                transition={{
                  duration: 1.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.12,
                }}
              />
            ))}
          </div>
          <div className="w-[4px] h-[4px] bg-[#8b5cf6] rounded-full" />
        </div>
      </div>

      {/* Main Center Content Section */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
        {/* Giant Dynamic Background Text */}
        <div className="absolute inset-0 flex items-center justify-center select-none overflow-hidden w-full px-4">
          <AnimatePresence mode="wait">
            <motion.h1
              key={currentWord}
              initial={{ y: 60, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -60, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="text-[14vw] sm:text-[16vw] md:text-[18vw] font-black uppercase tracking-tighter text-[#1c1c1f] leading-none whitespace-nowrap text-center"
            >
              {currentWord}
            </motion.h1>
          </AnimatePresence>
        </div>

        {/* Floating Centered Pill Loading Badge */}
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="absolute z-10 mt-24 md:mt-0 flex items-center justify-between px-6 py-4 rounded-full bg-black text-white w-[280px] md:w-[320px] shadow-[0_12px_45px_-5px_rgba(139,92,246,0.4),0_0_20px_2px_rgba(168,85,247,0.15)] border border-purple-500/20 pointer-events-auto"
        >
          <span className="text-[10px] md:text-xs font-semibold tracking-[0.2em] text-gray-400">
            LOADING
          </span>

          <div className="flex items-center gap-3">
            <span className="text-sm md:text-base font-semibold tracking-wide tabular-nums w-12 text-right">
              {progress}%
            </span>
            {/* Battery style progress cell */}
            <div className="w-5 h-3.5 border border-white/40 rounded-[3px] p-[2px] flex items-center relative">
              <motion.div
                className="h-full bg-white rounded-[1px]"
                style={{ width: `${progress}%` }}
                transition={{ duration: 0.1 }}
              />
              <div className="absolute right-[-3px] top-[3px] w-[2.5px] h-[6px] bg-white/40 rounded-r-[1.5px]" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Footer Section */}
      <div className="w-full flex justify-between items-end z-10 text-[10px] md:text-xs text-gray-500 font-medium tracking-wider">
        <span>&copy; {new Date().getFullYear()}</span>
        <span>PORTFOLIO INITIALIZING</span>
      </div>
    </motion.div>
  );
}
