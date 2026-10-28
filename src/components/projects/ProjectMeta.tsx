import React from "react";
import { Project } from "@/types";
import { ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Button } from "@/components/ui/Button";

interface ProjectMetaProps {
  project: Project;
}

export function ProjectMeta({ project }: ProjectMetaProps) {
  return (
    <div className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal-md p-6 sm:p-8 relative">
      {/* Top accent badge */}
      <div className="absolute -top-4 left-6 bg-[#FF5722] text-[#111111] border-2 border-[#111111] px-4 py-0.5 font-mono text-xs uppercase font-bold shadow-brutal-sm">
        PROJECT MATRIX & SPEC
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative pt-2">
        {/* Left Quadrant */}
        <div className="space-y-6">
          <div className="space-y-1">
            <span
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-lg italic text-[#555555] block"
            >
              Category & Focus
            </span>
            <div className="font-heading text-xl uppercase font-black text-[#111111]">
              {project.category}
            </div>
            <div className="font-mono text-xs text-[#555555]">
              Full Stack Production Implementation
            </div>
          </div>

          <div className="space-y-1 pt-4 border-t-2 border-dashed border-[#111111]/20">
            <span
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-lg italic text-[#555555] block"
            >
              Role & Responsibility
            </span>
            <div className="font-heading text-xl uppercase font-black text-[#111111]">
              {project.role}
            </div>
            <div className="font-mono text-xs text-[#555555]">
              Architecture, Design & Implementation
            </div>
          </div>
        </div>

        {/* Right Quadrant */}
        <div className="space-y-6 md:border-l-2 md:border-dashed md:border-[#111111]/25 md:pl-10">
          <div className="space-y-2">
            <span
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-lg italic text-[#555555] block"
            >
              Core Technologies
            </span>
            <div className="flex flex-wrap gap-1.5 pt-1">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-0.5 bg-[#F5F3E9] border border-[#111111] font-mono text-xs font-bold text-[#111111]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="space-y-2 pt-4 border-t-2 border-dashed border-[#111111]/20">
            <span
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-lg italic text-[#555555] block"
            >
              Deliverables & Links
            </span>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              {project.liveUrl && (
                <Button
                  variant="lime"
                  size="sm"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<ExternalLink className="w-3.5 h-3.5" />}
                >
                  Live Preview
                </Button>
              )}
              {project.githubUrl && (
                <Button
                  variant="secondary"
                  size="sm"
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  icon={<GithubIcon className="w-3.5 h-3.5" />}
                >
                  Source Code
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
