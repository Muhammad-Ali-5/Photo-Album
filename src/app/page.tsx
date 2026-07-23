"use client";

import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Side_Nav from "./components/Side_Nav";
import CloudinaryImage from "./components/cloudinary-image";
import ImageDetailModal from "./components/ImageDetailModal";
import { get_images, samplePhotos } from "./components/Get_data";
import { PulseLoader } from "react-spinners";
import { Sparkles, Layers, SlidersHorizontal, Image as ImageIcon } from "lucide-react";
import { Button } from "@/components/button";

export default function Home() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<string[]>(["sample_architecture_1"]);

  const tagCategories = ["All", "Nature", "Architecture", "Cyberpunk", "Minimalist"];

  const fetchGalleryData = async () => {
    try {
      setLoading(true);
      const data = await get_images();
      setPhotos(data || samplePhotos);
    } catch {
      setPhotos(samplePhotos);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGalleryData();
  }, []);

  const handleToggleFavorite = (publicId: string) => {
    setFavorites((prev) =>
      prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId]
    );
  };

  // Filtered photos calculation
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
    <div className="min-h-screen bg-[#080610] text-gray-100 flex flex-col">
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onUploadSuccess={fetchGalleryData}
      />

      <div className="flex-1 flex flex-col md:flex-row">
        <Side_Nav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-white/10">
            <div>
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-1">
                <Sparkles className="size-3 text-purple-400" /> Digital Asset Vault
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white">
                Cloud Photo Gallery
              </h1>
            </div>

            <div className="flex items-center gap-2 text-xs font-mono text-gray-400">
              <Layers className="size-4 text-purple-400" />
              <span>{filteredPhotos.length} Assets Loaded</span>
            </div>
          </div>

          {/* Category Tag Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <SlidersHorizontal className="size-4 text-purple-400 mr-1 shrink-0" />
            {tagCategories.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer shrink-0 ${
                  selectedTag === tag
                    ? "bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-md border border-purple-400/40"
                    : "bg-white/5 hover:bg-white/10 text-gray-300 border border-white/10"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          {/* Gallery Masonry Grid */}
          {loading ? (
            <div className="py-20 flex flex-col items-center justify-center space-y-3">
              <PulseLoader color="#8b5cf6" size={12} margin={4} />
              <p className="text-xs font-mono text-gray-400">Streaming media assets from Cloud CDN...</p>
            </div>
          ) : filteredPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
              {[0, 1, 2, 3].map((colIdx) => (
                <div key={colIdx} className="flex flex-col gap-4">
                  {getColumnPhotos(colIdx).map((photo) => (
                    <CloudinaryImage
                      key={photo.public_id}
                      props={photo}
                      onSelectPhoto={setSelectedPhoto}
                      onToggleFavorite={handleToggleFavorite}
                      isFavorited={favorites.includes(photo.public_id)}
                    />
                  ))}
                </div>
              ))}
            </div>
          ) : (
            /* Empty State */
            <div className="py-16 text-center space-y-3 glass-panel rounded-3xl border-dashed border-white/15 p-8 max-w-md mx-auto">
              <div className="size-12 mx-auto rounded-full bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400">
                <ImageIcon className="size-6" />
              </div>
              <h3 className="text-base font-bold text-white">No Matching Assets Found</h3>
              <p className="text-xs text-gray-400">
                Try searching for another tag like <span className="text-purple-300 font-mono">architecture</span> or clear filters.
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
        onToggleFavorite={handleToggleFavorite}
        isFavorited={selectedPhoto ? favorites.includes(selectedPhoto.public_id) : false}
      />
    </div>
  );
}
