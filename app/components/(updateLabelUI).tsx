import { useState, useEffect } from 'react'
import { getLebelsInRepo, setLabel } from "@/app/(fetchResource)";

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

    function handleChange(e:string)
    {
        const formData = new FormData();
        formData.append("labels", e)
        const formJson = Object.fromEntries(formData.entries());
        setLabel(token, issue_number, formJson);
        window.location.reload();
    }
    return (
        <>
        <label>
            <span>change label : </span>
            <select name="labels" value="default" onChange={(e) => handleChange(e.currentTarget.value)}>
                <option value="default" disabled>choose label</option>
                {labels.map(label => (
                    <option key={label.id} value={label.name}>{label.name}</option>
                ))}
            </select>
        </label>
        </>
    )
}