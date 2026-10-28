import React from "react";
import Image from "next/image";

interface ProjectCoverProps {
  src: string;
  alt: string;
  title: string;
  category: string;
}

export function ProjectCover({ src, alt, title, category }: ProjectCoverProps) {
  return (
    <div className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal-lg overflow-hidden">
      {/* Top Header Tab inspired by Reference Screenshot 1 & 3 */}
      <div className="flex items-center justify-between border-b-2 border-[#111111] bg-[#F5F3E9] px-4 sm:px-6 py-3 font-mono text-xs uppercase font-bold">
        <div className="flex items-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#FF5722] border border-black" />
          <span className="text-[#111111]">CASE STUDY ARCHIVE // {category}</span>
        </div>
        <div className="bg-[#111111] text-[#FFFBEA] px-2.5 py-0.5 text-[10px]">
          HIGH RESOLUTION
        </div>
      </div>

      {/* Hero Image */}
      <div className="relative aspect-[16/9] md:aspect-[21/9] w-full bg-[#EFECE0]">
        <Image
          src={src || "/images/project-kronos.svg"}
          alt={alt}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-[#111111] text-[#FFFBEA] border-2 border-[#111111] p-3 sm:p-4 shadow-brutal-orange">
          <div className="font-mono text-xs text-[#83E52B] uppercase tracking-wider font-bold">
            FEATURED CASE STUDY
          </div>
          <div className="font-heading text-lg sm:text-2xl uppercase font-black tracking-tight mt-1">
            {title}
          </div>
        </div>
      </div>
    </div>
  );
}

