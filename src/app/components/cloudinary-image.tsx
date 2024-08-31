"use client"
import { CldImage } from 'next-cloudinary'
import React, {  useState, useTransition } from 'react'
import { markFav } from './Get_data' 
import { MoonLoader } from 'react-spinners'
import Dropdown from './Dropdown'
import { Button } from '@/components/ui/button'


  

export default function CloudinaryImage({props,path,rmv_img,handleRefresh}:any) {
  const [fav, setfav] = useState(props.tags.includes("favourite"))
  const [marking, setmarking] = useState(false)

  return (
    <div className={`relative h-min`}>
            {marking &&
              <>
              <div className={`bg-gray-600 opacity-45 ${marking?"":""} absolute w-full h-full `}>
           </div>

           <div className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
           <MoonLoader size={80} speedMultiplier={1.4} />
           </div>
           </>
          } 
           
           <CldImage
           loading='lazy'
  width="600"
  height="500"
  src={props.public_id}
  sizes='100vw'
  alt="Description of my image"
/>

{/* <Button> */}

  <svg 
  onClick={async()=>{
  try{
    // console.log("Started...")
    setmarking(true)
    await markFav(props.public_id,fav)
    if(path==="/favourites"){
      await rmv_img(props.public_id)
    }
  }finally{
    // console.log("Ended...")
    setfav(!fav)
    setmarking(false)

    }
  }}
  
  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={`size-4 sm:size-6  hover:stroke-pink-500 ${fav?"fill-pink-500 stroke-pink-500 hover:stroke-white":""} z-10  stroke-2 absolute top-1 left-2 cursor-pointer`}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
  </svg>
{/* </Button> */}
  
  <div className='absolute h-6 top-2 right-2'>
  <Dropdown handleRefresh={handleRefresh} public_id={props.public_id}/>

  </div>

    </div>
  )
}
