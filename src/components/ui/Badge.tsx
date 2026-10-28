import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "orange" | "lime" | "dark";
  className?: string;
}

export function Badge({
  children,
  variant = "default",
  className = "",
}: BadgeProps) {
  const variantStyles = {
    default: "bg-[#FFFFFF] text-[#111111] border-[#111111]",
    orange: "bg-[#FF5722]/20 text-[#111111] border-[#FF5722]",
    lime: "bg-[#83E52B]/30 text-[#111111] border-[#83E52B]",
    dark: "bg-[#111111] text-[#FFFBEA] border-[#111111]",
  }[variant];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 border text-xs font-mono font-medium tracking-wide ${variantStyles} ${className}`}
    >
      {children}
    </span>
  );
}

