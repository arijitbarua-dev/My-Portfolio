import React from "react";
import { Project } from "@/types";
import { ProjectCard } from "@/components/projects/ProjectCard";

interface RelatedProjectsProps {
  projects: Project[];
}

export function RelatedProjects({ projects }: RelatedProjectsProps) {
  if (!projects || projects.length === 0) return null;

  return (
    <div className="mt-16 sm:mt-24 pt-12 border-t-3 border-[#111111] space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <div className="font-mono text-xs uppercase text-[#FF5722] font-bold">
            MORE FROM THE ARCHIVE
          </div>
          <h3 className="font-heading text-2xl sm:text-3xl uppercase font-black text-[#111111]">
            Related Case Studies
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {projects.map((proj, idx) => (
          <ProjectCard key={proj.slug} project={proj} index={idx} />
        ))}
      </div>
    </div>
  );
}

