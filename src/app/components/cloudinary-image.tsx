"use client";

import { useState } from "react";
import { Heart, Maximize2, Tag } from "lucide-react";

interface CloudinaryImageProps {
  props: any;
  handleRefresh?: (public_id: string, albumName: string, img_delete?: boolean) => void;
  rmv_img?: any;
  path?: string;
  onSelectPhoto?: (photo: any) => void;
  onToggleFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export default function CloudinaryImage({
  props,
  onSelectPhoto,
  onToggleFavorite,
  isFavorited = false,
}: CloudinaryImageProps) {
  const [isHovered, setIsHovered] = useState(false);

  const imageUrl = props.secure_url || `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${props.public_id}`;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onSelectPhoto?.(props)}
      className="group relative rounded-2xl overflow-hidden glass-card bg-[#0e0b1c] border-white/10 shadow-lg cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:border-purple-500/50"
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
        className={`absolute inset-0 bg-gradient-to-t from-[#080610]/90 via-[#080610]/30 to-transparent p-4 flex flex-col justify-between transition-opacity duration-300 ${
          isHovered ? "opacity-100" : "opacity-0"
        }`}
      >
        {/* Top Action Controls */}
        <div className="flex items-center justify-between">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(props.public_id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-transform active:scale-95 cursor-pointer ${
              isFavorited
                ? "bg-purple-600/90 text-white shadow-md"
                : "bg-black/40 text-gray-300 hover:text-white hover:bg-black/60"
            }`}
          >
            <Heart className={`size-3.5 ${isFavorited ? "fill-white" : ""}`} />
          </button>

          <span className="p-2 rounded-full bg-black/40 text-gray-300 hover:text-white backdrop-blur-md">
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
                className="px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 text-[10px] font-mono border border-purple-500/30"
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
