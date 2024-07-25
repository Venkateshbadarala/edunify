"use client"
import React,{useEffect} from 'react'
import AddSchool from "@/app/components/addSchool"
const page = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);
  return (
    <div  className='h-[75vh] overflow-auto no-scrollbar'>
        <AddSchool/>
    </div>
  )
}

export default page