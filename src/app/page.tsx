import React from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";
import {
  getProfile,
  getSkills,
  getEducation,
  getExperience,
  getPublishedProjects,
} from "@/lib/data";

export default async function HomePage() {
  const [profile, skills, education, experience, projects] = await Promise.all([
    getProfile(),
    getSkills(),
    getEducation(),
    getExperience(),
    getPublishedProjects(),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-[#FFFBEA]">
      <Navbar resumeUrl={profile.resumeUrl} />

      <main className="flex-1">
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection skills={skills} />
        <ExperienceSection experience={experience} />
        <EducationSection education={education} />
        <ProjectsSection projects={projects} />
        <ContactSection profile={profile} />
      </main>

      <Footer profile={profile} />
    </div>
  );
}
