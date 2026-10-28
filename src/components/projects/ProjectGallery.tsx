import React from "react";
import Image from "next/image";

interface ProjectGalleryProps {
  images: string[];
  projectTitle: string;
}

export function ProjectGallery({ images, projectTitle }: ProjectGalleryProps) {
  if (!images || images.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b-2 border-[#111111] pb-3">
        <h3 className="font-heading text-2xl uppercase font-black text-[#111111]">
          Visual Artifacts & Gallery
        </h3>
        <span className="font-mono text-xs uppercase text-[#555555]">
          {images.length} FRAMES ARCHIVED
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        {images.map((imgSrc, index) => {
          const frameNum = String(index + 1).padStart(2, "0");

          return (
            <div
              key={index}
              className="border-3 border-[#111111] bg-[#FFFFFF] shadow-brutal hover-lift flex flex-col overflow-hidden"
            >
              {/* File Tab Header (Exact match to Reference Screenshot 3) */}
              <div className="flex items-center justify-between border-b-2 border-[#111111] bg-[#F5F3E9] px-4 py-2 font-mono text-xs font-bold uppercase">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111111] text-[#FFFBEA] px-2 py-0.5 text-[10px]">
                    GALLERY {frameNum}
                  </span>
                  <span className="text-[#555555]">SCREENSHOT CAPTURE</span>
                </div>
                <span className="text-[#FF5722] font-black text-[10px]">VERIFIED</span>
              </div>

              {/* Gallery Image Container */}
              <div className="relative aspect-[16/10] w-full bg-[#EFECE0]">
                <Image
                  src={imgSrc}
                  alt={`${projectTitle} screenshot ${frameNum}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>

              {/* Bottom spec bar */}
              <div className="p-3 border-t-2 border-[#111111] bg-[#FFFBEA] flex items-center justify-between font-mono text-xs text-[#555555]">
                <span>ARTIFACT // {projectTitle.slice(0, 15)}</span>
                <span className="text-[#111111] font-bold">1200 x 800 PX</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

