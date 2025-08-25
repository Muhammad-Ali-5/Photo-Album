"use server";
import cloudinary from "cloudinary";

export async function get_favourites() {
  const fet = await cloudinary.v2.search
    .expression("resource_type:image AND tags=favourite")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .execute();
  return fet.resources;
}

export async function get_images() {
  const res = await cloudinary.v2.search
    .expression("resource_type:image")
    .sort_by("created_at", "desc")
    .with_field("tags")
    .execute();
  return res.resources;
}

export async function markFav(public_id: string, fav: boolean) {
  if (!fav) {
    await cloudinary.v2.uploader.add_tag("favourite", [public_id]);
  } else {
    await cloudinary.v2.uploader.remove_tag("favourite", [public_id]);
  }
}

export async function add_album(public_id: any, album: string) {
  try {
    const res = await cloudinary.v2.api.create_folder(`/${album}`);
    let parts = public_id.split("/");
    const imgid = parts.pop();

    const res2 = await cloudinary.v2.uploader.rename(
      public_id,
      `${album}/${imgid}`,
      { overwrite: true }
    );
    return { type: "success", name: album };
  } catch (err) {
    return { type: "Error", name: album };
  }
}

export async function get_folders() {
  const res = await cloudinary.v2.api.root_folders();
  return res;
}

export async function get_img_from_folder(folderName: string) {
  const res = await cloudinary.v2.search
    .expression(`resource_type:image AND public_id=${folderName}/*`)
    .sort_by("created_at", "desc")
    .with_field("tags")
    .max_results(12)
    .execute();

  return res.resources;
}

export async function delete_img(public_id: string) {
  try {
    await cloudinary.v2.uploader.destroy(public_id);
    return "Success";
  } catch (err) {
    return "Error";
  }
}

export async function delete_folder(folder: string) {
  await cloudinary.v2.api.delete_folder(folder);
}
