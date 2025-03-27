"use client";

import React from "react";
import {
  VerticalTimeline,
  VerticalTimelineElement,
} from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import { FaGraduationCap, FaBriefcase } from "react-icons/fa";

interface EducationItem {
  title: string;
  institute: string;
  duration: string;
  details?: string;
}

interface ExperienceItem {
  title: string;
  company: string;
  duration: string;
  details: string;
}

const education: EducationItem[] = [
  {
    title: "Frontend Developer",
    institute: "Webskitters Academy",
    duration: "2024 Nov - Present ",
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
    duration: "2024 Feb - Present",
    details:
      "React, Next.js, TypeScript. Developed scalable e-commerce web applications with modern UI.",
  },
];

const TimelineElement = ({
  item,
  isEducation,
}: {
  item: EducationItem | ExperienceItem;
  isEducation: boolean;
}) => (
  <VerticalTimelineElement
    className="vertical-timeline-element--work"
    contentStyle={{ background: "#1A1A1A", color: "#fff", borderRadius: "8px" }}
    contentArrowStyle={{ borderRight: "7px solid #FF3D00" }}
    date={item.duration}
    iconStyle={{ background: "#FF3D00", color: "#fff" }}
    icon={isEducation ? <FaGraduationCap /> : <FaBriefcase />}
  >
    <h3 className="text-lg font-bold">{item.title}</h3>
    <h4 className="text-sm text-gray-400">
      {(item as EducationItem).institute || (item as ExperienceItem).company}
    </h4>
    {item.details && (
      <p className="text-sm text-gray-300 mt-1">{item.details}</p>
    )}
  </VerticalTimelineElement>
);

const EducationExperience = () => {
  return (
    <section className="bg-black text-white py-10 px-4 md:px-20 lg:px-40">
      <h2 className="text-3xl font-bold  mb-8">Education & Experience</h2>
      <hr className="border-white border-b-[3px] mb-6" />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <div>
          <h3 className="text-2xl font-semibold mb-4">Education</h3>
          <VerticalTimeline layout="1-column-left">
            {education.map((item, index) => (
              <TimelineElement key={index} item={item} isEducation={true} />
            ))}
          </VerticalTimeline>
        </div>

        <hr className="border-gray-600 md:hidden my-8" />

        <div>
          <h3 className="text-2xl font-semibold mb-4">Experience</h3>
          <VerticalTimeline layout="1-column-right">
            {experience.map((item, index) => (
              <TimelineElement key={index} item={item} isEducation={false} />
            ))}
          </VerticalTimeline>
        </div>
      </div>
    </section>
  );
};

export default EducationExperience;
