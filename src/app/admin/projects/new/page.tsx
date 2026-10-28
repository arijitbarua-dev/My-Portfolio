import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { ProjectForm } from "../ProjectForm";

export default async function NewProjectPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  return (
    <div className="space-y-8">
      <div className="border-b-3 border-[#111111] pb-6">
        <div className="font-mono text-xs uppercase text-[#FF5722] font-bold">
          CONTENT AUTHORING // CASE STUDY
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl uppercase font-black text-[#111111]">
          Create Project Case Study
        </h1>
        <p className="font-sans text-sm text-[#555555] mt-1">
          Draft a high-impact editorial case study with technical specs, engineering challenges, and screenshots.
        </p>
      </div>

      <ProjectForm />
    </div>
  );
}

