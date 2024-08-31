"use server"
import cloudinary from 'cloudinary'

export async function get_favourites(){
  // console.log("Getting favourites")
  const fet=await cloudinary.v2.search
  .expression('resource_type:image AND tags=favourite')
  .sort_by('created_at','desc')
  .with_field("tags")
  .execute()
  return fet.resources
}

export async function get_images(){
  const res=await cloudinary.v2.search
  .expression('resource_type:image')
  .sort_by('created_at','desc')
  .with_field("tags")
  .execute()
  return res.resources
}

export async function markFav(public_id:string,fav:boolean){
    if(!fav){
      await cloudinary.v2.uploader.add_tag("favourite",[public_id])
      // console.log("Finished...")
    }else{
      await cloudinary.v2.uploader.remove_tag("favourite",[public_id])
      // console.log("Finished...")
    }
  
  }

export async function add_album(public_id:any,album:string){
    try{
      const res=await cloudinary.v2.api.create_folder(`/${album}`)
    // console.log(`Created folder : ${JSON.stringify(res)}`)
    let parts=public_id.split("/")
    // console.log(`Parts : ${parts}`)
    const imgid=parts.pop()
    // console.log(`img id : ${imgid}`)

    // if(parts.length>1){
      //   parts=parts.slice(1)
      // }
      // public_id=parts.join("/")
      
      const res2=await cloudinary.v2.uploader.rename(public_id,`${album}/${imgid}`,{overwrite:true})
      // console.log(`Renamed Image ${public_id} : ${JSON.stringify(res2)}`)
      return {"type":"success","name":album}
    }catch(err){
      // console.log(`Error while adding to album : ${JSON.stringify(err)}`)
      return {"type":"Error","name":album}
    }
}

export async function get_folders(){
  const res=await cloudinary.v2.api.root_folders()
  // console.log(`Folders : ${JSON.stringify(res)}`)
  return res
  
}

export async function get_img_from_folder(folderName:string){
  const res=await cloudinary.v2.search
  // .expression(`resource_type:image AND folder=${folderName}`)
  .expression(`resource_type:image AND public_id=${folderName}/*`)
  .sort_by('created_at','desc')
  .with_field("tags")
  .max_results(12)
  .execute()

  // console.log(`Response in get-data : ${JSON.stringify(res.resources)}`)
  return res.resources 
}

export async function delete_img(public_id:string){
  try{
    await cloudinary.v2.uploader.destroy(public_id);
    return "Success"
    }catch(err){
      // console.log(`Error : ${JSON.stringify(err)}`)
      return "Error"
    }
}

export async function delete_folder(folder:string){
  // console.log(`Deleting folder ${folder}`)  
  const res=await cloudinary.v2.api.delete_folder(folder);
  // console.log(`Del folder ${JSON.stringify(res)}`)  

} 