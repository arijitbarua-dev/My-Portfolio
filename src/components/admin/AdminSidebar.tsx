"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  User,
  Wrench,
  GraduationCap,
  Briefcase,
  FolderGit2,
  Mail,
  ExternalLink,
} from "lucide-react";

export function AdminSidebar() {
  const pathname = usePathname();

  const links = [
    { name: "Overview", href: "/admin", icon: <LayoutDashboard className="w-4 h-4" /> },
    { name: "Profile & Bio", href: "/admin/profile", icon: <User className="w-4 h-4" /> },
    { name: "Toolkit / Skills", href: "/admin/skills", icon: <Wrench className="w-4 h-4" /> },
    { name: "Journey / Exp", href: "/admin/experience", icon: <Briefcase className="w-4 h-4" /> },
    { name: "Education", href: "/admin/education", icon: <GraduationCap className="w-4 h-4" /> },
    { name: "Case Studies", href: "/admin/projects", icon: <FolderGit2 className="w-4 h-4" /> },
    { name: "Inquiries", href: "/admin/messages", icon: <Mail className="w-4 h-4" /> },
  ];

  return (
    <aside className="w-64 border-r-3 border-[#111111] bg-[#F5F3E9] flex flex-col justify-between min-h-screen">
      <div>
        {/* Admin Brand Badge */}
        <div className="p-6 border-b-2 border-[#111111]">
          <Link
            href="/admin"
            className="flex items-center gap-2 p-2 bg-[#111111] text-[#FFFBEA] border-2 border-[#111111] shadow-brutal-sm font-heading text-sm uppercase tracking-wider"
          >
            <span>CONSOLE // CMS</span>
            <span className="w-2 h-2 rounded-full bg-[#83E52B]" />
          </Link>
          <div className="mt-2 font-mono text-[11px] text-[#555555] uppercase tracking-wider">
            Protected Architecture
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="p-4 space-y-1.5 font-mono text-xs uppercase font-bold">
          {links.map((link) => {
            const isActive =
              link.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 border-2 transition-all ${
                  isActive
                    ? "bg-[#111111] text-[#83E52B] border-[#111111] shadow-brutal-sm"
                    : "border-transparent text-[#111111] hover:bg-[#FFFBEA] hover:border-[#111111]"
                }`}
              >
                <span>{link.icon}</span>
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Return to Live Site */}
      <div className="p-4 border-t-2 border-[#111111]">
        <Link
          href="/"
          target="_blank"
          className="flex items-center justify-between p-3 bg-[#FFFBEA] border-2 border-[#111111] shadow-brutal-sm hover-lift font-mono text-xs font-bold uppercase text-[#111111]"
        >
          <span>View Live Site</span>
          <ExternalLink className="w-3.5 h-3.5 text-[#FF5722]" />
        </Link>
      </div>
    </aside>
  );
}

