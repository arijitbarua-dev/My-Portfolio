import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { GithubIcon } from "@/components/ui/Icons";
import { Project } from "@/types";
import { Badge } from "@/components/ui/Badge";

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const projectNumber = String(index + 1).padStart(2, "0");

  return (
    <article className="group relative border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal-md hover-lift flex flex-col justify-between overflow-hidden">
      
      {/* Editorial Top File Tab (Directly inspired by Reference Screenshot 3 "GALLERY 01") */}
      <div className="flex items-center justify-between border-b-2 border-[#111111] bg-[#F5F3E9] px-4 py-2 font-mono text-xs uppercase font-bold">
        <div className="flex items-center gap-2">
          <span className="bg-[#111111] text-[#FFFBEA] px-2 py-0.5 text-[10px]">
            PROJECT {projectNumber}
          </span>
          <span className="text-[#111111]">{project.category}</span>
        </div>

        {project.featured && (
          <span className="bg-[#83E52B] text-[#111111] px-2 py-0.5 border border-black text-[10px]">
            FEATURED
          </span>
        )}
      </div>

      {/* Large Framed Project Cover Image */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-[#EFECE0] border-b-2 border-[#111111]">
        <Image
          src={project.coverImage || "/images/project-kronos.svg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />

        {/* Corner Orange Tag inspired by reference offer stickers */}
        <div className="absolute bottom-3 right-3 bg-[#FF5722] text-[#111111] border-2 border-[#111111] px-3 py-1 font-mono text-xs font-black uppercase shadow-brutal-sm">
          PRODUCTION READY
        </div>
      </div>

      {/* Project Meta and Narrative Content */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          <h3 className="font-heading text-xl sm:text-2xl font-black uppercase tracking-tight text-[#111111] group-hover:text-[#FF5722] transition-colors">
            <Link href={`/projects/${project.slug}`}>
              {project.title}
            </Link>
          </h3>

          <p className="font-sans text-sm text-[#555555] line-clamp-2 mt-2 leading-relaxed">
            {project.description}
          </p>
        </div>

        {/* Tech Stack Chips */}
        <div className="pt-2 border-t border-[#111111]/15">
          <div className="flex flex-wrap gap-1.5">
            {project.technologies.slice(0, 4).map((tech) => (
              <Badge key={tech} variant="default">
                {tech}
              </Badge>
            ))}
            {project.technologies.length > 4 && (
              <span className="font-mono text-xs text-[#555555] self-center">
                +{project.technologies.length - 4}
              </span>
            )}
          </div>
        </div>

        {/* Action Link Footer */}
        <div className="pt-4 border-t-2 border-[#111111] flex items-center justify-between gap-3">
          <Link
            href={`/projects/${project.slug}`}
            className="inline-flex items-center gap-1.5 font-mono text-xs font-bold uppercase tracking-wider text-[#111111] hover:text-[#FF5722] transition-colors"
          >
            <span>View Case Study</span>
            <ArrowUpRight className="w-4 h-4" />
          </Link>

          <div className="flex items-center gap-2">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} source code`}
                className="p-1.5 border border-[#111111] hover:bg-[#83E52B] transition-colors"
              >
                <GithubIcon className="w-3.5 h-3.5 text-[#111111]" />
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${project.title} live preview`}
                className="p-1.5 border border-[#111111] hover:bg-[#FF5722] transition-colors"
              >
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

      </div>

    </article>
  );
}
