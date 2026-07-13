"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Increment progress dynamically
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          // Wait slightly before finishing so the user sees "100%" loading completed
          setTimeout(onComplete, 800);
          return 100;
        }
        
        // Simulates varying speeds (smaller increment step for a longer cinematic delay)
        const increment = Math.max(1, Math.floor(Math.random() * 6) + 1);
        const next = prev + increment;
        return next > 100 ? 100 : next;
      });
    }, 140);

    return () => clearInterval(interval);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ 
        opacity: 0, 
        y: -100, 
        transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] } 
      }}
      className="fixed inset-0 bg-[#030303] z-[9999] flex flex-col items-center justify-center font-sans select-none overflow-hidden"
    >
      {/* Background ambient glowing spheres */}
      <div className="absolute top-[20%] left-[20%] w-[350px] h-[350px] rounded-full bg-violet-600/10 filter blur-[90px] animate-pulse" />
      <div className="absolute bottom-[20%] right-[20%] w-[400px] h-[400px] rounded-full bg-cyan-600/10 filter blur-[100px] animate-pulse" style={{ animationDelay: "-3s" }} />

      <div className="relative flex flex-col items-center max-w-sm w-full px-6 text-center space-y-8 z-10">
        {/* Animated Cyber Title */}
        <div className="space-y-2">
          <motion.h1 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-2xl md:text-3xl font-black uppercase tracking-widest text-zinc-100"
          >
            SUMAN PATRA<span className="text-violet-500">.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-[10px] tracking-widest uppercase text-zinc-400 font-bold"
          >
            Initializing Portfolio Cockpit
          </motion.p>
        </div>

        {/* Monospace Progress percentage */}
        <div className="relative h-16 flex items-center justify-center">
          <motion.span 
            className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 font-mono tracking-tighter"
          >
            {String(progress).padStart(3, "0")}%
          </motion.span>
        </div>

        {/* Sleek Progress Bar */}
        <div className="w-full h-[3px] bg-zinc-900 border-none rounded-full relative overflow-hidden">
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 shadow-md shadow-violet-500/20"
          />
        </div>

        {/* Mini status text log */}
        <div className="h-4 flex items-center justify-center">
          <span className="text-[9px] font-mono text-zinc-600 uppercase tracking-widest">
            {progress < 30 && "establishing system handshakes..."}
            {progress >= 30 && progress < 60 && "fetching developer assets..."}
            {progress >= 60 && progress < 90 && "building layout frames..."}
            {progress >= 90 && "ready."}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
