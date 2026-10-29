import React from "react";
import { Education } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { EditorialCard } from "@/components/ui/EditorialCard";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { GraduationCap, Calendar } from "lucide-react";

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Divider */}
        <SectionDivider number="04" label="EDUCATION" variant="lime" />

        <div className="mb-12">
          <AnimatedReveal>
            <SectionHeading
              title="Where I"
              italicWord="Learned."
              subtitle="Formal engineering education, advanced certifications, and technical foundations."
              className="mt-3"
            />
          </AnimatedReveal>
        </div>

        {/* Education Editorial Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {education.map((edu, index) => {
            const num = String(index + 1).padStart(2, "0");

            return (
              <AnimatedReveal key={edu._id || edu.qualification + edu.institution} delay={index * 0.1}>
                <EditorialCard
                  headerTag={`ACADEMIA // ENTRY ${num}`}
                  headerNumber={num}
                  headerRight={
                    edu.grade ? (
                      <span className="bg-[#83E52B] text-[#111111] px-2 py-0.5 border border-black font-mono text-[10px] font-bold">
                        {edu.grade}
                      </span>
                    ) : undefined
                  }
                  variant="white"
                  shadow="sm"
                  innerClassName="p-6 sm:p-7 space-y-4"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 font-mono text-xs text-[#FF5722] font-bold">
                      <GraduationCap className="w-4 h-4 text-[#FF5722]" />
                      <span>{edu.institution}</span>
                    </div>

                    <h3 className="font-heading text-lg sm:text-xl font-black uppercase text-[#111111]">
                      {edu.qualification}
                    </h3>
                  </div>

                  <div className="flex items-center gap-4 font-mono text-xs text-[#555555] py-2 border-y border-[#111111]/15">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#111111]" />
                      <span>
                        {edu.startYear} — {edu.endYear}
                      </span>
                    </div>
                    <div>
                      MAJOR: <span className="text-[#111111] font-bold">{edu.subject}</span>
                    </div>
                  </div>

                  <p className="font-sans text-sm text-[#444444] leading-relaxed">
                    {edu.description}
                  </p>
                </EditorialCard>
              </AnimatedReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
