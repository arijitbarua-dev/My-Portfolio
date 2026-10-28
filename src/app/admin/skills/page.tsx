import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { getSkills } from "@/lib/data";
import { SkillsManager } from "./SkillsManager";

export default async function AdminSkillsPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const skills = await getSkills();

  return (
    <div className="space-y-8">
      <div className="border-b-3 border-[#111111] pb-6">
        <div className="font-mono text-xs uppercase text-[#83E52B] font-bold">
          ADMINISTRATION // TOOLKIT
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl uppercase font-black text-[#111111]">
          Manage Skills & Technologies
        </h1>
        <p className="font-sans text-sm text-[#555555] mt-1">
          Add, categorize, reorder, or remove frameworks and developer tools displayed on your portfolio.
        </p>
      </div>

      <SkillsManager initialSkills={skills} />
    </div>
  );
}

