"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import Side_Nav from "../../components/Side_Nav";
import CloudinaryImage from "../../components/cloudinary-image";
import ImageDetailModal from "../../components/ImageDetailModal";
import { FolderHeart, ArrowLeft, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../../components/ThemeContext";
import { useMedia } from "../../components/MediaContext";

export default function AlbumViewPage({ params }: { params: { album: string } }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { photos } = useMedia();

  const [selectedPhoto, setSelectedPhoto] = useState<any | null>(null);

  const albumTag = params.album;
  const albumPhotos = photos.filter((p) =>
    p.tags?.some((t: string) => t.toLowerCase() === albumTag.toLowerCase())
  );

  const MAX_COLUMNS = 4;
  const getColumnPhotos = (colIndex: number) => {
    return albumPhotos.filter((_, idx) => idx % MAX_COLUMNS === colIndex);
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "bg-[#09090b] text-zinc-100" : "bg-white text-zinc-900"}`}>
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row">
        <Side_Nav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-3">
              <Link
                href="/albums"
                className={`p-2 rounded-full border transition-colors ${
                  isDark
                    ? "bg-zinc-900 border-zinc-800 text-zinc-300 hover:text-white"
                    : "bg-zinc-100 border-zinc-300 text-zinc-700 hover:text-black"
                }`}
              >
                <ArrowLeft className="size-4" />
              </Link>
              <div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-wider block">
                  Collection Folder
                </span>
                <h1 className="text-xl sm:text-2xl font-extrabold capitalize flex items-center gap-2">
                  <FolderHeart className="size-5 text-zinc-400" /> {albumTag} Collection
                </h1>
              </div>
            </div>

            <span className="text-xs font-mono text-zinc-400">
              {albumPhotos.length} Items Included
            </span>
          </div>

          {/* Masonry Grid */}
          {albumPhotos.length > 0 ? (
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
                <ImageIcon className="size-6" />
              </div>
              <h3 className={`text-base font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>Album Folder is Empty</h3>
              <p className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
                Open any photo from the gallery and use &quot;Move to Album Folder&quot; to assign images to <span className={`font-mono font-bold ${isDark ? "text-white" : "text-black"}`}>#{albumTag}</span>.
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
