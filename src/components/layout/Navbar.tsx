"use client";

import React, { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export function Navbar() {
  const [activeSection, setActiveSection] = useState<string>("about");
  const [isScrolled, setIsScrolled] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

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
    // { name: "Journey", href: "#experience", id: "experience" },
    { name: "Education", href: "#education", id: "education" },
    { name: "Projects", href: "#projects", id: "projects" },
    { name: "Contact", href: "#contact", id: "contact" },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 border-b-2 border-[#111111] ${
        isScrolled ? "bg-[#FFFBEA]/95 backdrop-blur-md py-3 shadow-brutal-sm" : "bg-[#FFFBEA] py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative flex items-center justify-between">
        {/* Personal Logo */}
        <Link
          href="/"
          className="group flex items-center border-2 border-[#111111] bg-[#111111] p-1 shadow-brutal-sm hover-lift overflow-hidden z-10"
        >
          <Image
            src="/images/A.jpg"
            alt="Logo"
            width={48}
            height={36}
            priority
            className="h-8 w-auto object-contain block"
          />
        </Link>

        {/* Desktop Pill Navigation (Centered in Navbar) */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex md:absolute md:left-1/2 md:-translate-x-1/2 items-center gap-1.5 p-1 bg-[#F5F3E9] border-2 border-[#111111] rounded-full shadow-brutal-sm z-10"
        >
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                className={`px-3.5 py-1 text-xs font-mono font-bold uppercase tracking-wider rounded-full transition-all ${
                  isActive
                    ? "bg-[#83E52B] text-[#111111] border-2 border-[#111111]"
                    : "text-[#111111] hover:bg-[#111111]/10 border-2 border-transparent"
                }`}
              >
                {link.name}
              </a>
            );
          })}
        </nav>

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
        </div>
      )}
    </header>
  );
}
