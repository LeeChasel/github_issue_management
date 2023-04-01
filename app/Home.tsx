'use client'

import { useState } from "react";
import CreateBtn from "./create-btn";
import IssueList from "./issueList";
import LabelSelector from "./labelSelector";
import SearchBar from "./searchBar";
import SortBtn from "./sort-btn";

export default function Home({children}:{children: React.ReactNode})
{
  const [searchString, setSearchString] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("All");
  const [sortByOld, setSortByOld] = useState(false);
  return (
    <div className='h-full flex flex-col'>
      <SearchBar searchString={searchString} setSearchString={setSearchString}/>
      <div className='flex h-[90%]'>
        <div className='flex flex-col w-1/6 gap-y-4 divide-y bg-blue-200 px-2'>
          {children}
          <LabelSelector selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel}/>
          <SortBtn sortByOld={sortByOld} setSortByOld={setSortByOld}/>
        </div>
        <div className='flex flex-col w-5/6 h-full bg-yellow-300'>
          <CreateBtn/>
          <div className="mx-10 h-[90%] overflow-y-auto" id='scrollableDiv'>
              <IssueList selectedLabel={selectedLabel} searchString={searchString} sortByOld={sortByOld}/>
          </div>
        </div>
      </div>
    </div>
  )
}