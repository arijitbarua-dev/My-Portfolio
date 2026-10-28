import React from "react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { getPublishedProjects, getFeaturedProjects } from "@/lib/data";
import { connectDB } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";
import { defaultProjects } from "@/data/seedData";
import { ProjectsManager } from "./ProjectsManager";
import { Button } from "@/components/ui/Button";
import { Plus } from "lucide-react";

export default async function AdminProjectsPage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  let projects = [];
  try {
    await connectDB();
    const docs = await ProjectModel.find().sort({ displayOrder: 1 }).lean();
    projects = JSON.parse(JSON.stringify(docs));
  } catch (err) {
    projects = defaultProjects;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-3 border-[#111111] pb-6">
        <div>
          <div className="font-mono text-xs uppercase text-[#FF5722] font-bold">
            ADMINISTRATION // WORK
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl uppercase font-black text-[#111111]">
            Manage Case Studies
          </h1>
          <p className="font-sans text-sm text-[#555555] mt-1">
            Publish, feature, edit, or archive your editorial project case studies.
          </p>
        </div>

        <Button
          variant="orange"
          size="sm"
          href="/admin/projects/new"
          icon={<Plus className="w-4 h-4" />}
        >
          New Case Study
        </Button>
      </div>

      <ProjectsManager initialProjects={projects} />
    </div>
  );
}

