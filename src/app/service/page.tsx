"use client";

import { motion } from "framer-motion";
import { FaCode, FaChartLine, FaPaintBrush } from "react-icons/fa";

const services = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, fast, and modern web applications using React, Next.js, and Tailwind CSS.",
    icon: <FaCode size={28} />,
    color: "bg-blue-500",
  },
  {
    title: "UI/UX Design",
    description:
      "Designing intuitive and user-friendly interfaces for the best user experience with a focus on aesthetics and usability.",
    icon: <FaPaintBrush size={28} />,
    color: "bg-purple-500",
  },
  {
    title: "SEO & Performance",
    description:
      "Optimizing websites for search engines and speed, ensuring better rankings and faster load times.",
    icon: <FaChartLine size={28} />,
    color: "bg-yellow-500",
  },
];

const Services = () => {
  return (
    <section className="bg-black text-white py-16 px-6 md:px-20">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <h2 className="text-2xl md:text-3xl  font-extrabold mb-4">
          Services<span className="text-white">.</span>
        </h2>
        <hr className=" border-b-[3px] text-white mb-8"></hr>

        <p className="text-gray-300 mb-10 max-w-3xl">
          Elevate your web presence with high-quality frontend development,
          UI/UX design, and SEO optimization.
        </p>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="p-6 bg-[#181818] rounded-xl text-center flex flex-col items-center transition-all duration-300 hover:text-[#FF3D00] group"
            >
              {/* Icon */}
              <div
                className={`w-14 h-14 ${service.color} rounded-full flex items-center justify-center text-white mb-4`}
              >
                {service.icon}
              </div>

              {/* Title */}
              <h3 className="text-xl font-bold mb-3">{service.title}</h3>

              {/* Description */}
              <p className="text-gray-400 text-sm">{service.description}</p>

              {/* Arrow with Hover Effect */}
              <motion.div
              
                initial={{ rotate: -45 }}
                whileHover={{ rotate: 0 }}
                transition={{ duration: 0.3 }}
                className="mt-4 text-black text-2xl w-[25px] h-[25px] bg-cyan-300 flex justify-center items-center "
              >
                ↘
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
