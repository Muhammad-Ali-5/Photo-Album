"use client"
import { Button } from '@/components/ui/button'
import { CldImage } from 'next-cloudinary'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useState } from 'react'
export default function Page() {
    const [edit, setedit] = useState("")
  let searchparam=useSearchParams()
  const id:any=searchparam.get("public_id")
  // if(!id){
  //   // console.log("No id")
  // }else{
  //   // console.log(`Id : ${id}`)
  // }
    return (
      <div className="my-5 mx-6 relative h-full">

        <h1 className="text-4xl font-bold">Edit Image</h1>
  

        <div className='bg-gray-00 mt-5 flex flex-wrap gap-3'>
        <Button onClick={()=>{setedit("")}} className='border-white border-2' type='button' variant="ghost">Clear All </Button>
        <Button onClick={()=>{setedit("")}} className='border-white border-2' type='button' variant="ghost">Save</Button>
        <Button onClick={()=>{setedit("fill")}} className='' type='button' variant="default">Apply Generative Fill </Button>
        <Button onClick={()=>{setedit("blur")}} className='' type='button' variant="default">Blur </Button>
        <Button onClick={()=>{setedit("grayscale")}} className='' type='button' variant="default">GrayScale</Button>
        <Button onClick={()=>{setedit("opacity")}} className='' type='button' variant="default">Opacity</Button>
        <Button onClick={()=>{setedit("pixelate")}} className='' type='button' variant="default">Pixelate</Button>
        
        
        </div>
          <Suspense fallback={<div>Loading...</div>}>
        <div className='mt-10 grid grid-cols-1 grid-rows-2 sm:grid-cols-2 sm:grid-rows-1 gap-5 items-center'>

        <CldImage className='mx-auto'
  width="300"
  height="300"
  src={id}
  sizes='100vw'
  alt="Description of my image"
/>
        {
            edit==="fill" &&  
            <CldImage className='mx-auto'
  width="300"
  height="300"
  src={id}
  sizes='100vw'
  crop="pad"
  fillBackground={{prompt:"Tree"}}
  alt="Description of my image"
/>
        }
        {
            edit==="blur" &&  
            <CldImage className='mx-auto'
  width="300"
  height="300"
  src={id}
  sizes='100vw'
  alt="Description of my image"
  blur="1000"
/>
        }
        {
            edit==="grayscale" &&  
            <CldImage className='mx-auto'
  width="300"
  height="300"
  src={id}
  sizes='100vw'
  alt="Description of my image"
  grayscale
/>
        }
        {
            edit==="opacity" &&  
            <CldImage className='mx-auto'
  width="300"
  height="300"
  src={id}
  sizes='100vw'
  alt="Description of my image"
  opacity="50"
/>
        }
        {
            edit==="pixelate" &&  
            <CldImage className='mx-auto'
  width="300"
  height="300"
  src={id}
  sizes='100vw'
  alt="Description of my image"
  pixelate
/>
        }

        </div>
      
        </Suspense>
      </div>
  )
}
