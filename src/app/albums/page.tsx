"use client";

import Navbar from "../components/Navbar";
import Side_Nav from "../components/Side_Nav";
import { FolderHeart, Sparkles, Image as ImageIcon, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function AlbumsPage() {
  const albums = [
    { name: "Architecture & Urban", count: 4, cover: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80", tag: "architecture" },
    { name: "Nature & Landscapes", count: 3, cover: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80", tag: "nature" },
    { name: "Cyberpunk & Neon", count: 2, cover: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=600&q=80", tag: "cyberpunk" },
    { name: "Minimalist Interiors", count: 3, cover: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=600&q=80", tag: "minimalist" },
  ];

  return (
    <div className="min-h-screen bg-[#080610] text-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row">
        <Side_Nav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          {/* Header Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-1">
                <Sparkles className="size-3 text-purple-400" /> Organized Collections
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                <FolderHeart className="size-6 text-purple-400" /> Album Collections
              </h1>
            </div>

            <span className="text-xs font-mono text-gray-400">
              {albums.length} Active Folders
            </span>
          </div>

          {/* Albums Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {albums.map((album, i) => (
              <Link
                key={i}
                href={`/albums/${album.tag}`}
                className="group glass-card bg-[#0e0b1c] rounded-3xl overflow-hidden border-white/10 p-4 space-y-3 transition-all hover:scale-[1.02] hover:border-purple-500/50"
              >
                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-black/40">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={album.cover}
                    alt={album.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-mono text-purple-200 border border-white/10 flex items-center gap-1">
                    <ImageIcon className="size-3" /> {album.count} Assets
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-bold text-white group-hover:text-purple-300 transition-colors">
                      {album.name}
                    </h3>
                    <p className="text-[10px] font-mono text-gray-400">Folder ID: #{album.tag}</p>
                  </div>
                  <ArrowRight className="size-4 text-gray-400 group-hover:text-purple-400 group-hover:translate-x-1 transition-all" />
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
