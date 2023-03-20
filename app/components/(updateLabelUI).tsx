import { useState, useEffect } from 'react'
import { getLebelsInRepo, setLabel } from "@/app/(fetchResource)";
import { AiOutlineSetting } from 'react-icons/ai'

interface Labels
{
    color: string;
    id: number;
    name: string;
}

export default function UpdateLabelUI({token, issue_number}:{token:string, issue_number:string})
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

    function handleChange(changeLabel:string)
    {
        const formData = new FormData();
        formData.append("labels", changeLabel)
        const formJson = Object.fromEntries(formData.entries());
        setLabel(token, issue_number, formJson).then(() => window.location.reload());
    }
    return (
        <div className="dropdown dropdown-right">
            <label tabIndex={0} className="btn btn-ghost mx-1"><AiOutlineSetting/></label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
                {labels.map(label => (
                    <li key={label.id} onClick={() => handleChange(label.name)}><p className='p-1'>{label.name}</p></li>
                ))}
            </ul>
        </div>
    )
}