"use client";

import { useState } from "react";
import { Search, Aperture, Sun, Moon, Menu, X } from "lucide-react";
import Upload_btn from "./upload_btn";
import { useTheme } from "./ThemeContext";

interface NavbarProps {
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  onUploadSuccess?: () => void;
}

export default function Navbar({
  searchQuery = "",
  onSearchChange,
  onUploadSuccess,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className={`sticky top-0 z-40 py-3 px-4 sm:px-6 lg:px-8 border-b transition-colors ${
      isDark
        ? "bg-[#09090b]/90 border-zinc-800 text-white backdrop-blur-xl"
        : "bg-white/90 border-zinc-200 text-zinc-900 backdrop-blur-xl"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Emblem */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className={`size-9 rounded-full p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center ${
            isDark ? "bg-white" : "bg-black"
          }`}>
            <div className={`size-full rounded-full flex items-center justify-center ${
              isDark ? "bg-black text-white" : "bg-white text-black"
            }`}>
              <Aperture className="size-5" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight flex items-center gap-1">
              Lumina<span className={`font-normal ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>.vault</span>
            </span>
            <span className={`text-[9px] font-mono block -mt-1 ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              Digital Media Platform
            </span>
          </div>
        </a>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 ${isDark ? "text-zinc-400" : "text-zinc-500"}`} />
            <input
              type="text"
              placeholder="Search gallery by tag, name, or format..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-full outline-none transition-all ${
                isDark
                  ? "bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500 focus:border-zinc-500"
                  : "bg-zinc-100 border border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500"
              }`}
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition-all cursor-pointer ${
              isDark
                ? "bg-zinc-900 border-zinc-800 text-amber-400 hover:bg-zinc-800"
                : "bg-zinc-100 border-zinc-300 text-zinc-700 hover:bg-zinc-200"
            }`}
            title={isDark ? "Switch to Light Mode" : "Switch to Dark Mode"}
            aria-label="Toggle Theme"
          >
            {isDark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </button>

          <Upload_btn fetch_data={() => onUploadSuccess?.()} />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`md:hidden p-2 rounded-full border ${
              isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-zinc-100 border-zinc-300 text-zinc-700"
            }`}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Drawer */}
      {mobileMenuOpen && (
        <div className={`md:hidden pt-3 mt-3 border-t flex flex-col gap-2 animate-in fade-in ${
          isDark ? "border-zinc-800" : "border-zinc-200"
        }`}>
          <div className="relative w-full">
            <Search className={`absolute left-3.5 top-1/2 -translate-y-1/2 size-4 ${isDark ? "text-zinc-400" : "text-zinc-500"}`} />
            <input
              type="text"
              placeholder="Search by tag..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 text-xs rounded-full outline-none ${
                isDark
                  ? "bg-zinc-900 border border-zinc-800 text-white placeholder-zinc-500"
                  : "bg-zinc-100 border border-zinc-300 text-zinc-900 placeholder-zinc-400"
              }`}
            />
          </div>
        </div>
      )}
    </header>
  );
}
