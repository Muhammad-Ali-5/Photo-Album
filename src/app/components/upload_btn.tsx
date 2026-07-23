"use client";

import { CldUploadButton } from "next-cloudinary";
import { Upload, Sparkles } from "lucide-react";
import { Button } from "@/components/button";

interface UploadBtnProps {
  fetch_data?: () => void;
}

export default function Upload_btn({ fetch_data }: UploadBtnProps) {
  const isCloudinaryConfigured = !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

  if (!isCloudinaryConfigured) {
    return (
      <Button
        variant="glow"
        size="sm"
        onClick={() => alert("Simulated Demo Mode: Uploads are active when Cloudinary environment variables are connected.")}
        className="rounded-full px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5"
      >
        <Upload className="size-3.5" />
        <span>Upload Media</span>
      </Button>
    );
  }

  return (
    <Button variant="glow" size="sm" className="rounded-full px-4 py-1.5 text-xs font-semibold p-0">
      <CldUploadButton
        onSuccess={() => fetch_data?.()}
        uploadPreset="photos"
        className="flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white"
      >
        <Upload className="size-3.5" />
        <span>Upload Media</span>
      </CldUploadButton>
    </Button>
  );
}
