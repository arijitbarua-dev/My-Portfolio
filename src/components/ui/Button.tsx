"use client";

import React from "react";
import Link from "next/link";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "orange" | "lime" | "pill" | "pill-orange" | "pill-lime";
  size?: "sm" | "md" | "lg";
  href?: string;
  download?: boolean | string;
  target?: string;
  rel?: string;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  download,
  target,
  rel,
  icon,
  iconPosition = "right",
  className = "",
  ...props
}: ButtonProps) {
  const sizeStyles = {
    sm: "px-3 py-1.5 text-xs font-mono tracking-wider",
    md: "px-5 py-2.5 text-sm font-mono tracking-wider",
    lg: "px-7 py-3.5 text-base font-bold font-mono tracking-wider",
  }[size];

  const variantStyles = {
    primary:
      "bg-[#111111] text-[#FFFBEA] border-2 border-[#111111] shadow-brutal hover-lift hover:bg-[#222222]",
    secondary:
      "bg-transparent text-[#111111] border-2 border-[#111111] shadow-brutal hover-lift hover:bg-[#F5F3E9]",
    orange:
      "bg-[#FF5722] text-[#111111] border-2 border-[#111111] shadow-brutal hover-lift hover:bg-[#ff6e3f]",
    lime:
      "bg-[#83E52B] text-[#111111] border-2 border-[#111111] shadow-brutal hover-lift hover:bg-[#99ea4e]",
    pill:
      "rounded-full bg-[#F5F3E9] text-[#111111] border-2 border-[#111111] hover:bg-[#111111] hover:text-[#FFFBEA] transition-colors",
    "pill-orange":
      "rounded-full bg-[#FF5722] text-[#111111] border-2 border-[#111111] hover:brightness-105 transition-all font-bold",
    "pill-lime":
      "rounded-full bg-[#83E52B] text-[#111111] border-2 border-[#111111] hover:brightness-105 transition-all font-bold",
  }[variant];

  const content = (
    <>
      {icon && iconPosition === "left" && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === "right" && <span className="inline-flex shrink-0">{icon}</span>}
    </>
  );

  const baseClasses = `inline-flex items-center justify-center gap-2 font-bold uppercase transition-all select-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed ${sizeStyles} ${variantStyles} ${className}`;

  if (href) {
    if (download) {
      return (
        <a
          href={href}
          download={download}
          target={target}
          rel={rel}
          className={baseClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} target={target} rel={rel} className={baseClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={baseClasses} {...props}>
      {content}
    </button>
  );
}

