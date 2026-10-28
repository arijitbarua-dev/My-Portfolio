"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Project } from "@/types";
import { createProject, updateProject } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Save, ArrowLeft, CheckCircle2, AlertCircle } from "lucide-react";
import Link from "next/link";

interface ProjectFormProps {
  initialProject?: Project;
  isEditing?: boolean;
}

export function ProjectForm({ initialProject, isEditing = false }: ProjectFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: initialProject?.title || "",
    slug: initialProject?.slug || "",
    subtitle: initialProject?.subtitle || "",
    category: initialProject?.category || "Full Stack",
    role: initialProject?.role || "Lead Architect & Full Stack Developer",
    coverImage: initialProject?.coverImage || "/images/project-kronos.svg",
    liveUrl: initialProject?.liveUrl || "",
    githubUrl: initialProject?.githubUrl || "",
    description: initialProject?.description || "",
    overview: initialProject?.overview || "",
    problem: initialProject?.problem || "",
    goals: initialProject?.goals || "",
    featuresText: (initialProject?.features || []).join("\n"),
    technologiesText: (initialProject?.technologies || []).join(", "),
    galleryText: (initialProject?.gallery || []).join("\n"),
    developmentProcess: initialProject?.developmentProcess || "",
    challenges: initialProject?.challenges || "",
    solutions: initialProject?.solutions || "",
    lessonsLearned: initialProject?.lessonsLearned || "",
    futurePlans: initialProject?.futurePlans || "",
    featured: initialProject?.featured ?? false,
    published: initialProject?.published ?? true,
    displayOrder: initialProject?.displayOrder ?? 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Auto-generate slug when title changes (if creating new)
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    if (!isEditing && !formData.slug) {
      const generatedSlug = val
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)+/g, "");
      setFormData({ ...formData, title: val, slug: generatedSlug });
    } else {
      setFormData({ ...formData, title: val });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const payload = {
      title: formData.title,
      slug: formData.slug,
      subtitle: formData.subtitle,
      category: formData.category,
      role: formData.role,
      coverImage: formData.coverImage,
      liveUrl: formData.liveUrl || undefined,
      githubUrl: formData.githubUrl || undefined,
      description: formData.description,
      overview: formData.overview,
      problem: formData.problem,
      goals: formData.goals,
      features: formData.featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
      technologies: formData.technologiesText.split(",").map((s) => s.trim()).filter(Boolean),
      gallery: formData.galleryText.split("\n").map((s) => s.trim()).filter(Boolean),
      developmentProcess: formData.developmentProcess,
      challenges: formData.challenges,
      solutions: formData.solutions,
      lessonsLearned: formData.lessonsLearned,
      futurePlans: formData.futurePlans,
      featured: Boolean(formData.featured),
      published: Boolean(formData.published),
      displayOrder: Number(formData.displayOrder),
    };

    try {
      if (isEditing && initialProject?._id) {
        await updateProject(initialProject._id, payload);
      } else {
        await createProject(payload);
      }
      router.push("/admin/projects");
      router.refresh();
    } catch (err: any) {
      setError(err.message || "Failed to save project.");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal p-6 sm:p-10 space-y-8">
      {error && (
        <div className="p-4 bg-[#FF5722]/15 border-2 border-[#FF5722] flex items-start gap-2.5">
          <AlertCircle className="w-5 h-5 text-[#FF5722] shrink-0 mt-0.5" />
          <span className="font-mono text-xs font-bold text-[#111111]">{error}</span>
        </div>
      )}

      {/* Row 1: Title & Slug */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Project Title *
          </label>
          <input
            type="text"
            required
            value={formData.title}
            onChange={handleTitleChange}
            placeholder="e.g. KRONOS // COMMERCE"
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-heading uppercase text-sm focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            URL Slug * (Unique)
          </label>
          <input
            type="text"
            required
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="kronos-commerce"
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>
      </div>

      {/* Row 2: Subtitle, Category & Role */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1 sm:col-span-2">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Editorial Subtitle *
          </label>
          <input
            type="text"
            required
            name="subtitle"
            value={formData.subtitle}
            onChange={handleChange}
            placeholder="High-Performance Modular Headless E-Commerce System"
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Category *
          </label>
          <input
            type="text"
            required
            name="category"
            value={formData.category}
            onChange={handleChange}
            placeholder="E-Commerce / Productivity / Dashboard"
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
          />
        </div>
      </div>

      {/* Row 3: Role & Image Cover */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Your Role *
          </label>
          <input
            type="text"
            required
            name="role"
            value={formData.role}
            onChange={handleChange}
            placeholder="Lead Full-Stack Architect & UI Designer"
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Cover Image Path *
          </label>
          <input
            type="text"
            required
            name="coverImage"
            value={formData.coverImage}
            onChange={handleChange}
            placeholder="/images/project-kronos.svg"
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
          />
        </div>
      </div>

      {/* Row 4: External Links */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Live Project URL
          </label>
          <input
            type="url"
            name="liveUrl"
            value={formData.liveUrl}
            onChange={handleChange}
            placeholder="https://example.com/demo"
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            GitHub Repository URL
          </label>
          <input
            type="url"
            name="githubUrl"
            value={formData.githubUrl}
            onChange={handleChange}
            placeholder="https://github.com/example/repo"
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
          />
        </div>
      </div>

      {/* Row 5: Descriptions */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Card Summary / Short Description *
          </label>
          <textarea
            required
            name="description"
            rows={2}
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Executive Overview *
          </label>
          <textarea
            required
            name="overview"
            rows={3}
            value={formData.overview}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
          />
        </div>
      </div>

      {/* Row 6: Problem & Goals */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Problem Statement *
          </label>
          <textarea
            required
            name="problem"
            rows={4}
            value={formData.problem}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Strategic Goals *
          </label>
          <textarea
            required
            name="goals"
            rows={4}
            value={formData.goals}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
          />
        </div>
      </div>

      {/* Row 7: Features & Technologies */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Key Features (One per line)
          </label>
          <textarea
            rows={5}
            name="featuresText"
            value={formData.featuresText}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-xs"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Technologies (Comma separated)
          </label>
          <textarea
            rows={5}
            name="technologiesText"
            value={formData.technologiesText}
            onChange={handleChange}
            placeholder="Next.js, TypeScript, MongoDB, Tailwind CSS"
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
          />
        </div>
      </div>

      {/* Row 8: Gallery Image Paths */}
      <div className="space-y-1">
        <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
          Gallery Images (One path or URL per line)
        </label>
        <textarea
          rows={3}
          name="galleryText"
          value={formData.galleryText}
          onChange={handleChange}
          placeholder="/images/project-kronos-1.svg&#10;/images/project-kronos-2.svg"
          className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
        />
      </div>

      {/* Row 9: Engineering Deep Dive */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Development & Design Process *
          </label>
          <textarea
            required
            name="developmentProcess"
            rows={3}
            value={formData.developmentProcess}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Challenges Faced *
            </label>
            <textarea
              required
              name="challenges"
              rows={3}
              value={formData.challenges}
              onChange={handleChange}
              className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Solutions Deployed *
            </label>
            <textarea
              required
              name="solutions"
              rows={3}
              value={formData.solutions}
              onChange={handleChange}
              className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Lessons Learned *
            </label>
            <textarea
              required
              name="lessonsLearned"
              rows={3}
              value={formData.lessonsLearned}
              onChange={handleChange}
              className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Future Plans *
            </label>
            <textarea
              required
              name="futurePlans"
              rows={3}
              value={formData.futurePlans}
              onChange={handleChange}
              className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
            />
          </div>
        </div>
      </div>

      {/* Row 10: Toggles & Ordering */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-4 border-t-2 border-[#111111] items-center">
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="published"
            checked={formData.published}
            onChange={(e) => setFormData({ ...formData, published: e.target.checked })}
            className="w-5 h-5 accent-[#83E52B]"
          />
          <label htmlFor="published" className="font-mono text-xs uppercase font-bold text-[#111111]">
            Published to Live Site
          </label>
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="featured"
            checked={formData.featured}
            onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
            className="w-5 h-5 accent-[#FF5722]"
          />
          <label htmlFor="featured" className="font-mono text-xs uppercase font-bold text-[#111111]">
            Featured on Front Page
          </label>
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Display Order
          </label>
          <input
            type="number"
            value={formData.displayOrder}
            onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
            className="w-full p-2 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
          />
        </div>
      </div>

      {/* Submit Controls */}
      <div className="pt-6 border-t-3 border-[#111111] flex flex-wrap items-center justify-between gap-4">
        <Link
          href="/admin/projects"
          className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase text-[#555555] hover:text-[#111111]"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Case Studies</span>
        </Link>

        <Button
          type="submit"
          variant="orange"
          size="lg"
          disabled={loading}
          icon={<Save className="w-4 h-4" />}
        >
          {loading ? "Processing..." : isEditing ? "Update Case Study" : "Publish Case Study"}
        </Button>
      </div>
    </form>
  );
}

