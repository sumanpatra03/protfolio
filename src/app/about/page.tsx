import React from "react";

const AboutMe = () => {
  return (
    <section className="  bg-black text-white py-10 px-4 md:px-16" id="about" >
      <div className="max-w-3xl ml-25  mt-5">
        {/* Title */}
        <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me.</h2>
        <hr className="border-white mb-6 border-b-[3px]" />

        {/* Description */}
        <p className="text-gray-300 text-lg leading-relaxed">
          Hi, my name is <span className="font-bold text-white">Suman Patra.</span>  
          I am a passionate <span className="text-white">Frontend Developer</span> specializing in modern web technologies, including  
          <span className="text-white"> React.js, Next.js, TypeScript, Tailwind CSS</span>, and UI/UX design.  
          With expertise in building dynamic and responsive web applications, I focus on creating  
          high-performance and user-friendly experiences.  
          I have worked on various projects, including **e-commerce platforms**, **portfolio websites**,  
          and **interactive dashboards**. I strive to bring innovative solutions and  
          pixel-perfect designs to every project.
        </p>

        {/* Information Grid */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4 text-lg">
          <div className="flex">
            <span className="text-gray-400 w-32">Name</span>
            <span className="text-white">: Suman Patra</span>
          </div>
          <div className="flex">
            <span className="text-gray-400 w-32">Location</span>
            <span className="text-white">: India</span>
          </div>
          <div className="flex">
            <span className="text-gray-400 w-32">Experience</span>
            <span className="text-white">: 6 Months</span>
          </div>
          <div className="flex">
            <span className="text-gray-400 w-32">Full-time</span>
            <span className="text-white">: Available</span>
          </div>
          <div className="flex">
            <span className="text-gray-400 w-32">Language</span>
            <span className="text-white">: English, Hindi</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutMe;
