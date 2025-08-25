"use client"
import React, { Suspense } from 'react'
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
