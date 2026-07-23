"use client";

import { useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import Side_Nav from "../../components/Side_Nav";
import CloudinaryImage from "../../components/cloudinary-image";
import ImageDetailModal from "../../components/ImageDetailModal";
import { get_images, samplePhotos } from "../../components/Get_data";
import { FolderHeart, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default function AlbumViewPage({ params }: { params: { album: string } }) {
  const [photos, setPhotos] = useState<any[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

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

  const albumTag = params.album;
  const albumPhotos = photos.filter((p) =>
    p.tags?.some((t: string) => t.toLowerCase() === albumTag.toLowerCase())
  );

  const handleToggleFavorite = (publicId: string) => {
    setFavorites((prev) =>
      prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId]
    );
  };

  return (
    <div className="min-h-screen bg-[#080610] text-gray-100 flex flex-col">
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row">
        <Side_Nav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          <div className="flex items-center justify-between pb-4 border-b border-white/10">
            <div className="flex items-center gap-3">
              <Link
                href="/albums"
                className="p-2 rounded-full bg-white/5 border border-white/10 text-gray-300 hover:text-white transition-colors"
              >
                <ArrowLeft className="size-4" />
              </Link>
              <div>
                <span className="text-[10px] font-mono text-purple-400 uppercase tracking-wider block">
                  Collection Folder
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold text-white capitalize flex items-center gap-2">
                  <FolderHeart className="size-5 text-purple-400" /> {albumTag} Collection
                </h1>
              </div>
            </div>

            <span className="text-xs font-mono text-gray-400">
              {albumPhotos.length} Items Included
            </span>
          </div>

          {albumPhotos.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
              {albumPhotos.map((photo) => (
                <CloudinaryImage
                  key={photo.public_id}
                  props={photo}
                  onSelectPhoto={setSelectedPhoto}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorited={favorites.includes(photo.public_id)}
                />
              ))}
            </div>
          ) : (
            <div className="py-16 text-center space-y-3 glass-panel rounded-3xl p-8 max-w-md mx-auto">
              <p className="text-xs text-gray-400">No photos found in this album tag.</p>
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
