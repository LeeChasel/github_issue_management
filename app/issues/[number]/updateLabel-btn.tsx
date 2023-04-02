'use client'

import { Label } from "@/types/FormLabel";
import { AiOutlineSetting } from "react-icons/ai";

export default function UpdateLabelBtn({token, number, labels}:{token:string, number:string, labels:Label[]})
{
    async function handleChange(changeLabel:string)
    {
        const data = (changeLabel === "None") ? [] : [changeLabel];
        const res = await fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/issues/${number}/labels`,{
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
        method: "PUT",
        body: JSON.stringify({labels:data}),
        })

        if (res.ok)
        {
            window.alert("Updated state successfully")
            window.location.reload()
        } else {
            window.alert("Failed to update state")
        }
    }
    
    return (
        <div className="dropdown dropdown-right">
            <label tabIndex={0} className="btn btn-ghost"><AiOutlineSetting className='w-5 h-5'/></label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
                <p className='text-center'>Set State</p>
                <li onClick={() => handleChange("None")} className="cursor-pointer hover:bg-gray-100 p-1 rounded-md">None</li>
                {labels.map(label => (
                    <li key={label.id} onClick={() => handleChange(label.name)}><p className='p-1'>{label.name}</p></li>
                ))}
            </ul>
        </div>
    )
}