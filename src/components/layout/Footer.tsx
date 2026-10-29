"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon, FacebookIcon } from "@/components/ui/Icons";
import { Profile } from "@/types";

interface FooterProps {
  profile?: Profile;
}

export function Footer({ profile }: FooterProps) {
  const currentYear = 2026;

  return (
    <footer className="mt-20 border-t-3 border-[#111111] bg-[#F5F3E9] text-[#111111] relative">
      {/* Top Graphic Accent Bar */}
      <div className="h-2 w-full bg-[#111111] flex">
        <div className="w-1/3 bg-[#FF5722]" />
        <div className="w-1/3 bg-[#83E52B]" />
        <div className="w-1/3 bg-[#111111]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="group flex items-center border-2 border-[#111111] bg-[#111111] p-1 shadow-brutal-sm hover-lift overflow-hidden"
              >
                <Image
                  src="/images/A.jpg"
                  alt="Logo"
                  width={48}
                  height={36}
                  className="h-8 w-auto object-contain block"
                />
              </Link>
              <span className="font-mono text-xs uppercase tracking-wider text-[#555555]">
                {profile?.availability || "Available for Opportunities"}
              </span>
            </div>
            <p className="font-sans text-sm text-[#555555] max-w-sm leading-relaxed">
              Designed with a creative-agency editorial perspective. Driven by clean architecture, resilient code, and deliberate typography.
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <div className="font-mono text-xs uppercase tracking-widest font-bold text-[#111111] border-b-2 border-[#111111] pb-1 inline-block">
              Index Navigation
            </div>
            <ul className="grid grid-cols-2 gap-2 text-xs font-mono uppercase font-bold pt-1">
              <li>
                <a href="#about" className="hover:text-[#FF5722] transition-colors">
                  01. The Person
                </a>
              </li>
              <li>
                <a href="#skills" className="hover:text-[#FF5722] transition-colors">
                  02. Toolkit
                </a>
              </li>
              <li>
                <a href="#experience" className="hover:text-[#FF5722] transition-colors">
                  03. The Journey
                </a>
              </li>
              <li>
                <a href="#education" className="hover:text-[#FF5722] transition-colors">
                  04. Education
                </a>
              </li>
              <li>
                <a href="#projects" className="hover:text-[#FF5722] transition-colors">
                  05. Selected Work
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-[#FF5722] transition-colors">
                  06. Connect
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Social & Back to Top */}
          <div className="md:col-span-3 space-y-4 flex flex-col items-start md:items-end">
            <div className="font-mono text-xs uppercase tracking-widest font-bold text-[#111111]">
              Network Presence
            </div>
            <div className="flex items-center gap-2">
              <a
                href="https://github.com/arijitbarua-dev"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="p-2 border-2 border-[#111111] bg-[#FFFBEA] shadow-brutal-sm hover-lift hover:bg-[#83E52B]"
              >
                <GithubIcon className="w-4 h-4 text-[#111111]" />
              </a>
              <a
                href="https://www.linkedin.com/in/arijit-barua-turza"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="p-2 border-2 border-[#111111] bg-[#FFFBEA] shadow-brutal-sm hover-lift hover:bg-[#FF5722]"
              >
                <LinkedinIcon className="w-4 h-4 text-[#111111]" />
              </a>
              <a
                href="https://www.facebook.com/arijit.barua.2024"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook profile"
                className="p-2 border-2 border-[#111111] bg-[#FFFBEA] shadow-brutal-sm hover-lift hover:bg-[#83E52B]"
              >
                <FacebookIcon className="w-4 h-4 text-[#111111]" />
              </a>
            </div>

            <a
              href="#"
              className="mt-2 inline-flex items-center gap-1.5 px-3 py-1 bg-[#111111] text-[#FFFBEA] font-mono text-xs uppercase tracking-wider font-bold shadow-brutal-sm hover-lift"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Credits & Copyright */}
        <div className="mt-12 pt-6 border-t-2 border-[#111111] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#555555]">
          <div>
            © {currentYear} Arijit Barua Turza. All editorial rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
