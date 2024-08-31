"use client"
import React, { useEffect } from 'react'
import Navbar from './Navbar';
import Side_Nav from "./Side_Nav";
import { useState } from "react";

export default function Slider({children}:any) {
  const [dialog, setdialog] = useState(false)
  const [mob, setmob] = useState(false)
  const [hov, sethov] =  useState(false)
  
  useEffect(() => {
      const ismobile=window.innerWidth<640?true:false
      setmob(ismobile)
      function setwidth(){
        setmob(window.screen.width<640?true:false)
      }
      window.addEventListener("resize",setwidth)
      return (()=>{
        window.removeEventListener("resize",setwidth)
  
      })
    }, [])
  
    return (
    <div className='overflow-hidde h-full flex flex-col'>
      <div className='fixed z-50 bg-gray-900'>
        <Navbar dialog={dialog} setdialog={setdialog} />
        {/* <Navbar /> */}
      </div>

        <div className='mt-14 flex w-full h-full'>

          <div className={`${hov?("z-40"):(mob?(dialog?("z-40"):("z-10 delay-200")):("z-10 delay-200"))} h-full fixed`}>

        <Side_Nav dialog={dialog} setdialog={setdialog} mob={mob} hov={hov} setmob={setmob} sethov={sethov} />
        {/* <Side_Nav /> */}
          </div>

          <div className='ml-0 sm:ml-14 z-20 w-full h-full bg-gray-00'>

        {children}
          </div>

        </div>


    </div>

  )
}
