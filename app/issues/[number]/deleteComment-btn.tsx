'use client'

import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function DeleteCommentBtn({token, id}:{token:string, id:string})
{
    const [isopen, setIsopen] = useState(false);
    async function handleDelete()
    {
        const res = await fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/issues/comments/${id}`, {
            headers: {
                "Accept" : "application/vnd.github+json",
                "Authorization" : `Bearer ${token}`,
            },
            method: "DELETE",
        })

        if (res.ok)
        {
            window.alert("Deleted comment successfully")
            window.location.reload()
        } else {
            window.alert("Failed to delete issue")
        }
    }

    return (
        <>
        <li><button className="text-lg" onClick={() => setIsopen(true)}>Delete</button></li>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 h-1/4 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-3xl font-bold text-center">Sure To Delete The Comment?</Dialog.Title>
                        <div className='flex justify-around mt-12'>
                            <button className="btn w-1/3 rounded-full text-lg" onClick={() => setIsopen(false)}>Cancel</button>
                            <button className="btn w-1/3 rounded-full text-lg" onClick={handleDelete}>Delete</button>
                        </div>
                </Dialog.Panel>
            </div>
        </Dialog>
        </>
    )
}