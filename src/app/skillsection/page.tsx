"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaReact, FaGitAlt, FaBootstrap } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiMui } from "react-icons/si";

const skills = [
  { name: "C++", percentage: 40, color: "#A3E635", label: "for DSA" },
  { name: "JavaScript", percentage: 80, color: "#8B5CF6", label: "for Dev" },
  { name: "TypeScript", percentage: 50, color: "#06B6D4", label: "for Web" },
  { name: "JS (OOPs)", percentage: 70, color: "#EC4899", label: "for OOPs" },
];

const techStack = [
  { name: "React JS", icon: <FaReact size={22} />, color: "border-teal-500/30 hover:border-teal-400 hover:shadow-[0_0_20px_rgba(20,184,166,0.3)] bg-teal-950/20 text-teal-400" },
  { name: "Next.js", icon: <RiNextjsFill size={22} />, color: "border-blue-500/30 hover:border-blue-400 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] bg-blue-950/20 text-blue-400" },
  { name: "React Native", icon: <FaReact size={22} />, color: "border-indigo-500/30 hover:border-indigo-400 hover:shadow-[0_0_20px_rgba(99,102,241,0.3)] bg-indigo-950/20 text-indigo-400" },
  { name: "Tailwind CSS", icon: <RiTailwindCssFill size={22} />, color: "border-violet-500/30 hover:border-violet-400 hover:shadow-[0_0_20px_rgba(139,92,246,0.3)] bg-violet-950/20 text-violet-400" },
  { name: "MUI", icon: <SiMui size={20} />, color: "border-yellow-500/30 hover:border-yellow-400 hover:shadow-[0_0_20px_rgba(234,179,8,0.3)] bg-yellow-950/20 text-yellow-400" },
  { name: "Bootstrap", icon: <FaBootstrap size={22} />, color: "border-pink-500/30 hover:border-pink-400 hover:shadow-[0_0_20px_rgba(236,72,153,0.3)] bg-pink-950/20 text-pink-400" },
  { name: "Git", icon: <FaGitAlt size={22} />, color: "border-cyan-500/30 hover:border-cyan-400 hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] bg-cyan-950/20 text-cyan-400" },
];

const SkillProgress = ({ skill, index }: { skill: typeof skills[0]; index: number }) => {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timer = setTimeout(() => setProgress(skill.percentage), 150);
      return () => clearTimeout(timer);
    }
  }, [isInView, skill.percentage]);

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="flex flex-col items-center p-5 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 hover:border-zinc-700/60 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="w-24 h-24 md:w-28 md:h-28 relative">
        <CircularProgressbar
          value={progress}
          text={`${progress}%`}
          styles={buildStyles({
            textColor: "#ffffff",
            pathColor: skill.color,
            trailColor: "#18181b",
            textSize: "18px",
            pathTransitionDuration: 1.5,
          })}
        />
      </div>
      <p className="text-lg font-bold mt-4 text-zinc-100">{skill.name}</p>
      <p className="text-xs text-zinc-400 font-medium">{skill.label}</p>
    </motion.div>
  );
};

const SkillsSection = () => {
  const skillsSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOccupationalCredential",
    name: "Web Development Skills",
    competencyRequired: [
      "C++ for DSA",
      "JavaScript for Development",
      "TypeScript for Web",
      "JavaScript (OOPs) Concepts",
    ],
    credentialCategory: "Software Development",
    provider: {
      "@type": "Person",
      name: "Suman Patra",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(skillsSchema) }}
      />
      <section
        id="skillsection"
        className="bg-[#030303] text-white py-20 px-6 md:px-20 relative overflow-hidden"
      >
        {/* Decorative corner glow */}
        <div className="absolute right-0 top-0 w-80 h-80 rounded-full bg-cyan-600/5 filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Header 1: Coding Skills */}
          <div className="mb-12">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              Coding Skills<span className="text-violet-500">.</span>
            </motion.h3>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              className="h-[3px] bg-gradient-to-r from-violet-500 to-cyan-500 mt-3"
            />
          </div>

          {/* Progress Circular Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center items-center">
            {skills.map((skill, index) => (
              <SkillProgress key={skill.name} skill={skill} index={index} />
            ))}
          </div>

          {/* Header 2: Tech Stack */}
          <div className="mb-12 mt-20">
            <motion.h3 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              Tech Stack<span className="text-cyan-500">.</span>
            </motion.h3>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              className="h-[3px] bg-gradient-to-r from-cyan-500 to-violet-500 mt-3"
            />
          </div>

          {/* Badges Flow Container */}
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-wrap gap-4 justify-center items-center"
          >
            {techStack.map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                whileHover={{ y: -4, scale: 1.05 }}
                className={`flex items-center gap-3 px-6 py-3 rounded-full border text-base sm:text-lg font-semibold cursor-default transition-all duration-300 ${tech.color}`}
              >
                {tech.icon}
                {tech.name}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </>
  );
};

export default SkillsSection;
