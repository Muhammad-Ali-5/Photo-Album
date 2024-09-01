"use client"
import { Button } from '@/components/ui/button'
import { CldImage } from 'next-cloudinary'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useContext, useEffect, useState } from 'react'
import { Themecontext } from './Slider'
export default function EditImage() {
    const [edit, setedit] = useState("")
    const [id, setid] = useState("")
  let searchparam=useSearchParams()
  useEffect(() => {
    const new_id:any=searchparam.get("public_id")
    setid(new_id)
  }, [searchparam])
  const theme = useContext(Themecontext)
  
  return (
      <div className={`${theme.dark_theme?"":"text-black"} my-5 mx-6 relative h-full`}>

        <h1 className="text-4xl font-bold">Edit Image</h1>
  

        <div className='bg-gray-00 mt-5 flex flex-wrap gap-3'>
        <Button onClick={()=>{setedit("")}} className={`${theme.dark_theme?"":"border-black "}  border-2`} type='button' variant="ghost">Clear All </Button>
        <Button onClick={()=>{setedit("")}} className={`${theme.dark_theme?"":"border-black "}  border-2`} type='button' variant="ghost">Save</Button>
        <Button onClick={()=>{setedit("fill")}} className={`${theme.dark_theme?"":"bg-gray-600 text-white hover:bg-gray-400 "}`} type='button' variant="default">Apply Generative Fill </Button>
        <Button onClick={()=>{setedit("blur")}} className={`${theme.dark_theme?"":"bg-gray-600 text-white hover:bg-gray-400 "}`} type='button' variant="default">Blur </Button>
        <Button onClick={()=>{setedit("grayscale")}} className={`${theme.dark_theme?"":"bg-gray-600 text-white hover:bg-gray-400 "}`} type='button' variant="default">GrayScale</Button>
        <Button onClick={()=>{setedit("opacity")}} className={`${theme.dark_theme?"":"bg-gray-600 text-white hover:bg-gray-400 "}`} type='button' variant="default">Opacity</Button>
        <Button onClick={()=>{setedit("pixelate")}} className={`${theme.dark_theme?"":"bg-gray-600 text-white hover:bg-gray-400 "}`} type='button' variant="default">Pixelate</Button>
        
        
        </div>
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
      
      </div>
  )
}
