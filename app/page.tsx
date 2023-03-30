'use client'

import LoginBtn from './login-btn';
import { useSession } from "next-auth/react"
import { FormEvent, useState } from 'react';
import { CgSearch } from 'react-icons/cg'
import { BsInfoCircle } from 'react-icons/bs'
import { useRouter } from 'next/navigation';
// import Btn from "./btn";

function SearchBar({searchString, setSearchString}:{searchString:string, setSearchString:any})
{
    function handleSubmit(e:FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        setSearchString(e.currentTarget.search.value);
    }
    return (
        <div className="form-control w-full h-[10%] items-center">
            <form className="h-full input-group justify-center items-center" method='POST' onSubmit={handleSubmit}>
                <input type="text" name='search' placeholder='Search' defaultValue={searchString} className="input input-bordered w-1/6 h-2/3 text-lg" />
                <button className="btn btn-square h-2/3" type='submit'>
                    <CgSearch className='w-1/2 h-1/2'/>
                </button>
             </form>
        </div>
    )
}

export default function Home() 
{
  const { data: session } = useSession()
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [searchString, setSearchString] = useState("");
  const [sortByOld, setSortByOld] = useState(false);
  const router = useRouter()
  console.log("re-render")
  if (!session) return <LoginBtn/>
  
  return (
    <div className='h-full flex flex-col'>
      <SearchBar searchString={searchString} setSearchString={setSearchString}/>
      {/* <button onClick={() => router}>click</button> */}

    </div>
  )
}