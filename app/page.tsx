"use client"
import Showschool from "@/app/Showschool/page";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import AddSchool from "@/app/Postschool/page";

export default function Home() {
  const [addSchool, setAddSchool] = useState(false);

  

  return (
    <main className="flex flex-col items-center justify-between ">
      <div>
        <h1 className="text-white p-4 uppercase text-2xl font-bold md:text-[2rem] sm:text-[20px]">find your Favourite schools</h1>
      </div>
      <div className='flex flex-col gap-8 py-4 md:overflow-auto xsm:overflow-auto no-scrollbar'>
        <div className='text-white flex justify-center items-center gap-10 font-bold md:text-[1.2rem] sm:text-[20px]'>
          <Link href='#' onClick={() => setAddSchool(false)} 
            className={`border-b  border-sky-500 ${!addSchool ? ' text-sky-500' : 'text-white'}`}>
            SHOW SCHOOLS
          </Link>
          <Link href='#' onClick={() => setAddSchool(true)} 
            className={`border-b border-sky-500 ${addSchool ? ' text-sky-500' : 'text-white'}`}>
            ADD SCHOOL
          </Link>
        </div>

        <div className='h-[90vh]'>
          {addSchool ? <AddSchool /> : <Showschool />}
        </div>
      </div>
    </main>
  );
}
