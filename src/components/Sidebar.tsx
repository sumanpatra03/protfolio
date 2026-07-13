"use client";

import { useState } from "react";
import Image from "next/image";
import { Link as ScrollLink } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaEnvelope,
  FaBars,
  FaTimes,
  FaHome,
  FaUser,
  FaCode,
  FaCogs,
  FaBriefcase,
  FaPhone,
  FaDownload,
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";

const navItems = [
  { name: "Home", icon: <FaHome />, link: "home" },
  { name: "About", icon: <FaUser />, link: "about" },
  { name: "Skills", icon: <FaCode />, link: "skillsection" },
  { name: "Services", icon: <FaCogs />, link: "service" },
  { name: "Portfolio", icon: <FaBriefcase />, link: "portfolio" },
  { name: "Contact", icon: <FaPhone />, link: "contact" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Toggle Button */}
      <button
        className="lg:hidden fixed top-5 left-5 text-white text-xl z-[600] bg-zinc-900/90 backdrop-blur-md p-3 rounded-full border border-zinc-800 shadow-[0_4px_20px_rgba(0,0,0,0.4)] cursor-pointer hover:bg-zinc-800 transition-colors"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-zinc-950/95 backdrop-blur-xl border-r border-zinc-900/80 p-6 flex flex-col items-center z-[500]
          transition-transform duration-500 cubic-bezier(0.16, 1, 0.3, 1)
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex-grow flex flex-col items-center w-full overflow-y-auto no-scrollbar">
          
          {/* Profile Picture Section */}
          <div className="relative mt-8 lg:mt-4 shrink-0">
            {/* Glowing active animation rings */}
            <span className="absolute inset-0 rounded-full bg-gradient-to-tr from-violet-600 to-cyan-400 blur-md opacity-70 animate-pulse-glow" />
            <div className="relative w-28 h-28 rounded-full overflow-hidden border-2 border-zinc-800/80 bg-zinc-950 p-[3px]">
              <div className="w-full h-full rounded-full overflow-hidden relative bg-zinc-900">
                <Image
                  src="/Suman_img.png"
                  fill
                  sizes="112px"
                  alt="Suman Patra Profile"
                  className="object-cover object-top hover:scale-110 transition-transform duration-500"
                />
              </div>
            </div>
          </div>

          {/* Name & Title */}
          <h1 className="text-xl font-bold mt-5 text-zinc-100 text-center tracking-tight">
            Suman <span className="text-zinc-400 font-light">Patra</span>
          </h1>
          
          <div className="h-6 mt-1 flex items-center justify-center">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 text-sm font-semibold tracking-wide">
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
          </div>

          {/* Social icons */}
          <div className="flex space-x-4 mt-6">
            {[
              { href: "mailto:sumanpatra32003@gmail.com", icon: <FaEnvelope />, color: "hover:text-red-400 hover:shadow-[0_0_15px_rgba(248,113,113,0.4)]" },
              { href: "https://www.linkedin.com/in/sumanpa1/", icon: <FaLinkedin />, color: "hover:text-blue-400 hover:shadow-[0_0_15px_rgba(96,165,250,0.4)]" },
              { href: "https://github.com/sumanpatra03", icon: <FaGithub />, color: "hover:text-violet-400 hover:shadow-[0_0_15px_rgba(167,139,250,0.4)]" },
            ].map((social, i) => (
              <a
                key={i}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`p-2 rounded-lg bg-zinc-900 border border-zinc-800/60 text-zinc-400 text-lg transition-all duration-300 ${social.color}`}
              >
                {social.icon}
              </a>
            ))}
          </div>

          {/* Navigation Links */}
          <nav className="mt-8 w-full">
            <ul className="space-y-2 text-zinc-300">
              {navItems.map((item, index) => (
                <li key={index}>
                  <ScrollLink
                    to={item.link}
                    spy={true}
                    smooth={true}
                    offset={-20}
                    duration={500}
                    activeClass="bg-zinc-900/80 text-violet-400 border-l-2 border-violet-500 font-medium shadow-[inset_4px_0_10px_rgba(139,92,246,0.05)]"
                    onClick={() => setIsOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-zinc-900/40 hover:text-white cursor-pointer transition-all duration-200 text-sm tracking-wide group"
                  >
                    <span className="text-base text-zinc-400 group-hover:text-violet-400 transition-colors">
                      {item.icon}
                    </span>
                    {item.name}
                  </ScrollLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {/* Action Button */}
        <div className="w-full pt-4 border-t border-zinc-900 shrink-0">
          <a
            href="/Resume_Suman_Patra.pdf"
            download
            className="w-full py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white text-sm font-semibold rounded-xl shadow-[0_4px_20px_rgba(139,92,246,0.2)] flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0"
          >
            <FaDownload /> Download CV
          </a>
        </div>
      </aside>

      {/* Overlay Background for Mobile view */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[490] lg:hidden"
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;
