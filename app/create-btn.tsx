'use client'

import { Dialog } from "@headlessui/react";
import { useSession } from "next-auth/react";
import { memo, useState } from "react";
import { IoIosAddCircleOutline } from "react-icons/io"
import useLabels from "@/hooks/useLabels";

function SelectLabel({token}:{token:string})
{
    const { labels, isError, isLoading } = useLabels(token);
    if (isLoading) return <div>Loading</div>
    if (isError) return <div>Error</div>
    return (
        <div className='w-full h-1/5'>
            <label className='label'>
                <span className='label-text text-base'>Pick a filter</span>
            </label>
            <select name='labels' className='select select-bordered w-full text-base'>
                <option value="None">None</option>
                {labels.map((label:{id:number, name:string}) => (
                    <option key={label.id} value={label.name} className="text-lg">{label.name}</option>
                ))}
            </select>
        </div>
    )
}

function CreateBtn()
{
    const [ isopen, setIsopen ] = useState(false);
    const { data: session } = useSession();

    function handleSubmit(e:any)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        if (formData.get("labels") === "None") formData.delete("labels")

        const formJson = Object.fromEntries(formData.entries());
        let newFormJson:any = formJson
        if (newFormJson.labels) newFormJson.labels = [newFormJson.labels];
        fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/issues`, {
            headers: {
                "Accept" : "application/vnd.github+json",
                "Authorization" : `Bearer ${session?.user.token}`,
            },
            method: "POST",
            body: JSON.stringify(newFormJson)
        }).then(() => window.location.reload()).catch(err => console.log(err));
    }

    return (
        <>
            <button onClick={() => setIsopen(true)} className="btn gap-2 w-1/6 self-end mr-11 my-3 text-lg">
            <IoIosAddCircleOutline className='h-6 w-6'/>Create Issue            
            </button>
            
            <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full h-full relative z-50">
                <div className="fixed inset-0 flex items-center justify-center p-4 w-full h-full">
                    <Dialog.Panel className="w-1/3 h-2/3 rounded bg-sky-300 py-12 px-7">
                        <Dialog.Title className="text-2xl font-bold text-center">Create Issue</Dialog.Title>
                                <form method="POST" onSubmit={handleSubmit} className="form-control w-full h-full">
                                    <div className='w-full h-1/5'>
                                        <label className="label">
                                            <span className="label-text">Title</span>
                                        </label>
                                        <input type="text" name="title" required placeholder="Title here" className="input input-bordered w-full " />
                                    </div>
                                    <div className='w-full h-2/5'>
                                        <label className="label">
                                            <span className="label-text">Type Your Comment</span>
                                            <span className="label-text-alt">At least 30 words</span>
                                        </label>
                                        <textarea name='body' required minLength={30} className="textarea textarea-bordered h-4/5 w-full resize-none" placeholder="Comment here" />
                                    </div>
                                    {(session?.user.username == process.env.NEXT_PUBLIC_REPO_OWNER) && <SelectLabel token={session?.user.token} />}
                                    <div className='flex w-full h-1/5 items-center justify-around'>
                                        <button className="btn w-1/3 rounded-full" onClick={() => setIsopen(false)}>Cancel</button>
                                        <button className="btn w-1/3 rounded-full" type="submit">Create</button>
                                    </div>
                                </form> 
                    </Dialog.Panel>
                </div>
            </Dialog>     
        </>
    )
}

export default memo(CreateBtn)