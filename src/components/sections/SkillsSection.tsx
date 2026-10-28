"use client";

import React, { useState } from "react";
import { Skill } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { SectionDivider } from "@/components/ui/SectionDivider";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import {
  Code2,
  Boxes,
  Layers,
  Palette,
  FileCode,
  Layout,
  Server,
  Cpu,
  Network,
  HardDrive,
  ShieldCheck,
  Database,
  Binary,
  Table2,
  GitBranch,
  Container,
  Terminal,
  Send,
  CloudUpload,
} from "lucide-react";
import { FigmaIcon } from "@/components/ui/Icons";

interface SkillsSectionProps {
  skills: Skill[];
}

const iconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 className="w-5 h-5" />,
  Boxes: <Boxes className="w-5 h-5" />,
  Layers: <Layers className="w-5 h-5" />,
  Palette: <Palette className="w-5 h-5" />,
  FileCode: <FileCode className="w-5 h-5" />,
  Layout: <Layout className="w-5 h-5" />,
  Server: <Server className="w-5 h-5" />,
  Cpu: <Cpu className="w-5 h-5" />,
  Network: <Network className="w-5 h-5" />,
  HardDrive: <HardDrive className="w-5 h-5" />,
  ShieldCheck: <ShieldCheck className="w-5 h-5" />,
  Database: <Database className="w-5 h-5" />,
  Binary: <Binary className="w-5 h-5" />,
  Table2: <Table2 className="w-5 h-5" />,
  GitBranch: <GitBranch className="w-5 h-5" />,
  Container: <Container className="w-5 h-5" />,
  Terminal: <Terminal className="w-5 h-5" />,
  Send: <Send className="w-5 h-5" />,
  Figma: <FigmaIcon className="w-5 h-5" />,
  CloudUpload: <CloudUpload className="w-5 h-5" />,
};

export function SkillsSection({ skills }: SkillsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const categories = ["All", "Frontend", "Backend", "Database", "Tools and Workflow"];

  const filteredSkills =
    selectedCategory === "All"
      ? skills
      : skills.filter((s) => s.category.toLowerCase() === selectedCategory.toLowerCase());

  return (
    <section id="skills" className="py-12 sm:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Divider */}
        <SectionDivider number="02" label="MY TOOLKIT" variant="lime" />

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <AnimatedReveal>
            <SectionLabel variant="lime">
              03. MY TOOLKIT
            </SectionLabel>
            <SectionHeading
              title="Tools of the"
              italicWord="Trade."
              subtitle="Production technologies, frameworks, and developer workflows utilized daily."
              className="mt-3"
            />
          </AnimatedReveal>

          {/* Category Filter Pills (Inspired by Reference Pill Navs) */}
          <AnimatedReveal delay={0.1}>
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-[#F5F3E9] border-2 border-[#111111] shadow-brutal-sm rounded-full">
              {categories.map((cat) => {
                const isSelected = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all cursor-pointer ${
                      isSelected
                        ? "bg-[#111111] text-[#83E52B] border-2 border-[#111111] shadow-xs"
                        : "text-[#111111] hover:bg-black/10 border-2 border-transparent"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </AnimatedReveal>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredSkills.map((skill, index) => {
            const icon = iconMap[skill.icon] || <Code2 className="w-5 h-5" />;

            return (
              <AnimatedReveal key={skill.name} delay={index * 0.03}>
                <div className="group relative border-2 border-[#111111] bg-[#FFFFFF] p-4 shadow-brutal-sm hover-lift flex flex-col justify-between h-full min-h-[120px]">
                  {/* Top Bar with Icon & Category indicator */}
                  <div className="flex items-center justify-between pb-2 border-b border-[#111111]/15">
                    <div className="p-2 border border-[#111111] bg-[#FFFBEA] text-[#111111] group-hover:bg-[#FF5722] group-hover:text-black transition-colors">
                      {icon}
                    </div>
                    <span className="font-mono text-[9px] uppercase font-bold tracking-wider text-[#555555]">
                      {skill.category.split(" ")[0]}
                    </span>
                  </div>

                  {/* Skill Name */}
                  <div className="mt-3">
                    <h3 className="font-heading text-sm uppercase tracking-tight text-[#111111] group-hover:text-[#FF5722] transition-colors">
                      {skill.name}
                    </h3>
                  </div>

                  {/* Optional real proficiency badge (only rendered if provided) */}
                  {typeof skill.proficiency === "number" && (
                    <div className="mt-2 pt-1 border-t border-dashed border-[#111111]/20 flex items-center justify-between text-[10px] font-mono">
                      <span className="text-[#555555]">EFFICIENCY:</span>
                      <span className="font-bold text-[#111111]">{skill.proficiency}%</span>
                    </div>
                  )}

                  {/* Accent Corner Dot */}
                  <div className="absolute top-1 right-1 w-1.5 h-1.5 bg-[#111111] opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </AnimatedReveal>
            );
          })}
        </div>

      </div>
    </section>
  );
}
