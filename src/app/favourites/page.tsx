"use client";

import { useState } from "react";
import Navbar from "../components/Navbar";
import Side_Nav from "../components/Side_Nav";
import CloudinaryImage from "../components/cloudinary-image";
import ImageDetailModal from "../components/ImageDetailModal";
import { Heart } from "lucide-react";
import { useFavorites } from "../components/FavoritesContext";
import { useTheme } from "../components/ThemeContext";
import { useMedia } from "../components/MediaContext";

export default function FavouritesPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { favorites } = useFavorites();
  const { photos } = useMedia();

  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const favoritePhotos = photos.filter((photo) => favorites.includes(photo.public_id));

  const MAX_COLUMNS = 4;
  const getColumnPhotos = (colIndex: number) => {
    return favoritePhotos.filter((_, idx) => idx % MAX_COLUMNS === colIndex);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "bg-[#09090b] text-zinc-100" : "bg-white text-zinc-900"}`}>
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row">
        <Side_Nav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          {/* Header Banner */}
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div>
              <span className={`text-xs font-mono uppercase tracking-wider block mb-1 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                Curated Vault
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
                <Heart className={`size-6 ${isDark ? "text-white fill-white" : "text-black fill-black"}`} /> Favorite Collection
              </h1>
            </div>

            <span className="text-xs font-mono text-zinc-400">
              {favoritePhotos.length} Saved Assets
            </span>
          </div>

          {/* Masonry Grid */}
          {favoritePhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
              {[0, 1, 2, 3].map((colIdx) => (
                <div key={colIdx} className="space-y-4">
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
            <div className={`py-16 text-center space-y-3 rounded-3xl border-2 border-dashed p-8 max-w-md mx-auto transition-colors ${
              isDark
                ? "bg-zinc-900/50 border-zinc-800 text-zinc-100"
                : "bg-zinc-50/80 border-zinc-300 text-zinc-900 shadow-sm"
            }`}>
              <div className={`size-12 mx-auto rounded-full border flex items-center justify-center ${
                isDark
                  ? "bg-zinc-900 border-zinc-800 text-zinc-400"
                  : "bg-zinc-100 border-zinc-300 text-zinc-600"
              }`}>
                <Heart className="size-6" />
              </div>
              <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>No Favorites Yet</h3>
              <p className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Click the heart icon on any photo card to add it to your curated favorites collection.
              </p>
            </div>
          )}
        </main>
      </div>

      <ImageDetailModal
        photo={selectedPhoto}
        isOpen={!!selectedPhoto}
        onClose={() => setSelectedPhoto(null)}
      />
    </div>
  );
}

