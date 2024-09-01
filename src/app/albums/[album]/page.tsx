"use client"
import CloudinaryImage from "@/app/components/cloudinary-image";
import { delete_folder, get_img_from_folder } from "@/app/components/Get_data";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { PulseLoader, SyncLoader } from "react-spinners";
import {Dialog,DialogContent,DialogDescription,DialogFooter,
  DialogHeader,DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { Themecontext } from "@/app/components/Slider";

export default function Favourites(){
  const [res, setres] = useState([])
  const [loading, setloading] = useState(false)
  const [refresh, setrefresh] = useState(false)
  const theme = useContext(Themecontext)
  const [del, setdel] = useState(false)
  const [adding, setadding] = useState(false)
  
  let props:any

  const router=useRouter()

  async function handleRefresh(public_id:string,albumName:string,img_delete:boolean,val:number){
    console.log(`Album : ${albumName}`)
    if(img_delete || val===1){
      let new_res=res.filter((val:any)=>val.public_id!==public_id)
      setres(new_res)
    }
  }
  
  const {album}=useParams()
  console.log(`In album ${album}`)
  // console.log(`Type album ${typeof(album)}`)
  
  useEffect(() => {
    
    async function setdata(){
            try{
              setloading(true)  
              // console.log("Getting response")  
              const response=await get_img_from_folder(album as string)
              // console.log("Setting response")  
              // console.log(`Resoponse in [album] : ${response}`)
              setres(response)
            }finally{
              setloading(false)
            }
          }
          setdata()
        }, [album])

        const MAX_COLUMN=4;
        function get_columns(colIndex:number){
          return res.filter((val,idx)=>idx%MAX_COLUMN===colIndex)
        }

  return (
<>
    <div className={`${theme.dark_theme?"":"text-black"} my-5 mx-6 relative bg-gray-00 h-full `}>

      <h1 className="text-4xl font-bold">{album}</h1>
      
      <div className="flex justify-between items-center">

      <Button onClick={()=>{router.push("/albums")}} variant="ghost" className="flex border-2 rounded-xl z-10 cursor-pointer hover:border-gray-200 border-gray-500 w-max px-3 py-2 mt-5 items-center gap-2 text-lg"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" onClick={()=>{router.push("/albums")}} className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m11.25 9-3 3m0 0 3 3m-3-3h7.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
</svg>Go Back
</Button>

<Dialog open={del} onOpenChange={setdel}>
<DialogTrigger asChild className='w-full h-full '>

<Button onClick={()=>{setdel(true)}} variant="destructive" className="flex border-2 rounded-xl cursor-pointer hover:border-gray-200 border-gray-500 w-max px-3 py-2 mt-5 items-center gap-2 text-lg">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>
Delete Folder
</Button>

</DialogTrigger>
<DialogContent className={`${theme.dark_theme?"dark text-white":""} sm:max-w-[425px]`}>
  <DialogHeader>
    <DialogTitle>Delete Folder!</DialogTitle>
    <DialogDescription>
      Are you sure you want to delete Folder {album}?
    </DialogDescription>
  </DialogHeader>
  <DialogFooter>
    <Button className='hover:bg-gray-700 lg:px-5 ' onClick={()=>{
      setdel(false)
    }
      } variant={'secondary'} type="button">Cancel</Button>
    <Button className='flex items-center gap-2' variant="destructive" disabled={adding?true:false} 
    onClick={async()=>{
      setadding(true)
      // console.log("Started...")
      await delete_folder(album as string)
      router.push("/albums")
      // console.log("Ended...")
      setdel(false)
      // props.handleRefresh(props.public_id,"",true)
    }} type="submit">
      {!adding && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>}
{adding && <div>
<SyncLoader
  color="#000000"
  margin={1}
  size={6}
  speedMultiplier={1}
/>
</div>}
Delete
</Button>
  </DialogFooter>
</DialogContent>
</Dialog>


      </div>

      <div className=" mt-10 h-full bg-gray-00 grid md:grid-cols-4 grid-cols-2 gap-3 ">
        
        {!loading && res.length!=0  &&
        [get_columns(0),get_columns(1),get_columns(2),get_columns(3)].map((val,idx)=>{
          return (
            <div key={idx} className="flex flex-col gap-3">
              {
                val.map((data:any)=>{
                  return <CloudinaryImage handleRefresh={handleRefresh} key={data.public_id} rmv_img={null} props={data} path={`/albums/${album}`}/>
                })
              }
            </div>
          )
        })
        
    }
        {!loading && res.length===0  && <div className="bg-transparent translate-x-[-50%] translate-y-[-50%] absolute top-[40%] left-[50%]  w-full text-center sm:text-4xl text-3xl font-bold ">
            Album {album} is empty!
            
            </div>}
      </div>
      
      {loading && <div className="absolute translate-x-[-50%] translate-y-[-50%] top-[50%] left-[50%]">
        {
          loading && 
          <PulseLoader
  color="#ffffff"
  margin={5}
  size={20}
  speedMultiplier={1.5}
/> 
        }
      </div>}




    </div>
    </>
  );
}
