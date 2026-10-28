import React from "react";

interface SectionLabelProps {
  children: React.ReactNode;
  variant?: "orange" | "lime" | "cream" | "black";
  className?: string;
}

export function SectionLabel({
  children,
  variant = "orange",
  className = "",
}: SectionLabelProps) {
  const variantStyles = {
    orange: "bg-[#FF5722] text-[#111111] border-[#111111]",
    lime: "bg-[#83E52B] text-[#111111] border-[#111111]",
    cream: "bg-[#F5F3E9] text-[#111111] border-[#111111]",
    black: "bg-[#111111] text-[#FFFBEA] border-[#111111]",
  };

  return (
    <div
      className={`inline-flex items-center gap-1.5 px-3 py-1 border-2 font-mono text-xs uppercase tracking-widest font-bold shadow-brutal-sm select-none ${variantStyles[variant]} ${className}`}
    >
      {children}
    </div>
  );
}

