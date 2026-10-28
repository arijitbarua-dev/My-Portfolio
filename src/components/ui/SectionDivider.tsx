import React from "react";

interface SectionDividerProps {
  label?: string;
  number?: string;
  variant?: "orange" | "lime" | "cream" | "black";
  align?: "left" | "right";
  className?: string;
}

export function SectionDivider({
  label,
  number,
  variant = "orange",
  align = "left",
  className = "",
}: SectionDividerProps) {
  const badgeColors = {
    orange: "bg-[#FF5722] text-[#111111]",
    lime: "bg-[#83E52B] text-[#111111]",
    cream: "bg-[#F5F3E9] text-[#111111]",
    black: "bg-[#111111] text-[#FFFBEA]",
  }[variant];

  return (
    <div className={`relative flex items-center my-12 sm:my-16 ${className}`}>
      {/* Heavy horizontal rule */}
      <div className="w-full h-[3px] bg-[#111111]" />

      {(number || label) && (
        <div
          className={`absolute top-1/2 -translate-y-1/2 flex items-center border-2 border-[#111111] shadow-brutal-sm font-mono text-xs uppercase font-bold tracking-wider ${badgeColors} ${
            align === "left" ? "left-0 sm:left-4" : "right-0 sm:right-4"
          }`}
        >
          {number && (
            <span className="px-2.5 py-1 border-r-2 border-[#111111] bg-black/10">
              {number}
            </span>
          )}
          {label && <span className="px-3 py-1">{label}</span>}
        </div>
      )}
    </div>
  );
}

