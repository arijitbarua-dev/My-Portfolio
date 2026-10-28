"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight, FileText } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface NavbarProps {
  resumeUrl?: string;
}

export function Navbar({ resumeUrl = "/resume.pdf" }: NavbarProps) {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [resumeModalOpen, setResumeModalOpen] = useState<boolean>(false);
  const [resumeExists, setResumeExists] = useState<boolean>(false);

  // Check if resume file actually exists in /resume.pdf
  useEffect(() => {
    fetch(resumeUrl, { method: "HEAD" })
      .then((res) => {
        if (res.ok) setResumeExists(true);
        else setResumeExists(false);
      })
      .catch(() => setResumeExists(false));
  }, [resumeUrl]);

  // Track scroll position & active section
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = ["about", "skills", "experience", "education", "projects", "contact"];
      const scrollPosition = window.scrollY + 200;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "About", href: "#about", id: "about" },
    { name: "Skills", href: "#skills", id: "skills" },
    { name: "Journey", href: "#experience", id: "experience" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  const handleResumeClick = (e: React.MouseEvent) => {
    if (!resumeExists) {
      e.preventDefault();
      setResumeModalOpen(true);
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-200 border-b-2 border-[#111111] ${
          isScrolled ? "bg-[#FFFBEA]/95 backdrop-blur-md py-3 shadow-brutal-sm" : "bg-[#FFFBEA] py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Personal Monogram / Logo */}
          <Link
            href="/"
            className="group flex items-center gap-2 border-2 border-[#111111] bg-[#111111] px-3 py-1.5 shadow-brutal-sm hover-lift"
          >
            <span className="font-heading text-sm sm:text-base text-[#FFFBEA] tracking-wider uppercase">
              DEV // 2026
            </span>
            <span className="w-2 h-2 rounded-full bg-[#83E52B] animate-pulse" />
          </Link>

          {/* Desktop Pill Navigation (Inspired by Reference Screenshot 1) */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1.5 p-1 bg-[#F5F3E9] border-2 border-[#111111] rounded-full shadow-brutal-sm"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all ${
                    isActive
                      ? link.id === "projects"
                        ? "bg-[#FF5722] text-[#111111] border-2 border-[#111111]"
                        : "bg-[#83E52B] text-[#111111] border-2 border-[#111111]"
                      : "text-[#111111] hover:bg-[#111111]/10 border-2 border-transparent"
                  }`}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>

          {/* Resume & Admin Action Area */}
          <div className="hidden sm:flex items-center gap-3">
            {resumeExists ? (
              <a
                href={resumeUrl}
                download="Resume.pdf"
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FF5722] text-[#111111] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#111111] shadow-brutal hover-lift"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            ) : (
              <button
                onClick={handleResumeClick}
                className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-[#FF5722] text-[#111111] font-mono text-xs font-bold uppercase tracking-wider border-2 border-[#111111] shadow-brutal hover-lift"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Resume</span>
              </button>
            )}

            <Link
              href="/admin"
              className="text-xs font-mono font-bold uppercase text-[#555555] hover:text-[#111111] px-2 py-1 underline underline-offset-4"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className="flex md:hidden p-2 border-2 border-[#111111] bg-[#F5F3E9] shadow-brutal-sm"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-[#111111] bg-[#FFFBEA] px-4 pt-4 pb-6 space-y-3">
            <nav className="grid grid-cols-2 gap-2">
              {navLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`p-2.5 text-center font-mono text-xs font-bold uppercase border-2 border-[#111111] shadow-brutal-sm ${
                    activeSection === link.id
                      ? "bg-[#83E52B] text-[#111111]"
                      : "bg-[#F5F3E9] text-[#111111]"
                  }`}
                >
                  {link.name}
                </a>
              ))}
            </nav>
            <div className="pt-2 flex flex-col gap-2">
              {resumeExists ? (
                <a
                  href={resumeUrl}
                  download="Resume.pdf"
                  className="w-full text-center py-2.5 bg-[#FF5722] text-[#111111] font-mono text-xs font-bold uppercase border-2 border-[#111111] shadow-brutal"
                >
                  Download Resume (PDF)
                </a>
              ) : (
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setResumeModalOpen(true);
                  }}
                  className="w-full text-center py-2.5 bg-[#FF5722] text-[#111111] font-mono text-xs font-bold uppercase border-2 border-[#111111] shadow-brutal"
                >
                  Resume (Coming Soon)
                </button>
              )}
              <Link
                href="/admin"
                onClick={() => setMobileMenuOpen(false)}
                className="w-full text-center py-2 bg-[#111111] text-[#FFFBEA] font-mono text-xs font-bold uppercase border-2 border-[#111111]"
              >
                Admin Dashboard
              </Link>
            </div>
          </div>
        )}
      </header>

      {/* Resume Placeholder Modal */}
      <Modal
        isOpen={resumeModalOpen}
        onClose={() => setResumeModalOpen(false)}
        title="Resume // Notice"
      >
        <div className="space-y-4 font-sans text-sm text-[#111111]">
          <div className="p-3 bg-[#FF5722]/15 border-2 border-[#FF5722] font-mono text-xs uppercase tracking-wide font-bold">
            Notice: Resume File In Progress
          </div>
          <p>
            The official PDF resume file is currently being updated for the upcoming quarter.
            To provide your own resume file, place your PDF inside the project at:
          </p>
          <div className="p-2.5 bg-[#111111] text-[#83E52B] font-mono text-xs border border-[#111111] select-all">
            public/resume.pdf
          </div>
          <p className="text-xs text-[#555555]">
            Once placed in <code className="bg-black/5 px-1 py-0.5">public/resume.pdf</code>, this button will immediately offer direct one-click PDF downloading.
          </p>
          <div className="pt-2 flex justify-end">
            <Button
              variant="primary"
              size="sm"
              onClick={() => setResumeModalOpen(false)}
            >
              Understood
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}

