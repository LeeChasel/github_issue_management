'use client'
import useLabels from "@/hooks/useLabels";
import { Dispatch, SetStateAction, memo } from "react";
import type { Label } from "@/types/FormLabel";
function LabelSelector({token, selectedLabel, setSelectedLabel}:{token:string, selectedLabel:string, setSelectedLabel: Dispatch<SetStateAction<string>>})
{   
    const { labels, isError, isLoading } = useLabels(token);
    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>
    return (
        <div className='pt-4'>
            <h2 className='text-center text-lg'>Filter</h2>
            <div className="form-control w-full">
                <label className='label'>
                    <span className='label-text text-base'>Pick a filter</span>
                </label>
                <select className='select select-bordered text-base' value={selectedLabel} onChange={e => setSelectedLabel(e.target.value)}>
                    <option value="All" className="text-lg">All</option>
                    {labels.map((label:Label) => (
                        <option key={label.id} value={label.name} className="text-lg">{label.name}</option>
                    ))}
                </select>
            </div>
        </div>
    )    
}

export default memo(LabelSelector);