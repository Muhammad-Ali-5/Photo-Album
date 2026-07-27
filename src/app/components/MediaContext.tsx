"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { samplePhotos } from "./sampleData";
import { delete_img, add_album, get_images } from "./Get_data";

interface MediaContextType {
  photos: any[];
  addPhoto: (newPhoto: any) => void;
  deletePhoto: (photoId: string) => Promise<void>;
  assignAlbum: (photoId: string, albumTag: string) => Promise<void>;
  getAlbumPhotos: (albumTag: string) => any[];
  refreshPhotos: () => Promise<void>;
}

const MediaContext = createContext<MediaContextType>({
  photos: [],
  addPhoto: () => {},
  deletePhoto: async () => {},
  assignAlbum: async () => {},
  getAlbumPhotos: () => [],
  refreshPhotos: async () => {},
});

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<any[]>(samplePhotos);

  const fetchCloudinaryPhotos = async () => {
    try {
      const cloudData = await get_images();
      if (Array.isArray(cloudData) && cloudData.length > 0) {
        const photoMap = new Map<string, any>();
        samplePhotos.forEach((p) => photoMap.set(p.public_id, p));
        cloudData.forEach((p) => photoMap.set(p.public_id, p));
        setPhotos(Array.from(photoMap.values()));
      }
    } catch (error) {
      console.error("Failed to fetch photos from Cloudinary:", error);
    }
  };

  useEffect(() => {
    fetchCloudinaryPhotos();
  }, []);

  const addPhoto = (newPhoto: any) => {
    setPhotos((prev) => [newPhoto, ...prev.filter((p) => p.public_id !== newPhoto.public_id)]);
  };

  const deletePhoto = async (photoId: string) => {
    setPhotos((prev) => prev.filter((p) => p.public_id !== photoId));
    try {
      await delete_img(photoId);
      await fetchCloudinaryPhotos();
    } catch (err) {
      console.error("Failed to delete image on Cloudinary:", err);
    }
  };

  const assignAlbum = async (photoId: string, albumTag: string) => {
    const knownAlbumTags = ["architecture", "nature", "cyberpunk", "minimalist"];
    const targetTag = albumTag.toLowerCase();

    setPhotos((prev) =>
      prev.map((photo) => {
        if (photo.public_id === photoId) {
          const currentTags: string[] = photo.tags || [];
          const nonAlbumTags = currentTags.filter(
            (t) => !knownAlbumTags.includes(t.toLowerCase()) && t.toLowerCase() !== targetTag
          );
          return {
            ...photo,
            tags: Array.from(new Set([...nonAlbumTags, targetTag])),
          };
        }
        return photo;
      })
    );

    try {
      await add_album(photoId, targetTag);
      await fetchCloudinaryPhotos();
    } catch (err) {
      console.error("Failed to update album on Cloudinary:", err);
    }
  };

  const getAlbumPhotos = (albumTag: string) => {
    return photos.filter((p) =>
      p.tags?.some((t: string) => t.toLowerCase() === albumTag.toLowerCase())
    );
  };

  return (
    <MediaContext.Provider
      value={{
        photos,
        addPhoto,
        deletePhoto,
        assignAlbum,
        getAlbumPhotos,
        refreshPhotos: fetchCloudinaryPhotos,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}

export function useMedia() {
  return useContext(MediaContext);
}



