import { useState, useEffect } from 'react'
import { getLebelsInRepo } from "@/app/(fetchResource)";

interface Labels
{
    color: string;
    id: number;
    name: string;
}

export default function CreateLabelUI({token}:{token:string})
{
    const [labels, setLabels] = useState<Labels[]>([{color: "33FFE6", id: 0, name: "None"}]);
    useEffect(() => {
        getLebelsInRepo(token).then(res => {
            let newRes: Labels[] = res.map((item:any) => {
                return {color: item.color, id: item.id, name: item.name};
            })
            setLabels([...labels, ...newRes]);
        });
    }, []);

    return (
        <div className='w-full h-1/5'>
            <label className='label'>
                <span className='label-text text-base'>Pick a filter</span>
            </label>
            <select name='labels' className='select select-bordered w-full text-base'>
                {labels.map(label => (
                    <option key={label.id} value={label.name} className="text-lg">{label.name}</option>
                ))}
            </select>
        </div>
    )
}