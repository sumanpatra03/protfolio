"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Dialog } from "@headlessui/react";

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

const projects: Project[] = [
  {
    id: 1,
    title: "NatureScape",
    description: "Explore The Nature",
    image: "/Untitled design.png",
    // dialogImage: "/dialog-image.png",
    details:
      " This project is a web application built using React and MUI. It provides a platform for users to explore various nature spots, including forests, lakes, and hiking trails.",
    // liveSite: "https://oneutil.onrender.com",
    features: [
      "Interactive Map: Users can browse and discover nature spots with detailed information.",
      "Photo Gallery: Stunning images showcase each location's beauty.",
      "User Reviews: Visitors can leave reviews and share experiences.",
      "Filtering: Filter locations based on type, difficulty, and distance.",
      "Bookmarking: Users can save their favorite spots for later.",
    ],
    github: "https://github.com/username/oneutil",
    technologies: ["React.js, ", "MUI "],
  },
  {
    id: 2,
    title: "BookCenter",
    description: "Book Review Platform",
    image: "/bookcenter.png",
    // dialogImage: "/bookcenter-dialog-image.png",
    details:
      "BookCenter is a web application designed for book enthusiasts. It offers a platform for users to browse, review, and manage their favorite books with ease.",
    // liveSite: "https://bookcenter.onrender.com",
    features: [
      "Book Reviews: Users can write, edit, and share reviews on their favorite books.",
      "Rating System: Allows users to rate books and view average ratings.",
      "Search and Filter: Easily find books by title, author, or genre.",
      "User Profiles: Personalized profiles displaying user reviews and ratings.",
      "Wishlist: Users can create a wishlist of books they want to read.",
    ],
    github: "https://github.com/username/bookcenter",
    technologies: ["React.js, ", "MUI, ", "JSON Server, ", "react-bootstrap "],
  },
  {
    id: 3,
    title: "MunchBox",
    description: "E-commerce Snack Store",
    image: "/MunchBox.png",
    // dialogImage: "/munchbox-dialog-image.png",
    details:
      "MunchBox is a web application built using React, MUI, and Redux. It offers a seamless shopping experience for users looking to explore and purchase snacks.",
    // liveSite: "https://munchbox.onrender.com",
    features: [
      "Product Catalog: Users can browse a wide variety of snacks with detailed descriptions and images.",
      "Cart Management: Users can add, update, and remove items from their cart.",
      "Order Summary: Displays item details, quantities, and total cost.",
      "User Reviews: Allows customers to share their feedback on products.",
      "Contact Form: Provides an easy way for users to get in touch with the team.",
    ],
    github: "https://github.com/username/munchbox",
    technologies: ["React.js, ", "MUI, ", "Redux, ", "JSON Server, "],
  },
];

const Portfolio = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setIsOpen(true);
  };

  return (
    <section className="bg-black text-white py-16 px-6 md:px-20" id="portfolio">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl md:text-3xl font-extrabold mb-4">Portfolio.</h2>
        <hr className="border-b-[3px] text-white mb-8" />
        <div className="grid md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.id}
              className="bg-[#1e1e1e] p-4 rounded-xl cursor-pointer hover:scale-105 transition relative"
              onClick={() => openModal(project)}
            >
              <div className="relative">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={700}
                  height={700}
                  className="rounded-lg"
                />
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
          className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/30"
        >
          <div className="bg-[#1e1e1e] p-6 rounded-lg max-w-4xl w-full flex">
            {selectedProject && (
              <>
                <Image
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  width={400}
                  height={400}
                  objectFit="content"
                  className="rounded-lg mb-4 mr-4"
                />

                <div>
                  <h3 className="text-3xl font-bold mb-2">
                    {selectedProject.title}
                  </h3>

                  <p className="text-gray-400 mb-4">
                    {selectedProject.details}
                  </p>

                  <a
                    // href={selectedProject.liveSite}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 underline block mb-4"
                  >
                    {/* {selectedProject.liveSite} */}
                  </a>
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
  );
};

export default Portfolio;
