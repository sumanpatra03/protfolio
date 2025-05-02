"use client";

import React, { useState } from "react";
import Image from "next/image";

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
} from "react-icons/fa";
import { Typewriter } from "react-simple-typewriter";
import Link from "next/link";

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
     
      <button
        className="md:hidden fixed top-4 left-4 text-white text-3xl z-501"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </button>

      
      <aside
        style={{ position: "fixed", zIndex: "500" }}
        className={` top-0 left-0 h-screen bg-gray-900 p-8 flex flex-col items-center 
          transform ${isOpen ? "translate-x-0" : "-translate-x-full"} 
          transition-transform duration-300 ease-in-out 
          w-4/5 sm:w-3/5 md:w-1/3 lg:w-1/4 xl:w-1/5 md:translate-x-0 md:relative md:flex`}
      >
        <div className="w-36 h-36 md:w-44 md:h-44 rounded-full overflow-hidden border-4 border-gray-500">
          <Image
            src="/Suman_img.png"
            width={176}
            height={176}
            alt="Profile"
            className="object-cover w-full h-full"
          />
        </div>

        <h1 className="text-2xl font-bold mt-4 text-white">
          Suman <span className="text-gray-300">Patra</span>
        </h1>
        <span className="text-red-400 text-lg font-bold">
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

    
        <div className="flex space-x-6 mt-5">
          <Link href="mailto:sumanpatra32003@gmail.com" target="_blank">
            <FaEnvelope className="text-2xl text-white cursor-pointer hover:text-red-400 transition" />
          </Link>
          <Link href="https://www.linkedin.com/in/sumanpa1/" target="_blank">
            <FaLinkedin className="text-2xl text-white cursor-pointer hover:text-blue-400 transition" />
          </Link>
          <Link href="https://github.com/sumanpatra03" target="_blank">
            <FaGithub className="text-2xl text-white cursor-pointer hover:text-gray-400 transition" />
          </Link>
        </div>

        <nav className="mt-6 w-full">
          <ul className="space-y-5 text-center text-white text-lg">
            {navItems.map((item, index) => (
              <li
                key={index}
                className="hover:text-green-400 cursor-pointer flex items-center justify-center gap-2"
              >
                <a
                  href={item.link}
                  className=" decoration-gray-500 flex items-center gap-2"
                >
                  {item.icon} {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </aside>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black opacity-50 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
