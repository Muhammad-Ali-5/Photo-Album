"use client";

import { useEffect, useState } from "react";
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
  FolderPlus,
  FolderCheck,
} from "lucide-react";
import { Button } from "@/components/button";
import { useTheme } from "./ThemeContext";
import { useFavorites } from "./FavoritesContext";
import { useMedia } from "./MediaContext";

interface ImageDetailModalProps {
  photo: any | null;
  isOpen: boolean;
  onClose: () => void;
  onAssignAlbum?: (photoId: string, albumTag: string) => void;
}

export default function ImageDetailModal({
  photo,
  isOpen,
  onClose,
  onAssignAlbum,
}: ImageDetailModalProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { isFavorited, toggleFavorite } = useFavorites();
  const { assignAlbum } = useMedia();

  const [copied, setCopied] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState("architecture");
  const [assigned, setAssigned] = useState(false);
  const [albums, setAlbums] = useState<any[]>([
    { name: "Architecture & Urban", tag: "architecture" },
    { name: "Nature & Landscapes", tag: "nature" },
    { name: "Cyberpunk & Neon", tag: "cyberpunk" },
    { name: "Minimalist Interiors", tag: "minimalist" },
  ]);

  useEffect(() => {
    const saved = localStorage.getItem("lumina_albums");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setAlbums(parsed);
          setSelectedAlbum(parsed[0].tag);
        }
      } catch {}
    }
  }, [isOpen]);

  if (!isOpen || !photo) return null;

  const favorited = isFavorited(photo.public_id);
  const imageUrl = photo.secure_url || `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${photo.public_id}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(imageUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAssign = () => {
    assignAlbum(photo.public_id, selectedAlbum);
    onAssignAlbum?.(photo.public_id, selectedAlbum);
    setAssigned(true);
    setTimeout(() => setAssigned(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="fixed inset-0" onClick={onClose} />

      <div className={`relative z-10 w-full max-w-4xl rounded-3xl overflow-hidden shadow-2xl border transition-all animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col md:flex-row ${
        isDark ? "bg-[#09090b] border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"
      }`}>
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 p-2 text-zinc-400 hover:text-white bg-black/60 hover:bg-black/90 rounded-full border border-zinc-700 transition-colors cursor-pointer"
        >
          <X className="size-5" />
        </button>

        {/* Photo View Box */}
        <div className="relative md:w-3/5 bg-black flex items-center justify-center p-4 min-h-[280px] md:min-h-[480px]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={imageUrl}
            alt={photo.public_id}
            className="max-h-[75vh] w-auto object-contain rounded-2xl shadow-2xl"
          />
        </div>

        {/* Metadata Sidebar */}
        <div className="md:w-2/5 p-6 space-y-5 overflow-y-auto max-h-[80vh]">
          {/* Title / ID */}
          <div className="space-y-1">
            <div className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border text-[10px] font-mono uppercase tracking-wider ${
              isDark ? "bg-zinc-900 border-zinc-800 text-zinc-400" : "bg-zinc-100 border-zinc-300 text-zinc-600"
            }`}>
              Asset Metadata
            </div>
            <h3 className="text-base font-bold truncate font-mono">
              {photo.public_id}
            </h3>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 pt-1">
            <Button
              variant={favorited ? "primary" : "secondary"}
              size="sm"
              onClick={() => toggleFavorite(photo.public_id)}
              className="flex-1 rounded-full text-xs flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <Heart className={`size-3.5 ${favorited ? "fill-black text-black" : ""}`} />
              <span>{favorited ? "Liked" : "Like Photo"}</span>
            </Button>

            <Button
              variant="secondary"
              size="sm"
              onClick={handleCopyLink}
              className="rounded-full px-3 text-xs flex items-center justify-center gap-1 cursor-pointer"
            >
              {copied ? <Check className="size-3.5" /> : <Share2 className="size-3.5" />}
              <span>{copied ? "Copied!" : "Share"}</span>
            </Button>
          </div>

          {/* Move to Album Folder Option */}
          <div className={`p-3.5 rounded-2xl border space-y-2.5 ${
            isDark ? "bg-zinc-900/60 border-zinc-800" : "bg-zinc-50 border-zinc-200"
          }`}>
            <div className="text-xs font-bold flex items-center gap-1.5">
              <FolderPlus className="size-4 text-zinc-400" /> Move to Album Folder
            </div>
            <div className="flex items-center gap-2">
              <select
                value={selectedAlbum}
                onChange={(e) => setSelectedAlbum(e.target.value)}
                className={`flex-1 text-xs rounded-full px-3 py-1.5 outline-none border cursor-pointer ${
                  isDark
                    ? "bg-black border-zinc-700 text-white"
                    : "bg-white border-zinc-300 text-zinc-900"
                }`}
              >
                {albums.map((album: any) => (
                  <option key={album.tag || album.id} value={album.tag}>
                    {album.name}
                  </option>
                ))}
              </select>
              <Button
                variant="primary"
                size="sm"
                onClick={handleAssign}
                className="rounded-full text-xs px-3 py-1.5 flex items-center gap-1 cursor-pointer shrink-0"
              >
                {assigned ? <FolderCheck className="size-3.5" /> : <FolderPlus className="size-3.5" />}
                <span>{assigned ? "Assigned!" : "Assign"}</span>
              </Button>
            </div>
          </div>

          {/* Technical Specs List */}
          <div className="space-y-2.5 pt-1 text-xs">
            <div className="flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-2">
                <Maximize2 className="size-3.5" /> Resolution
              </span>
              <span className="font-mono font-medium">
                {photo.width || 1920} × {photo.height || 1080}
              </span>
            </div>

            <div className="flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-2">
                <FileText className="size-3.5" /> Format
              </span>
              <span className="font-mono uppercase font-bold">
                {photo.format || "JPG"}
              </span>
            </div>

            <div className="flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-2">
                <Calendar className="size-3.5" /> Created
              </span>
              <span className="font-mono text-[11px]">
                {photo.created_at ? new Date(photo.created_at).toLocaleDateString() : "2026-07-20"}
              </span>
            </div>

            <div className="flex items-center justify-between text-zinc-400">
              <span className="flex items-center gap-2">
                <Layers className="size-3.5" /> Storage Engine
              </span>
              <span className="font-mono text-[11px]">
                Cloudinary CDN
              </span>
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <div className="text-xs font-medium text-zinc-400 flex items-center gap-1.5">
              <Tag className="size-3.5" /> Associated Tags
            </div>
            <div className="flex flex-wrap gap-1.5">
              {(photo.tags || ["landscape", "photography", "hd"]).map((t: string, idx: number) => (
                <span
                  key={idx}
                  className={`px-2.5 py-1 rounded-full text-[11px] font-mono border ${
                    isDark
                      ? "bg-zinc-900 border-zinc-800 text-zinc-300"
                      : "bg-zinc-100 border-zinc-300 text-zinc-700"
                  }`}
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
              className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-semibold text-xs transition-all ${
                isDark ? "bg-white text-black hover:bg-zinc-200" : "bg-black text-white hover:bg-zinc-800"
              }`}
            >
              <Download className="size-3.5" /> Download Full Resolution
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
