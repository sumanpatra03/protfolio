"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";
import { Link as ScrollLink } from "react-scroll";
import { FaArrowRight, FaEnvelope, FaReact, FaGitAlt, FaNodeJs } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiTypescript, SiJavascript, SiMui, SiRedux, SiSanity, SiMongodb } from "react-icons/si";

const marqueeTechs = [
  { name: "React", icon: <FaReact className="text-teal-400" /> },
  { name: "Next.js", icon: <RiNextjsFill className="text-zinc-100" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-400" /> },
  { name: "React Native", icon: <FaReact className="text-indigo-400" /> },
  { name: "Redux Toolkit", icon: <SiRedux className="text-purple-400" /> },
  { name: "Tailwind CSS", icon: <RiTailwindCssFill className="text-cyan-400" /> },
  { name: "Material UI", icon: <SiMui className="text-blue-500" /> },
  { name: "JavaScript", icon: <SiJavascript className="text-yellow-400" /> },
  { name: "Node.js", icon: <FaNodeJs className="text-green-500" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400" /> },
  { name: "Sanity CMS", icon: <SiSanity className="text-red-400" /> },
  { name: "Git", icon: <FaGitAlt className="text-orange-500" /> },
];

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative w-full min-h-screen flex flex-col items-center justify-center pt-24 pb-16 md:py-0 overflow-hidden z-10"
    >
      <div className="w-full max-w-6xl mx-auto px-6 md:px-20 flex flex-col md:flex-row items-center justify-between gap-12 md:gap-8 flex-grow flex-shrink-0">
        
        {/* Text Area */}
        <div className="text-white text-center md:text-left max-w-xl space-y-6 flex-1 relative z-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-zinc-950/80 border border-zinc-900 text-xs font-semibold text-zinc-400 tracking-wide mb-2 shadow-lg">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for Jobs & Internships
            </span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] text-zinc-50"
          >
            Suman{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 via-fuchsia-400 to-cyan-400 text-glow-violet select-none">
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
            className="text-sm md:text-base text-zinc-400 leading-relaxed max-w-lg font-light"
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
              className="flex items-center justify-center gap-2 px-7 py-3.5 bg-zinc-900/90 hover:bg-zinc-800 border border-zinc-800/80 text-zinc-200 font-semibold rounded-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 cursor-pointer"
            >
              Contact Me <FaEnvelope className="text-sm" />
            </ScrollLink>
          </motion.div>
        </div>

        {/* Image Area */}
        <div className="relative flex-1 flex justify-center items-center">
          {/* Neon spinning background layout */}
          <div className="absolute w-72 h-72 md:w-96 md:h-96 rounded-full border border-violet-500/10 animate-[spin_40s_linear_infinite]" />
          <div className="absolute w-64 h-64 md:w-80 md:h-80 rounded-full border border-dashed border-cyan-500/20 animate-[spin_25s_linear_infinite]" />

          {/* Profile Wrapper */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            whileHover={{ scale: 1.02 }}
            className="relative w-64 h-64 md:w-80 md:h-80 bg-zinc-950 rounded-3xl overflow-hidden border-2 border-zinc-800/60 p-3 shadow-[0_20px_50px_rgba(139,92,246,0.15)] group"
          >
            <div className="relative w-full h-full rounded-2xl overflow-hidden bg-zinc-900">
              <div className="absolute inset-0 bg-gradient-to-t from-violet-950/40 via-transparent to-transparent z-10 opacity-60 group-hover:opacity-20 transition-opacity duration-500" />
              
              <Image
                src="/Suman_img.png"
                fill
                priority
                sizes="(max-width: 768px) 256px, 320px"
                className="object-cover object-top hover:scale-105 transition-transform duration-700"
                alt="Suman Patra - Frontend Developer"
              />
            </div>

            {/* Glowing Corner Accents */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-violet-500 rounded-tl-3xl" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-500 rounded-br-3xl" />
          </motion.div>

          {/* Floating graphic */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 16, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-25px] left-[15px] md:top-[-45px] md:left-[35px] w-14 h-14 md:w-20 md:h-20"
          >
            <Image
              src="/rotate-img.png"
              fill
              sizes="(max-width: 768px) 56px, 80px"
              className="object-contain drop-shadow-[0_0_15px_rgba(139,92,246,0.3)]"
              alt="Design Element"
            />
          </motion.div>

          {/* Floating Badge 1 */}
          <motion.div
            animate={{ y: [0, -8, 0] }}
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

          {/* Floating Badge 2 */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
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

      {/* Infinite Scrolling Tech Stack Marquee */}
      <div className="w-full relative mt-16 py-5 bg-zinc-950/40 border-y border-zinc-900/60 overflow-hidden flex select-none z-20">
        <div className="flex w-max shrink-0 gap-16 px-8 animate-marquee">
          {/* Row 1 */}
          {marqueeTechs.map((tech, i) => (
            <div key={`m1-${i}`} className="flex items-center gap-3 text-zinc-400 font-medium tracking-wide">
              <span className="text-xl sm:text-2xl">{tech.icon}</span>
              <span className="text-sm sm:text-base uppercase tracking-widest">{tech.name}</span>
            </div>
          ))}
          {/* Row 2 (Duplicate for loop) */}
          {marqueeTechs.map((tech, i) => (
            <div key={`m2-${i}`} className="flex items-center gap-3 text-zinc-400 font-medium tracking-wide">
              <span className="text-xl sm:text-2xl">{tech.icon}</span>
              <span className="text-sm sm:text-base uppercase tracking-widest">{tech.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
