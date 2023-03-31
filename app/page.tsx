'use client'

import LoginBtn from './login-btn';
import { useSession } from "next-auth/react"
// import { FormEvent, useState } from 'react';
import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
// import Btn from "./btn";
import { useState } from 'react'
import SearchBar from './searchBar';
import LabelSelector from './labelSelector';
function Home({username}:{username:string})
{
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchString, setSearchString] = useState("");
  const [sortByOld, setSortByOld] = useState(false);

  return (
    <div className='h-full flex flex-col'>
      <SearchBar searchString={searchString} setSearchString={setSearchString}/>
      <div className='flex h-[90%]'>
        <div className='flex flex-col w-1/6 gap-y-4 divide-y bg-blue-200 px-2'>
          <h3 className='text-center text-lg pt-4'>Welcome {username}</h3>
          <LabelSelector selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel}/>
        </div>

      </div>
    </div>
  )
}

export default function LoginState() 
{
  const { data: session } = useSession()
  // const session = await getServerSession(authOptions);
  // console.log("re-render")
  console.log(session)
  if (!session) return <LoginBtn/>
  return <Home username={session.user.username}/>
}