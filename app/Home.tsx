'use client'

import { useState } from "react";
import CreateBtn from "./create-btn";
import IssueList from "./issueList";
import LabelSelector from "./labelSelector";
import SearchBar from "./searchBar";
import SortBtn from "./sort-btn";
import SignOutBtn from "./signOut-btn";

export default function Home({token, children}:{token: string, children: React.ReactNode})
{
  const [searchString, setSearchString] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [sortByOld, setSortByOld] = useState(false);
  return (
    <div className='h-full flex flex-col bg-gray-100'>
      <SearchBar searchString={searchString} setSearchString={setSearchString}/>
      <div className='flex h-[90%] divide-x-2'>
        <div className='flex flex-col w-1/6 gap-y-4 divide-y bg-blue-400 px-2 rounded-l-lg'>
          {children}
          <LabelSelector token={token} selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel}/>
          <SortBtn sortByOld={sortByOld} setSortByOld={setSortByOld}/>
          <SignOutBtn/>
        </div>
        <div className='flex flex-col w-5/6 h-full bg-blue-400 rounded-r-lg '>
          <CreateBtn/>
          <div className="mx-10 h-[90%] overflow-y-auto" id='scrollableDiv'>
              <IssueList token={token} selectedLabel={selectedLabel} searchString={searchString} sortByOld={sortByOld}/>
          </div>
        </div>
      </div>
    </div>
  )
}