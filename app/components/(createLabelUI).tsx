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
        <div className="form-control w-full max-w-xs">
            <label className='label'>
                <span className='label-text'>Pick a filter</span>
            </label>
            <select name='labels' className='select select-bordered'>
                {labels.map(label => (
                    //補顏色
                    <option key={label.id} value={label.name}>{label.name}</option>
                ))}
            </select>
        </div>
    )
}