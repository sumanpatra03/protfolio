"use client";

import React, { useRef, useState } from "react";

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export default function SpotlightCard({ children, className = "", onClick }: SpotlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [style, setStyle] = useState<React.CSSProperties>({});

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Calculate rotate tilt degree (max 6 degrees to maintain readability)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const rotateX = ((y - centerY) / centerY) * -6;
    const rotateY = ((x - centerX) / centerX) * 6;

    setStyle({
      "--mouse-x": `${x}px`,
      "--mouse-y": `${y}px`,
      transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.005)`,
      transition: "transform 0.08s ease-out",
    } as React.CSSProperties);
  };

  const handleMouseLeave = () => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      transition: "transform 0.5s ease-out",
    });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={onClick}
      style={style}
      className={`relative rounded-2xl overflow-hidden border border-zinc-800/80 bg-zinc-900/30 transition-all duration-300 group ${className}`}
    >
      {/* Dynamic spotlight radial gradient follow sheen */}
      <div
        className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"
        style={{
          background: `radial-gradient(350px circle at var(--mouse-x, 0px) var(--mouse-y, 0px), rgba(139, 92, 246, 0.12), transparent 80%)`,
        }}
      />
      {children}
    </div>
  );
}
