"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sun, Moon, Menu, X, Image as ImageIcon, FolderHeart, Heart } from "lucide-react";
import Upload_btn from "./upload_btn";
import { useTheme } from "./ThemeContext";

interface NavbarProps {
  onUploadSuccess?: () => void;
}

export default function Navbar({ onUploadSuccess }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";
  const pathname = usePathname();

  const navLinks = [
    { name: "All Assets", href: "/", icon: ImageIcon },
    { name: "Albums", href: "/albums", icon: FolderHeart },
    { name: "Favorites", href: "/favourites", icon: Heart },
  ];

  return (
    <header className={`sticky top-0 z-40 py-2.5 px-3 sm:px-6 lg:px-8 border-b transition-colors ${
      isDark
        ? "bg-[#09090b]/95 border-zinc-800 text-white backdrop-blur-xl"
        : "bg-white/95 border-zinc-200 text-zinc-900 backdrop-blur-xl"
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4">
        {/* Brand Emblem */}
        <Link href="/" className="flex items-center gap-2 group shrink-0">
          <div className={`size-8 sm:size-9 rounded-full p-0.5 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center ${
            isDark ? "bg-white" : "bg-black"
          }`}>
            <div className={`size-full rounded-full flex items-center justify-center ${
              isDark ? "bg-black text-white" : "bg-white text-black"
            }`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/favicon-32x32.png" alt="Lumina Emblem" className="size-4 sm:size-5 rounded-full object-contain" />
            </div>
          </div>
          <div>
            <span className="font-extrabold text-sm sm:text-base tracking-tight flex items-center gap-1">
              Lumina<span className={`font-normal ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>.vault</span>
            </span>
            <span className={`text-[8px] sm:text-[9px] font-mono block -mt-1 hidden sm:block ${isDark ? "text-zinc-400" : "text-zinc-500"}`}>
              Digital Media Platform
            </span>
          </div>
        </Link>

        {/* Right Actions */}
        <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`p-1.5 sm:p-2 rounded-full border transition-all cursor-pointer ${
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
            className={`md:hidden p-1.5 sm:p-2 rounded-full border cursor-pointer ${
              isDark ? "bg-zinc-900 border-zinc-800 text-zinc-300" : "bg-zinc-100 border-zinc-300 text-zinc-700"
            }`}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="size-4 sm:size-5" /> : <Menu className="size-4 sm:size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Navigation Links */}
      {mobileMenuOpen && (
        <div className={`md:hidden pt-3 mt-3 border-t flex flex-col gap-2 animate-in fade-in ${
          isDark ? "border-zinc-800 bg-[#09090b]" : "border-zinc-200 bg-white"
        }`}>
          <span className={`text-[10px] font-mono uppercase tracking-wider block px-1 mb-1 ${
            isDark ? "text-zinc-500" : "text-zinc-400"
          }`}>
            Navigation
          </span>
          <div className="grid grid-cols-3 gap-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex flex-col items-center justify-center gap-1.5 p-2.5 rounded-2xl text-xs font-semibold transition-all border ${
                    isActive
                      ? isDark
                        ? "bg-white text-black border-white font-bold"
                        : "bg-black text-white border-black font-bold"
                      : isDark
                      ? "bg-zinc-900/80 border-zinc-800 text-zinc-300 hover:bg-zinc-800"
                      : "bg-zinc-50 border-zinc-200 text-zinc-700 hover:bg-zinc-100"
                  }`}
                >
                  <Icon className="size-4 shrink-0" />
                  <span className="text-[11px] truncate">{link.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
}


