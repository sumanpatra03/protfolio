"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";
;
import { client } from "@/sanity/lib/client";

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  //   dialogImage: string;
  details: string;
  //   liveSite: string;
  features: string[];
  technologies: string[];
  github: string;
}


const Portfolio = () => {
  const [myPortfolio, setPofolio] = useState<Project[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  async function fetchPortfolio() {
    try {
      const query = `*[_type=="portfolio"]{title,description,'image':image.asset->url
      ,details,features,technologies,github}`;
      const data = await client.fetch(query);
      setPofolio(data);
      console.log(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }

  useEffect(() => {
    fetchPortfolio();
  }, []);

  return (
    <>
      <section
        className="bg-black text-white py-16 px-6 md:px-20"
        id="portfolio"
      >
        <div className="max-w-5xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-extrabold mb-4">
            Portfolio.
          </h2>
          <hr className="border-b-[3px] text-white mb-8" />
          <div className="grid md:grid-cols-3 gap-8">
            {myPortfolio.map((project) => (
              <div
                key={project.title}
                className="bg-[#1e1e1e] p-4 rounded-xl cursor-pointer hover:scale-105 transition relative"
                onClick={() => openModal(project)}
              >
                <div className="relative">
                  {project.image ? (
                    <Image
                      src={project.image}
                      alt={project.title}
                      width={700}
                      height={700}
                      className="rounded-lg"
                    />
                  ) : (
                    <div className="w-full h-[200px] bg-gray-800 rounded-lg flex items-center justify-center text-gray-400">
                      No Image Available
                    </div>
                  )}
                  <div className="absolute inset-0 bg-red-500 opacity-0 hover:opacity-50 transition-opacity rounded-lg flex items-center justify-center">
                    <h3 className="text-white text-2xl font-bold">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <h3 className="text-xl font-semibold mt-4">{project.title}</h3>
                <p className="text-gray-400">{project.description}</p>
                <p className="text-blue-400 mt-2 cursor-pointer">
                  👆 tap to know more
                </p>
              </div>
            ))}
          </div>

          {/* Modal */}
          <Dialog
            open={isOpen}
            onClose={() => setIsOpen(false)}
            className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30 p-4"
          >
            <div className="bg-[#1e1e1e] p-6 rounded-lg w-full max-w-4xl flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-y-auto">
              {selectedProject && (
                <>
                  {selectedProject.image ? (
                    <Image
                      src={selectedProject.image}
                      alt={selectedProject.title}
                      width={350}
                      height={350}
                      className="rounded-lg w-full max-w-[350px] object-cover mx-auto"
                    />
                  ) : null}

                  <div className="flex-1">
                    <h3 className="text-2xl sm:text-3xl font-bold mb-2">
                      {selectedProject.title}
                    </h3>

                    <p className="text-gray-400 mb-4">
                      {selectedProject.details}
                    </p>

                    <div className="mb-4">
                      <h4 className="text-xl font-bold">Key Features:</h4>
                      <ul className="list-disc pl-5 text-gray-400">
                        {selectedProject.features.map((feature, index) => (
                          <li key={index}>{feature}</li>
                        ))}
                      </ul>
                    </div>

                    <p className="text-gray-400 mb-4">
                      Technologies: {selectedProject.technologies}
                    </p>

                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline mb-4 block"
                    >
                      GitHub Repository
                    </a>

                    <button
                      onClick={() => setIsOpen(false)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 w-full"
                    >
                      Close
                    </button>
                  </div>
                </>
              )}
            </div>
          </Dialog>
        </div>
      </section>
    </>
  );
};

export default Portfolio;
