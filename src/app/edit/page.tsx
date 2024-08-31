"use client"
import { Button } from '@/components/ui/button'
import { CldImage } from 'next-cloudinary'
import { useSearchParams } from 'next/navigation'
import React, { Suspense, useEffect, useState } from 'react'
import EditImage from '../components/EditImage'
export default function Page() {
  return (
      <div className="">
          <Suspense fallback={<div>Loading...</div>}>
          <EditImage/>
        </Suspense>
      </div>
  )
}
