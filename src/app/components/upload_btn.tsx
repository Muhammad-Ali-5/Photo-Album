"use client";

import React, { useState } from "react";
import { Upload, Loader2 } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useMedia } from "./MediaContext";
import { upload_to_cloudinary } from "./Get_data";

interface UploadBtnProps {
  fetch_data?: (newPhoto?: any) => void;
}

export default function Upload_btn({ fetch_data }: UploadBtnProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { addPhoto } = useMedia();
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);

    try {
      for (const file of Array.from(files)) {
        const base64Data = await new Promise<string>((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = (event) => resolve(event.target?.result as string);
          reader.onerror = (err) => reject(err);
          reader.readAsDataURL(file);
        });

        const cloudRes = await upload_to_cloudinary(base64Data);

        if (cloudRes.success && cloudRes.photo) {
          addPhoto(cloudRes.photo);
          fetch_data?.(cloudRes.photo);
        } else {
          alert(cloudRes.message || "Failed to upload image to Cloudinary");
        }
      }
    } catch (err: any) {
      console.error("Failed to upload image:", err);
      alert("Failed to upload image: " + (err?.message || "Unknown error"));
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  return (
    <div>
      <input
        id="media-upload-file-input"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        multiple
        disabled={uploading}
        className="hidden"
      />
      <label
        htmlFor="media-upload-file-input"
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all select-none ${
          uploading ? "opacity-60 cursor-not-allowed" : ""
        } ${
          isDark
            ? "bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-500 shadow-sm"
            : "bg-zinc-100 border-zinc-300 text-zinc-900 hover:bg-zinc-200 hover:border-zinc-400 shadow-sm"
        }`}
      >
        {uploading ? (
          <Loader2 className="size-3.5 animate-spin" />
        ) : (
          <Upload className="size-3.5" />
        )}
        <span>
          {uploading ? (
            "Uploading..."
          ) : (
            <>
              <span className="hidden sm:inline">Upload Media</span>
              <span className="sm:hidden">Upload</span>
            </>
          )}
        </span>
      </label>
    </div>
  );
}

