"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ArrowDownRight, FileText, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/ui/Icons";
import { Profile } from "@/types";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";

interface HeroSectionProps {
  profile: Profile;
}

export function HeroSection({ profile }: HeroSectionProps) {
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  return (
    <section className="relative pt-8 pb-16 sm:pt-14 sm:pb-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top Status Bar inspired by creative agency briefs */}
        <AnimatedReveal delay={0.05}>
          <div className="flex flex-wrap items-center justify-between gap-3 pb-6 border-b-2 border-[#111111] mb-8 sm:mb-12">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#83E52B] border border-black animate-pulse" />
              <span className="font-mono text-xs uppercase font-bold tracking-widest text-[#111111]">
                {profile.availability || "INDEPENDENT DEVELOPER // AVAILABLE FOR WORK"}
              </span>
            </div>
            <div className="flex items-center gap-2 font-mono text-xs uppercase text-[#555555]">
              <MapPin className="w-3.5 h-3.5 text-[#FF5722]" />
              <span>{profile.location || "Earth // Remote"}</span>
            </div>
          </div>
        </AnimatedReveal>

        {/* Editorial Asymmetric Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">

          {/* Left Column: Headlines & Editorial Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <AnimatedReveal delay={0.1}>
              <div className="flex items-center gap-2">
                <SectionLabel variant="orange">
                  FULL STACK & CREATIVE DEV
                </SectionLabel>
              </div>
            </AnimatedReveal>

            <AnimatedReveal delay={0.15}>
              <h1 className="text-4xl sm:text-6xl md:text-7xl xl:text-8xl font-black uppercase tracking-tight text-[#111111] leading-[0.95]">
                {profile.name}
              </h1>
            </AnimatedReveal>

            <AnimatedReveal delay={0.2}>
              <p
                style={{ fontFamily: "var(--font-serif)" }}
                className="text-xl sm:text-2xl text-[#111111] italic font-normal leading-relaxed"
              >
                "{profile.headline}"
              </p>
            </AnimatedReveal>

            <AnimatedReveal delay={0.25}>
              <p className="text-base sm:text-lg text-[#555555] max-w-xl leading-relaxed font-sans">
                {profile.introduction}
              </p>
            </AnimatedReveal>

            {/* Action Buttons & Socials */}
            <AnimatedReveal delay={0.3}>
              <div className="pt-2 flex flex-wrap items-center gap-4">
                <Button
                  variant="orange"
                  size="lg"
                  onClick={() => setResumeModalOpen(true)}
                  icon={<FileText className="w-4 h-4" />}
                >
                  Download Resume
                </Button>

                <Button
                  variant="secondary"
                  size="lg"
                  href="#projects"
                  icon={<ArrowDownRight className="w-4 h-4" />}
                >
                  Explore Work
                </Button>
              </div>

              {/* Social Link Badges */}
              <div className="mt-8 flex items-center gap-3 pt-6 border-t-2 border-[#111111]/30">
                <span className="font-mono text-xs uppercase font-bold text-[#555555]">
                  CONNECT:
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href="https://github.com/arijitbarua-dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-2 border-[#111111] bg-[#FFFBEA] shadow-brutal-sm hover-lift hover:bg-[#83E52B]"
                    aria-label="GitHub"
                  >
                    <GithubIcon className="w-4 h-4 text-[#111111]" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/arijit-barua-turza"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-2 border-[#111111] bg-[#FFFBEA] shadow-brutal-sm hover-lift hover:bg-[#FF5722]"
                    aria-label="LinkedIn"
                  >
                    <LinkedinIcon className="w-4 h-4 text-[#111111]" />
                  </a>
                  <a
                    href="https://www.facebook.com/arijit.barua.2024"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 border-2 border-[#111111] bg-[#FFFBEA] shadow-brutal-sm hover-lift hover:bg-[#83E52B]"
                    aria-label="Facebook"
                  >
                    <FacebookIcon className="w-4 h-4 text-[#111111]" />
                  </a>
                </div>
              </div>
            </AnimatedReveal>
          </div>

          {/* Right Column: Editorial Framed Portrait Composition (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <AnimatedReveal delay={0.2} className="w-full max-w-md">
              {/* Framed Card inspired by Reference Screenshot 1 & 2 */}
              <div className="relative border-3 border-[#111111] bg-[#F5F3E9] shadow-brutal-lg">

                {/* Top Nav/Tab Header inside Portrait Frame */}
                <div className="flex items-center border-b-2 border-[#111111] bg-[#FFFBEA] p-3">
                  <div className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded-full border border-black bg-[#FF5722]" />
                    <span className="w-3 h-3 rounded-full border border-black bg-[#83E52B]" />
                    <span className="w-3 h-3 rounded-full border border-black bg-[#111111]" />
                  </div>
                </div>

                {/* Portrait Image Frame */}
                <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#EFECE0] p-4 flex items-center justify-center">
                  <div className="relative w-full h-full border-2 border-[#111111] overflow-hidden bg-white">
                    <Image
                      src="/images/person.jpg"
                      alt={profile.name || "Arijit Barua Turza"}
                      fill
                      priority
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 450px"
                    />
                  </div>

                  {/* Editorial Callout Label (inspired by "Ai Shot on location" in reference) */}
                  <div className="absolute bottom-6 left-6 max-w-[200px] bg-[#FFFBEA] border-2 border-[#111111] p-2.5 shadow-brutal-sm text-[11px] font-mono leading-tight">
                    <div className="font-bold text-[#FF5722] uppercase tracking-wider">
                      STATUS // VERIFIED
                    </div>
                    <div className="text-[#111111] mt-0.5">
                      Production engineer focused on scalable web apps.
                    </div>
                  </div>
                </div>

                {/* Bottom Frame Spec Bar */}
                <div className="border-t-2 border-[#111111] bg-[#111111] text-[#FFFBEA] p-3 flex items-center justify-between font-mono text-xs">
                  <span className="tracking-widest">DESIGNATION:</span>
                  <span className="text-[#83E52B] font-bold uppercase">
                    {profile.designation}
                  </span>
                </div>
              </div>
            </AnimatedReveal>
          </div>

        </div>

      </div>

      {/* Resume Info Modal */}
      <Modal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        title="Resume // Availability"
      >
        <div className="space-y-4 font-sans text-sm text-[#111111]">
          <div className="p-3 bg-[#83E52B]/20 border-2 border-[#83E52B] font-mono text-xs uppercase font-bold text-[#111111]">
            Official Resume Asset Configuration
          </div>
          <p>
            You can download the full technical resume directly, or replace it with your custom file anytime.
          </p>
          <div className="p-2.5 bg-[#F5F3E9] border-2 border-[#111111] font-mono text-xs">
            Path: <span className="font-bold">public/resume.pdf</span>
          </div>
          <p className="text-xs text-[#555555]">
            If you have uploaded your resume file to <code className="bg-black/5 px-1 py-0.5 font-bold">public/resume.pdf</code>, click below to open or download it.
          </p>
          <div className="pt-2 flex flex-wrap justify-end gap-2">
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setResumeModalOpen(false)}
            >
              Close
            </Button>
            <Button
              variant="orange"
              size="sm"
              href="/resume.pdf"
              download="Resume.pdf"
            >
              Download PDF
            </Button>
          </div>
        </div>
      </Modal>
    </section>
  );
}
