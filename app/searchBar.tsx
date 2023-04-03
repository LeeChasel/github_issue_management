'use client'
import { Dispatch, FormEvent, SetStateAction, memo } from 'react'
import { CgSearch } from 'react-icons/cg'

function SearchBar({searchString, setSearchString}:{searchString:string, setSearchString:Dispatch<SetStateAction<string>>})
{
    function handleSubmit(e:FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        setSearchString(e.currentTarget.search.value);
    }
    return (
        // <div className="w-full h-[10%]">
            <form className="h-[10%] w-full input-group justify-center items-center" method='POST' onSubmit={handleSubmit}>
                <input type="text" name='search' placeholder='Search' defaultValue={searchString} className="input input-bordered w-1/6 h-2/3 text-lg" />
                <button className="btn btn-square h-2/3" type='submit'>
                    <CgSearch className='w-1/2 h-1/2'/>
                </button>
            </form>
        // </div>
    )
}

export default memo(SearchBar);