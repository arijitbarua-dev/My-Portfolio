"use client";

import React, { useState } from "react";
import { Skill } from "@/types";
import { createSkill, updateSkill, deleteSkill } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Plus, Edit2, Trash2, Check, AlertCircle } from "lucide-react";

interface SkillsManagerProps {
  initialSkills: Skill[];
}

export function SkillsManager({ initialSkills }: SkillsManagerProps) {
  const [skills, setSkills] = useState<Skill[]>(initialSkills);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);

  const [formData, setFormData] = useState<{
    name: string;
    category: "Frontend" | "Backend" | "Database" | "Tools and Workflow";
    icon: string;
    proficiency?: number;
    displayOrder: number;
  }>({
    name: "",
    category: "Frontend",
    icon: "Code2",
    proficiency: undefined,
    displayOrder: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleOpenAdd = () => {
    setEditingSkill(null);
    setFormData({
      name: "",
      category: "Frontend",
      icon: "Code2",
      proficiency: undefined,
      displayOrder: skills.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (skill: Skill) => {
    setEditingSkill(skill);
    setFormData({
      name: skill.name,
      category: skill.category as any,
      icon: skill.icon,
      proficiency: skill.proficiency,
      displayOrder: skill.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Are you sure you want to remove this skill?")) return;
    try {
      await deleteSkill(id);
      setSkills(skills.filter((s) => s._id !== id));
    } catch (err) {
      alert("Failed to delete skill.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingSkill && editingSkill._id) {
        const res = await updateSkill(editingSkill._id, formData);
        setSkills(skills.map((s) => (s._id === editingSkill._id ? res.skill : s)));
      } else {
        const res = await createSkill(formData);
        setSkills([...skills, res.skill]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to save skill.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs uppercase font-bold text-[#555555]">
          TOTAL SKILLS: {skills.length}
        </span>
        <Button
          variant="orange"
          size="sm"
          onClick={handleOpenAdd}
          icon={<Plus className="w-4 h-4" />}
        >
          Add New Skill
        </Button>
      </div>

      {/* Skills Table */}
      <div className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-[#111111] bg-[#F5F3E9] font-mono text-xs uppercase font-bold">
              <th className="p-4 border-r border-[#111111]/20">Order</th>
              <th className="p-4 border-r border-[#111111]/20">Skill Name</th>
              <th className="p-4 border-r border-[#111111]/20">Category</th>
              <th className="p-4 border-r border-[#111111]/20">Icon</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y border-[#111111]/20 font-sans text-sm">
            {skills.map((skill, idx) => (
              <tr key={skill._id || skill.name + idx} className="hover:bg-[#FFFBEA]">
                <td className="p-4 font-mono text-xs font-bold border-r border-[#111111]/20">
                  {skill.displayOrder || idx + 1}
                </td>
                <td className="p-4 font-bold text-[#111111] border-r border-[#111111]/20">
                  {skill.name}
                </td>
                <td className="p-4 font-mono text-xs border-r border-[#111111]/20">
                  <span className="px-2 py-0.5 border border-black bg-[#FFFBEA]">
                    {skill.category}
                  </span>
                </td>
                <td className="p-4 font-mono text-xs border-r border-[#111111]/20">
                  {skill.icon}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(skill)}
                    className="p-1.5 border border-black bg-[#F5F3E9] hover:bg-[#83E52B] transition-colors"
                    title="Edit"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(skill._id)}
                    className="p-1.5 border border-black bg-[#F5F3E9] hover:bg-[#FF5722] transition-colors"
                    title="Delete"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal Dialog */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingSkill ? "Edit Skill" : "Add New Skill"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Skill Name *
            </label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="e.g. Next.js, Docker, MongoDB"
              className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
            />
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Category *
            </label>
            <select
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value as any })}
              className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
            >
              <option value="Frontend">Frontend</option>
              <option value="Backend">Backend</option>
              <option value="Database">Database</option>
              <option value="Tools and Workflow">Tools and Workflow</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Icon Name
              </label>
              <input
                type="text"
                value={formData.icon}
                onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                placeholder="Code2, Server, Database"
                className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
              />
            </div>

            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Display Order
              </label>
              <input
                type="number"
                value={formData.displayOrder}
                onChange={(e) => setFormData({ ...formData, displayOrder: Number(e.target.value) })}
                className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
              />
            </div>
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
              {loading ? "Saving..." : "Save Skill"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

