"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { IconType } from "react-icons";

interface EducationItem {
  title: string;
  institute: string;
  duration: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  details?: string;
}

const educationData: EducationItem[] = [
  {
    title: "Frontend Developer Course",
    institute: "Webskitters Academy",
    duration: "2024 - 2025",
  },
  {
    title: "B.A. Graduation",
    institute: "Tarakeswar Degree College",
    duration: "2020 - 2023",
  },
  {
    title: "Higher Secondary (12th)",
    institute: "Marokhana High School",
    duration: "2018 - 2020",
  },
];

const experienceData: ExperienceItem[] = [
  {
    title: "Frontend & Mobile Developer (Intern)",
    company: "Wizard Communications Pvt Ltd",
    duration: "2025 July - Present",
    details:
      "Engineering professional cross-platform POS (Point of Sale) mobile applications in React Native. Designed and integrated Role-Based Access Control (RBAC) user permission systems, optimized offline transactions, and structured modular state management via Redux Toolkit.",
  },
  {
    title: "Frontend Developer (Trainee)",
    company: "Webskitters Technology Solutions Pvt. Ltd",
    duration: "2024 Nov - 2025 Apr",
    details:
      "Trained in deep front-end methodologies utilizing Next.js, React, and TypeScript. Developed scalable e-commerce shopping panels and custom visual UI modules with strict design consistency.",
  },
];

const TimelineCard = ({
  icon: Icon,
  title,
  subtitle,
  duration,
  details,
  index,
}: {
  icon: IconType;
  title: string;
  subtitle: string;
  duration: string;
  details?: string;
  index: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.5, delay: index * 0.15 }}
    className="flex gap-4 mb-8 relative group"
  >
    {/* Animated Timeline Node */}
    <div className="flex flex-col items-center">
      <div className="w-10 h-10 rounded-full bg-zinc-950 border border-zinc-800 flex items-center justify-center shrink-0 relative z-10 transition-all duration-300 group-hover:border-violet-500 group-hover:shadow-[0_0_15px_rgba(139,92,246,0.5)]">
        <Icon className="text-zinc-400 group-hover:text-violet-400 text-sm sm:text-base transition-colors duration-300" />
      </div>
      <div className="w-[1.5px] bg-gradient-to-b from-zinc-800 via-zinc-800 to-transparent flex-1 mt-2 group-hover:from-violet-500/50 transition-all duration-300" />
    </div>

    {/* Timeline Card details */}
    <motion.div
      whileHover={{ y: -4 }}
      className="bg-zinc-900/40 border border-zinc-800/80 rounded-2xl p-5 mb-2 flex-1 shadow-[0_4px_20px_rgba(0,0,0,0.2)] hover:border-violet-500/30 hover:bg-zinc-900/70 transition-all duration-300 min-w-0"
    >
      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
        <span className="inline-flex px-2.5 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-semibold text-violet-400 uppercase tracking-wider">
          {duration}
        </span>
      </div>
      <h4 className="text-base sm:text-lg font-bold text-zinc-100 leading-snug group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-violet-400 group-hover:to-cyan-400 transition-colors duration-300">
        {title}
      </h4>
      <p className="text-xs sm:text-sm text-zinc-400 font-medium mt-1">{subtitle}</p>
      {details && (
        <p className="text-xs sm:text-sm text-zinc-400 mt-3 leading-relaxed border-t border-zinc-800/50 pt-2 font-light">
          {details}
        </p>
      )}
    </motion.div>
  </motion.div>
);

const EducationExperience = () => {
  return (
    <section
      id="education"
      className="bg-[#030303] text-white py-20 px-6 md:px-20 overflow-x-hidden relative"
    >
      {/* Decorative side gradient glow */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-72 h-72 rounded-full bg-cyan-600/5 filter blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <motion.h2 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-extrabold tracking-tight"
          >
            Education & Experience
          </motion.h2>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: 96 }}
            viewport={{ once: true }}
            className="h-[3px] bg-gradient-to-r from-violet-500 to-cyan-500 mt-3 mx-auto"
          />
        </div>

        {/* Dual columns grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-16">
          
          {/* Education column */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-fuchsia-400 border-b border-zinc-800/50 pb-2 flex items-center gap-2"
            >
              <FaGraduationCap className="text-violet-400 text-lg" />
              Education
            </motion.h3>
            <div className="flex flex-col">
              {educationData.map((item, index) => (
                <TimelineCard
                  key={index}
                  icon={FaGraduationCap}
                  title={item.title}
                  subtitle={item.institute}
                  duration={item.duration}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Experience column */}
          <div>
            <motion.h3 
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-400 border-b border-zinc-800/50 pb-2 flex items-center gap-2"
            >
              <FaBriefcase className="text-cyan-400 text-lg" />
              Experience
            </motion.h3>
            <div className="flex flex-col">
              {experienceData.map((item, index) => (
                <TimelineCard
                  key={index}
                  icon={FaBriefcase}
                  title={item.title}
                  subtitle={item.company}
                  duration={item.duration}
                  details={item.details}
                  index={index}
                />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EducationExperience;
