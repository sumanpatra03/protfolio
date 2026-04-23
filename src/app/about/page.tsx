import Head from "next/head";
import React from "react";

const AboutMe = () => {
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: "About Suman Patra",
    description:
      "Learn more about Suman Patra, a Frontend Developer specializing in Next.js, React, and modern web technologies.",
  };
  return (
    <>
      <Head>
        <title>About Me | Suman&apos;s Portfolio</title>
        <meta
          name="description"
          content="Discover Suman Patra's journey as a Frontend Developer and his technical expertise in modern web technologies."
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }}
        />
      </Head>

      <section className="bg-black text-white py-10 sm:py-16 px-4 sm:px-8 md:px-20" id="about">
        <div className="max-w-6xl mx-auto">
          {/* Title */}
          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">About Me.</h2>
          <hr className="border-white mb-6 sm:mb-10 border-b-[3px] w-24" />

          {/* Description */}
          <p className="text-sm sm:text-base text-gray-300 leading-relaxed max-w-3xl">
            Hi, my name is{" "}
            <span className="font-bold text-white">Suman Patra.</span> I am a
            passionate <span className="text-white">Frontend Developer</span>{" "}
            specializing in modern web technologies, including{" "}
            <span className="text-white">React.js, Next.js, TypeScript, Tailwind CSS</span>,
            and UI/UX design. With expertise in building dynamic and responsive web
            applications, I focus on creating high-performance and user-friendly
            experiences. I have worked on various projects, including e-commerce
            platforms, portfolio websites, and interactive dashboards. I strive to
            bring innovative solutions and pixel-perfect designs to every project.
          </p>

          {/* Information Grid */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-sm sm:text-base">
            {[
              { label: "Name", value: "Suman Patra" },
              { label: "Location", value: "India" },
              { label: "Experience", value: "6 Months" },
              { label: "Full-time", value: "Available" },
              { label: "Language", value: "English, Hindi" },
            ].map(({ label, value }) => (
              <div key={label} className="flex items-center gap-2">
                <span className="text-gray-400 shrink-0">{label}</span>
                <span className="text-white">: {value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutMe;
