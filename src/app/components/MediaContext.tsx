"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { samplePhotos } from "./sampleData";
import { delete_img, add_album, get_images } from "./Get_data";

interface MediaContextType {
  photos: any[];
  addPhoto: (newPhoto: any) => void;
  deletePhoto: (photoId: string) => Promise<{ success: boolean; message: string }>;
  assignAlbum: (photoId: string, albumTag: string) => Promise<{ success: boolean; message: string }>;
  getAlbumPhotos: (albumTag: string) => any[];
  refreshPhotos: () => Promise<void>;
  setPhotoTags: (photoId: string, tags: string[]) => void;
}

const MediaContext = createContext<MediaContextType>({
  photos: [],
  addPhoto: () => {},
  deletePhoto: async () => ({ success: false, message: "" }),
  assignAlbum: async () => ({ success: false, message: "" }),
  getAlbumPhotos: () => [],
  refreshPhotos: async () => {},
  setPhotoTags: () => {},
});

export function MediaProvider({ children }: { children: React.ReactNode }) {
  const [photos, setPhotos] = useState<any[]>([]);

  const fetchCloudinaryPhotos = async () => {
    try {
      const cloudData = await get_images();
      if (Array.isArray(cloudData) && cloudData.length > 0) {
        setPhotos(cloudData);
      } else {
        setPhotos(samplePhotos);
      }
    } catch (error) {
      setPhotos(samplePhotos);
    }
  };

  useEffect(() => {
    fetchCloudinaryPhotos();
  }, []);

  const addPhoto = (newPhoto: any) => {
    setPhotos((prev) => [newPhoto, ...prev.filter((p) => p.public_id !== newPhoto.public_id)]);
  };

  const setPhotoTags = (photoId: string, tags: string[]) => {
    setPhotos((prev) =>
      prev.map((p) => (p.public_id === photoId ? { ...p, tags } : p))
    );
  };

  const deletePhoto = async (photoId: string) => {
    try {
      const res = await delete_img(photoId);
      if (res.success) {
        setPhotos((prev) => prev.filter((p) => p.public_id !== photoId));
        await fetchCloudinaryPhotos();
      }
      return res;
    } catch (err: any) {
      console.error("Failed to delete image on Cloudinary:", err);
      return { success: false, message: err?.message || "Failed to delete image on Cloudinary" };
    }
  };

  const assignAlbum = async (photoId: string, albumTag: string) => {
    const targetTag = albumTag.toLowerCase().trim();

    // Find targeted photo to extract existing album tags
    const targetPhoto = photos.find((p) => p.public_id === photoId);
    const currentTags: string[] = targetPhoto?.tags || [];

    // Execute Cloudinary tag reassignment synchronously
    try {
      const res = await add_album(photoId, targetTag, currentTags);

      if (res.success) {
        setPhotos((prev) =>
          prev.map((photo) => {
            if (photo.public_id === photoId) {
              const nonAlbumTags = (photo.tags || []).filter(
                (t: string) => !currentTags.includes(t.toLowerCase()) && t.toLowerCase() !== targetTag
              );
              return {
                ...photo,
                tags: Array.from(new Set([...nonAlbumTags, targetTag])),
              };
            }
            return photo;
          })
        );
        await fetchCloudinaryPhotos();
      }

      return res;
    } catch (err: any) {
      console.error("Failed to update album on Cloudinary:", err);
      return { success: false, message: err?.message || "Failed to update album on Cloudinary" };
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
        setPhotoTags,
      }}
    >
      {children}
    </MediaContext.Provider>
  );
}


export function useMedia() {
  return useContext(MediaContext);
}



