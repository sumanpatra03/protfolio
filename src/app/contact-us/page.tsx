"use client";

import React from "react";
import { motion } from "framer-motion";
import { FiMail, FiPhone, FiSend } from "react-icons/fi";

const ContactForm = () => {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Suman Patra",
    description:
      "Get in touch with Suman Patra for collaboration, project inquiries, or front-end development services.",
  };

  const currentYear = new Date().getFullYear();

  return (
    <>
      {/* Structured Schema Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      
      <section 
        className="bg-[#030303] text-white py-20 px-6 md:px-20 relative overflow-hidden" 
        id="contact"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute left-1/2 bottom-0 -translate-x-1/2 w-96 h-96 rounded-full bg-violet-600/5 filter blur-3xl pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Header */}
          <div className="mb-12">
            <motion.h2 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="text-3xl md:text-4xl font-extrabold tracking-tight"
            >
              Get In Touch<span className="text-cyan-500">.</span>
            </motion.h2>
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: 96 }}
              viewport={{ once: true }}
              className="h-[3px] bg-gradient-to-r from-cyan-500 to-violet-500 mt-3"
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Column 1: Contact details */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-5 space-y-6"
            >
              <h3 className="text-xl font-bold text-zinc-100 tracking-tight">
                Let's collaborate on something great!
              </h3>
              <p className="text-zinc-400 text-sm font-light leading-relaxed">
                Whether you have an internship opening, a freelance project, or just want to say hi, feel free to drop a message. I'll get back to you as soon as possible.
              </p>

              <div className="space-y-4 pt-4">
                {/* Email details card */}
                <a
                  href="mailto:patrasuman042@gmail.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-violet-500/30 hover:bg-zinc-900/70 transition-all duration-300 group shadow-md"
                >
                  <div className="w-11 h-11 rounded-xl bg-violet-950/20 text-violet-400 flex items-center justify-center text-lg border border-violet-500/10">
                    <FiMail />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                      Email Me
                    </span>
                    <p className="text-sm font-semibold text-zinc-200 mt-0.5 group-hover:text-violet-400 transition-colors">
                      patrasuman042@gmail.com
                    </p>
                  </div>
                </a>

                {/* Phone details card */}
                <a
                  href="tel:+919734127642"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-cyan-500/30 hover:bg-zinc-900/70 transition-all duration-300 group shadow-md"
                >
                  <div className="w-11 h-11 rounded-xl bg-cyan-950/20 text-cyan-400 flex items-center justify-center text-lg border border-cyan-500/10">
                    <FiPhone />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-zinc-500">
                      Call Me
                    </span>
                    <p className="text-sm font-semibold text-zinc-200 mt-0.5 group-hover:text-cyan-400 transition-colors">
                      +91 9734127642
                    </p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Column 2: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-7 bg-zinc-900/30 border border-zinc-800/80 p-6 sm:p-8 rounded-3xl shadow-xl hover:border-zinc-800 transition-all duration-300"
            >
              <form onSubmit={(e) => e.preventDefault()} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm placeholder-zinc-600 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Your Email Address"
                    className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm placeholder-zinc-600 outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all duration-300"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    required
                    placeholder="Type your message here..."
                    className="w-full bg-zinc-950 text-zinc-100 border border-zinc-800/80 rounded-xl px-4 py-3 text-sm placeholder-zinc-600 outline-none h-32 focus:border-violet-500 focus:ring-1 focus:ring-violet-500/30 transition-all duration-300 resize-none animate-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-violet-600 to-cyan-600 hover:from-violet-500 hover:to-cyan-500 text-white font-semibold py-3.5 rounded-xl shadow-[0_4px_20px_rgba(139,92,246,0.2)] flex items-center justify-center gap-2 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer transition-all duration-300"
                >
                  Send Message <FiSend className="text-xs" />
                </button>
              </form>
            </motion.div>

          </div>

          {/* Footer details */}
          <footer className="mt-20 pt-8 border-t border-zinc-900/80 text-center">
            <p className="text-zinc-500 text-xs sm:text-sm font-light">
              © {currentYear} | All rights reserved by{" "}
              <span className="text-zinc-300 font-semibold hover:text-white transition-colors">Suman Patra</span>
            </p>
          </footer>

        </div>
      </section>
    </>
  );
};

export default ContactForm;
