import React from "react";
import { Experience } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { EditorialCard } from "@/components/ui/EditorialCard";
import { Badge } from "@/components/ui/Badge";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";

interface ExperienceSectionProps {
  experience: Experience[];
}

export function ExperienceSection({ experience }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Divider */}
        <SectionDivider number="03" label="THE JOURNEY" variant="orange" />

        <div className="mb-12">
          <AnimatedReveal>
            <SectionLabel variant="orange">
              04. THE JOURNEY
            </SectionLabel>
            <SectionHeading
              title="Experience &"
              italicWord="Practice."
              subtitle="Production roles, engineering leadership, and high-impact digital implementations."
              className="mt-3"
            />
          </AnimatedReveal>
        </div>

        {/* Editorial Timeline Grid */}
        <div className="relative space-y-8">
          {experience.map((exp, index) => {
            const entryNumber = String(index + 1).padStart(2, "0");

            return (
              <AnimatedReveal key={exp._id || exp.title + exp.company} delay={index * 0.1}>
                <EditorialCard
                  headerTag={`ROLE TIMELINE // STAGE ${entryNumber}`}
                  headerNumber={entryNumber}
                  headerRight={
                    exp.current ? (
                      <span className="bg-[#83E52B] text-[#111111] px-2 py-0.5 border border-black font-mono text-[10px] font-bold">
                        ACTIVE ROLE
                      </span>
                    ) : (
                      <span className="font-mono text-xs text-[#555555]">
                        {exp.startDate} — {exp.endDate}
                      </span>
                    )
                  }
                  variant="white"
                  shadow="normal"
                  innerClassName="p-6 sm:p-8"
                >
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                    
                    {/* Left Meta Column (4 cols) */}
                    <div className="lg:col-span-4 space-y-3 lg:border-r-2 lg:border-dashed lg:border-[#111111]/25 lg:pr-6">
                      <h3 className="font-heading text-xl sm:text-2xl font-black uppercase text-[#111111]">
                        {exp.title}
                      </h3>

                      <div className="font-sans font-bold text-base text-[#FF5722]">
                        {exp.company}
                      </div>

                      <div className="space-y-1.5 font-mono text-xs text-[#555555] pt-2">
                        <div className="flex items-center gap-1.5">
                          <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                          <span>
                            {exp.startDate} — {exp.endDate}
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-3.5 h-3.5 text-[#111111]" />
                          <span>{exp.location}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <Briefcase className="w-3.5 h-3.5 text-[#111111]" />
                          <span>{exp.employmentType}</span>
                        </div>
                      </div>
                    </div>

                    {/* Right Narrative & Tech Column (8 cols) */}
                    <div className="lg:col-span-8 space-y-4">
                      <p className="font-sans text-sm sm:text-base text-[#333333] leading-relaxed">
                        {exp.description}
                      </p>

                      {/* Achievements List */}
                      {exp.achievements && exp.achievements.length > 0 && (
                        <div className="space-y-2 pt-2">
                          <div className="font-mono text-xs font-bold uppercase tracking-wider text-[#111111]">
                            Key Milestones & Deliverables:
                          </div>
                          <ul className="space-y-1.5">
                            {exp.achievements.map((ach, i) => (
                              <li key={i} className="flex items-start gap-2 text-sm text-[#444444]">
                                <CheckCircle2 className="w-4 h-4 text-[#83E52B] shrink-0 mt-0.5" />
                                <span>{ach}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech Stack Badges */}
                      {exp.technologies && exp.technologies.length > 0 && (
                        <div className="pt-3 border-t border-[#111111]/15 flex flex-wrap items-center gap-2">
                          <span className="font-mono text-[10px] uppercase font-bold text-[#555555] mr-1">
                            STACK:
                          </span>
                          {exp.technologies.map((tech) => (
                            <Badge key={tech} variant="default">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                  </div>
                </EditorialCard>
              </AnimatedReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}

