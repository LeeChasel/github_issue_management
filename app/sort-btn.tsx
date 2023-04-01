'use client'
import { ChangeEvent, Dispatch, SetStateAction, memo } from "react"

function SortBtn({sortByOld, setSortByOld}:{sortByOld:boolean, setSortByOld:Dispatch<SetStateAction<boolean>>})
{
    function handleSort(e:ChangeEvent<HTMLInputElement>)
    {
        setSortByOld(e.target.value === "oldest")
    }
    return (
        <div className='flex flex-col items-center pt-4'>
            <h2 className='text-lg'>Sort</h2>                        
            <form className="form-control w-full">
                <label className="label cursor-pointer">
                    <span className="label-text text-base">Newest</span> 
                    <input type="radio" value="newest" onChange={handleSort} checked={!sortByOld} className="radio checked:bg-red-500" />
                </label>
                <label className="label cursor-pointer">
                    <span className="label-text text-base">Oldest</span> 
                    <input type="radio" value="oldest" onChange={handleSort} checked={sortByOld} className="radio checked:bg-blue-500" />
                </label>
            </form>
        </div>
    )
}

export default memo(SortBtn)