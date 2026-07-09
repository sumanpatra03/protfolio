"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link as ScrollLink } from "react-scroll";
import { FaArrowRight, FaCalendarAlt, FaEnvelope } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen bg-[#030303] flex flex-col md:flex-row items-center justify-center px-6 md:px-20 py-20 md:py-0 overflow-hidden"
    >
      {/* Dynamic Animated Particles Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full filter blur-3xl opacity-[0.08]"
            style={{
              background: i % 2 === 0 ? "#8B5CF6" : "#06B6D4",
              width: `${Math.random() * 300 + 200}px`,
              height: `${Math.random() * 300 + 200}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              x: [0, Math.random() * 100 - 50, 0],
              y: [0, Math.random() * 100 - 50, 0],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 10 + 15,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Main Content Layout */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8">
        
        {/* Text Section */}
        <div className="text-white text-center md:text-left max-w-xl space-y-6 flex-1">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-semibold text-zinc-400 tracking-wide mb-3">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              Available for Internships & Jobs
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight leading-none"
          >
            Suman{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400">
              Patra
            </span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="h-8 flex items-center justify-center md:justify-start"
          >
            <span className="text-zinc-300 text-lg md:text-xl font-bold tracking-wide">
              I am a{" "}
              <span className="text-cyan-400 font-extrabold underline decoration-violet-500/50 decoration-2 underline-offset-4">
                <Typewriter
                  words={["Frontend Developer", "React Developer", "Next.js Specialist"]}
                  loop={0}
                  cursor
                  cursorStyle="|"
                  typeSpeed={100}
                  deleteSpeed={80}
                  delaySpeed={2000}
                />
              </span>
            </span>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-lg"
          >
            Crafting responsive, high-performance web experiences with modern front-end technologies. Specializing in building dynamic user interfaces that bridge the gap between design and scalable engineering.
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="pt-2 flex flex-col sm:flex-row justify-center md:justify-start gap-4"
          >
            <ScrollLink
              to="portfolio"
              spy={true}
              smooth={true}
              offset={-20}
              duration={500}
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl shadow-[0_4px_25px_rgba(139,92,246,0.25)] hover:shadow-[0_4px_30px_rgba(6,182,212,0.4)] transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
            >
              View Work <FaArrowRight className="text-sm" />
            </ScrollLink>

            <ScrollLink
              to="contact"
              spy={true}
              smooth={true}
              offset={-20}
              duration={500}
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              Contact Me <FaEnvelope className="text-sm" />
            </ScrollLink>
          </motion.div>
        </div>

        {/* Picture / Graphic Section */}
        <div className="relative flex-1 flex justify-center items-center">
          
          {/* Interactive Glowing Rings Behind Image */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-violet-500/10 animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed border-cyan-500/20 animate-[spin_25s_linear_infinite]" />

          {/* Profile Wrapper with dynamic hover effect */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="relative w-64 h-64 md:w-80 md:h-80 bg-zinc-950 rounded-2xl overflow-hidden border-2 border-zinc-800/80 p-3 shadow-[0_10px_50px_rgba(0,0,0,0.8)] group"
          >
            <div className="relative w-full h-full rounded-xl overflow-hidden bg-zinc-900">
              {/* Overlay glow effect */}
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
              
              <Image
                src="/Suman_img.png"
                fill
                priority
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                alt="Suman Patra - Frontend Developer Portfolio"
              />
            </div>

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-violet-500 rounded-tl-xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-xl" />
          </motion.div>

          {/* Rotating Floating Icon */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-25px] left-[15px] md:top-[-40px] md:left-[30px] w-14 h-14 md:w-20 md:h-20"
          >
            <Image
              src="/rotate-img.png"
              fill
              sizes="(max-width: 768px) 56px, 80px"
              className="object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              alt="Design Element"
            />
          </motion.div>

          {/* Float Badge 1 */}
          <motion.div
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-[-15px] left-[-10px] md:bottom-[-20px] md:left-[10px] glass-panel px-4 py-2.5 rounded-xl border border-zinc-800 shadow-xl flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-violet-500/20 flex items-center justify-center text-violet-400">
              🚀
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-semibold uppercase leading-tight">Exp</p>
              <p className="text-xs font-bold text-white leading-tight">1.5+ Years</p>
            </div>
          </motion.div>

          {/* Float Badge 2 */}
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, delay: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-[-10px] right-[-10px] md:top-[10px] md:right-[20px] glass-panel px-4 py-2.5 rounded-xl border border-zinc-800 shadow-xl flex items-center gap-2"
          >
            <div className="w-8 h-8 rounded-full bg-cyan-500/20 flex items-center justify-center text-cyan-400">
              💼
            </div>
            <div>
              <p className="text-[10px] text-zinc-400 font-semibold uppercase leading-tight">Projects</p>
              <p className="text-xs font-bold text-white leading-tight">10+ Built</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
