"use server";
import cloudinary from "cloudinary";

// High-resolution sample photography fallback for portfolio live review
export const samplePhotos = [
  {
    public_id: "sample_architecture_1",
    secure_url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    tags: ["architecture", "minimalist", "urban"],
    width: 1200,
    height: 800,
    format: "jpg",
    created_at: "2026-07-20T10:00:00Z",
    bytes: 342000,
  },
  {
    public_id: "sample_nature_1",
    secure_url: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80",
    tags: ["nature", "landscape", "mountains"],
    width: 1200,
    height: 1500,
    format: "jpg",
    created_at: "2026-07-19T14:30:00Z",
    bytes: 512000,
  },
  {
    public_id: "sample_cyberpunk_1",
    secure_url: "https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&w=1200&q=80",
    tags: ["cyberpunk", "neon", "urban"],
    width: 1200,
    height: 900,
    format: "jpg",
    created_at: "2026-07-18T09:15:00Z",
    bytes: 480000,
  },
  {
    public_id: "sample_minimalist_1",
    secure_url: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?auto=format&fit=crop&w=1200&q=80",
    tags: ["minimalist", "interior", "design"],
    width: 1200,
    height: 1600,
    format: "jpg",
    created_at: "2026-07-17T16:20:00Z",
    bytes: 290000,
  },
  {
    public_id: "sample_nature_2",
    secure_url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    tags: ["nature", "forest", "fog"],
    width: 1200,
    height: 800,
    format: "jpg",
    created_at: "2026-07-16T11:45:00Z",
    bytes: 620000,
  },
  {
    public_id: "sample_architecture_2",
    secure_url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    tags: ["architecture", "skyscraper", "city"],
    width: 1200,
    height: 1400,
    format: "jpg",
    created_at: "2026-07-15T13:10:00Z",
    bytes: 410000,
  },
  {
    public_id: "sample_cyberpunk_2",
    secure_url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=1200&q=80",
    tags: ["cyberpunk", "abstract", "lights"],
    width: 1200,
    height: 800,
    format: "jpg",
    created_at: "2026-07-14T18:00:00Z",
    bytes: 380000,
  },
  {
    public_id: "sample_minimalist_2",
    secure_url: "https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1200&q=80",
    tags: ["minimalist", "water", "calm"],
    width: 1200,
    height: 1500,
    format: "jpg",
    created_at: "2026-07-13T08:30:00Z",
    bytes: 250000,
  },
];

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
