import React from "react";

interface DecorativeStarProps {
  color?: "orange" | "lime" | "black";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export function DecorativeStar({
  color = "orange",
  size = "md",
  className = "",
}: DecorativeStarProps) {
  const colorMap = {
    orange: "text-[#FF5722]",
    lime: "text-[#83E52B]",
    black: "text-[#111111]",
  }[color];

  const sizeMap = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  }[size];

  return (
    <span
      className={`inline-block font-black select-none leading-none ${colorMap} ${sizeMap} ${className}`}
      aria-hidden="true"
    >
      ✱
    </span>
  );
}

