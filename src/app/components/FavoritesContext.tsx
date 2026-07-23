"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

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

  useEffect(() => {
    const saved = localStorage.getItem("lumina_favorites");
    if (saved) {
      try {
        setFavorites(JSON.parse(saved));
      } catch {}
    }
  }, []);

  const toggleFavorite = (publicId: string) => {
    setFavorites((prev) => {
      const next = prev.includes(publicId)
        ? prev.filter((id) => id !== publicId)
        : [...prev, publicId];
      localStorage.setItem("lumina_favorites", JSON.stringify(next));
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
