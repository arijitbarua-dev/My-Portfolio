import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ProjectCover } from "@/components/projects/ProjectCover";
import { ProjectMeta } from "@/components/projects/ProjectMeta";
import { ProjectGallery } from "@/components/projects/ProjectGallery";
import { ProjectNavigation } from "@/components/projects/ProjectNavigation";
import { RelatedProjects } from "@/components/projects/RelatedProjects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { DecorativeStar } from "@/components/ui/DecorativeStar";
import { getProjectBySlug, getRelatedProjects, getPublishedProjects, getProfile } from "@/lib/data";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const projects = await getPublishedProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    return {
      title: "Project Not Found // Portfolio",
    };
  }

  return {
    title: `${project.title} // Case Study & Engineering Spec`,
    description: project.description,
    openGraph: {
      title: `${project.title} // Case Study`,
      description: project.description,
      images: [project.coverImage || "/images/project-kronos.svg"],
    },
  };
}

export default async function ProjectDetailPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const [project, profile, allProjects] = await Promise.all([
    getProjectBySlug(slug),
    getProfile(),
    getPublishedProjects(),
  ]);

  if (!project) {
    notFound();
  }

  const related = await getRelatedProjects(slug, 3);

  // Compute prev/next projects
  const currentIndex = allProjects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? allProjects[currentIndex - 1] : undefined;
  const nextProject = currentIndex < allProjects.length - 1 ? allProjects[currentIndex + 1] : undefined;

  return (
    <>
      <Navbar resumeUrl={profile.resumeUrl} />

      <main className="min-h-screen py-10 sm:py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 sm:space-y-16">
          
          {/* Top Category and Title Banner */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <SectionLabel variant="orange">
                CASE STUDY // {project.category}
              </SectionLabel>
              <span className="font-mono text-xs text-[#555555]">
                SPECIFICATION SHEET
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl font-black uppercase tracking-tight text-[#111111] leading-[0.95]">
              {project.title}
            </h1>

            <p
              style={{ fontFamily: "var(--font-serif)" }}
              className="text-xl sm:text-2xl italic text-[#555555] max-w-3xl leading-relaxed"
            >
              {project.subtitle}
            </p>
          </div>

          {/* Hero Cover Frame */}
          <ProjectCover
            src={project.coverImage}
            alt={project.title}
            title={project.title}
            category={project.category}
          />

          {/* Metadata Matrix (Client/Role/Deliverables) */}
          <ProjectMeta project={project} />

          {/* Section 01: Overview & Problem */}
          <div className="space-y-8">
            <SectionDivider number="01" label="THE OVERVIEW" variant="orange" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="border-2 border-[#111111] bg-[#FFFFFF] p-6 shadow-brutal-sm space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#FF5722]">
                  <DecorativeStar color="orange" size="sm" />
                  <span>The Challenge & Problem</span>
                </div>
                <h2 className="font-heading text-lg uppercase text-[#111111]">
                  Problem Statement
                </h2>
                <p className="font-sans text-sm text-[#444444] leading-relaxed">
                  {project.problem}
                </p>
              </div>

              <div className="border-2 border-[#111111] bg-[#FFFFFF] p-6 shadow-brutal-sm space-y-3">
                <div className="flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#83E52B]">
                  <DecorativeStar color="lime" size="sm" />
                  <span>Strategic Objective</span>
                </div>
                <h2 className="font-heading text-lg uppercase text-[#111111]">
                  System Goals
                </h2>
                <p className="font-sans text-sm text-[#444444] leading-relaxed">
                  {project.goals}
                </p>
              </div>
            </div>

            <div className="p-6 bg-[#F5F3E9] border-2 border-[#111111]">
              <h3 className="font-mono text-xs font-bold uppercase text-[#555555] mb-2">
                EXECUTIVE OVERVIEW:
              </h3>
              <p className="font-sans text-base text-[#222222] leading-relaxed">
                {project.overview}
              </p>
            </div>
          </div>

          {/* Section 02: Key Features */}
          <div className="space-y-6">
            <SectionDivider number="02" label="KEY FEATURES" variant="lime" />

            <div className="border-3 border-[#111111] bg-[#FFFFFF] p-6 sm:p-8 shadow-brutal">
              <h2 className="font-heading text-2xl uppercase font-black text-[#111111] mb-6">
                Engineered Capabilities
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {project.features.map((feature, i) => (
                  <div
                    key={i}
                    className="p-4 border-2 border-[#111111] bg-[#FFFBEA] flex items-start gap-3 shadow-brutal-sm"
                  >
                    <span className="bg-[#111111] text-[#FFFBEA] px-2 py-0.5 font-mono text-xs font-bold">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="font-sans text-sm font-semibold text-[#111111]">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Section 03: Process & Architecture */}
          <div className="space-y-6">
            <SectionDivider number="03" label="PROCESS & PIPELINE" variant="orange" />

            <div className="border-2 border-[#111111] bg-[#FFFFFF] p-6 sm:p-8 shadow-brutal space-y-4">
              <h2 className="font-heading text-2xl uppercase font-black text-[#111111]">
                Development & Design Process
              </h2>
              <p className="font-sans text-base text-[#333333] leading-relaxed">
                {project.developmentProcess}
              </p>
            </div>
          </div>

          {/* Section 04: Visual Gallery */}
          <ProjectGallery images={project.gallery} projectTitle={project.title} />

          {/* Section 05: Challenges & Solutions */}
          <div className="space-y-6">
            <SectionDivider number="05" label="SOLUTIONS & LESSONS" variant="lime" />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Challenges & Solutions */}
              <div className="border-3 border-[#111111] bg-[#FFFFFF] p-6 shadow-brutal space-y-4">
                <div className="bg-[#FF5722] text-[#111111] px-3 py-1 font-mono text-xs uppercase font-bold border border-black inline-block">
                  TECHNICAL HURDLE
                </div>
                <h3 className="font-heading text-lg uppercase font-black text-[#111111]">
                  Challenges Faced
                </h3>
                <p className="font-sans text-sm text-[#444444] leading-relaxed">
                  {project.challenges}
                </p>

                <div className="pt-4 border-t-2 border-[#111111] space-y-2">
                  <div className="bg-[#83E52B] text-[#111111] px-3 py-1 font-mono text-xs uppercase font-bold border border-black inline-block">
                    SOLUTION DEPLOYED
                  </div>
                  <p className="font-sans text-sm text-[#444444] leading-relaxed">
                    {project.solutions}
                  </p>
                </div>
              </div>

              {/* Lessons & Future Plans */}
              <div className="border-3 border-[#111111] bg-[#FFFFFF] p-6 shadow-brutal space-y-4">
                <div className="bg-[#111111] text-[#FFFBEA] px-3 py-1 font-mono text-xs uppercase font-bold border border-black inline-block">
                  ENGINEERING RETROSPECTIVE
                </div>
                <h3 className="font-heading text-lg uppercase font-black text-[#111111]">
                  Lessons Learned
                </h3>
                <p className="font-sans text-sm text-[#444444] leading-relaxed">
                  {project.lessonsLearned}
                </p>

                <div className="pt-4 border-t-2 border-[#111111] space-y-2">
                  <div className="bg-[#F5F3E9] text-[#111111] px-3 py-1 font-mono text-xs uppercase font-bold border border-black inline-block">
                    FUTURE ROADMAP
                  </div>
                  <p className="font-sans text-sm text-[#444444] leading-relaxed">
                    {project.futurePlans}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation Controls */}
          <ProjectNavigation
            prevSlug={prevProject?.slug}
            prevTitle={prevProject?.title}
            nextSlug={nextProject?.slug}
            nextTitle={nextProject?.title}
          />

          {/* Related Projects */}
          <RelatedProjects projects={related} />

        </div>
      </main>

      <Footer profile={profile} />
    </>
  );
}

