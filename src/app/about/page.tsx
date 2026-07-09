"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaUser, FaMapMarkerAlt, FaBriefcase, FaGraduationCap, FaLanguage } from "react-icons/fa";

const AboutMe = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Suman Patra",
    description:
      "Learn more about Suman Patra, a Frontend Developer specializing in Next.js, React, and modern web technologies.",
  };

  const infoItems = [
    { label: "Name", value: "Suman Patra", icon: <FaUser className="text-violet-400" /> },
    { label: "Location", value: "India", icon: <FaMapMarkerAlt className="text-cyan-400" /> },
    { label: "Experience", value: "1.5 Years", icon: <FaBriefcase className="text-fuchsia-400" /> },
    { label: "Full-time", value: "Available", icon: <FaGraduationCap className="text-green-400" /> },
    { label: "Language", value: "English, Hindi", icon: <FaLanguage className="text-yellow-400" /> },
  ];

  return (
    <>
      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
      />

      <section 
        className="bg-[#030303] text-white py-20 px-6 md:px-20 relative overflow-hidden" 
        id="about"
      >
        {/* Subtle Decorative Gradient Glow */}
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-violet-600/5 filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          {/* Header */}
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              About Me<span className="text-violet-500">.</span>
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="h-[3px] bg-gradient-to-r from-violet-500 to-cyan-500 mt-3"
            />
          </div>

          {/* Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Description Text Column */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="lg:col-span-7 space-y-5"
            >
              <p className="text-zinc-300 leading-relaxed text-sm md:text-base">
                Hi, my name is{" "}
                <span className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400">
                  Suman Patra.
                </span>{" "}
                I am a passionate <span className="text-zinc-100 font-semibold">Frontend & Mobile Developer</span> with <span className="text-zinc-100 font-semibold">1.5 years</span> of professional experience building modern web and mobile applications.
              </p>
              
              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                With a strong command over <span className="text-zinc-200 font-semibold">React.js, Next.js, React Native, TypeScript, and Tailwind CSS</span>, my primary focus is to deliver pixel-perfect designs integrated with optimized code architecture. I specialize in developing role-based vendor dashboards, interactive commerce applications, and cross-platform mobile apps.
              </p>

              <p className="text-zinc-400 leading-relaxed text-sm md:text-base">
                From launching vendor relationship portals to engineering POS mobile systems featuring Role-Based Access Control (RBAC), I collaborate with teams to solve complex state management and performance challenges. I strive to write highly maintainable code that offers outstanding visual excellence.
              </p>
            </motion.div>

            {/* Metrics Info Grid Column */}
            <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 w-full">
              {infoItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  whileHover={{ y: -3, transition: { duration: 0.2 } }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 shadow-md hover:border-violet-500/30 hover:bg-zinc-900/70 transition-all duration-300"
                >
                  <div className="w-10 h-10 rounded-lg bg-zinc-950 flex items-center justify-center border border-zinc-800/80 text-lg">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500 leading-none">
                      {item.label}
                    </span>
                    <p className="text-sm font-semibold text-zinc-200 mt-0.5 leading-tight">
                      {item.value}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
