"use server";
import cloudinary from "cloudinary";
import { revalidatePath } from "next/cache";
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
      .max_results(50)
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
      return { success: false, message: "Cloudinary configuration missing. Check .env credentials." };
    }

    const result = await cloudinary.v2.uploader.upload(base64Data, {
      folder: "lumina_gallery",
      tags: ["uploaded", "recent"],
      resource_type: "auto",
    });

    return {
      success: true,
      message: "Media uploaded successfully to Cloudinary!",
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
    return { success: false, message: error?.message || "Cloudinary upload failed" };
  }
}

export async function add_album(public_id: string, newAlbumTag: string, oldAlbumTags: string[] = []) {
  try {
    if (!getCloudinaryConfig()) {
      return { success: true, message: `Assigned to ${newAlbumTag}` };
    }

    const cleanNewTag = newAlbumTag.toLowerCase().trim();

    // 1. Strip previous album tags from Cloudinary asset
    if (oldAlbumTags && oldAlbumTags.length > 0) {
      for (const oldTag of oldAlbumTags) {
        if (oldTag.toLowerCase() !== cleanNewTag) {
          try {
            await cloudinary.v2.uploader.remove_tag(oldTag.toLowerCase(), [public_id]);
          } catch {}
        }
      }
    }

    // 2. Add new album tag to Cloudinary asset
    await cloudinary.v2.uploader.add_tag(cleanNewTag, [public_id]);

    revalidatePath("/", "layout");
    return { success: true, message: `Successfully assigned asset to album #${cleanNewTag}` };
  } catch (error: any) {
    console.error("Cloudinary Album Assignment Error:", error);
    return { success: false, message: error?.message || "Failed to assign album on Cloudinary" };
  }
}

export async function toggle_favorite_tag(public_id: string, isFavorited: boolean) {
  try {
    if (!getCloudinaryConfig()) {
      return { success: true, message: "Favorite toggled" };
    }

    if (isFavorited) {
      await cloudinary.v2.uploader.add_tag("favorite", [public_id]);
    } else {
      await cloudinary.v2.uploader.remove_tag("favorite", [public_id]);
    }
    return { success: true, message: isFavorited ? "Marked as Favorite!" : "Removed from Favorites!" };
  } catch (error: any) {
    console.error("Cloudinary Favorite Toggle Error:", error);
    return { success: false, message: error?.message || "Failed to update favorite on Cloudinary" };
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
      return { success: true, message: "Simulated folder creation" };
    }
    const folderTag = folderName.toLowerCase().replace(/\s+/g, "-");
    await cloudinary.v2.api.create_folder(folderTag);
    return { success: true, message: `Created album folder '${folderName}' on Cloudinary` };
  } catch (error: any) {
    console.error("Cloudinary Create Folder Error:", error);
    return { success: false, message: error?.message || "Failed to create folder on Cloudinary" };
  }
}

export async function delete_cloudinary_folder(folderName: string) {
  try {
    if (!getCloudinaryConfig()) {
      return { success: true, message: "Simulated folder deletion" };
    }
    await cloudinary.v2.api.delete_folder(folderName);
    return { success: true, message: `Deleted album folder '${folderName}' from Cloudinary` };
  } catch (error: any) {
    console.error("Cloudinary Delete Folder Error:", error);
    return { success: false, message: error?.message || "Failed to delete folder on Cloudinary" };
  }
}

export async function delete_img(public_id: string) {
  try {
    if (!getCloudinaryConfig()) {
      return { success: true, message: "Simulated image deletion" };
    }

    const result = await cloudinary.v2.uploader.destroy(public_id);
    if (result.result === "ok" || result.result === "not_found") {
      return { success: true, message: "Image deleted successfully from Cloudinary!" };
    }
    return { success: false, message: `Cloudinary response: ${result.result}` };
  } catch (error: any) {
    console.error("Cloudinary Delete Image Error:", error);
    return { success: false, message: error?.message || "Failed to delete image on Cloudinary" };
  }
}




