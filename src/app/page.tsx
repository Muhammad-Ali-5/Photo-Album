"use client";

import { useState } from "react";
import Navbar from "./components/Navbar";
import Side_Nav from "./components/Side_Nav";
import CloudinaryImage from "./components/cloudinary-image";
import ImageDetailModal from "./components/ImageDetailModal";
import { Layers, SlidersHorizontal, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/button";
import { useTheme } from "./components/ThemeContext";
import { useMedia } from "./components/MediaContext";

export default function Home() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { photos } = useMedia();

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const tagCategories = ["All", "Nature", "Architecture", "Cyberpunk", "Minimalist", "Uploaded"];

  const filteredPhotos = photos.filter((photo) => {
    const matchesSearch =
      searchQuery === "" ||
      photo.public_id?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      photo.tags?.some((t: string) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTag =
      selectedTag === "All" ||
      photo.tags?.some((t: string) => t.toLowerCase() === selectedTag.toLowerCase());

    return matchesSearch && matchesTag;
  });

  const MAX_COLUMNS = 4;
  const getColumnPhotos = (colIndex: number) => {
    return filteredPhotos.filter((_, idx) => idx % MAX_COLUMNS === colIndex);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "bg-[#09090b] text-zinc-100" : "bg-white text-zinc-900"}`}>
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        <Side_Nav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <span className={`text-xs font-mono uppercase tracking-wider block mb-1 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                Digital Asset Management
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold">
                Cloud Photo Gallery
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
              <Layers className="size-4 text-zinc-400" />
              <span>{filteredPhotos.length} Assets Loaded</span>
            </div>
          </div>

          {/* Category Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <SlidersHorizontal className="size-4 text-zinc-400 mr-1 shrink-0" />
            {tagCategories.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer shrink-0 ${
                  selectedTag === tag
                    ? isDark
                      ? "bg-white text-black font-bold shadow-sm"
                      : "bg-black text-white font-bold shadow-sm"
                    : isDark
                    ? "bg-zinc-900 hover:bg-zinc-800 text-zinc-300 border border-zinc-800"
                    : "bg-zinc-100 hover:bg-zinc-200 text-zinc-700 border border-zinc-300"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Gallery Masonry Grid */}
          {filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
              {[0, 1, 2, 3].map((colIdx) => (
                <div key={colIdx} className="flex flex-col gap-4">
                  {getColumnPhotos(colIdx).map((photo) => (
                    <CloudinaryImage
                      key={photo.public_id}
                      props={photo}
                      onSelectPhoto={setSelectedPhoto}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 text-center space-y-3 glass-panel rounded-3xl border-dashed border-zinc-800 p-8 max-w-md mx-auto">
              <div className="size-12 mx-auto rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-zinc-400">
                <ImageIcon className="size-6" />
              </div>
              <h3 className="text-base font-bold">No Matching Assets Found</h3>
              <p className="text-xs text-zinc-400">
                Try searching for another tag like <span className="font-mono">architecture</span> or clear filters.
              </p>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedTag("All");
                  setSearchQuery("");
                }}
                className="mt-2 rounded-full text-xs"
              >
                Clear Search Filters
              </Button>
            </div>
          )}
        </main>
      </div>

      {/* Image Detail & Metadata Modal */}
      <ImageDetailModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}
