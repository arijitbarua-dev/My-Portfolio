"use client";

import React, { useState } from "react";
import { Profile } from "@/types";
import { updateProfile } from "@/lib/actions";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, AlertCircle, Save } from "lucide-react";

interface ProfileEditorFormProps {
  initialProfile: Profile;
}

export function ProfileEditorForm({ initialProfile }: ProfileEditorFormProps) {
  const [formData, setFormData] = useState({
    name: initialProfile.name || "",
    slug: initialProfile.slug || "portfolio-owner",
    designation: initialProfile.designation || "",
    headline: initialProfile.headline || "",
    introduction: initialProfile.introduction || "",
    about: initialProfile.about || "",
    location: initialProfile.location || "",
    portrait: initialProfile.portrait || "/images/portrait-placeholder.svg",
    resumeUrl: initialProfile.resumeUrl || "/resume.pdf",
    email: initialProfile.email || "",
    phone: initialProfile.phone || "",
    whatsapp: initialProfile.whatsapp || "",
    availability: initialProfile.availability || "",
  });

  const [saving, setSaving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatusMessage(null);

    try {
      await updateProfile(formData);
      setStatusMessage({
        type: "success",
        text: "Profile updated successfully! Public pages are revalidated.",
      });
    } catch (err: any) {
      setStatusMessage({
        type: "error",
        text: err.message || "Failed to update profile.",
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal p-6 sm:p-10 space-y-6">
      {statusMessage && (
        <div
          className={`p-4 border-2 flex items-start gap-3 ${
            statusMessage.type === "success"
              ? "bg-[#83E52B]/20 border-[#83E52B] text-black"
              : "bg-[#FF5722]/20 border-[#FF5722] text-[#111111]"
          }`}
        >
          {statusMessage.type === "success" ? (
            <CheckCircle2 className="w-5 h-5 text-black shrink-0 mt-0.5" />
          ) : (
            <AlertCircle className="w-5 h-5 text-[#FF5722] shrink-0 mt-0.5" />
          )}
          <span className="font-mono text-xs font-bold">{statusMessage.text}</span>
        </div>
      )}

      {/* Row: Name & Designation */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Display Name *
          </label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Professional Designation *
          </label>
          <input
            type="text"
            name="designation"
            required
            value={formData.designation}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>
      </div>

      {/* Headline */}
      <div className="space-y-1">
        <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
          Hero Headline *
        </label>
        <input
          type="text"
          name="headline"
          required
          value={formData.headline}
          onChange={handleChange}
          className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
        />
      </div>

      {/* Brief Introduction */}
      <div className="space-y-1">
        <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
          Concise Hero Intro *
        </label>
        <textarea
          name="introduction"
          rows={3}
          required
          value={formData.introduction}
          onChange={handleChange}
          className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
        />
      </div>

      {/* Full Narrative Bio */}
      <div className="space-y-1">
        <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
          About Me (Section 02 Narrative Bio) *
        </label>
        <textarea
          name="about"
          rows={6}
          required
          value={formData.about}
          onChange={handleChange}
          className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
        />
        <p className="font-mono text-[11px] text-[#555555]">
          Tip: Separate paragraphs with a blank line.
        </p>
      </div>

      {/* Location & Availability */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Location / Remote Region *
          </label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Availability Status *
          </label>
          <input
            type="text"
            name="availability"
            required
            value={formData.availability}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>
      </div>

      {/* Image & Resume URLs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Portrait Image Path / URL *
          </label>
          <input
            type="text"
            name="portrait"
            required
            value={formData.portrait}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Resume File Path / URL
          </label>
          <input
            type="text"
            name="resumeUrl"
            value={formData.resumeUrl}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>
      </div>

      {/* Communication Contacts */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Primary Email *
          </label>
          <input
            type="email"
            name="email"
            required
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            Direct Phone
          </label>
          <input
            type="text"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>

        <div className="space-y-1">
          <label className="block font-mono text-xs uppercase font-bold text-[#111111]">
            WhatsApp Number
          </label>
          <input
            type="text"
            name="whatsapp"
            value={formData.whatsapp}
            onChange={handleChange}
            className="w-full p-3 bg-[#FFFBEA] border-2 border-[#111111] font-mono text-xs focus:outline-none focus:ring-2 focus:ring-[#83E52B]"
          />
        </div>
      </div>

      <div className="pt-4 border-t-2 border-[#111111]">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={saving}
          icon={<Save className="w-4 h-4 text-[#83E52B]" />}
        >
          {saving ? "Saving Changes..." : "Save Profile Details"}
        </Button>
      </div>
    </form>
  );
}

