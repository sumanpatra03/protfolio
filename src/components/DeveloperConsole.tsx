"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTerminal, FaTimes, FaUndo, FaArrowUp, FaArrowDown } from "react-icons/fa";
import { audioSynth } from "@/utils/audio";

interface HistoryItem {
  command: string;
  output: string;
}

export default function DeveloperConsole() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: "welcome",
      output: `Welcome to Suman's Developer Terminal (v1.0.0).\nType 'help' to see all available commands.`,
    },
  ]);
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll terminal log to bottom on output updates
  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [history, isOpen]);

  // Keep input focused when clicking inside terminal body
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(focusInput, 200);
    }
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = "";

    if (trimmed) {
      setCmdHistory((prev) => [cmd, ...prev]);
    }
    setHistoryIndex(-1);

    switch (trimmed) {
      case "help":
        output = `Available commands:\n  about    - Suman's biography and stats\n  skills   - Technical skills and ratings\n  projects - Featured commercial projects\n  contact  - Reach out to Suman\n  resume   - Download CV / Resume (PDF)\n  clear    - Clear console logs`;
        break;
      case "about":
        output = `[System Information]\nDeveloper  : Suman Patra\nRole       : Frontend & Mobile Engineer\nExperience : 1.5 Years\nSpecialty  : React, Next.js, React Native, TypeScript, Tailwind\nStatus     : Open for roles and internships`;
        break;
      case "skills":
        output = `[Proficiency Stats]\n- Next.js / React  : Advanced (85%)\n- TypeScript/JS    : Advanced (80%)\n- Tailwind / MUI   : Advanced (90%)\n- React Native     : Intermediate (65%)\n- Redux Toolkit    : Intermediate (70%)\n- C++ (DSA)        : Intermediate (40%)`;
        break;
      case "projects":
        output = `[Commercial Projects]\n1. RMS v2            - Next.js, MUI, Props Drilling\n2. Uvanij Ecom Store - Next.js, MUI, Hooks\n3. Taskly            - Next.js, React Context, Tailwind\n4. POS Mobile App    - React Native, Redux Toolkit, Persist`;
        break;
      case "contact":
        output = `[Connection Details]\n- Email    : patrasuman042@gmail.com\n- Phone    : +91 9734127642\n- GitHub   : https://github.com/sumanpatra03\n- LinkedIn : https://www.linkedin.com/in/sumanpa1/`;
        break;
      case "resume":
        output = `[Success] Triggering Resume_Suman_Patra.pdf download...`;
        if (typeof window !== "undefined") {
          const a = document.createElement("a");
          a.href = "/Resume_Suman_Patra.pdf";
          a.download = "Resume_Suman_Patra.pdf";
          a.click();
        }
        break;
      case "clear":
        setHistory([]);
        setInputVal("");
        return;
      case "":
        return;
      default:
        output = `bash: command not found: '${trimmed}'. Type 'help' for options.`;
    }

    setHistory((prev) => [...prev, { command: cmd, output }]);
    setInputVal("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleCommand(inputVal);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (cmdHistory.length === 0) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex < cmdHistory.length) {
        setHistoryIndex(nextIndex);
        setInputVal(cmdHistory[nextIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const prevIndex = historyIndex - 1;
      if (prevIndex >= 0) {
        setHistoryIndex(prevIndex);
        setInputVal(cmdHistory[prevIndex]);
      } else {
        setHistoryIndex(-1);
        setInputVal("");
      }
    }
  };

  return (
    <>
      {/* Collapsed Toggle Action Button (Bottom-Right) */}
      <div className="fixed bottom-6 right-6 z-[600]">
        <motion.button
          whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(6,182,212,0.4)" }}
          whileTap={{ scale: 0.95 }}
          onMouseEnter={() => audioSynth.playHover()}
          onClick={() => {
            setIsOpen(!isOpen);
            audioSynth.playClick();
          }}
          className="w-14 h-14 rounded-full bg-zinc-950 border border-zinc-800 text-cyan-400 flex items-center justify-center shadow-lg hover:border-cyan-400/40 transition-colors cursor-pointer"
          aria-label="Toggle developer console"
        >
          {isOpen ? <FaTimes size={18} /> : <FaTerminal size={18} />}
        </motion.button>
      </div>

      {/* Slide-Up Terminal Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 150, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 150, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="fixed bottom-24 right-6 w-[90vw] sm:w-[500px] h-[380px] rounded-2xl bg-zinc-950/95 border border-zinc-800/80 shadow-[0_15px_50px_rgba(0,0,0,0.8)] z-[590] overflow-hidden flex flex-col font-mono glass-panel"
            onClick={focusInput}
          >
            {/* Console Header Bar */}
            <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/60 shrink-0 select-none">
              <div className="flex items-center gap-2 text-zinc-400 text-xs">
                <span className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/40" />
                <span className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/40" />
                <span className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/40" />
                <span className="ml-1 font-semibold text-zinc-300">suman@terminal:~</span>
              </div>
              <button
                onMouseEnter={() => audioSynth.playHover()}
                onClick={(e) => {
                  e.stopPropagation();
                  setHistory([{ command: "welcome", output: "Console logs cleared. Ready." }]);
                  audioSynth.playClick();
                }}
                className="text-zinc-500 hover:text-cyan-400 text-xs transition cursor-pointer flex items-center gap-1"
                title="Reset console"
              >
                <FaUndo size={10} /> Reset
              </button>
            </div>

            {/* Output Logs Area */}
            <div
              ref={containerRef}
              className="flex-1 p-4 overflow-y-auto no-scrollbar text-xs leading-relaxed space-y-3.5 select-text"
            >
              {history.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  {item.command !== "welcome" && (
                    <div className="flex items-center gap-2 text-cyan-400 font-semibold">
                      <span>$</span>
                      <span>{item.command}</span>
                    </div>
                  )}
                  <div className="text-zinc-300 whitespace-pre-wrap font-light">
                    {item.output}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form Bar */}
            <div className="p-3 bg-zinc-950/90 border-t border-zinc-900/80 flex items-center gap-2 shrink-0 select-none">
              <span className="text-violet-500 font-extrabold text-sm ml-1 select-none">$</span>
              <input
                ref={inputRef}
                type="text"
                value={inputVal}
                onChange={(e) => {
                  setInputVal(e.target.value);
                  audioSynth.playKey();
                }}
                onKeyDown={handleKeyDown}
                placeholder="Type command here (e.g. 'help')..."
                className="flex-1 bg-transparent text-zinc-100 placeholder-zinc-700 outline-none text-xs leading-none border-none py-1 focus:ring-0"
                autoComplete="off"
                autoCapitalize="off"
                autoCorrect="off"
                spellCheck={false}
              />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
