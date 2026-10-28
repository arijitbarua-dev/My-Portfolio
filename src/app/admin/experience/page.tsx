import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { getExperience } from "@/lib/data";
import { ExperienceManager } from "./ExperienceManager";

export default async function AdminExperiencePage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const experience = await getExperience();

  return (
    <div className="space-y-8">
      <div className="border-b-3 border-[#111111] pb-6">
        <div className="font-mono text-xs uppercase text-[#FF5722] font-bold">
          ADMINISTRATION // JOURNEY
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl uppercase font-black text-[#111111]">
          Manage Experience Timeline
        </h1>
        <p className="font-sans text-sm text-[#555555] mt-1">
          Maintain your chronological career milestones, companies, employment types, and achievements.
        </p>
      </div>

      <ExperienceManager initialExperience={experience} />
    </div>
  );
}

