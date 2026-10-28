import React from "react";
import Link from "next/link";
import { ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FFFBEA] flex items-center justify-center p-6 text-[#111111]">
      <div className="w-full max-w-lg border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal-lg p-8 sm:p-12 space-y-6 text-center">
        
        {/* Header Tab */}
        <div className="flex items-center justify-center gap-2">
          <span className="px-3 py-1 bg-[#FF5722] text-[#111111] border-2 border-black font-mono text-xs font-bold uppercase shadow-brutal-sm">
            ERROR 404 // ROUTE VOID
          </span>
        </div>

        <div className="space-y-2">
          <h1 className="font-heading text-6xl sm:text-7xl font-black uppercase tracking-tight text-[#111111]">
            404
          </h1>
          <p
            style={{ fontFamily: "var(--font-serif)" }}
            className="text-xl sm:text-2xl italic text-[#555555]"
          >
            The requested artifact or page could not be located.
          </p>
        </div>

        <p className="font-sans text-sm text-[#444444] max-w-sm mx-auto leading-relaxed">
          The link may have expired, moved to another catalog slug, or never existed in this editorial archive.
        </p>

        <div className="pt-4 flex justify-center">
          <Button
            variant="primary"
            size="md"
            href="/"
            icon={<ArrowLeft className="w-4 h-4 text-[#83E52B]" />}
            iconPosition="left"
          >
            Return to Homepage
          </Button>
        </div>

        <div className="pt-6 border-t border-[#111111]/20 font-mono text-xs text-[#555555]">
          EDITORIAL PORTFOLIO // 2026
        </div>
      </div>
    </div>
  );
}

