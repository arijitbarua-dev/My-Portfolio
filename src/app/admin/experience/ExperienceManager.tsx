"use client";

import React, { useState } from "react";
import { Experience } from "@/types";
import { createExperience, updateExperience, deleteExperience } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface ExperienceManagerProps {
  initialExperience: Experience[];
}

export function ExperienceManager({ initialExperience }: ExperienceManagerProps) {
  const [experience, setExperience] = useState<Experience[]>(initialExperience);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExp, setEditingExp] = useState<Experience | null>(null);

  const [formData, setFormData] = useState<{
    title: string;
    company: string;
    employmentType: string;
    location: string;
    startDate: string;
    endDate: string;
    current: boolean;
    description: string;
    achievementsText: string;
    technologiesText: string;
    displayOrder: number;
  }>({
    title: "",
    company: "",
    employmentType: "Full-Time",
    location: "Remote",
    startDate: "",
    endDate: "Present",
    current: false,
    description: "",
    achievementsText: "",
    technologiesText: "",
    displayOrder: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleOpenAdd = () => {
    setEditingExp(null);
    setFormData({
      title: "",
      company: "",
      employmentType: "Full-Time",
      location: "Remote",
      startDate: "",
      endDate: "Present",
      current: false,
      description: "",
      achievementsText: "",
      technologiesText: "",
      displayOrder: experience.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (exp: Experience) => {
    setEditingExp(exp);
    setFormData({
      title: exp.title,
      company: exp.company,
      employmentType: exp.employmentType,
      location: exp.location,
      startDate: exp.startDate,
      endDate: exp.endDate,
      current: exp.current,
      description: exp.description,
      achievementsText: (exp.achievements || []).join("\n"),
      technologiesText: (exp.technologies || []).join(", "),
      displayOrder: exp.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this experience entry?")) return;
    try {
      await deleteExperience(id);
      setExperience(experience.filter((e) => e._id !== id));
    } catch (err) {
      alert("Failed to delete experience.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      title: formData.title,
      company: formData.company,
      employmentType: formData.employmentType,
      location: formData.location,
      startDate: formData.startDate,
      endDate: formData.endDate,
      current: formData.current,
      description: formData.description,
      achievements: formData.achievementsText
        .split("\n")
        .map((s) => s.trim())
        .filter(Boolean),
      technologies: formData.technologiesText
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean),
      displayOrder: Number(formData.displayOrder),
    };

    try {
      if (editingExp && editingExp._id) {
        const res = await updateExperience(editingExp._id, payload);
        setExperience(experience.map((e) => (e._id === editingExp._id ? res.experience : e)));
      } else {
        const res = await createExperience(payload);
        setExperience([...experience, res.experience]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to save experience.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs uppercase font-bold text-[#555555]">
          CAREER RECORDS: {experience.length}
        </span>
        <Button
          variant="orange"
          size="sm"
          onClick={handleOpenAdd}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Experience
        </Button>
      </div>

      <div className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-[#111111] bg-[#F5F3E9] font-mono text-xs uppercase font-bold">
              <th className="p-4 border-r border-[#111111]/20">Role</th>
              <th className="p-4 border-r border-[#111111]/20">Company</th>
              <th className="p-4 border-r border-[#111111]/20">Dates</th>
              <th className="p-4 border-r border-[#111111]/20">Status</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y border-[#111111]/20 font-sans text-sm">
            {experience.map((exp, idx) => (
              <tr key={exp._id || exp.title + idx} className="hover:bg-[#FFFBEA]">
                <td className="p-4 font-bold text-[#111111] border-r border-[#111111]/20">
                  {exp.title}
                </td>
                <td className="p-4 text-[#FF5722] font-bold border-r border-[#111111]/20">
                  {exp.company}
                </td>
                <td className="p-4 font-mono text-xs border-r border-[#111111]/20">
                  {exp.startDate} — {exp.endDate}
                </td>
                <td className="p-4 font-mono text-xs border-r border-[#111111]/20">
                  {exp.current ? (
                    <span className="px-2 py-0.5 bg-[#83E52B] border border-black font-bold">
                      ACTIVE
                    </span>
                  ) : (
                    <span className="text-[#555555]">PAST</span>
                  )}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(exp)}
                    className="p-1.5 border border-black bg-[#F5F3E9] hover:bg-[#83E52B] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(exp._id)}
                    className="p-1.5 border border-black bg-[#F5F3E9] hover:bg-[#FF5722] transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingExp ? "Edit Experience" : "Add Experience"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Job Title *
              </label>
              <input
                type="text"
                required
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Company *
              </label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Type
              </label>
              <input
                type="text"
                value={formData.employmentType}
                onChange={(e) => setFormData({ ...formData, employmentType: e.target.value })}
                placeholder="Full-Time"
                className="w-full p-2 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Start Date *
              </label>
              <input
                type="text"
                required
                value={formData.startDate}
                onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                placeholder="2023"
                className="w-full p-2 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                End Date
              </label>
              <input
                type="text"
                value={formData.endDate}
                onChange={(e) => setFormData({ ...formData, endDate: e.target.value })}
                placeholder="Present"
                className="w-full p-2 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <input
              type="checkbox"
              id="current"
              checked={formData.current}
              onChange={(e) => setFormData({ ...formData, current: e.target.checked })}
              className="w-4 h-4 accent-[#83E52B]"
            />
            <label htmlFor="current" className="font-mono text-xs uppercase font-bold text-[#111111]">
              Current Active Employment
            </label>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Description *
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Key Achievements (One per line)
            </label>
            <textarea
              rows={3}
              value={formData.achievementsText}
              onChange={(e) => setFormData({ ...formData, achievementsText: e.target.value })}
              className="w-full p-2 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-xs"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Technologies (Comma separated)
            </label>
            <input
              type="text"
              value={formData.technologiesText}
              onChange={(e) => setFormData({ ...formData, technologiesText: e.target.value })}
              placeholder="Next.js, TypeScript, MongoDB"
              className="w-full p-2 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
            />
          </div>

          <div className="pt-4 border-t-2 border-[#111111] flex justify-end gap-2">
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="submit" variant="orange" size="sm" disabled={loading}>
              {loading ? "Saving..." : "Save Role"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

