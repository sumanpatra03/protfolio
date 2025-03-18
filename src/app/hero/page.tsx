"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Typewriter } from "react-simple-typewriter";

const HeroSection = () => {
  return (
    <div className="">
      <section className="relative w-full min-h-screen bg-black flex flex-col md:flex-row items-center justify-center px-6 md:px-20">
        {/* Left Content */}
        <div className="text-white text-center md:text-left max-w-lg space-y-4">
          <h1 className="text-4xl md:text-7xl font-bold">
            Suman <span className="text-gray-300">Patra</span>
          </h1>
          <span className="text-red-400 text-md md:text-lg font-bold block">
            <Typewriter
              words={["Frontend Developer", "React Developer"]}
              loop={0}
              cursor
              cursorStyle="|"
              typeSpeed={176}
              deleteSpeed={176}
              delaySpeed={2000}
            />
          </span>
          <p className="text-sm md:text-lg text-gray-400 leading-relaxed">
            Empowering businesses with cutting-edge full-stack development. I
            deliver tailored, scalable solutions that drive innovation, enhance
            user experience, and accelerate growth for your success.
          </p>

          <div className="mt-6 flex justify-center md:justify-start space-x-4">
            <button className="relative overflow-hidden px-6 py-3 bg-green-500 text-black font-semibold rounded-full transition-all duration-300 group">
              <span className="absolute inset-0 bg-red-500 scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100"></span>
              <span className="relative z-10">View Work</span>
            </button>

            <button className="relative overflow-hidden px-6 py-3 bg-yellow-400 text-black font-semibold rounded-full transition-all duration-300 group">
              <span className="absolute inset-0 bg-red-500 scale-y-0 origin-bottom transition-transform duration-500 group-hover:scale-y-100"></span>
              <span className="relative z-10">Contact Me</span>
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="relative mt-10 md:mt-0 md:ml-10">
          <div className="relative w-48 h-48 md:w-64 md:h-64 bg-gray-900 rounded-lg overflow-hidden border-4 border-gray-600">
            <Image
              src="/suman-profile.png"
              fill
              objectFit="cover"
              alt="Suman Patra - Frontend Developer"
            />
          </div>

          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-30px] left-[-30px] md:top-[-50px] md:left-[-50px] w-10 h-10 md:w-20 md:h-20"
          >
            <Image
              src="/rotate-img.png"
              fill
              objectFit="contain"
              alt="Cursor"
            />
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HeroSection;
