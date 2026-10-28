"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Project } from "@/types";
import { toggleProjectPublish, toggleProjectFeatured, deleteProject } from "@/lib/actions";
import { Edit2, Trash2, ExternalLink, Star, Eye, EyeOff } from "lucide-react";

interface ProjectsManagerProps {
  initialProjects: Project[];
}

export function ProjectsManager({ initialProjects }: ProjectsManagerProps) {
  const [projects, setProjects] = useState<Project[]>(initialProjects);

  const handleTogglePublish = async (id?: string, currentStatus: boolean = true) => {
    if (!id) return;
    try {
      await toggleProjectPublish(id, currentStatus);
      setProjects(
        projects.map((p) => (p._id === id ? { ...p, published: !currentStatus } : p))
      );
    } catch (err) {
      alert("Failed to toggle publish status.");
    }
  };

  const handleToggleFeatured = async (id?: string, currentStatus: boolean = false) => {
    if (!id) return;
    try {
      await toggleProjectFeatured(id, currentStatus);
      setProjects(
        projects.map((p) => (p._id === id ? { ...p, featured: !currentStatus } : p))
      );
    } catch (err) {
      alert("Failed to toggle featured status.");
    }
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to permanently delete this project?")) return;
    try {
      await deleteProject(id);
      setProjects(projects.filter((p) => p._id !== id));
    } catch (err) {
      alert("Failed to delete project.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-[#111111] bg-[#F5F3E9] font-mono text-xs uppercase font-bold">
              <th className="p-4 border-r border-[#111111]/20">Order</th>
              <th className="p-4 border-r border-[#111111]/20">Project Title</th>
              <th className="p-4 border-r border-[#111111]/20">Category</th>
              <th className="p-4 border-r border-[#111111]/20">Featured</th>
              <th className="p-4 border-r border-[#111111]/20">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y border-[#111111]/20 font-sans text-sm">
            {projects.map((project, idx) => (
              <tr key={project._id || project.slug} className="hover:bg-[#FFFBEA]">
                <td className="p-4 font-mono text-xs font-bold border-r border-[#111111]/20">
                  {project.displayOrder || idx + 1}
                </td>
                <td className="p-4 font-bold text-[#111111] border-r border-[#111111]/20">
                  <div className="flex items-center gap-2">
                    <span>{project.title}</span>
                    <Link
                      href={`/projects/${project.slug}`}
                      target="_blank"
                      className="text-[#FF5722] hover:text-black"
                      title="View public case study"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                  <div className="font-mono text-xs text-[#555555]">/{project.slug}</div>
                </td>
                <td className="p-4 font-mono text-xs border-r border-[#111111]/20">
                  <span className="px-2 py-0.5 border border-black bg-[#F5F3E9]">
                    {project.category}
                  </span>
                </td>
                <td className="p-4 border-r border-[#111111]/20">
                  <button
                    onClick={() => handleToggleFeatured(project._id, project.featured)}
                    className={`px-2 py-1 border text-xs font-mono font-bold uppercase transition-colors ${
                      project.featured
                        ? "bg-[#83E52B] border-black text-[#111111]"
                        : "bg-black/5 border-black/20 text-[#555555]"
                    }`}
                  >
                    {project.featured ? "★ Featured" : "Standard"}
                  </button>
                </td>
                <td className="p-4 border-r border-[#111111]/20">
                  <button
                    onClick={() => handleTogglePublish(project._id, project.published)}
                    className={`inline-flex items-center gap-1.5 px-2.5 py-1 border text-xs font-mono font-bold uppercase transition-colors ${
                      project.published
                        ? "bg-[#83E52B]/30 border-black text-[#111111]"
                        : "bg-[#FF5722]/30 border-black text-[#FF5722]"
                    }`}
                  >
                    {project.published ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
                    <span>{project.published ? "Published" : "Draft"}</span>
                  </button>
                </td>
                <td className="p-4 text-right space-x-2">
                  <Link
                    href={`/admin/projects/${project._id || project.slug}/edit`}
                    className="inline-block p-1.5 border border-black bg-[#F5F3E9] hover:bg-[#83E52B] transition-colors"
                    title="Edit Case Study"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(project._id)}
                    className="p-1.5 border border-black bg-[#F5F3E9] hover:bg-[#FF5722] transition-colors"
                    title="Delete Case Study"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

