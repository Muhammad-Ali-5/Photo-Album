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
        "bg-gradient-to-r from-purple-600 via-indigo-600 to-violet-700 text-white shadow-md hover:shadow-purple-500/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-purple-400/30",
      glow: "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-[0_0_20px_rgba(147,51,234,0.4)] hover:shadow-[0_0_30px_rgba(147,51,234,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 border border-purple-400/40 font-semibold",
      secondary:
        "bg-white/10 backdrop-blur-md text-white border border-white/15 hover:bg-white/20 hover:border-white/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200",
      outline:
        "border border-purple-500/40 text-purple-200 hover:bg-purple-500/10 hover:border-purple-400 rounded-full transition-all duration-200",
      ghost:
        "text-gray-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200",
    };

    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all focus:outline-none focus:ring-2 focus:ring-purple-500/50 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed select-none",
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
