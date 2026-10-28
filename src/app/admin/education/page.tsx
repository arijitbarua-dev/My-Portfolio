import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { getEducation } from "@/lib/data";
import { EducationManager } from "./EducationManager";

export default async function AdminEducationPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const education = await getEducation();

  return (
    <div className="space-y-8">
      <div className="border-b-3 border-[#111111] pb-6">
        <div className="font-mono text-xs uppercase text-[#83E52B] font-bold">
          ADMINISTRATION // EDUCATION
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl uppercase font-black text-[#111111]">
          Manage Academic Records
        </h1>
        <p className="font-sans text-sm text-[#555555] mt-1">
          Maintain university degrees, specialized technical certifications, and formal coursework.
        </p>
      </div>

      <EducationManager initialEducation={education} />
    </div>
  );
}

