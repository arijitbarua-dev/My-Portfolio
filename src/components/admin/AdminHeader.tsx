"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { LogOut, ShieldCheck } from "lucide-react";
import { authClient } from "@/lib/auth-client";

interface AdminHeaderProps {
  userEmail?: string;
}

export function AdminHeader({ userEmail }: AdminHeaderProps) {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      router.push("/admin/login");
      router.refresh();
    } catch (err) {
      console.error("Sign out error:", err);
    }
  };

  return (
    <header className="h-16 border-b-3 border-[#111111] bg-[#FFFBEA] px-6 sm:px-8 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5 px-2.5 py-1 bg-[#83E52B]/30 border border-black font-mono text-xs font-bold uppercase text-[#111111]">
          <ShieldCheck className="w-3.5 h-3.5 text-[#111111]" />
          <span>AUTHENTICATED CMS</span>
        </div>
        <span className="hidden sm:inline font-mono text-xs text-[#555555]">
          SESSION ACTIVE: <span className="font-bold text-[#111111]">{userEmail || "Admin"}</span>
        </span>
      </div>

      <button
        onClick={handleSignOut}
        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 bg-[#FF5722] text-[#111111] border-2 border-[#111111] font-mono text-xs font-bold uppercase tracking-wider shadow-brutal-sm hover-lift cursor-pointer"
      >
        <LogOut className="w-3.5 h-3.5" />
        <span>Sign Out</span>
      </button>
    </header>
  );
}

