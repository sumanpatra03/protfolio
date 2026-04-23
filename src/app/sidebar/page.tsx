"use client";

import  { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  { name: "Home", icon: <FaHome />, link: "#" },
  { name: "About", icon: <FaUser />, link: "#about" },
  { name: "Skills", icon: <FaCode />, link: "#skillsection" },
  { name: "Services", icon: <FaCogs />, link: "#service" },
  { name: "Portfolio", icon: <FaBriefcase />, link: "#portfolio" },
  { name: "Contact", icon: <FaPhone />, link: "#contact" },
];

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile toggle button */}
      <button
        className="lg:hidden fixed top-4 left-4 text-white text-2xl z-[600] bg-gray-900 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-screen w-64 bg-gray-900 p-6 flex flex-col items-center z-[500]
          transition-transform duration-300 ease-in-out
          ${isOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
      >
        <div className="flex-grow flex flex-col items-center w-full overflow-y-auto">
          <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-500 mt-8 lg:mt-4 shrink-0">
            <Image
              src="/Suman_img.png"
              width={128}
              height={128}
              alt="Profile"
              className="object-cover w-full h-full"
            />
          </div>

          <h1 className="text-xl font-bold mt-4 text-white text-center">
            Suman <span className="text-gray-300">Patra</span>
          </h1>
          <span className="text-red-400 text-sm font-bold text-center">
            <Typewriter
              words={["Frontend Developer", "React Developer"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={170}
              deleteSpeed={170}
              delaySpeed={2000}
            />
          </span>

          <div className="flex space-x-5 mt-4">
            <Link href="mailto:sumanpatra32003@gmail.com" target="_blank">
              <FaEnvelope className="text-xl text-white hover:text-red-400 transition" />
            </Link>
            <Link href="https://www.linkedin.com/in/sumanpa1/" target="_blank">
              <FaLinkedin className="text-xl text-white hover:text-blue-400 transition" />
            </Link>
            <Link href="https://github.com/sumanpatra03" target="_blank">
              <FaGithub className="text-xl text-white hover:text-gray-400 transition" />
            </Link>
          </div>

          <nav className="mt-6 w-full">
            <ul className="space-y-4 text-center text-white">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.link}
                    onClick={() => setIsOpen(false)}
                    className="flex items-center justify-center gap-2 hover:text-green-400 transition text-base"
                  >
                    {item.icon} {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <a
          href="/Resume_Suman_Patra.pdf"
          download
          className="mt-4 px-4 py-2 bg-green-600 hover:bg-green-700 text-white font-semibold rounded shadow-md flex items-center gap-2 transition shrink-0"
        >
          <FaDownload /> Download CV
        </a>
      </aside>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-[490] lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
