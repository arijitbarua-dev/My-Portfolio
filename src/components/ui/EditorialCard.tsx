import React from "react";

interface EditorialCardProps {
  children: React.ReactNode;
  headerTag?: string;
  headerNumber?: string;
  headerRight?: React.ReactNode;
  variant?: "cream" | "white" | "surface" | "orange" | "lime";
  shadow?: "none" | "sm" | "normal" | "md" | "lg" | "orange" | "lime";
  className?: string;
  innerClassName?: string;
}

export function EditorialCard({
  children,
  headerTag,
  headerNumber,
  headerRight,
  variant = "cream",
  shadow = "normal",
  className = "",
  innerClassName = "p-5 sm:p-7",
}: EditorialCardProps) {
  const bgStyles = {
    cream: "bg-[#FFFBEA]",
    white: "bg-[#FFFFFF]",
    surface: "bg-[#F5F3E9]",
    orange: "bg-[#FF5722]",
    lime: "bg-[#83E52B]",
  }[variant];

  const shadowStyles = {
    none: "",
    sm: "shadow-brutal-sm",
    normal: "shadow-brutal",
    md: "shadow-brutal-md",
    lg: "shadow-brutal-lg",
    orange: "shadow-brutal-orange",
    lime: "shadow-brutal-lime",
  }[shadow];

  return (
    <div
      className={`border-2 border-[#111111] ${bgStyles} ${shadowStyles} ${className} relative flex flex-col`}
    >
      {/* Optional Editorial File Tab / Header Bar */}
      {(headerTag || headerNumber || headerRight) && (
        <div className="flex items-center justify-between border-b-2 border-[#111111] bg-[#111111]/5 px-4 py-2 font-mono text-xs uppercase tracking-wider font-bold">
          <div className="flex items-center gap-2">
            {headerNumber && (
              <span className="bg-[#111111] text-[#FFFBEA] px-2 py-0.5 text-[10px]">
                {headerNumber}
              </span>
            )}
            {headerTag && <span className="text-[#111111]">{headerTag}</span>}
          </div>
          {headerRight && <div>{headerRight}</div>}
        </div>
      )}

      {/* Card Content */}
      <div className={innerClassName}>{children}</div>
    </div>
  );
}

