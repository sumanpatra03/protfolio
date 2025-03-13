"use client";

import React from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { FaReact, FaGitAlt, FaBootstrap } from "react-icons/fa";
import { RiNextjsFill, RiTailwindCssFill } from "react-icons/ri";
import { SiMui } from "react-icons/si";

const skills = [
  { name: "C++", percentage: 40, color: "#A3E635", label: "for DSA" },
  { name: "JavaScript", percentage: 80, color: "#FB7185", label: "for Dev" },
  { name: "TypeScript", percentage: 50, color: "#FB7185", label: "for Web" },
  { name: "JS (OOPs)", percentage: 70, color: "#AA1067", label: "for OOPs" },
];

const techStack = [
  { name: "React JS", icon: <FaReact size={24} />, color: "bg-[#10332D]" },
  { name: "Next.js", icon: <RiNextjsFill size={24} />, color: "bg-[#1E3A5F]" },
  {
    name: "Tailwind CSS",
    icon: <RiTailwindCssFill size={24} />,
    color: "bg-[#4C1D95]",
  },
  { name: "MUI", icon: <SiMui size={24} />, color: "bg-[#665C2E]" },
  { name: "Bootstrap", icon: <FaBootstrap size={24} />, color: "bg-[#472936]" },
  { name: "Git", icon: <FaGitAlt size={24} />, color: "bg-[#1E3A5F]" },
];

const SkillsSection = () => {
  return (
    <section id="skillsection" className="bg-black text-white py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Coding Skills */}
        <h3 className="text-2xl md:text-3xl font-extrabold mb-6">
          Coding Skills.
        </h3>
        <hr className=" border-b-[3px] text-white mb-10"></hr>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 justify-center items-center">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-24 h-24 md:w-28 md:h-28">
                <CircularProgressbar
                  value={skill.percentage}
                  text={`${skill.percentage}%`}
                  styles={buildStyles({
                    textColor: "#fff",
                    pathColor: skill.color,
                    trailColor: "#222",
                    textSize: "18px",
                  })}
                />
              </div>
              <p className="text-xl font-semibold mt-3">{skill.name}</p>
              <p className="text-sm text-gray-400">{skill.label}</p>
            </div>
          ))}
        </div>

       
        <h2 className="text-2xl md:text-3xl  font-extrabold mt-16 mb-6">
          Tech Stack.
        </h2>
        <hr className=" border-b-[3px] text-white mb-10"></hr>

        <div className="flex flex-wrap gap-4 justify-center">
          {techStack.map((tech, index) => (
            <div
              key={index}
              className={`flex items-center gap-2 px-6 py-3 rounded-full ${tech.color} text-white text-lg font-semibold hover:scale-105 transition-all`}
            >
              {tech.icon}
              {tech.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
