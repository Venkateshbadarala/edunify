"use client"
import React,{useEffect} from 'react'
import AddSchools from "@/app/components/AddSchool"
const page = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);
  return (
    <div  className='h-[75vh] overflow-auto no-scrollbar'>
        <AddSchools/>
    </div>
  )
}

export default page