"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Image as ImageIcon, FolderHeart, Heart, HardDrive, ShieldCheck } from "lucide-react";

export default function Side_Nav() {
  const pathname = usePathname();

  const links = [
    { name: "All Gallery Assets", href: "/", icon: ImageIcon },
    { name: "Album Folders", href: "/albums", icon: FolderHeart },
    { name: "Favorite Collection", href: "/favourites", icon: Heart },
  ];

  return (
    <aside className="w-full md:w-64 shrink-0 glass-panel bg-[#0b0818]/90 border-r border-white/10 p-4 space-y-6 md:min-h-[calc(100vh-65px)]">
      {/* Navigation Group */}
      <div className="space-y-1">
        <div className="px-3 text-[10px] font-mono uppercase text-gray-400 tracking-wider">
          Library Management
        </div>
        <nav className="space-y-1 pt-2">
          {links.map((link) => {
            const Icon = link.icon;
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-purple-600/30 text-white border border-purple-500/40 shadow-sm"
                    : "text-gray-400 hover:text-white hover:bg-white/5"
                }`}
              >
                <Icon className={`size-4 ${isActive ? "text-purple-400" : "text-gray-400"}`} />
                <span>{link.name}</span>
              </Link>
            );
          })}
        </nav>
      </div>

      {/* Cloud Engine Info Card */}
      <div className="hidden md:block p-4 rounded-2xl glass-card bg-white/[0.02] border-white/10 space-y-2">
        <div className="flex items-center gap-2 text-xs font-bold text-white">
          <HardDrive className="size-4 text-purple-400" />
          <span>Cloud CDN Active</span>
        </div>
        <p className="text-[11px] text-gray-400 leading-relaxed">
          Optimized image delivery via Cloudinary with dynamic format conversion and auto-transformations.
        </p>
        <div className="pt-1 flex items-center gap-1.5 text-[10px] font-mono text-emerald-400">
          <ShieldCheck className="size-3" /> SOC2 Verified Infrastructure
        </div>
      </div>
    </aside>
  );
}
