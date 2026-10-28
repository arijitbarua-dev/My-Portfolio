import React from "react";
import { notFound, redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { connectDB } from "@/lib/mongodb";
import { ProjectModel } from "@/models/Project";
import { defaultProjects } from "@/data/seedData";
import { ProjectForm } from "../../ProjectForm";

interface EditProjectPageProps {
  params: Promise<{ id: string }>;
}

export default async function EditProjectPage({ params }: EditProjectPageProps) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const { id } = await params;

  let project = null;
  try {
    await connectDB();
    const doc = (await ProjectModel.findById(id).lean()) || (await ProjectModel.findOne({ slug: id }).lean());
    if (doc) {
      project = JSON.parse(JSON.stringify(doc));
    }
  } catch (err) {
    project = defaultProjects.find((p) => p.slug === id);
  }

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="border-b-3 border-[#111111] pb-6">
        <div className="font-mono text-xs uppercase text-[#83E52B] font-bold">
          CONTENT REVISION // CASE STUDY
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl uppercase font-black text-[#111111]">
          Edit: {project.title}
        </h1>
        <p className="font-sans text-sm text-[#555555] mt-1">
          Modify project architecture parameters, feature highlights, and gallery assets.
        </p>
      </div>

      <ProjectForm initialProject={project} isEditing />
    </div>
  );
}

