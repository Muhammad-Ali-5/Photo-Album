"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Side_Nav from "../components/Side_Nav";
import CloudinaryImage from "../components/cloudinary-image";
import ImageDetailModal from "../components/ImageDetailModal";
import { get_images, samplePhotos } from "../components/Get_data";
import { Heart, Sparkles } from "lucide-react";

export default function FavouritesPage() {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<string[]>(["sample_architecture_1", "sample_nature_1"]);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await get_images();
        setPhotos(data || samplePhotos);
      } catch {
        setPhotos(samplePhotos);
      }
    }
    loadData();
  }, []);

  const handleToggleFavorite = (publicId: string) => {
    setFavorites((prev) =>
      prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId]
    );
  };

  const favoritePhotos = photos.filter((photo) => favorites.includes(photo.public_id));

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
                <Sparkles className="size-3 text-purple-400" /> Curated Vault
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                <Heart className="size-6 text-purple-400 fill-purple-500/30" /> Favorite Collection
              </h1>
            </div>

            <span className="text-xs font-mono text-gray-400">
              {favoritePhotos.length} Saved Assets
            </span>
          </div>

          {/* Grid */}
          {favoritePhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
              {favoritePhotos.map((photo) => (
                <CloudinaryImage
                  key={photo.public_id}
                  props={photo}
                  onSelectPhoto={setSelectedPhoto}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorited={true}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-3 glass-panel rounded-3xl border-dashed border-white/15 p-8 max-w-md mx-auto">
              <Heart className="size-10 mx-auto text-purple-400/50" />
              <h3 className="text-base font-bold text-white">No Favorites Yet</h3>
              <p className="text-xs text-gray-400">
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
        onToggleFavorite={handleToggleFavorite}
        isFavorited={selectedPhoto ? favorites.includes(selectedPhoto.public_id) : false}
      />
    </div>
  );
}
