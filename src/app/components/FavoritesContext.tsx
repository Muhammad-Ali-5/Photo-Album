"use client";

import React, { createContext, useContext, useState } from "react";
import { toggle_favorite_tag } from "./Get_data";

interface FavoritesContextType {
  favorites: string[];
  toggleFavorite: (publicId: string) => void;
  isFavorited: (publicId: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  toggleFavorite: () => {},
  isFavorited: () => false,
});

export function FavoritesProvider({ children }: { children: React.ReactNode }) {
  const [favorites, setFavorites] = useState<string[]>(["sample_architecture_1"]);

  const toggleFavorite = (publicId: string) => {
    setFavorites((prev) => {
      const isFav = prev.includes(publicId);
      const next = isFav
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId];

      toggle_favorite_tag(publicId, !isFav).catch((err) => {
        console.error("Failed to sync favorite to Cloudinary:", err);
      });

      return next;
    });
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

