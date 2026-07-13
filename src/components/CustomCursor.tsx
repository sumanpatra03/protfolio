"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // MotionValues for high-frequency coordinate tracking outside react render cycle
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Configure smooth spring animations for trailing elements
  const springConfig = { damping: 35, stiffness: 350, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable custom cursor on mobile/touch interfaces
    const isTouchDevice = window.matchMedia("(pointer: coarse)").matches;
    if (isTouchDevice) return;

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check if target or parent is a link, button, form element, or has custom pointer cursor
      if (
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.tagName === "INPUT" ||
        target.tagName === "TEXTAREA" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[role='button']") ||
        window.getComputedStyle(target).cursor === "pointer"
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Central responsive dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{
          x: cursorX,
          y: cursorY,
        }}
      />
      
      {/* Trailing Aura Ring */}
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full border border-violet-500/50 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 shadow-[0_0_15px_rgba(139,92,246,0.15)]"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
        animate={{
          scale: isHovered ? 1.6 : 1,
          backgroundColor: isHovered ? "rgba(139, 92, 246, 0.15)" : "rgba(139, 92, 246, 0)",
          borderColor: isHovered ? "#22d3ee" : "#8b5cf6",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25 }}
      />
    </>
  );
}
