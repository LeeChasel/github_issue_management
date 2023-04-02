'use client'

import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function CreateCommentBtn({token, number}:{token:string, number:string})
{
    const [isopen, setIsopen] = useState(false);
    async function handleSubmit(e:any)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        const res = await fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/issues/${number}/comments`, {
            headers: {
                "Accept" : "application/vnd.github+json",
                "Authorization" : `Bearer ${token}`,
            },
            method: "POST",
            body: JSON.stringify(formJson),
        })

        if (res.ok)
        {
            window.alert("Created comment successfully")
            window.location.reload()
        } else {
            window.alert("Failed to create comment")
        }
    }

    return (
        <div className='flex justify-end'>
            <button onClick={() => setIsopen(true)} className="btn btn-wide text-lg">Write Comment</button>
            <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
                <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                    <Dialog.Panel className="w-1/2 h-96 rounded bg-sky-300 py-12 px-7">
                        <Dialog.Title className="text-3xl font-bold text-center">Write New Comment</Dialog.Title>
                            <form method='post' onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 space-y-6">
                                <div className='form-control justify-evenly w-full h-full'>
                                    <label className="label">
                                        <span className="label-text text-base">Type Your Comment</span>
                                    </label>
                                    <textarea name='body' autoFocus required className="textarea textarea-bordered w-full h-full resize-none" placeholder="Comment here" />
                                </div>
                                <div className='flex justify-around w-full'>
                                    <button className="btn w-1/3 rounded-full text-lg" onClick={() => setIsopen(false)}>Cancel</button>
                                    <button className="btn w-1/3 rounded-full text-lg" type="submit">Comment</button>
                                </div>
                            </form>
                    </Dialog.Panel>
                </div>
            </Dialog>   
        </div>
    )
}