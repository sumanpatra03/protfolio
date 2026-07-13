"use client";

import { useState } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import Sidebar from "@/components/Sidebar";
import HeroSection from "@/components/Hero";
import AboutMe from "@/components/About";
import EducationExperience from "@/components/Education";
import SkillsSection from "@/components/Skills";
import Services from "@/components/Services";
import ContactForm from "@/components/Contact";
import Portfolio from "@/components/Portfolio";
import CustomCursor from "@/components/CustomCursor";
import DeveloperConsole from "@/components/DeveloperConsole";
import Preloader from "@/components/Preloader";
import AudioToggle from "@/components/AudioToggle";
import DeveloperHud from "@/components/DeveloperHud";
import { audioSynth } from "@/utils/audio";

export default function Home() {
  const [loading, setLoading] = useState(true);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="relative bg-[#030303] text-white min-h-screen flex selection:bg-violet-500/30 selection:text-white">
      {/* Floating Action Controls Panel */}
      {!loading && (
        <div className="fixed top-6 right-6 z-[999] flex items-center gap-3">
          <DeveloperHud />
          <AudioToggle />
        </div>
      )}

      {/* Preloader Screen */}
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader
            onComplete={() => {
              setLoading(false);
              audioSynth.playSuccess();
            }}
          />
        )}
      </AnimatePresence>

      {/* Custom Neo-Cursor Trail */}
      <CustomCursor />

      {/* Interactive Developer Console */}
      <DeveloperConsole />
      {/* Scroll Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500 origin-left z-[999]"
        style={{ scaleX }}
      />

      {/* Dynamic Ambient Blur Backdrop */}
      <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
        {/* Rotating Mesh Glows */}
        <div className="absolute top-[8%] left-[15%] w-[450px] h-[450px] rounded-full bg-violet-600/10 filter blur-[120px] animate-pulse-glow" />
        <div className="absolute top-[35%] right-[5%] w-[550px] h-[550px] rounded-full bg-cyan-600/5 filter blur-[130px] animate-pulse-glow" style={{ animationDelay: "-3s" }} />
        <div className="absolute bottom-[20%] left-[10%] w-[400px] h-[400px] rounded-full bg-fuchsia-600/5 filter blur-[110px] animate-pulse-glow" style={{ animationDelay: "-6s" }} />
      </div>

      {/* Geometric Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-grid-pattern pointer-events-none z-0 opacity-60" />

      {/* Animated landing page reveal */}
      {!loading && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative flex-grow flex min-w-0"
        >
          {/* Navigation Sidebar */}
          <Sidebar />

          {/* Main Container */}
          <main className="relative z-10 flex-1 min-w-0 lg:ml-64">
            <HeroSection />
            <AboutMe />
            <EducationExperience />
            <SkillsSection />
            <Portfolio />
            <Services />
            <ContactForm />
          </main>
        </motion.div>
      )}
    </div>
  );
}
