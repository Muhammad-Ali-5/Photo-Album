"use client";

import { useState } from "react";
import { Heart, Maximize2 } from "lucide-react";
import { useFavorites } from "./FavoritesContext";

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
  const favorited = isFavorited(props.public_id);

  const imageUrl = props.secure_url || `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${props.public_id}`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectPhoto?.(props)}
      className="group relative rounded-2xl overflow-hidden glass-card bg-zinc-900/60 border-zinc-800 shadow-md cursor-pointer transition-all duration-200 hover:border-zinc-500"
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
        className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent p-4 flex flex-col justify-between transition-opacity duration-200 ${
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

          <span className="p-2 rounded-full bg-black/60 text-zinc-300 hover:text-white backdrop-blur-md border border-zinc-700">
            <Maximize2 className="size-3.5" />
          </span>
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
                className="px-2 py-0.5 rounded-full bg-white/10 text-zinc-300 text-[10px] font-mono border border-white/15"
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
