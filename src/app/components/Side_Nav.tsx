"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Image as ImageIcon,
  FolderHeart,
  Heart,
  HardDrive,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useTheme } from "./ThemeContext";

export default function Side_Nav() {
  const pathname = usePathname();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [isCollapsed, setIsCollapsed] = useState(false);

  const links = [
    { name: "All Assets", href: "/", icon: ImageIcon },
    { name: "Albums", href: "/albums", icon: FolderHeart },
    { name: "Favorites", href: "/favourites", icon: Heart },
  ];

  return (
    <aside
      className={`sticky top-[65px] h-[calc(100vh-65px)] overflow-y-auto shrink-0 border-r transition-all duration-300 p-3 space-y-6 hidden md:flex flex-col justify-between ${
        isCollapsed ? "w-16" : "w-60"
      } ${
        isDark
          ? "bg-[#09090b]/95 border-zinc-800 text-zinc-300"
          : "bg-zinc-50 border-zinc-200 text-zinc-700"
      }`}
    >
      {/* Navigation Group */}
      <div className="space-y-4">
        {/* Toggle Collapse Header */}
        <div className="flex items-center justify-between px-2 pt-1">
          {!isCollapsed && (
            <span className={`text-[10px] font-mono uppercase tracking-wider ${
              isDark ? "text-zinc-500" : "text-zinc-400"
            }`}>
              Navigation
            </span>
          )}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className={`p-1.5 rounded-full border transition-all cursor-pointer ${
              isCollapsed ? "mx-auto" : "ml-auto"
            } ${
              isDark
                ? "bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-800"
                : "bg-white border-zinc-300 text-zinc-600 hover:text-black hover:bg-zinc-100"
            }`}
            title={isCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {isCollapsed ? <ChevronRight className="size-4" /> : <ChevronLeft className="size-4" />}
          </button>
        </div>

        {/* Links */}
        <nav className="space-y-1">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                title={isCollapsed ? link.name : undefined}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-full text-xs font-semibold transition-all ${
                  isCollapsed ? "justify-center px-0" : ""
                } ${
                  isActive
                    ? isDark
                      ? "bg-white text-black font-bold shadow-sm"
                      : "bg-black text-white font-bold shadow-sm"
                    : isDark
                    ? "text-zinc-400 hover:text-white hover:bg-zinc-800/60"
                    : "text-zinc-600 hover:text-black hover:bg-zinc-200/60"
                }`}
              >
                <Icon className={`size-4 shrink-0 ${
                  isActive ? (isDark ? "text-black" : "text-white") : (isDark ? "text-zinc-400" : "text-zinc-500")
                }`} />
                {!isCollapsed && <span>{link.name}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Cloud Engine Info Card */}
      {!isCollapsed && (
        <div className={`p-3.5 rounded-2xl border space-y-2 ${
          isDark
            ? "bg-zinc-900/60 border-zinc-800 text-zinc-300"
            : "bg-white border-zinc-200 text-zinc-800 shadow-sm"
        }`}>
          <div className="flex items-center gap-2 text-xs font-bold">
            <HardDrive className="size-3.5" />
            <span>Cloud CDN</span>
          </div>
          <p className="text-[11px] leading-relaxed text-zinc-400">
            Real-time Cloudinary asset transformation and auto-optimization.
          </p>
          <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
            <ShieldCheck className="size-3 text-emerald-500" /> System Active
          </div>
        </div>
      )}
    </aside>
  );
}
