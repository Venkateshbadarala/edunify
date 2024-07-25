"use client"
import React,{useEffect} from 'react'
import ShowSchool from"@/app/components/ShowSchools";
const page = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'; 
    return () => {
      document.body.style.overflow = 'auto'; 
    };
  }, []);
  return (
    <div className='h-[80vh] overflow-auto no-scrollbar'>
      <ShowSchool/>
    </div>
  )
}

export default page