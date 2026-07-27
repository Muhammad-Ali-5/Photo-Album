"use client";

import { useState } from "react";
import { Heart, Maximize2, Trash2 } from "lucide-react";
import { useFavorites } from "./FavoritesContext";
import { useMedia } from "./MediaContext";
import { useTheme } from "./ThemeContext";

interface CloudinaryImageProps {
  props: any;
  handleRefresh?: (public_id: string, albumName: string, img_delete?: boolean) => void;
  rmv_img?: any;
  path?: string;
  onSelectPhoto?: (photo: any) => void;
}

export default function CloudinaryImage({
  props,
  onSelectPhoto,
}: CloudinaryImageProps) {
  const [isHovered, setIsHovered] = useState(false);
  const { isFavorited, toggleFavorite } = useFavorites();
  const { deletePhoto } = useMedia();
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const favorited = isFavorited(props.public_id);

  const imageUrl = props.secure_url || `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${props.public_id}`;

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm("Delete this image permanently?")) {
      await deletePhoto(props.public_id);
    }
  };

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectPhoto?.(props)}
      className={`group relative rounded-2xl overflow-hidden border shadow-sm cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 ${
        isDark
          ? "bg-zinc-900/90 border-zinc-800 hover:border-zinc-600"
          : "bg-white border-zinc-200/90 hover:border-zinc-400"
      }`}
    >
      {/* Photo Element */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={imageUrl}
        alt={props.public_id}
        className="w-full h-auto object-cover rounded-2xl transition-transform duration-500 group-hover:scale-105"
        loading="lazy"
      />

      {/* Hover Overlay Container */}
      <div
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-3.5 flex flex-col justify-between transition-opacity duration-200 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top Action Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleFavorite(props.public_id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all active:scale-90 cursor-pointer ${
              favorited
                ? "bg-red-600 text-white shadow-md"
                : "bg-black/60 text-zinc-300 hover:text-white hover:bg-black/80 border border-zinc-700"
            }`}
            title={favorited ? "Unlike Photo" : "Like Photo"}
          >
            <Heart className={`size-3.5 ${favorited ? "fill-white text-white" : ""}`} />
          </button>

          <div className="flex items-center gap-1.5">
            <button
              onClick={handleDelete}
              className="p-2 rounded-full bg-red-600/80 hover:bg-red-600 text-white backdrop-blur-md border border-red-500/50 transition-all cursor-pointer"
              title="Delete Image"
            >
              <Trash2 className="size-3.5" />
            </button>

            <span className="p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white backdrop-blur-md border border-zinc-700">
              <Maximize2 className="size-3.5" />
            </span>
          </div>
        </div>

        {/* Bottom Metadata Info */}
        <div className="space-y-1">
          <div className="text-xs font-bold text-white truncate font-mono">
            {props.public_id}
          </div>
          <div className="flex flex-wrap gap-1">
            {(props.tags || ["hd"]).slice(0, 3).map((tag: string, i: number) => (
              <span
                key={i}
                className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-200 text-[10px] font-mono border border-white/20 backdrop-blur-sm"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

