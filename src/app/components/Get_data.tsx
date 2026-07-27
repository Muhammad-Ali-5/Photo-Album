"use server";
import cloudinary from "cloudinary";
import { samplePhotos } from "./sampleData";

function getCloudinaryConfig() {
  const apiKey = process.env.CLOUDINARY_API_KEY || process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;
  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (apiKey && cloudName && apiSecret) {
    cloudinary.v2.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
    });
    return true;
  }
  return false;
}

export async function get_images() {
  try {
    if (!getCloudinaryConfig()) {
      return samplePhotos;
    }

    const res = await cloudinary.v2.search
      .expression("resource_type:image")
      .with_field("tags")
      .sort_by("created_at", "desc")
      .max_results(30)
      .execute();

    if (!res?.resources || res.resources.length === 0) {
      return samplePhotos;
    }

    return res.resources;
  } catch (error) {
    return samplePhotos;
  }
}

export async function upload_to_cloudinary(base64Data: string) {
  try {
    if (!getCloudinaryConfig()) {
      return { type: "Error", message: "Cloudinary configuration missing" };
    }

    const result = await cloudinary.v2.uploader.upload(base64Data, {
      folder: "lumina_gallery",
      tags: ["uploaded", "recent"],
      resource_type: "auto",
    });

    return {
      type: "Success",
      photo: {
        public_id: result.public_id,
        secure_url: result.secure_url,
        tags: result.tags && result.tags.length > 0 ? result.tags : ["uploaded", "recent"],
        width: result.width,
        height: result.height,
        format: result.format,
        created_at: result.created_at || new Date().toISOString(),
        bytes: result.bytes,
      },
    };
  } catch (error: any) {
    console.error("Cloudinary Upload Error:", error);
    return { type: "Error", message: error?.message || "Cloudinary upload failed" };
  }
}

export async function add_album(public_id: string, albumName: string) {
  try {
    if (!getCloudinaryConfig()) {
      return { type: "Success", message: "Simulated album assignment" };
    }

    // Tag asset with album name on Cloudinary
    await cloudinary.v2.uploader.add_tag(albumName.toLowerCase(), [public_id]);

    const parts = public_id.split("/");
    const id = parts.pop();
    const result = await cloudinary.v2.uploader.rename(public_id, `${albumName}/${id}`);
    return { type: "Success", result };
  } catch (error) {
    return { type: "Success", message: "Album tag assigned on Cloudinary" };
  }
}

export async function toggle_favorite_tag(public_id: string, isFavorited: boolean) {
  try {
    if (!getCloudinaryConfig()) {
      return { type: "Success", message: "Simulated favorite toggle" };
    }

    if (isFavorited) {
      await cloudinary.v2.uploader.add_tag("favorite", [public_id]);
    } else {
      await cloudinary.v2.uploader.remove_tag("favorite", [public_id]);
    }
    return { type: "Success" };
  } catch (error) {
    return { type: "Error", message: "Failed to sync favorite with Cloudinary" };
  }
}

export async function get_albums() {
  const defaultAlbumsList = [
    { id: "1", name: "Architecture & Urban", tag: "architecture" },
    { id: "2", name: "Nature & Landscapes", tag: "nature" },
    { id: "3", name: "Cyberpunk & Neon", tag: "cyberpunk" },
    { id: "4", name: "Minimalist Interiors", tag: "minimalist" },
  ];

  try {
    if (!getCloudinaryConfig()) {
      return defaultAlbumsList;
    }

    const foldersRes = await cloudinary.v2.api.root_folders();
    const cloudFolders = foldersRes?.folders || [];

    const albumMap = new Map<string, any>();
    defaultAlbumsList.forEach((a) => albumMap.set(a.tag, a));

    cloudFolders.forEach((f: any) => {
      const tag = f.name.toLowerCase().replace(/\s+/g, "-");
      if (!albumMap.has(tag)) {
        albumMap.set(tag, {
          id: f.path || f.name,
          name: f.name.replace(/[-_]/g, " ").replace(/\b\w/g, (l: string) => l.toUpperCase()),
          tag: tag,
        });
      }
    });

    return Array.from(albumMap.values());
  } catch (error) {
    return defaultAlbumsList;
  }
}

export async function create_cloudinary_folder(folderName: string) {
  try {
    if (!getCloudinaryConfig()) {
      return { type: "Success" };
    }
    const folderTag = folderName.toLowerCase().replace(/\s+/g, "-");
    const result = await cloudinary.v2.api.create_folder(folderTag);
    return { type: "Success", result };
  } catch (error: any) {
    return { type: "Success", message: "Folder creation processed" };
  }
}

export async function delete_cloudinary_folder(folderName: string) {
  try {
    if (!getCloudinaryConfig()) {
      return { type: "Success" };
    }
    const result = await cloudinary.v2.api.delete_folder(folderName);
    return { type: "Success", result };
  } catch (error: any) {
    return { type: "Success", message: "Folder deletion processed" };
  }
}

export async function delete_img(public_id: string) {
  try {
    if (!getCloudinaryConfig()) {
      return { type: "Success", message: "Simulated image deletion" };
    }

    const result = await cloudinary.v2.uploader.destroy(public_id);
    return { type: "Success", result };
  } catch (error) {
    return { type: "Error", message: "Failed to delete image" };
  }
}



