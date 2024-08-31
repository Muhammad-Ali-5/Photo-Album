"use client"
import React, { useState } from 'react'
import 'react-toastify/dist/ReactToastify.css';
import { Button } from "@/components/ui/button"
import {DropdownMenu,DropdownMenuContent,DropdownMenuGroup,DropdownMenuItem
  ,DropdownMenuSeparator,DropdownMenuTrigger,} from "@/components/ui/dropdown-menu"
import {Dialog,DialogContent,DialogDescription,DialogFooter,
  DialogHeader,DialogTitle, DialogTrigger,} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { add_album, delete_img } from './Get_data'
import { SyncLoader } from 'react-spinners'
import Link from 'next/link';

export default function Dropdown(props:any) {
  const [open, setopen] = useState(false)
  const [del, setdel] = useState(false)
  const [albumName, setalbumName] = useState("")
  const [adding, setadding] = useState(false)

  async function add_to_album(){
    let return_value;
    // console.log("Processing...")
      try{
        setadding(true)
        const res:any=await add_album(props.public_id,albumName)
        if(res.type==="Error"){
          // console.log("Rejecting...")
          return_value=0
          // toast.error(`Image already exists in album ${albumName}!`)
        }else{
          return_value=1
          // console.log("Resolving...")
          // toast.success("Successfully added to Album!")
        }
      }
      finally{
        setadding(false)
        setopen(false)
        // console.log(`Sending value to refresh : ${return_value} + ${albumName}`)
        props.handleRefresh(props.public_id,albumName,false,return_value)
        setalbumName("")  
      }
      // return 1
      
  }

  return (
    <div>
        <DropdownMenu>
<DropdownMenuTrigger className='h-4 sm:h-7 w-4' asChild>
  
  <Button className='w-4 p-3' variant="outline">
  <span>

    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
     strokeWidth={1.5} stroke="currentColor" className="size-4 sm:size-6 stroke-2 stroke-white">
<path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>
       </span>
</Button>
</DropdownMenuTrigger>

<DropdownMenuContent className="">
  
  <DropdownMenuGroup className='flex flex-col gap-1 items-center '>

    <DropdownMenuItem asChild className="text-sm ">
      
<Dialog open={open} onOpenChange={setopen}>
<DialogTrigger asChild className='w-full h-full py-2 '>

  <Button className='text-xs px-3 flex justify-start gap-2 w-full h-full' type='button' variant="outline">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
<path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
</svg>Add to Album

</Button>

</DialogTrigger>
<DialogContent className="sm:max-w-[425px]">
  <DialogHeader>
    <DialogTitle>Add to Album</DialogTitle>
    <DialogDescription>
      Type an album you want to move this image into.
    </DialogDescription>
  </DialogHeader>
    <div className="grid grid-cols-4 py-4 items-center gap-4">
      <Label htmlFor="name" className="text-right">
        Album
      </Label>
      <Input onChange={(e)=>{
        setalbumName(e.target.value)
      }} value={albumName} id="name" className="col-span-3" />
    </div>
  <DialogFooter className='gap-4 sm:gap-1'>
    <Button className='hover:bg-gray-700 lg:px-8 ' onClick={()=>{
      setopen(false)}} variant={'secondary'} type="button">Close</Button>
    <Button className='flex items-center gap-2' disabled={albumName===""?true:adding?true:false} 
    onClick={add_to_album} type="submit">
      {!adding && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
</svg>}
{adding && <div>
<SyncLoader
  color="#000000"
  margin={1}
  size={6}
  speedMultiplier={1}
/>
</div>}
Add to Album
</Button>
  </DialogFooter>
</DialogContent>
</Dialog>

    </DropdownMenuItem>
    
    <DropdownMenuItem asChild className="text-sm ">
      
  <Button className=' w-full h-full p-0 ' type='button' variant="outline">
<Link className='flex justify-start py-2 px-3 text-xs gap-2 w-full h-full' href={`edit?public_id=${props.public_id}`}>
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
</svg>Edit 

</Link>
</Button>
    </DropdownMenuItem>
    <DropdownMenuItem asChild className="text-sm ">

<Dialog open={del} onOpenChange={setdel}>
<DialogTrigger asChild className='w-full h-full '>
<Button className='w-full h-full py-2 px-3 text-xs flex justify-start gap-2' type='button' variant="destructive">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
</svg>Delete Image
</Button>

</DialogTrigger>
<DialogContent className="sm:max-w-[425px]">
  <DialogHeader>
    <DialogTitle>Delete Image</DialogTitle>
    <DialogDescription>
      Are you sure you want to delete this image?
    </DialogDescription>
  </DialogHeader>
  <DialogFooter className='gap-4 sm:gap-1'>
    <Button className='hover:bg-gray-700 lg:px-5 ' onClick={()=>{
      setdel(false)
    }
      } variant={'secondary'} type="button">Cancel</Button>
    <Button className='flex items-center gap-2' variant="destructive" disabled={adding?true:false} 
    onClick={async()=>{
      setadding(true)
      await delete_img(props.public_id)
      setdel(false)
      props.handleRefresh(props.public_id,"",true)
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

    </DropdownMenuItem>
    
    
  </DropdownMenuGroup>
  
</DropdownMenuContent>
</DropdownMenu>
    </div>
  )
}
