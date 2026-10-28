import React from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Grid } from "lucide-react";

interface ProjectNavigationProps {
  prevSlug?: string;
  prevTitle?: string;
  nextSlug?: string;
  nextTitle?: string;
}

export function ProjectNavigation({
  prevSlug,
  prevTitle,
  nextSlug,
  nextTitle,
}: ProjectNavigationProps) {
  return (
    <div className="border-t-3 border-[#111111] pt-8 mt-12 flex flex-col sm:flex-row items-center justify-between gap-4">
      {prevSlug ? (
        <Link
          href={`/projects/${prevSlug}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-[#111111] bg-[#FFFFFF] shadow-brutal hover-lift font-mono text-xs font-bold uppercase"
        >
          <ArrowLeft className="w-4 h-4 text-[#FF5722]" />
          <span>Prev: {prevTitle?.slice(0, 20)}</span>
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}

      <Link
        href="/#projects"
        className="inline-flex items-center gap-2 px-5 py-3 border-2 border-[#111111] bg-[#F5F3E9] shadow-brutal-sm hover-lift font-mono text-xs font-bold uppercase"
      >
        <Grid className="w-4 h-4" />
        <span>All Case Studies</span>
      </Link>

      {nextSlug ? (
        <Link
          href={`/projects/${nextSlug}`}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 border-2 border-[#111111] bg-[#FFFFFF] shadow-brutal hover-lift font-mono text-xs font-bold uppercase"
        >
          <span>Next: {nextTitle?.slice(0, 20)}</span>
          <ArrowRight className="w-4 h-4 text-[#83E52B]" />
        </Link>
      ) : (
        <div className="hidden sm:block" />
      )}
    </div>
  );
}

