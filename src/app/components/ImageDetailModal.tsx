"use client";

import { useState } from "react";
import {
  X,
  Heart,
  Download,
  Share2,
  Tag,
  Maximize2,
  Check,
  Calendar,
  Layers,
  FileText,
  Info,
} from "lucide-react";
import { Button } from "@/components/button";

interface ImageDetailModalProps {
  photo: any | null;
  isOpen: boolean;
  onClose: () => void;
  onToggleFavorite?: (id: string) => void;
  isFavorited?: boolean;
}

export default function ImageDetailModal({
  photo,
  isOpen,
  onClose,
  onToggleFavorite,
  isFavorited = false,
}: ImageDetailModalProps) {
  const [copied, setCopied] = useState(false);

  if (!isOpen || !photo) return null;

  const imageUrl = photo.secure_url || `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${photo.public_id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className="relative z-10 w-full max-w-4xl glass-panel bg-[#0d0a18]/95 border-purple-500/30 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 text-gray-300 hover:text-white bg-black/50 hover:bg-black/80 rounded-full transition-colors cursor-pointer"
        >
          <X className="size-5" />
        </button>

        {/* Photo View Box */}
        <div className="relative md:w-3/5 bg-black/60 flex items-center justify-center p-4 min-h-[300px] md:min-h-[480px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={photo.public_id}
            className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-xl"
          />
        </div>

        {/* Metadata Sidebar */}
        <div className="md:w-2/5 p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Title / ID */}
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-300 text-[10px] font-mono uppercase tracking-wider">
              Asset Metadata
            </div>
            <h3 className="text-base font-bold text-white truncate font-mono">
              {photo.public_id}
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant={isFavorited ? "glow" : "secondary"}
              size="sm"
              onClick={() => onToggleFavorite?.(photo.public_id)}
              className="flex-1 rounded-full text-xs flex items-center justify-center gap-1.5"
            >
              <Heart className={`size-3.5 ${isFavorited ? "fill-purple-300 text-purple-300" : ""}`} />
              <span>{isFavorited ? "Favorited" : "Favorite"}</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyLink}
              className="rounded-full px-3 text-xs flex items-center justify-center gap-1"
            >
              {copied ? <Check className="size-3.5 text-emerald-400" /> : <Share2 className="size-3.5" />}
              <span>{copied ? "Copied!" : "Share"}</span>
            </Button>
          </div>

          {/* Technical Specs List */}
          <div className="space-y-2.5 pt-3 border-t border-white/10 text-xs">
            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-2 text-gray-400">
                <Maximize2 className="size-3.5 text-purple-400" /> Resolution
              </span>
              <span className="font-mono text-white font-medium">
                {photo.width || 1920} × {photo.height || 1080}
              </span>
            </div>

            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-2 text-gray-400">
                <FileText className="size-3.5 text-purple-400" /> Format
              </span>
              <span className="font-mono uppercase text-purple-300 font-bold">
                {photo.format || "JPG"}
              </span>
            </div>

            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-2 text-gray-400">
                <Calendar className="size-3.5 text-purple-400" /> Created
              </span>
              <span className="font-mono text-white text-[11px]">
                {photo.created_at ? new Date(photo.created_at).toLocaleDateString() : "2026-07-20"}
              </span>
            </div>

            <div className="flex items-center justify-between text-gray-300">
              <span className="flex items-center gap-2 text-gray-400">
                <Layers className="size-3.5 text-purple-400" /> Storage Engine
              </span>
              <span className="font-mono text-emerald-400 text-[11px]">
                Cloudinary CDN
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2 pt-3 border-t border-white/10">
            <div className="text-xs font-medium text-gray-400 flex items-center gap-1.5">
              <Tag className="size-3.5 text-purple-400" /> Associated Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(photo.tags || ["landscape", "photography", "hd"]).map((t: string, idx: number) => (
                <span
                  key={idx}
                  className="px-2.5 py-1 rounded-full bg-white/5 border border-white/10 text-purple-200 text-[11px] font-mono"
                >
                  #{t}
                </span>
              ))}
            </div>
          </div>

          {/* Download Action */}
          <div className="pt-2">
            <a
              href={imageUrl}
              target="_blank"
              rel="noreferrer"
              download
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white font-semibold text-xs shadow-md hover:shadow-purple-500/30 transition-all"
            >
              <Download className="size-3.5" /> Download Full Resolution
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
