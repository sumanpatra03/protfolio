"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { audioSynth } from "@/utils/audio";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  alpha: number;
  size: number;
  color: string;
}

export default function DeveloperHud() {
  const [hudActive, setHudActive] = useState(false);
  const [fps, setFps] = useState(60);
  const [velocity, setVelocity] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredEl, setHoveredEl] = useState("");

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const lastScrollY = useRef(0);
  const lastScrollTime = useRef(0);
  const animationFrameId = useRef<number | null>(null);

  // Toggle HUD handler
  const toggleHud = () => {
    const nextState = !hudActive;
    setHudActive(nextState);
    audioSynth.playClick();
  };

  // FPS Calculator
  useEffect(() => {
    if (!hudActive) return;

    let frameCount = 0;
    let lastTime = performance.now();
    let id: number;

    const calcFps = () => {
      frameCount++;
      const now = performance.now();
      const delta = now - lastTime;

      if (delta >= 1000) {
        setFps(Math.round((frameCount * 1000) / delta));
        frameCount = 0;
        lastTime = now;
      }
      id = requestAnimationFrame(calcFps);
    };

    id = requestAnimationFrame(calcFps);
    return () => cancelAnimationFrame(id);
  }, [hudActive]);

  // Scroll Velocity & Hover Tracker
  useEffect(() => {
    if (!hudActive) return;

    lastScrollY.current = window.scrollY;
    lastScrollTime.current = performance.now();

    const handleScroll = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const timeDiff = now - lastScrollTime.current;
      const yDiff = Math.abs(currentY - lastScrollY.current);

      if (timeDiff > 0) {
        const vel = (yDiff / timeDiff) * 1000; // px per second
        setVelocity(vel);
      }

      lastScrollY.current = currentY;
      lastScrollTime.current = now;
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });

      // Identify hovered element tag + ID/Class
      const target = e.target as HTMLElement;
      if (target) {
        let name = target.tagName.toLowerCase();
        if (target.id) name += `#${target.id}`;
        else if (target.className && typeof target.className === "string") {
          const firstClass = target.className.split(" ")[0];
          if (firstClass) name += `.${firstClass}`;
        }
        setHoveredEl(name);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [hudActive]);

  // Canvas Click Particles Engine
  useEffect(() => {
    if (!hudActive) return;

    const handleCanvasClick = (e: MouseEvent) => {
      const colors = ["#06b6d4", "#8b5cf6", "#ec4899", "#10b981"];
      const particleCount = 12;

      for (let i = 0; i < particleCount; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = 1 + Math.random() * 4;
        particlesRef.current.push({
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          alpha: 1.0,
          size: 2 + Math.random() * 4,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    window.addEventListener("click", handleCanvasClick);
    return () => window.removeEventListener("click", handleCanvasClick);
  }, [hudActive]);

  // Canvas loop
  useEffect(() => {
    if (!hudActive) {
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw active particles
      const particles = particlesRef.current;
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.05; // gravity pull
        p.alpha -= 0.025;

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.save();
        ctx.globalAlpha = p.alpha;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.shadowBlur = 8;
        ctx.shadowColor = p.color;
        ctx.fill();
        ctx.restore();
      }

      // Draw faint crosshair target on cursor position
      ctx.save();
      ctx.strokeStyle = "rgba(6, 182, 212, 0.2)";
      ctx.lineWidth = 1;
      ctx.beginPath();
      // Horizontal crosshair
      ctx.moveTo(mousePos.x - 20, mousePos.y);
      ctx.lineTo(mousePos.x + 20, mousePos.y);
      // Vertical crosshair
      ctx.moveTo(mousePos.x, mousePos.y - 20);
      ctx.lineTo(mousePos.x, mousePos.y + 20);
      ctx.stroke();
      ctx.restore();

      animationFrameId.current = requestAnimationFrame(loop);
    };

    animationFrameId.current = requestAnimationFrame(loop);
    return () => {
      window.removeEventListener("resize", resizeCanvas);
      if (animationFrameId.current) cancelAnimationFrame(animationFrameId.current);
    };
  }, [hudActive, mousePos]);

  return (
    <>
      {/* HUD Toggle Floating Action Button */}
      <motion.button
        onClick={toggleHud}
        onMouseEnter={() => audioSynth.playHover()}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className={`px-4 py-2.5 rounded-2xl backdrop-blur-md border flex items-center gap-2.5 shadow-lg select-none transition-all duration-300 ${
          hudActive
            ? "bg-cyan-500/10 border-cyan-500/40 text-cyan-400"
            : "bg-zinc-950/80 border-zinc-800 text-zinc-400 hover:text-zinc-200"
        }`}
        title="Toggle telemetry HUD"
      >
        <div className={`w-2 h-2 rounded-full ${hudActive ? "bg-cyan-400 animate-ping" : "bg-zinc-600"}`} />
        <span className="text-[10px] uppercase font-bold tracking-wider">
          {hudActive ? "HUD Active" : "HUD Mode"}
        </span>
      </motion.button>

      {/* Dotted HUD Grid Overlay & Stats Panel */}
      <AnimatePresence>
        {hudActive && (
          <>
            {/* Dotted Blueprint Grid Layer */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="fixed inset-0 pointer-events-none z-[40] bg-[radial-gradient(circle,rgba(6,182,212,0.15)_1.5px,transparent_1.5px)] bg-[size:24px_24px]"
            />

            {/* Neon Border Corner Ticks */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-4 border border-cyan-500/10 pointer-events-none z-[40] rounded-2xl"
            >
              {/* Top-Left Corner Bracket */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400" />
              {/* Top-Right Corner Bracket */}
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400" />
              {/* Bottom-Left Corner Bracket */}
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400" />
              {/* Bottom-Right Corner Bracket */}
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400" />
            </motion.div>

            {/* Click Ripple Particles Canvas */}
            <canvas
              ref={canvasRef}
              className="fixed inset-0 pointer-events-none z-[998]"
            />

            {/* Bottom-Left Floating Telemetry Monitor Box */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="fixed bottom-6 left-6 z-[999] p-4 bg-zinc-950/90 backdrop-blur-md border border-cyan-500/20 rounded-xl font-mono text-[10px] text-cyan-400 space-y-1.5 shadow-lg min-w-[180px] pointer-events-none select-none"
            >
              <div className="flex items-center justify-between border-b border-cyan-500/10 pb-1.5 mb-1.5">
                <span className="font-extrabold uppercase tracking-widest text-[8px] text-zinc-500">SYSTEM TELEMETRY</span>
                <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-ping" />
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">RENDER FPS:</span>
                <span className="text-zinc-200 font-bold">{fps}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">SCROLL VEL:</span>
                <span className="text-zinc-200 font-bold">{Math.round(velocity)} px/s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">POINTER X:</span>
                <span className="text-zinc-200 font-bold">{mousePos.x} px</span>
              </div>
              <div className="flex justify-between">
                <span className="text-zinc-500">POINTER Y:</span>
                <span className="text-zinc-200 font-bold">{mousePos.y} px</span>
              </div>
              <div className="flex justify-between gap-1 overflow-hidden">
                <span className="text-zinc-500 shrink-0">HOVER EL:</span>
                <span className="text-zinc-200 font-bold truncate max-w-[90px]">{hoveredEl || "none"}</span>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
