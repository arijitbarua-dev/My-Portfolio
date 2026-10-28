import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { getAdminCounts } from "@/lib/data";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import {
  FolderGit2,
  Wrench,
  GraduationCap,
  Briefcase,
  Mail,
  Plus,
  ArrowUpRight,
  UserCheck,
} from "lucide-react";

export default async function AdminDashboardPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const counts = await getAdminCounts();

  const statCards = [
    {
      title: "Case Studies",
      count: counts.projectsCount,
      href: "/admin/projects",
      tag: "CATALOGED",
      icon: <FolderGit2 className="w-5 h-5 text-[#FF5722]" />,
      color: "border-[#FF5722]",
    },
    {
      title: "Toolkit Skills",
      count: counts.skillsCount,
      href: "/admin/skills",
      tag: "ACTIVE STACK",
      icon: <Wrench className="w-5 h-5 text-[#83E52B]" />,
      color: "border-[#83E52B]",
    },
    {
      title: "Journey Roles",
      count: counts.experienceCount,
      href: "/admin/experience",
      tag: "TIMELINE",
      icon: <Briefcase className="w-5 h-5 text-[#111111]" />,
      color: "border-[#111111]",
    },
    {
      title: "Education",
      count: counts.educationCount,
      href: "/admin/education",
      tag: "DEGREES",
      icon: <GraduationCap className="w-5 h-5 text-[#111111]" />,
      color: "border-[#111111]",
    },
    {
      title: "New Inquiries",
      count: counts.newMessagesCount,
      href: "/admin/messages",
      tag: "UNREAD",
      icon: <Mail className="w-5 h-5 text-[#FF5722]" />,
      color: "border-[#FF5722]",
    },
  ];

  return (
    <div className="space-y-10">
      
      {/* Header & Quick Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-3 border-[#111111] pb-6">
        <div>
          <div className="font-mono text-xs uppercase text-[#FF5722] font-bold tracking-wider mb-1">
            EXECUTIVE CONTROL DECK
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl uppercase font-black text-[#111111]">
            System Overview
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <Button
            variant="orange"
            size="sm"
            href="/admin/projects/new"
            icon={<Plus className="w-3.5 h-3.5" />}
          >
            New Project
          </Button>

          <Button
            variant="secondary"
            size="sm"
            href="/admin/profile"
            icon={<UserCheck className="w-3.5 h-3.5" />}
          >
            Edit Profile
          </Button>
        </div>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {statCards.map((card) => (
          <Link
            key={card.title}
            href={card.href}
            className="group border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal hover-lift p-6 flex flex-col justify-between"
          >
            <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3 mb-4">
              <span className="font-mono text-[10px] uppercase font-bold tracking-wider text-[#555555]">
                {card.tag}
              </span>
              <div className="p-2 border border-[#111111] bg-[#FFFBEA]">
                {card.icon}
              </div>
            </div>

            <div>
              <div className="font-heading text-4xl sm:text-5xl font-black text-[#111111] group-hover:text-[#FF5722] transition-colors">
                {card.count}
              </div>
              <div className="font-mono text-sm uppercase font-bold text-[#111111] mt-1">
                {card.title}
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-[#111111]/20 flex items-center justify-between font-mono text-xs text-[#555555]">
              <span>Manage Records</span>
              <ArrowUpRight className="w-4 h-4 text-[#111111] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Quick Tips / Instructions Notice */}
      <div className="border-3 border-[#111111] bg-[#F5F3E9] p-6 sm:p-8 shadow-brutal-sm space-y-4">
        <div className="flex items-center gap-2 border-b-2 border-[#111111] pb-2">
          <span className="font-heading uppercase text-sm font-black text-[#111111]">
            Editorial CMS Guide & Database Status
          </span>
        </div>
        <p className="font-sans text-sm text-[#333333] leading-relaxed">
          All mutations performed in this dashboard use Next.js Server Actions with server-side Better-Auth authentication checks. When you update your profile, projects, or toolkit, Next.js ISR cache tags will automatically refresh immediately across all public routes.
        </p>
      </div>

    </div>
  );
}

