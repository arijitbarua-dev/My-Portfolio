import React from "react";

interface SectionHeadingProps {
  title: string;
  italicWord?: string;
  subtitle?: string;
  align?: "left" | "center" | "right";
  className?: string;
}

export function SectionHeading({
  title,
  italicWord,
  subtitle,
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const alignmentClass = {
    left: "text-left items-start",
    center: "text-center items-center",
    right: "text-right items-end",
  }[align];

  return (
    <div className={`flex flex-col gap-2 ${alignmentClass} ${className}`}>
      <h2 className="text-3xl sm:text-5xl md:text-6xl font-black uppercase tracking-tight text-[#111111] leading-[1.05]">
        {title}{" "}
        {italicWord && (
          <span
            style={{ fontFamily: "var(--font-serif)" }}
            className="italic font-normal lowercase tracking-normal text-[#111111]"
          >
            {italicWord}
          </span>
        )}
      </h2>
      {subtitle && (
        <p className="text-sm sm:text-base text-[#555555] max-w-2xl font-sans mt-1">
          {subtitle}
        </p>
      )}
    </div>
  );
}

