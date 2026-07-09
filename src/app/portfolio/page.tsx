"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";

interface Project {
  title: string;
  description: string;
  image: string;
  details: string;
  features: string[];
  technologies: string[];
  github: string;
  liveUrl: string;
}

const featuredProjects: Project[] = [
  {
    title: "RMS v2 (Vendor Dashboard)",
    description: "Enterprise Vendor Relationship Management System built with Next.js & MUI.",
    image: "/vendor_dashboard.jpg",
    details: "A complex multi-tenant vendor relationship management dashboard designed to automate merchant workflows, transaction audits, and invoice tracking. The application was built entirely using Next.js and Material UI (MUI). Without utilizing global state containers like Redux, state was coordinated across nested dashboard grids and filters using advanced props drilling and local state-lifting strategies.",
    features: [
      "Main Purpose: Streamlining merchant inventory, vendor transactions, and analytics charts",
      "Complexity: Coordinating deeply nested dashboard component trees, complex table filters, and invoice status audits without a global store",
      "How I Handled It: Structured callback handlers, designed custom state-lifting topologies, and optimized rendering to prevent unnecessary re-renders in deep trees",
      "UI System: Crafted complex data tables, pagination, and layout controls using Material UI (MUI)"
    ],
    technologies: ["Next.js", "MUI", "React JS", "TypeScript", "Props Drilling", "State lifting", "Recharts"],
    github: "https://github.com/sumanpatra03",
    liveUrl: "https://rmsv2.gobiens.com/vendor/dashboard"
  },
  {
    title: "Uvanij Ecom Dev",
    description: "Commercial e-commerce storefront platform built with Next.js & MUI.",
    image: "/ecom_store.jpg",
    details: "High-performance e-commerce platform designed to provide modular retail shopping experiences. The frontend uses Next.js for server rendering and Material UI (MUI) for grid styling. Cart management, category selectors, and dynamic checkouts were handled without Redux, relying on React's local hooks, context patterns, and props drilling.",
    features: [
      "Main Purpose: Product catalog browsing, multi-category searches, and cart checkout structures",
      "Complexity: Managing live cart status, pricing checks, and checkout steps across deeply nested grid components without a centralized store",
      "How I Handled It: Built custom react hooks for abstracting cart updates, lifted state to central layout contexts, and shared handlers via structured props drilling",
      "UI System: Developed highly responsive product catalogs and sliders using MUI grids and layouts"
    ],
    technologies: ["Next.js", "MUI", "React JS", "TypeScript", "Props Drilling", "Framer Motion", "Sanity CMS"],
    github: "https://github.com/sumanpatra03",
    liveUrl: "https://ecomdev.uvanij.com/"
  },
  {
    title: "Taskly",
    description: "Collaborative Project Management & Kanban Board Web Application.",
    image: "/taskly_mockup.jpg",
    details: "A high-performance project management application styled in a clean, modern dark mode. Features include custom Kanban boards, responsive columns (To Do, In Progress, Review, Done), checkable subtask logs, and dynamic status progress filters. Built with Next.js, Tailwind CSS, and React Context to manage collaborative states.",
    features: [
      "Main Purpose: Kanban tracking cards, subtask checklists, and visual project column progress",
      "Complexity: Avoiding props drilling while sharing active task states, subtask completions, and drag indicators across boards and side panels",
      "How I Handled It: Designed a global React Context provider (BoardContext) that manages task mutations and encapsulates drag-and-drop state transitions",
      "UI System: Styled in a dark cyber aesthetic using Tailwind CSS and micro-interactions"
    ],
    technologies: ["Next.js", "React JS", "TypeScript", "Tailwind CSS", "React Context", "Framer Motion"],
    github: "https://github.com/sumanpatra03",
    liveUrl: "https://taskly-green-ten.vercel.app/"
  },
  {
    title: "Role-Based POS App (React Native)",
    description: "Point of Sale cross-platform mobile app utilizing Redux Toolkit.",
    image: "/pos_rn.jpg",
    details: "A commercial-grade role-based Point of Sale (POS) cross-platform mobile application designed to manage physical store registers, products, checkout transactions, and cashier work shifts. This mobile project leverages Redux Toolkit and Redux Persist for modular state management, transaction caching, and role check verification.",
    features: [
      "Main Purpose: Cross-platform retail registers, barcode scanning, and staff shift logs",
      "Complexity: Implementing secure Role-Based Access Control (RBAC) screen locks (Cashier vs Manager views) and preserving register logs offline",
      "How I Handled It: Integrated Redux Toolkit as a global store, implemented offline state syncing via Redux Persist, and set up role middleware checks",
      "Mobile Integrations: Configured camera-based native barcode scanner libraries and local storage locks"
    ],
    technologies: ["React Native", "Redux Toolkit", "TypeScript", "Redux Persist", "Node.js", "MongoDB"],
    github: "https://github.com/sumanpatra03",
    liveUrl: ""
  }
];

const Portfolio = () => {
  const [myPortfolio, setPortfolio] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  async function fetchPortfolio() {
    try {
      const query = `*[_type=="portfolio"]{title,description,'image':image.asset->url,details,features,technologies,github,liveUrl}`;
      const data = await client.fetch(query);
      // Guard against undefined elements/titles during filter
      const filtered = data.filter(
        (p: Project) => p && p.title && !featuredProjects.some((fp) => fp.title && fp.title.toLowerCase() === p.title.toLowerCase())
      );
      setPortfolio(filtered);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  }

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <>
      <section
        className="bg-[#030303] text-white py-20 px-6 md:px-20 relative overflow-hidden"
        id="portfolio"
      >
        {/* Subtle dynamic background glow */}
        <div className="absolute left-0 bottom-0 w-80 h-80 rounded-full bg-violet-600/5 filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-12">
            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              Portfolio<span className="text-violet-500">.</span>
            </motion.h2>
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              className="h-[3px] bg-gradient-to-r from-violet-500 to-cyan-500 mt-3"
            />
          </div>

          {/* Section 1: Featured Commercial Works */}
          <div className="mb-12">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-xl md:text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 flex items-center gap-2"
            >
              🚀 Featured Commercial Projects
            </motion.h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredProjects.map((project, idx) => (
                <motion.div
                  key={project.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  whileHover={{ y: -6 }}
                  className="bg-zinc-900/30 border border-zinc-800/80 p-4 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:border-violet-500/30 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-all duration-300 flex flex-col justify-between group"
                  onClick={() => openModal(project)}
                >
                  <div className="relative overflow-hidden rounded-xl">
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={700}
                      height={400}
                      priority={idx === 0}
                      className="rounded-xl w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center rounded-xl">
                      <span className="px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        View Case Study
                      </span>
                    </div>
                  </div>
                  <div className="pt-4 flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors duration-200 line-clamp-1">
                        {project.title}
                      </h3>
                      <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                      <span>Explore details</span>
                      <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Section 2: Other Creations (Fetched from Sanity) */}
          {myPortfolio.length > 0 && (
            <div className="mt-16">
              <motion.h3
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-xl md:text-2xl font-bold mb-8 text-zinc-300 flex items-center gap-2 border-t border-zinc-900 pt-8"
              >
                📁 Additional Creations
              </motion.h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {myPortfolio.map((project, idx) => (
                  <motion.div
                    key={project.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    whileHover={{ y: -6 }}
                    className="bg-zinc-900/30 border border-zinc-800/80 p-4 rounded-2xl overflow-hidden cursor-pointer shadow-lg hover:border-violet-500/30 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] transition-all duration-300 flex flex-col justify-between group"
                    onClick={() => openModal(project)}
                  >
                    <div className="relative overflow-hidden rounded-xl">
                      {project.image ? (
                        <Image
                          src={project.image}
                          alt={project.title}
                          width={700}
                          height={700}
                          className="rounded-xl w-full object-cover aspect-video group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-[200px] bg-zinc-900 rounded-xl flex items-center justify-center text-zinc-500 text-sm">
                          No Image Available
                        </div>
                      )}
                      <div className="absolute inset-0 bg-zinc-950/80 opacity-0 group-hover:opacity-100 backdrop-blur-sm transition-opacity duration-300 flex flex-col justify-center items-center p-4 text-center rounded-xl">
                        <span className="px-4 py-2 bg-gradient-to-r from-violet-600 to-cyan-600 text-white rounded-xl text-xs font-semibold shadow-md transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                          Learn More
                        </span>
                      </div>
                    </div>
                    <div className="pt-4 flex-1 flex flex-col justify-between">
                      <div>
                        <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors duration-200 line-clamp-1">
                          {project.title}
                        </h3>
                        <p className="text-zinc-400 text-xs mt-2 line-clamp-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                        <span>Explore details</span>
                        <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          )}

          {/* Dialog Modal Panel */}
          <Transition show={isOpen} as={React.Fragment}>
            <Dialog
              onClose={() => setIsOpen(false)}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto"
            >
              <div className="min-h-screen flex items-center justify-center">
                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black/85 backdrop-blur-md" />
                </Transition.Child>

                <Transition.Child
                  as={React.Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95 y-8"
                  enterTo="opacity-100 scale-100 y-0"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100 y-0"
                  leaveTo="opacity-0 scale-95 y-8"
                >
                  <Dialog.Panel className="bg-zinc-950/95 border border-zinc-800/80 rounded-2xl w-full max-w-4xl p-6 sm:p-8 relative z-50 flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto no-scrollbar shadow-[0_10px_50px_rgba(0,0,0,0.8)] animate-none">
                    
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition z-50"
                    >
                      <FaTimes size={16} />
                    </button>

                    {selectedProject && (
                      <>
                        <div className="w-full md:w-5/12 shrink-0">
                          <div className="relative w-full rounded-xl overflow-hidden border border-zinc-800/80 bg-zinc-900 shadow-md">
                            {selectedProject.image ? (
                              <Image
                                src={selectedProject.image}
                                alt={selectedProject.title}
                                width={700}
                                height={700}
                                className="rounded-xl w-full object-cover aspect-square"
                              />
                            ) : (
                              <div className="w-full h-full min-h-[250px] bg-zinc-900 flex items-center justify-center text-zinc-500 text-sm">
                                No Image
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex-1 flex flex-col justify-between">
                          <div>
                            <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[10px] font-bold text-violet-400 uppercase tracking-widest">
                              Project Case Study
                            </span>
                            
                            <h3 className="text-2xl sm:text-3xl font-extrabold text-zinc-100 mt-2">
                              {selectedProject.title}
                            </h3>

                            <p className="text-zinc-300 text-sm mt-4 leading-relaxed font-light">
                              {selectedProject.details || selectedProject.description}
                            </p>

                            {selectedProject.features && Array.isArray(selectedProject.features) && selectedProject.features.length > 0 && (
                              <div className="mt-5">
                                <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                                  Key Features
                                </h4>
                                <ul className="space-y-1.5 text-zinc-400 text-xs font-light">
                                  {selectedProject.features.map((feature, index) => (
                                    <li key={index} className="flex items-start gap-2">
                                      <span className="text-violet-400 mt-0.5">•</span>
                                      <span>{feature}</span>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}

                            <div className="mt-6">
                              <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2.5">
                                Technologies Used
                              </h4>
                              <div className="flex flex-wrap gap-2">
                                {(Array.isArray(selectedProject.technologies) 
                                  ? selectedProject.technologies 
                                  : typeof selectedProject.technologies === 'string'
                                    ? [selectedProject.technologies]
                                    : []
                                ).map((tech, i) => (
                                  <span
                                    key={i}
                                    className="px-2.5 py-1 text-[10px] font-semibold bg-zinc-900 border border-zinc-800 text-cyan-400 rounded-md"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>
                          </div>

                          <div className="mt-8 pt-4 border-t border-zinc-900 flex flex-col sm:flex-row gap-3">
                            <a
                              href={selectedProject.github}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-855 border border-zinc-800 text-zinc-200 font-semibold rounded-xl text-sm transition-all"
                            >
                              <FaGithub /> Github Repository
                            </a>
                            
                            {selectedProject.liveUrl && (
                              <a
                                href={selectedProject.liveUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl text-sm shadow-[0_4px_15px_rgba(139,92,246,0.2)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.35)] transition-all"
                              >
                                <FaExternalLinkAlt size={12} /> Launch Live Demo
                              </a>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </Dialog>
          </Transition>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
