"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { samplePhotos } from "./sampleData";

interface MediaContextType {
  photos: any[];
  addPhoto: (newPhoto: any) => void;
  assignAlbum: (photoId: string, albumTag: string) => void;
  getAlbumPhotos: (albumTag: string) => any[];
}

const MediaContext = createContext<MediaContextType>({
  photos: [],
  addPhoto: () => {},
  assignAlbum: () => {},
  getAlbumPhotos: () => [],
});

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<any[]>(samplePhotos);

  useEffect(() => {
    const saved = localStorage.getItem("lumina_gallery_photos");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setPhotos(parsed);
        }
      } catch {}
    }
  }, []);

  const savePhotos = (updated: any[]) => {
    setPhotos(updated);
    localStorage.setItem("lumina_gallery_photos", JSON.stringify(updated));
  };

  const addPhoto = (newPhoto: any) => {
    const updated = [newPhoto, ...photos];
    savePhotos(updated);
  };

  const assignAlbum = (photoId: string, albumTag: string) => {
    const updated = photos.map((photo) => {
      if (photo.public_id === photoId) {
        const currentTags = photo.tags || [];
        if (!currentTags.includes(albumTag)) {
          return { ...photo, tags: [...currentTags, albumTag] };
        }
      }
      return photo;
    });
    savePhotos(updated);
  };

  const getAlbumPhotos = (albumTag: string) => {
    return photos.filter((p) =>
      p.tags?.some((t: string) => t.toLowerCase() === albumTag.toLowerCase())
    );
  };

  return (
    <MediaContext.Provider value={{ photos, addPhoto, assignAlbum, getAlbumPhotos }}>
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  return useContext(MediaContext);
}
