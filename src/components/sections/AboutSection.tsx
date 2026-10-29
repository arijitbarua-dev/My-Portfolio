import React from "react";
import { Profile } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { EditorialCard } from "@/components/ui/EditorialCard";
import { DecorativeStar } from "@/components/ui/DecorativeStar";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  return (
    <section id="about" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Divider with Numbered Badge */}
        <SectionDivider number="01" label="THE PERSON" variant="orange" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Heading and Narrative Bio (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatedReveal>
              <SectionHeading
                title="More Than Just"
                italicWord="Code."
                subtitle="The philosophies, problem-solving methods, and creative drives behind the screen."
                className="mt-3"
              />
            </AnimatedReveal>

            <AnimatedReveal delay={0.1}>
              <div className="prose prose-neutral max-w-none space-y-4 font-sans text-base sm:text-lg text-[#333333] leading-relaxed">
                <p>
                  {profile.about.split("\n\n")[0] ||
                    "My programming journey began with a curiosity for how complex systems translate into intuitive interfaces. Over the years, I've developed deep proficiency across both frontend and backend technologies—specializing in JavaScript, TypeScript, React, Next.js, Node.js, Express.js, MongoDB, and Python."}
                </p>
                <p>
                  {profile.about.split("\n\n")[1] ||
                    "I believe in clean architecture, strong typing, deliberate design systems, and building digital products that balance technical rigor with bold visual personality. When I'm not writing code, I explore typography, system architecture, open-source tooling, and algorithmic design."}
                </p>
              </div>
            </AnimatedReveal>

            {/* Creative Philosophy Checklist (inspired by Screenshot 2 "OUR MENU") */}
            <AnimatedReveal delay={0.15}>
              <div className="mt-8 border-2 border-[#111111] bg-[#F5F3E9] p-6 shadow-brutal-sm">
                <div className="flex items-center gap-2 border-b-2 border-[#111111] pb-3 mb-4">
                  <span className="font-heading uppercase text-sm tracking-wide text-[#111111]">
                    Core Engineering Tenets
                  </span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm font-sans font-medium">
                  <div className="flex items-center gap-2">
                    <DecorativeStar color="lime" size="sm" />
                    <span>Clean & Maintainable Code</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DecorativeStar color="orange" size="sm" />
                    <span>AI-Driven Development</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DecorativeStar color="orange" size="sm" />
                    <span>Security by Design</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DecorativeStar color="lime" size="sm" />
                    <span>Performance & Scalability</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DecorativeStar color="lime" size="sm" />
                    <span>Continuous Learning</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <DecorativeStar color="lime" size="sm" />
                    <span>User-Centered Design</span>
                  </div>
                </div>
              </div>
            </AnimatedReveal>
          </div>

          {/* Right Column: Editorial Fact Panel (5 cols) (Inspired by Screenshot 2 Client/Role Box) */}
          <div className="lg:col-span-5">
            <AnimatedReveal delay={0.2}>
              <EditorialCard
                headerTag="PROFILE MATRIX"
                headerNumber="01"
                variant="white"
                shadow="lg"
                innerClassName="p-6 sm:p-8"
              >
                {/* 2x2 Editorial Fact Matrix with Dotted Separators */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative">
                  
                  {/* Location */}
                  <div className="space-y-1">
                    <span
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-base italic text-[#555555]"
                    >
                      Location
                    </span>
                    <div className="font-heading text-lg font-black uppercase text-[#111111]">
                      {profile.location.split("(")[0].trim() || "Remote"}
                    </div>
                    <div className="font-mono text-xs text-[#555555]">
                      Worldwide Available
                    </div>
                  </div>

                  {/* Primary Focus */}
                  <div className="space-y-1">
                    <span
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-base italic text-[#555555]"
                    >
                      Primary Role
                    </span>
                    <div className="font-heading text-lg font-black uppercase text-[#111111]">
                      Full Stack
                    </div>
                    <div className="font-mono text-xs text-[#555555]">
                      Next.js & Cloud DBs
                    </div>
                  </div>

                  {/* Availability */}
                  <div className="space-y-1 pt-4 border-t-2 border-dashed border-[#111111]/30">
                    <span
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-base italic text-[#555555]"
                    >
                      Status
                    </span>
                    <div className="font-heading text-base font-black uppercase text-[#FF5722]">
                      Open for Work
                    </div>
                    <div className="font-mono text-xs text-[#555555]">
                      Direct & Contracts
                    </div>
                  </div>

                  {/* Key Stacks */}
                  <div className="space-y-1 pt-4 border-t-2 border-dashed border-[#111111]/30">
                    <span
                      style={{ fontFamily: "var(--font-serif)" }}
                      className="text-base italic text-[#555555]"
                    >
                      Specialties
                    </span>
                    <div className="font-heading text-base font-black uppercase text-[#111111]">
                      React / Node
                    </div>
                    <div className="font-mono text-xs text-[#555555]">
                      TypeScript, MongoDB
                    </div>
                  </div>

                </div>

                {/* Bottom Highlight Notice */}
                <div className="mt-6 pt-4 border-t-2 border-[#111111] bg-[#FFFBEA] -mx-6 -mb-6 sm:-mx-8 sm:-mb-8 p-4 flex items-center justify-between font-mono text-xs">
                  <span className="font-bold text-[#111111]">COLLABORATION:</span>
                  <span className="bg-[#83E52B] px-2 py-0.5 border border-black font-bold uppercase text-[10px]">
                    READY TO SHIP
                  </span>
                </div>
              </EditorialCard>
            </AnimatedReveal>
          </div>

        </div>

      </div>
    </section>
  );
}

