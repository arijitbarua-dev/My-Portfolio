import React from "react";
import { Project } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section id="projects" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Divider */}
        <SectionDivider number="05" label="SELECTED WORK" variant="orange" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <AnimatedReveal>
            <SectionHeading
              title="Ideas Made"
              italicWord="Real."
              subtitle="Full-stack digital products, bespoke web applications, and architectural case studies."
              className="mt-3"
            />
          </AnimatedReveal>

          <AnimatedReveal delay={0.1}>
            <div className="font-mono text-xs uppercase text-[#555555] border-2 border-[#111111] bg-[#F5F3E9] px-3 py-1.5 shadow-brutal-sm">
              COUNT: <span className="font-bold text-[#111111]">{projects.length} PROJECTS CATALOGED</span>
            </div>
          </AnimatedReveal>
        </div>

        {/* Responsive Editorial Gallery Grid */}
        <div
          className={
            projects.length === 2
              ? "grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto"
              : "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          }
        >
          {projects.map((project, index) => (
            <AnimatedReveal key={project.slug || project._id} delay={index * 0.1}>
              <ProjectCard project={project} index={index} />
            </AnimatedReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

