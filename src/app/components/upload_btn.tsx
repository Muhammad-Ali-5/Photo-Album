"use client";

import React from "react";
import { Upload } from "lucide-react";
import { useTheme } from "./ThemeContext";
import { useMedia } from "./MediaContext";

interface UploadBtnProps {
  fetch_data?: (newPhoto?: any) => void;
}

export default function Upload_btn({ fetch_data }: UploadBtnProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const { addPhoto } = useMedia();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const url = event.target?.result as string;
        const newPhoto = {
          public_id: `upload_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
          secure_url: url,
          tags: ["uploaded", "recent"],
          width: 1200,
          height: 800,
          format: file.type.split("/")[1] || "jpg",
          created_at: new Date().toISOString(),
          bytes: file.size,
        };
        addPhoto(newPhoto);
        fetch_data?.(newPhoto);
      };
      reader.readAsDataURL(file);
    });

    e.target.value = "";
  };

  return (
    <div>
      <input
        id="media-upload-file-input"
        type="file"
        onChange={handleFileChange}
        accept="image/*"
        multiple
        className="hidden"
      />
      <label
        htmlFor="media-upload-file-input"
        className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold cursor-pointer border transition-all select-none ${
          isDark
            ? "bg-zinc-900 border-zinc-700 text-white hover:bg-zinc-800 hover:border-zinc-500 shadow-sm"
            : "bg-zinc-100 border-zinc-300 text-zinc-900 hover:bg-zinc-200 hover:border-zinc-400 shadow-sm"
        }`}
      >
        <Upload className="size-3.5" />
        <span>Upload Media</span>
      </label>
    </div>
  );
}
