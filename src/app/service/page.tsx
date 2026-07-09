"use client";

import { motion } from "framer-motion";
import { FaCode, FaChartLine, FaPaintBrush } from "react-icons/fa";

const services = [
  {
    title: "Frontend Development",
    description:
      "Building responsive, high-performance, and modern web applications using React, Next.js, TypeScript, and Tailwind CSS.",
    icon: <FaCode size={26} />,
    color: "from-blue-500/20 to-cyan-500/20 border-cyan-500/30 text-cyan-400 shadow-[rgba(6,182,212,0.15)]",
    glow: "group-hover:shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:border-cyan-500/50",
  },
  {
    title: "UI/UX Design Integration",
    description:
      "Designing intuitive, elegant user interfaces with rich animations, pixel-perfect responsiveness, and smooth transitions.",
    icon: <FaPaintBrush size={24} />,
    color: "from-violet-500/20 to-fuchsia-500/20 border-violet-500/30 text-violet-400 shadow-[rgba(139,92,246,0.15)]",
    glow: "group-hover:shadow-[0_0_30px_rgba(139,92,246,0.3)] group-hover:border-violet-500/50",
  },
  {
    title: "SEO & Web Performance",
    description:
      "Optimizing site speeds, leveraging Next.js SSR/SSG, structuring semantic tags, and managing schemas for top SEO ranks.",
    icon: <FaChartLine size={24} />,
    color: "from-yellow-500/20 to-amber-500/20 border-yellow-500/30 text-yellow-400 shadow-[rgba(234,179,8,0.15)]",
    glow: "group-hover:shadow-[0_0_30px_rgba(234,179,8,0.3)] group-hover:border-yellow-500/50",
  },
];

const Services = () => {
  const servicesSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Web Development & Design Services",
    provider: {
      "@type": "Person",
      name: "Suman Patra",
    },
    serviceType: "Frontend Development, UI/UX Design, SEO Optimization",
    areaServed: "Global",
    offers: {
      "@type": "Offer",
      price: "Custom Pricing",
      priceCurrency: "USD",
    },
  };

  return (
    <>
      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(servicesSchema) }}
      />
      
      <section id="service" className="bg-[#030303] text-white py-20 px-6 md:px-20 relative overflow-hidden">
        {/* Subtle background glow */}
        <div className="absolute right-0 bottom-0 w-80 h-80 rounded-full bg-cyan-600/5 filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              Services<span className="text-violet-500">.</span>
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              className="h-[3px] bg-gradient-to-r from-violet-500 to-cyan-500 mt-3"
            />
          </div>

          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-zinc-400 mb-12 max-w-2xl text-sm md:text-base font-light leading-relaxed"
          >
            Elevate your digital products with custom frontend engineering, modular architecture, fluid user experience transitions, and expert search optimization.
          </motion.p>

          {/* Services Cards Flow */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -6 }}
                className={`p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800/80 shadow-lg hover:bg-zinc-900/60 transition-all duration-300 group flex flex-col justify-between items-center text-center ${service.glow}`}
              >
                <div className="flex flex-col items-center">
                  {/* Icon Circle */}
                  <div
                    className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${service.color} border flex items-center justify-center mb-5 shadow-md`}
                  >
                    {service.icon}
                  </div>

                  {/* Title */}
                  <h3 className="text-lg sm:text-xl font-bold text-zinc-100 mb-3 group-hover:text-zinc-50 transition-colors">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-zinc-400 text-xs sm:text-sm font-light leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Animated Arrow Icon */}
                <motion.div
                  initial={{ rotate: -45, scale: 0.9 }}
                  whileHover={{ rotate: 0, scale: 1.05 }}
                  className="mt-6 w-8 h-8 rounded-lg bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-400 group-hover:text-violet-400 group-hover:border-violet-500/30 transition-all duration-300"
                >
                  <span className="text-sm font-bold">↘</span>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Services;
