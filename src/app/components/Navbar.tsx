"use client"
import React from 'react'
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
  } from "@/components/ui/avatar"
import { Button } from '@/components/ui/button'
 
  
export default function Navbar({dialog,setdialog}:any) {
  return (
    <div className='h-14 w-[100vw] border border-b-gray-200 flex justify-between px-7 items-center'>

<div className='hidden sm:inline text-lg font-semibold'>
    My-Photo-Album
</div>

<div className='flex items-center gap-3'>

<Avatar className='size-10'>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
    <p className='font-bold sm:hidden'>My Photo Album</p>
</div>

<div className='sm:hidden'>
<Button onClick={()=>{
  // console.log(`Dialog : ${dialog}`)
  setdialog(!dialog)  
}} variant="ghost" className="bg-gray-900">
          {!dialog && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
</svg>}
          {dialog && <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-8">
  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg>


}

          </Button>
</div>

    </div>
  )
}
