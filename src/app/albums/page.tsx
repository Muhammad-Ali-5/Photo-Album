"use client";

import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Side_Nav from "../components/Side_Nav";
import { FolderHeart, Image as ImageIcon, ArrowRight, Plus, Trash2, FolderPlus } from "lucide-react";
import Link from "next/link";
import { useTheme } from "../components/ThemeContext";
import { useMedia } from "../components/MediaContext";
import { get_albums, create_cloudinary_folder, delete_cloudinary_folder } from "../components/Get_data";
import { Button } from "@/components/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const defaultAlbums = [
  { id: "1", name: "Architecture & Urban", count: 0, cover: "", tag: "architecture" },
  { id: "2", name: "Nature & Landscapes", count: 0, cover: "", tag: "nature" },
  { id: "3", name: "Cyberpunk & Neon", count: 0, cover: "", tag: "cyberpunk" },
  { id: "4", name: "Minimalist Interiors", count: 0, cover: "", tag: "minimalist" },
];

export default function AlbumsPage() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { getAlbumPhotos } = useMedia();

  const [albums, setAlbums] = useState(defaultAlbums);
  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [newAlbumName, setNewAlbumName] = useState("");

  const fetchCloudinaryAlbums = async () => {
    try {
      const data = await get_albums();
      if (Array.isArray(data) && data.length > 0) {
        setAlbums(data);
      }
    } catch (err) {
      console.error("Failed to load albums from Cloudinary:", err);
    }
  };

  useEffect(() => {
    fetchCloudinaryAlbums();
  }, []);

  const handleCreateAlbum = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAlbumName.trim()) return;

    const tag = newAlbumName.toLowerCase().replace(/\s+/g, "-");
    const newFolder = {
      id: Date.now().toString(),
      name: newAlbumName,
      count: 0,
      cover: "",
      tag: tag,
    };

    setAlbums((prev) => [...prev, newFolder]);
    setNewAlbumName("");
    setCreateModalOpen(false);

    try {
      await create_cloudinary_folder(newAlbumName);
      await fetchCloudinaryAlbums();
    } catch (err) {
      console.error("Failed to create folder on Cloudinary:", err);
    }
  };

  const handleDeleteAlbum = async (id: string, tag: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setAlbums((prev) => prev.filter((a) => a.id !== id));

    try {
      await delete_cloudinary_folder(tag);
      await fetchCloudinaryAlbums();
    } catch (err) {
      console.error("Failed to delete folder on Cloudinary:", err);
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${isDark ? "bg-[#09090b] text-zinc-100" : "bg-white text-zinc-900"}`}>
      <Navbar />

      <div className="flex-1 flex flex-col md:flex-row">
        <Side_Nav />

        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl">
          {/* Header Banner */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-zinc-800">
            <div>
              <span className={`text-xs font-mono uppercase tracking-wider block mb-1 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}>
                Collection Management
              </span>
              <h1 className="text-2xl sm:text-3xl font-extrabold flex items-center gap-2">
                <FolderHeart className="size-6 text-zinc-400" /> Album Folders
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="primary"
                size="sm"
                onClick={() => setCreateModalOpen(true)}
                className="rounded-full px-4 py-2 text-xs flex items-center gap-1.5 cursor-pointer"
              >
                <Plus className="size-4" />
                <span>Create New Album</span>
              </Button>

              <span className="text-xs font-mono text-zinc-400 hidden sm:inline">
                {albums.length} Folders
              </span>
            </div>
          </div>

          {/* Albums Grid */}
          {albums.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {albums.map((album) => {
                const albumPhotos = getAlbumPhotos(album.tag);
                const count = albumPhotos.length;
                const coverUrl =
                  albumPhotos.length > 0
                    ? albumPhotos[0].secure_url ||
                      `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${albumPhotos[0].public_id}`
                    : album.cover;

                return (
                  <div key={album.id} className="relative group">
                    <Link
                      href={`/albums/${album.tag}`}
                      className={`block rounded-3xl overflow-hidden p-4 space-y-3 transition-all border ${
                        isDark
                          ? "bg-zinc-900/60 border-zinc-800 hover:border-zinc-500"
                          : "bg-zinc-50 border-zinc-200 hover:border-zinc-400 shadow-sm"
                      }`}
                    >
                      {/* Cover Preview: If cover exists, show image; else show clean Folder emblem */}
                      <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-zinc-950/80 border border-zinc-800 flex flex-col items-center justify-center">
                        {coverUrl ? (
                          /* eslint-disable-next-line @next/next/no-img-element */
                          <img
                            src={coverUrl}
                            alt={album.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        ) : (
                          <div className="flex flex-col items-center justify-center p-4 text-center space-y-1 text-zinc-500 group-hover:text-zinc-300 transition-colors">
                            <FolderPlus className="size-10 stroke-[1.5]" />
                            <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400">Empty Album</span>
                          </div>
                        )}
                        <div className="absolute top-2.5 right-2.5 px-2 py-0.5 rounded-full bg-black/80 backdrop-blur-md text-[10px] font-mono text-zinc-300 border border-zinc-700 flex items-center gap-1">
                          <ImageIcon className="size-3" /> {count} Assets
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-sm font-bold truncate">{album.name}</h3>
                          <p className="text-[10px] font-mono text-zinc-400">#{album.tag}</p>
                        </div>
                        <ArrowRight className="size-4 text-zinc-400 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Link>

                    {/* Delete Album Button */}
                    <button
                      onClick={(e) => handleDeleteAlbum(album.id, album.tag, e)}
                      className="absolute top-6 right-6 p-2 rounded-full bg-red-600/90 text-white opacity-0 group-hover:opacity-100 transition-opacity shadow-md hover:bg-red-700 cursor-pointer z-10"
                      title="Delete Album Folder"
                    >
                      <Trash2 className="size-3.5" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="py-16 text-center space-y-3 glass-panel rounded-3xl p-8 max-w-md mx-auto">
              <FolderPlus className="size-10 mx-auto text-zinc-500" />
              <h3 className="text-base font-bold">No Albums Created</h3>
              <p className="text-xs text-zinc-400">Click &quot;Create New Album&quot; to organize your media assets into folders.</p>
            </div>
          )}
        </main>
      </div>

      {/* Create Album Modal */}
      <Dialog open={createModalOpen} onOpenChange={setCreateModalOpen}>
        <DialogContent className={`max-w-md rounded-3xl p-6 transition-colors shadow-2xl border ${isDark ? "bg-[#09090b] border-zinc-800 text-white" : "bg-white border-zinc-200 text-zinc-900"}`}>
          <DialogHeader className="space-y-1">
            <DialogTitle className={`text-lg font-bold ${isDark ? "text-white" : "text-zinc-900"}`}>Create New Album Folder</DialogTitle>
            <DialogDescription className={`text-xs ${isDark ? "text-zinc-400" : "text-zinc-600"}`}>
              Enter an album name to organize media assets by topic or project tag.
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateAlbum} className="space-y-4 pt-3">
            <div className="space-y-1">
              <label className={`block text-[10px] font-mono uppercase tracking-wider ${isDark ? "text-zinc-400" : "text-zinc-600 font-semibold"}`}>Album Name</label>
              <Input
                type="text"
                required
                placeholder="e.g. Product Showcase"
                value={newAlbumName}
                onChange={(e) => setNewAlbumName(e.target.value)}
                className={isDark ? "bg-zinc-900 border-zinc-800 text-white placeholder-zinc-500" : "bg-zinc-50 border-zinc-300 text-zinc-900 placeholder-zinc-400 focus:border-zinc-500"}
              />
            </div>

            <DialogFooter className="gap-2 pt-2">
              <Button
                variant="secondary"
                size="sm"
                type="button"
                onClick={() => setCreateModalOpen(false)}
                className={isDark ? "rounded-full" : "rounded-full bg-zinc-100 hover:bg-zinc-200 text-zinc-800 border-zinc-300"}
              >
                Cancel
              </Button>
              <Button
                variant="primary"
                size="sm"
                type="submit"
                className={isDark ? "rounded-full" : "rounded-full bg-black hover:bg-zinc-800 text-white"}
              >
                Create Album
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}

