"use client"
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import React from 'react'

export default function Side_Nav({dialog,setdialog,hov,sethov,mob,setmob,dark_theme,setdark}:any) {
  return (
    <div onMouseEnter={()=>{sethov(true)}} 
    onMouseLeave={()=>{sethov(false)}} 
  className={`${dialog && mob?"":"delay-75 translate-x-[-100%] sm:translate-x-0"} ${dark_theme?"bg-gray-900":"bg-gray-100 text-black "} ${hov ?"w-36":mob?"w-36":"w-14"} transition-all space-y-4 sm:flex flex-col items-center  h-full px-3 w py-4 `}>
          <h2 className="mb-2 hidden px-4 text-lg font-semibold tracking-tight">
            Manage
          </h2>
          
          <div className="w-full h-full relative">

              <div className='absolute bg-gray-00 top-0 w-28'>

            <Button onClick={()=>{setdialog(false)}} variant="ghost" className="w-full hover:delay-200   p-1">
            <Link onClick={()=>{setdialog(false)}} className='flex w-full justify-start items-center gap-2' href="/">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>

              <p className={`transition-all ${hov || mob?"delay-100 ":" opacity-0"}`}>
                Gallery
                </p>
              {/* {hov && <p className={`transition-all ${hov || mob?"opacity-100 delay-200":" invisible opacity-0"}`}>
                Gallery
                </p>} */}



            </Link>
            </Button>
            </div>
<div className='absolute top-12 bg-gray-00 w-28'>
            <Button onClick={()=>{setdialog(false)}} variant="ghost" className="w-full hover:delay-200 p-1">
            <Link href="/albums" className='justify-start flex gap-2 items-center w-full'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
</svg>

<p className={`transition-all ${hov || mob?"delay-100":"opacity-0"}`}>
                Albums
                </p>
            </Link>
            </Button>
            </div>            
            
            <div className={`bg-gray-00 absolute top-24 w-28`}>
            <Button onClick={()=>{setdialog(false)}} variant="ghost" className={` w-full hover:delay-200 p-1`}>
            <Link href="/favourites" className=' justify-start items-center w-full flex gap-2'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
</svg>

<p className={`transition-all z-10 ${hov || mob?"delay-100":"opacity-0 "}`}>
                Favourites
                </p>
            </Link>
            </Button>
      </div>

          </div>

    </div>
    )
}
