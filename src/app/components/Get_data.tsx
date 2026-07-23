"use server";
import cloudinary from "cloudinary";
import { samplePhotos } from "./sampleData";

export async function get_images() {
  try {
    if (!process.env.CLOUDINARY_API_KEY || !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME) {
      return samplePhotos;
    }
    cloudinary.v2.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

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

export async function add_album(public_id: string, albumName: string) {
  try {
    if (!process.env.CLOUDINARY_API_KEY) {
      return { type: "Success", message: "Simulated album assignment" };
    }
    cloudinary.v2.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const parts = public_id.split("/");
    const id = parts.pop();
    const result = await cloudinary.v2.uploader.rename(public_id, `${albumName}/${id}`);
    return { type: "Success", result };
  } catch (error) {
    return { type: "Error", message: "Failed to move image" };
  }
}

export async function delete_img(public_id: string) {
  try {
    if (!process.env.CLOUDINARY_API_KEY) {
      return { type: "Success", message: "Simulated image deletion" };
    }
    cloudinary.v2.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    });

    const result = await cloudinary.v2.uploader.destroy(public_id);
    return { type: "Success", result };
  } catch (error) {
    return { type: "Error", message: "Failed to delete image" };
  }
}
