"use client";

import { useState } from "react";
import { Button } from "@/components/button";
import { Search, Aperture, Sparkles, Upload, Menu, X } from "lucide-react";
import Upload_btn from "./upload_btn";

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

  return (
    <header className="sticky top-0 z-40 py-3 px-4 sm:px-6 lg:px-8 border-b border-white/10 glass-panel bg-[#090714]/85 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
        {/* Brand Emblem */}
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="size-9 rounded-full bg-gradient-to-br from-purple-600 via-indigo-600 to-violet-700 p-0.5 shadow-md group-hover:scale-105 transition-transform flex items-center justify-center">
            <div className="size-full bg-[#090714] rounded-full flex items-center justify-center text-purple-400">
              <Aperture className="size-5" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-base tracking-tight text-white flex items-center gap-1">
              Lumina<span className="text-purple-400 font-bold">.vault</span>
            </span>
            <span className="text-[9px] font-mono text-emerald-400 block -mt-1">
              🟢 Cloud Media Engine
            </span>
          </div>
        </a>

        {/* Global Search Bar */}
        <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search gallery by tag, name, or resolution..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-white/[0.04] border border-white/15 text-white placeholder-gray-400 outline-none focus:border-purple-500 focus:bg-white/[0.08] transition-all"
            />
          </div>
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono">
            <Sparkles className="size-3 text-purple-400" /> Live Demo Mode
          </div>

          <Upload_btn fetch_data={() => onUploadSuccess?.()} />

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white rounded-full bg-white/5 border border-white/10"
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Search Bar Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden pt-3 mt-3 border-t border-white/10 flex flex-col gap-2 animate-in fade-in">
          <div className="relative w-full">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by tag..."
              value={searchQuery}
              onChange={(e) => onSearchChange?.(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-full bg-white/[0.04] border border-white/15 text-white placeholder-gray-400 outline-none focus:border-purple-500"
            />
          </div>
        </div>
      )}
    </header>
  );
}
