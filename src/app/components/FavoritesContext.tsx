"use client";

import React, { createContext, useContext } from "react";
import { toggle_favorite_tag } from "./Get_data";
import { useMedia } from "./MediaContext";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (publicId: string) => Promise<{ success: boolean; message: string }>;
  isFavorited: (publicId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: async () => ({ success: false, message: "" }),
  isFavorited: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const { photos, refreshPhotos, setPhotoTags } = useMedia();

  // Derive favorites dynamically from photos with tag "favorite" on Cloudinary
  const favorites = (photos || [])
    .filter((photo) =>
      photo.tags?.some((t: string) => t.toLowerCase() === "favorite")
    )
    .map((photo) => photo.public_id);

  const toggleFavorite = async (publicId: string) => {
    const isFav = favorites.includes(publicId);
    const nextState = !isFav;

    // Immediately update local photo tags for instant visual feedback
    const targetPhoto = photos.find((p) => p.public_id === publicId);
    const currentTags: string[] = targetPhoto?.tags || [];
    let updatedTags: string[];
    if (nextState) {
      updatedTags = Array.from(new Set([...currentTags, "favorite"]));
    } else {
      updatedTags = currentTags.filter((t) => t.toLowerCase() !== "favorite");
    }
    setPhotoTags(publicId, updatedTags);

    try {
      const res = await toggle_favorite_tag(publicId, nextState);
      if (res.success) {
        await refreshPhotos();
      } else {
        // Revert on error
        setPhotoTags(publicId, currentTags);
      }
      return res;
    } catch (err: any) {
      setPhotoTags(publicId, currentTags);
      console.error("Failed to sync favorite to Cloudinary:", err);
      return { success: false, message: err?.message || "Failed to sync favorite to Cloudinary" };
    }
  };

  const isFavorited = (publicId: string) => favorites.includes(publicId);

  return (
    <FavoritesContext.Provider value={{ favorites, toggleFavorite, isFavorited }}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  return useContext(FavoritesContext);
}



