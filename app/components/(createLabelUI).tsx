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
        <>
        <label>
            <span>choose label : </span>
            <select name="labels">
                {labels.map(label => (
                    <option key={label.id} value={label.name}>{label.name}</option>
                ))}
            </select>
        </label>
        </>
    )
}