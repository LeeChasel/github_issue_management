'use client'

import { Dialog } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import type { FormIssue } from "@/types/FormIssue";

export default function UpdateIssueBtn({number, data}:{number:string, data:FormIssue})
{
    const [isopen, setIsopen] = useState(false);
    const { data: session} = useSession()
    async function handleSubmit(e:any)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());

        const res = await fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/issues/${number}`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${session?.user.token}`,
        },
        method: "PATCH",
        body: JSON.stringify(formJson),
        })

        if (res.ok)
        {
            window.alert("Updated issue successfully")
            window.location.reload()
        } else {
            window.alert("Failed to update issue")
        }
    }

    return (
        <>
        <button className="btn btn-primary bg-yellow-400 hover:bg-yellow-500 w-1/2 text-lg" onClick={() => setIsopen(true)}>Edit</button>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 h-2/3 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-3xl font-bold text-center">Edit Issue</Dialog.Title>
                        <form method='post' onSubmit={handleSubmit} className="form-control w-full h-full">
                            <div className='w-full h-1/5'>
                                <label className="label">
                                    <span className="label-text text-base">Title</span>
                                </label>
                                <input type="text" name="title" defaultValue={data ? data.title : ""} required className="input input-bordered w-full " />
                            </div>
                            <div className='w-full grow'>
                                <label className="label">
                                    <span className="label-text text-base">Type Your Comment</span>
                                    <span className="label-text-alt text-base">At least 30 words</span>
                                </label>
                                <textarea name='body' required minLength={30} className="textarea textarea-bordered h-4/5 w-full resize-none" placeholder="Comment here" defaultValue={data ? data.body : ""} />
                            </div>
                            <div className='flex w-full h-1/5 items-center justify-around'>
                                <button className="btn btn-primary bg-yellow-400 hover:bg-yellow-500 w-1/3 rounded-full text-lg" onClick={() => setIsopen(false)}>Cancel</button>
                                <button className="btn btn-primary bg-yellow-400 hover:bg-yellow-500 w-1/3 rounded-full text-lg" type="submit">Save</button>
                            </div>
                        </form>
                </Dialog.Panel>
            </div>
        </Dialog>
        </>
    )

}