
import Sidebar from "./sidebar/page";
import HeroSection from "./hero/page";
import AboutMe from "./about/page";
import EducationExperience from "./education/page";
import SkillsSection from "./skillsection/page";
import Services from "./service/page";
import ContactForm from "./contact-us/page";
import Portfolio from "./portfolio/page";

export default function Home() {
  return (
    <div className="flex bg-black">
      
      <  Sidebar />
      <div className="flex-1  h-screen lg:pl-52" >
        <HeroSection />
        <AboutMe />
        <EducationExperience/>
        <SkillsSection/>
        <Portfolio/>
        <Services/>
        <ContactForm/>
      </div>
    </div>
  );
}
