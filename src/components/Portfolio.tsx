"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog, Transition } from "@headlessui/react";
import { motion, AnimatePresence } from "framer-motion";
import { client } from "@/sanity/lib/client";
import { FaGithub, FaExternalLinkAlt, FaTimes } from "react-icons/fa";
import SpotlightCard from "@/components/SpotlightCard";
import { audioSynth } from "@/utils/audio";

interface Project {
  title: string;
  description: string;
  image: string;
  details: string;
  features: string[];
  technologies: string[];
  github: string;
  liveUrl: string;
  category: string;
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
    liveUrl: "https://rmsv2.gobiens.com/vendor/dashboard",
    category: "Commercial Web"
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
    liveUrl: "https://ecomdev.uvanij.com/",
    category: "Commercial Web"
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
    liveUrl: "https://taskly-green-ten.vercel.app/",
    category: "Commercial Web"
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
    liveUrl: "",
    category: "Mobile Native"
  }
];

const categories = ["All", "Commercial Web", "Mobile Native", "Sanity CMS"];

const Portfolio = () => {
  const [myPortfolio, setPortfolio] = useState<Project[]>([]);
  const [activeTab, setActiveTab] = useState("All");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [modalTab, setModalTab] = useState<"info" | "live">("info");
  const [iframeLoading, setIframeLoading] = useState(true);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setModalTab("info");
    setIframeLoading(true);
    setIsOpen(true);
    audioSynth.playClick();
  };

  async function fetchPortfolio() {
    try {
      const query = `*[_type=="portfolio"]{title,description,'image':image.asset->url,details,features,technologies,github,liveUrl}`;
      const data = await client.fetch(query);
      // Map to include category tag and filter duplicates
      const mapped = data
        .map((p: any) => ({ ...p, category: "Sanity CMS" }))
        .filter(
          (p: Project) => p && p.title && !featuredProjects.some((fp) => fp.title && fp.title.toLowerCase() === p.title.toLowerCase())
        );
      setPortfolio(mapped);
    } catch (error) {
      console.error("Error fetching portfolio:", error);
    }
  }

  useEffect(() => {
    fetchPortfolio();
  }, []);

  // Filter projects dynamically
  const filteredFeatured = featuredProjects.filter(
    (p) => activeTab === "All" || p.category === activeTab
  );
  
  const filteredAdditional = myPortfolio.filter(
    (p) => activeTab === "All" || p.category === activeTab
  );

  return (
    <>
      <section
        className="bg-[#030303] text-white py-20 px-6 md:px-20 relative overflow-hidden"
        id="portfolio"
      >
        {/* Subtle background glow */}
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

          {/* Dynamic Category Filter Tabs */}
          <div className="flex flex-wrap gap-2 mb-12 justify-center sm:justify-start">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold tracking-wide border transition-all duration-300 cursor-pointer
                  ${
                    activeTab === cat
                      ? "bg-gradient-to-r from-violet-600 to-cyan-600 text-white border-transparent shadow-[0_4px_15px_rgba(139,92,246,0.25)] scale-[1.03]"
                      : "bg-zinc-950/60 text-zinc-400 border-zinc-900 hover:text-zinc-200 hover:border-zinc-800"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Section 1: Featured Projects */}
          <AnimatePresence mode="wait">
            {filteredFeatured.length > 0 && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="mb-12"
              >
                <motion.h3
                  className="text-xl md:text-2xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-cyan-400 flex items-center gap-2"
                >
                  🚀 Featured Developments
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredFeatured.map((project, idx) => (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="h-full"
                    >
                      <SpotlightCard
                        className="p-4 h-full cursor-pointer hover:border-violet-500/30 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between"
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
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors duration-200 line-clamp-1">
                                {project.title}
                              </h3>
                              <span className="text-[9px] uppercase tracking-wider font-extrabold text-cyan-400 bg-cyan-950/20 px-2 py-0.5 rounded border border-cyan-500/10">
                                {project.category}
                              </span>
                            </div>
                            <p className="text-zinc-400 text-xs mt-2.5 line-clamp-2 leading-relaxed font-light">
                              {project.description}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                             <span>Explore details</span>
                             <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Section 2: Sanity Creations */}
          <AnimatePresence mode="wait">
            {filteredAdditional.length > 0 && (
              <motion.div
                layout
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4 }}
                className="mt-16"
              >
                <motion.h3
                  className="text-xl md:text-2xl font-bold mb-8 text-zinc-300 flex items-center gap-2 border-t border-zinc-900 pt-8"
                >
                  📁 Additional Creations
                </motion.h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {filteredAdditional.map((project, idx) => (
                    <motion.div
                      key={project.title}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.3, delay: idx * 0.05 }}
                      className="h-full"
                    >
                      <SpotlightCard
                        className="p-4 h-full cursor-pointer hover:border-violet-500/30 hover:shadow-[0_8px_30px_rgba(139,92,246,0.15)] hover:bg-zinc-900/60 transition-all duration-300 flex flex-col justify-between"
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
                            <div className="flex items-center justify-between gap-2">
                              <h3 className="text-lg font-bold text-zinc-100 group-hover:text-violet-400 transition-colors duration-200 line-clamp-1">
                                {project.title}
                              </h3>
                              <span className="text-[9px] uppercase tracking-wider font-extrabold text-violet-400 bg-violet-950/20 px-2 py-0.5 rounded border border-violet-500/10">
                                {project.category}
                              </span>
                            </div>
                            <p className="text-zinc-400 text-xs mt-2.5 line-clamp-2 leading-relaxed font-light">
                              {project.description}
                            </p>
                          </div>
                          <div className="mt-4 flex items-center gap-1.5 text-xs font-semibold text-cyan-400 group-hover:text-cyan-300 transition-colors">
                             <span>Explore details</span>
                             <span className="transform group-hover:translate-x-1 transition-transform">→</span>
                          </div>
                        </div>
                      </SpotlightCard>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

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
                  <Dialog.Panel className="bg-zinc-950/95 border border-zinc-800/80 rounded-2xl w-full max-w-4xl p-6 sm:p-8 relative z-50 flex flex-col gap-6 max-h-[90vh] overflow-y-auto no-scrollbar shadow-[0_10px_50px_rgba(0,0,0,0.8)] animate-none">
                    
                    <button
                      onClick={() => setIsOpen(false)}
                      className="absolute top-4 right-4 text-zinc-400 hover:text-white p-2 rounded-full hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition z-50"
                    >
                      <FaTimes size={16} />
                    </button>

                    {selectedProject && (
                      <div className="flex flex-col gap-6 w-full">
                        {/* Header Bar inside Modal */}
                        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 pb-4 border-b border-zinc-900 w-full pr-8">
                          <div>
                            <span className="px-2.5 py-1 rounded-full bg-violet-500/10 border border-violet-500/30 text-[9px] font-extrabold text-violet-400 uppercase tracking-widest">
                              {selectedProject.category || "Case Study"}
                            </span>
                            <h3 className="text-xl sm:text-2xl font-black text-zinc-50 mt-1.5 leading-tight">
                              {selectedProject.title}
                            </h3>
                          </div>

                          {/* Modal Tab Switchers */}
                          {selectedProject.liveUrl && (
                            <div className="flex gap-1 bg-zinc-900/80 p-0.5 border border-zinc-800 rounded-lg shrink-0 select-none">
                              <button
                                onMouseEnter={() => audioSynth.playHover()}
                                onClick={() => {
                                  setModalTab("info");
                                  audioSynth.playClick();
                                }}
                                className={`px-4 py-1.5 text-xs rounded-md font-extrabold transition-all duration-200 ${
                                  modalTab === "info"
                                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/20"
                                    : "text-zinc-500 hover:text-zinc-300"
                                }`}
                              >
                                Detail Info
                              </button>
                              <button
                                onMouseEnter={() => audioSynth.playHover()}
                                onClick={() => {
                                  setModalTab("live");
                                  audioSynth.playClick();
                                }}
                                className={`px-4 py-1.5 text-xs rounded-md font-extrabold transition-all duration-200 ${
                                  modalTab === "live"
                                    ? "bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-600/20"
                                    : "text-zinc-500 hover:text-zinc-300"
                                }`}
                              >
                                Live Demo 🎮
                              </button>
                            </div>
                          )}
                        </div>

                        {/* Modal Body Content */}
                        {modalTab === "info" ? (
                          <div className="flex flex-col md:flex-row gap-6">
                            {/* Left Column: Image mockup */}
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

                            {/* Right Column: Case study content */}
                            <div className="flex-1 flex flex-col justify-between">
                              <div>
                                <p className="text-zinc-300 text-sm leading-relaxed font-light">
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
                                  onMouseEnter={() => audioSynth.playHover()}
                                  onClick={() => audioSynth.playClick()}
                                  href={selectedProject.github}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-200 font-semibold rounded-xl text-sm transition-all"
                                >
                                  <FaGithub /> Github Repository
                                </a>
                                
                                {selectedProject.liveUrl && (
                                  <button
                                    onMouseEnter={() => audioSynth.playHover()}
                                    onClick={() => {
                                      setModalTab("live");
                                      audioSynth.playClick();
                                    }}
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold rounded-xl text-sm shadow-[0_4px_15px_rgba(139,92,246,0.2)] hover:shadow-[0_4px_20px_rgba(6,182,212,0.35)] transition-all"
                                  >
                                    <FaExternalLinkAlt size={12} /> Launch Live Demo
                                  </button>
                                )}
                              </div>
                            </div>
                          </div>
                        ) : (
                          /* macOS Browser Mockup Demo Playground */
                          <div className="w-full flex flex-col">
                            <div className="w-full bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden shadow-2xl flex flex-col">
                              {/* macOS Window Header Bar */}
                              <div className="flex items-center justify-between px-4 py-3 bg-zinc-900/80 border-b border-zinc-950 select-none shrink-0">
                                {/* Window Control Buttons */}
                                <div className="flex items-center gap-2">
                                  <button 
                                    onMouseEnter={() => audioSynth.playHover()}
                                    onClick={() => {
                                      setModalTab("info");
                                      audioSynth.playClick();
                                    }}
                                    className="w-3 h-3 rounded-full bg-rose-500 hover:bg-rose-600 transition flex items-center justify-center text-[7px] text-rose-950 font-bold"
                                    title="Back to Case Study"
                                  >
                                    ✕
                                  </button>
                                  <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                                  <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                                </div>

                                {/* Address Bar */}
                                <div className="flex-1 max-w-lg mx-4 bg-zinc-950 border border-zinc-800/60 rounded-xl px-4 py-1.5 flex items-center gap-2 text-zinc-500 text-[10px] sm:text-xs">
                                  <span className="text-emerald-500">🔒</span>
                                  <span className="text-zinc-300 font-mono truncate select-all">{selectedProject.liveUrl}</span>
                                </div>

                                {/* Reload/Tab buttons */}
                                <div className="flex items-center gap-3 text-zinc-400 text-xs">
                                  <button 
                                    onMouseEnter={() => audioSynth.playHover()}
                                    onClick={() => {
                                      setIframeLoading(true);
                                      const iframe = document.getElementById("demo-iframe") as HTMLIFrameElement;
                                      if (iframe) iframe.src = iframe.src;
                                      audioSynth.playClick();
                                    }}
                                    className="hover:text-zinc-200 active:scale-90 transition font-extrabold"
                                    title="Reload Demo"
                                  >
                                    ⟳
                                  </button>
                                  <span className="text-zinc-700">|</span>
                                  <a
                                    onMouseEnter={() => audioSynth.playHover()}
                                    onClick={() => audioSynth.playClick()}
                                    href={selectedProject.liveUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="hover:text-cyan-400 font-extrabold flex items-center gap-1.5 normal-case tracking-normal"
                                    title="Open in new browser tab"
                                  >
                                    <FaExternalLinkAlt size={10} />
                                  </a>
                                </div>
                              </div>

                              {/* Iframe Viewport Container */}
                              <div className="relative w-full h-[460px] bg-zinc-950">
                                {iframeLoading && (
                                  <div className="absolute inset-0 bg-zinc-950 flex flex-col items-center justify-center space-y-3.5 z-10 select-none">
                                    <div className="w-9 h-9 rounded-full border-2 border-violet-500/20 border-t-violet-500 animate-spin" />
                                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">CONNECTING TO HOST SERVER...</span>
                                  </div>
                                )}
                                <iframe
                                  id="demo-iframe"
                                  src={selectedProject.liveUrl}
                                  className="w-full h-full border-none"
                                  onLoad={() => setIframeLoading(false)}
                                  sandbox="allow-scripts allow-same-origin allow-forms"
                                />
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
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
