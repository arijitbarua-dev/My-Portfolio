"use client";

import React, { useState } from "react";
import { Education } from "@/types";
import { createEducation, updateEducation, deleteEducation } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { Modal } from "@/components/ui/Modal";
import { Plus, Edit2, Trash2 } from "lucide-react";

interface EducationManagerProps {
  initialEducation: Education[];
}

export function EducationManager({ initialEducation }: EducationManagerProps) {
  const [education, setEducation] = useState<Education[]>(initialEducation);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);

  const [formData, setFormData] = useState<{
    qualification: string;
    institution: string;
    subject: string;
    startYear: string | number;
    endYear: string | number;
    grade?: string;
    description: string;
    displayOrder: number;
  }>({
    qualification: "",
    institution: "",
    subject: "",
    startYear: 2018,
    endYear: 2022,
    grade: "",
    description: "",
    displayOrder: 0,
  });

  const [loading, setLoading] = useState(false);

  const handleOpenAdd = () => {
    setEditingEdu(null);
    setFormData({
      qualification: "",
      institution: "",
      subject: "",
      startYear: 2018,
      endYear: 2022,
      grade: "",
      description: "",
      displayOrder: education.length + 1,
    });
    setIsModalOpen(true);
  };

  const handleOpenEdit = (edu: Education) => {
    setEditingEdu(edu);
    setFormData({
      qualification: edu.qualification,
      institution: edu.institution,
      subject: edu.subject,
      startYear: edu.startYear,
      endYear: edu.endYear,
      grade: edu.grade || "",
      description: edu.description,
      displayOrder: edu.displayOrder,
    });
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: string) => {
    if (!id) return;
    if (!confirm("Delete this academic record?")) return;
    try {
      await deleteEducation(id);
      setEducation(education.filter((e) => e._id !== id));
    } catch (err) {
      alert("Failed to delete record.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingEdu && editingEdu._id) {
        const res = await updateEducation(editingEdu._id, formData);
        setEducation(education.map((e) => (e._id === editingEdu._id ? res.education : e)));
      } else {
        const res = await createEducation(formData);
        setEducation([...education, res.education]);
      }
      setIsModalOpen(false);
    } catch (err: any) {
      alert(err.message || "Failed to save record.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <span className="font-mono text-xs uppercase font-bold text-[#555555]">
          ACADEMIC RECORDS: {education.length}
        </span>
        <Button
          variant="lime"
          size="sm"
          onClick={handleOpenAdd}
          icon={<Plus className="w-4 h-4" />}
        >
          Add Record
        </Button>
      </div>

      <div className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b-2 border-[#111111] bg-[#F5F3E9] font-mono text-xs uppercase font-bold">
              <th className="p-4 border-r border-[#111111]/20">Degree / Qualification</th>
              <th className="p-4 border-r border-[#111111]/20">Institution</th>
              <th className="p-4 border-r border-[#111111]/20">Subject</th>
              <th className="p-4 border-r border-[#111111]/20">Years</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y border-[#111111]/20 font-sans text-sm">
            {education.map((edu, idx) => (
              <tr key={edu._id || edu.qualification + idx} className="hover:bg-[#FFFBEA]">
                <td className="p-4 font-bold text-[#111111] border-r border-[#111111]/20">
                  {edu.qualification}
                </td>
                <td className="p-4 text-[#FF5722] font-bold border-r border-[#111111]/20">
                  {edu.institution}
                </td>
                <td className="p-4 border-r border-[#111111]/20">
                  {edu.subject}
                </td>
                <td className="p-4 font-mono text-xs border-r border-[#111111]/20">
                  {edu.startYear} — {edu.endYear}
                </td>
                <td className="p-4 text-right space-x-2">
                  <button
                    onClick={() => handleOpenEdit(edu)}
                    className="p-1.5 border border-black bg-[#F5F3E9] hover:bg-[#83E52B] transition-colors"
                  >
                    <Edit2 className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu._id)}
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
        title={editingEdu ? "Edit Education" : "Add Education"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Degree / Qualification *
            </label>
            <input
              type="text"
              required
              value={formData.qualification}
              onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
              className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Institution *
              </label>
              <input
                type="text"
                required
                value={formData.institution}
                onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
                className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Subject / Major *
              </label>
              <input
                type="text"
                required
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Start Year
              </label>
              <input
                type="text"
                value={formData.startYear}
                onChange={(e) => setFormData({ ...formData, startYear: e.target.value })}
                className="w-full p-2 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                End Year
              </label>
              <input
                type="text"
                value={formData.endYear}
                onChange={(e) => setFormData({ ...formData, endYear: e.target.value })}
                className="w-full p-2 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
              />
            </div>
            <div className="space-y-1">
              <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
                Grade / Distinction
              </label>
              <input
                type="text"
                value={formData.grade}
                onChange={(e) => setFormData({ ...formData, grade: e.target.value })}
                placeholder="First Class"
                className="w-full p-2 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
              Coursework / Description *
            </label>
            <textarea
              rows={3}
              required
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full p-2.5 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm"
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
              {loading ? "Saving..." : "Save Record"}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

