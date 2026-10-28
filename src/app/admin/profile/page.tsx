import React from "react";
import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { getProfile } from "@/lib/data";
import { ProfileEditorForm } from "./ProfileEditorForm";

export default async function AdminProfilePage() {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login");
  }

  const profile = await getProfile();

  return (
    <div className="space-y-8">
      <div className="border-b-3 border-[#111111] pb-6">
        <div className="font-mono text-xs uppercase text-[#FF5722] font-bold">
          ADMINISTRATION // IDENTITY
        </div>
        <h1 className="font-heading text-3xl sm:text-4xl uppercase font-black text-[#111111]">
          Edit Public Profile
        </h1>
        <p className="font-sans text-sm text-[#555555] mt-1">
          Customize your name, professional designation, headline, narrative bio, and communication coordinates.
        </p>
      </div>

      <ProfileEditorForm initialProfile={profile} />
    </div>
  );
}

