"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { audioSynth } from "@/utils/audio";

export default function AudioToggle() {
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    setMuted(audioSynth.getMuted());
  }, []);

  const handleToggle = () => {
    const nextState = !muted;
    audioSynth.setMuted(nextState);
    setMuted(nextState);
    if (!nextState) {
      audioSynth.playClick();
    }
  };

  const handleHover = () => {
    audioSynth.playHover();
  };

  return (
    <motion.button
      onClick={handleToggle}
      onMouseEnter={handleHover}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className="px-4 py-2.5 rounded-2xl bg-zinc-950/80 backdrop-blur-md border border-zinc-800 flex items-center gap-3 shadow-lg select-none group"
      title={muted ? "Unmute Sound" : "Mute Sound"}
    >
      {/* Sound Visualizer Bars */}
      <div className="w-5 h-4 flex items-end justify-center gap-[2.5px] overflow-hidden">
        {muted ? (
          [1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="w-[2.5px] h-[3px] bg-zinc-600 rounded-full"
            />
          ))
        ) : (
          [1.5, 0.8, 1.2, 0.5].map((speed, i) => (
            <motion.div
              key={i}
              animate={{
                height: ["4px", "14px", "4px"],
              }}
              transition={{
                duration: speed,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="w-[2.5px] bg-gradient-to-t from-violet-500 to-cyan-400 rounded-full"
            />
          ))
        )}
      </div>

      <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-400 group-hover:text-zinc-200 transition-colors duration-200">
        {muted ? "SFX Off" : "SFX On"}
      </span>
    </motion.button>
  );
}
