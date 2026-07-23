"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "glow";
  size?: "sm" | "md" | "lg";
  children: React.ReactNode;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { className, variant = "primary", size = "md", children, ...props },
    ref
  ) => {
    const sizeClasses = {
      sm: "px-3.5 py-1.5 text-xs rounded-full font-medium",
      md: "px-5 py-2 text-xs font-semibold tracking-wide rounded-full",
      lg: "px-7 py-2.5 text-sm font-semibold tracking-wide rounded-full",
    };

    const variantClasses = {
      primary:
        "bg-white text-black hover:bg-zinc-200 font-semibold shadow-sm transition-all duration-200 active:scale-[0.98]",
      glow: "bg-white text-black hover:bg-zinc-100 font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)] transition-all duration-200 active:scale-[0.98]",
      secondary:
        "bg-zinc-900 text-white border border-zinc-800 hover:bg-zinc-800 hover:border-zinc-700 transition-all duration-200",
      outline:
        "border border-zinc-700 text-zinc-200 hover:bg-zinc-800 hover:border-zinc-500 rounded-full transition-all duration-200",
      ghost:
        "text-zinc-400 hover:text-white hover:bg-zinc-800/60 rounded-full transition-all duration-200",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-zinc-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
          sizeClasses[size],
          variantClasses[variant],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
