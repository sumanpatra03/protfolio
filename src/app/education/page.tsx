"use client";

import { FaGraduationCap, FaBriefcase } from "react-icons/fa";
import { IconType } from "react-icons";

interface EducationItem {
  title: string;
  institute: string;
  duration: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  details?: string;
}

const education: EducationItem[] = [
  {
    title: "Frontend Developer",
    institute: "Webskitters Academy",
    duration: "2024 - 2025",
  },
  {
    title: "B.A",
    institute: "Tarakeswar Degree College",
    duration: "2020 - 2023",
  },
  {
    title: "Higher Secondary (12th)",
    institute: "Marokhana High School",
    duration: "2018 - 2020",
  },
];

const experience: ExperienceItem[] = [
  {
    title: "Frontend Developer (Trainee)",
    company: "Webskitters Technology Solutions Pvt. Ltd",
    duration: "2024 Nov - 2025 Apr",
    details:
      "React, Next.js, TypeScript. Developed scalable e-commerce web applications with modern UI.",
  },
  {
    title: "Frontend Developer (Intern)",
    company: "Wizard Communications Pvt Ltd",
    duration: "2025 July - Present",
    details:
      "React, Next.js, TypeScript. Developed scalable e-commerce web applications with modern UI.",
  },
];

const TimelineCard = ({
  icon: Icon,
  title,
  subtitle,
  duration,
  details,
}: {
  icon: IconType;
  title: string;
  subtitle: string;
  duration: string;
  details?: string;
}) => (
  <div className="flex gap-3 sm:gap-4 mb-5 sm:mb-6">
    <div className="flex flex-col items-center">
      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#FF3D00] flex items-center justify-center shrink-0">
        <Icon className="text-white text-sm sm:text-lg" />
      </div>
      <div className="w-[2px] bg-[#FF3D00] flex-1 mt-2" />
    </div>
    <div className="bg-[#111] border border-[#333] rounded-2xl p-3 sm:p-4 mb-2 flex-1 shadow-[0_4px_12px_rgba(255,61,0,0.25)] min-w-0">
      <p className="text-xs text-[#FF3D00] mb-1">{duration}</p>
      <h4 className="text-sm sm:text-base font-semibold leading-snug">{title}</h4>
      <p className="text-xs sm:text-sm text-gray-400 break-words">{subtitle}</p>
      {details && (
        <p className="text-xs sm:text-sm text-gray-300 mt-1 leading-relaxed">{details}</p>
      )}
    </div>
  </div>
);

const EducationExperience = () => {
  return (
    <section
      id="education"
      className="bg-black text-white py-10 sm:py-16 px-4 sm:px-8 md:px-20 overflow-x-hidden"
    >
      <div className="max-w-6xl mx-auto">
        <h2 className="text-2xl sm:text-3xl font-extrabold mb-4 sm:mb-6 text-center">
          Education & Experience
        </h2>
        <hr className="border-b-[3px] text-white mb-8 sm:mb-10 w-24 mx-auto" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-10">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-[#FF3D00]">
              Education
            </h3>
            {education.map((item, index) => (
              <TimelineCard
                key={index}
                icon={FaGraduationCap}
                title={item.title}
                subtitle={item.institute}
                duration={item.duration}
              />
            ))}
          </div>

          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8 text-center text-[#FF3D00]">
              Experience
            </h3>
            {experience.map((item, index) => (
              <TimelineCard
                key={index}
                icon={FaBriefcase}
                title={item.title}
                subtitle={item.company}
                duration={item.duration}
                details={item.details}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default EducationExperience;
