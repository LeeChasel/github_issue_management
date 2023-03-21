import { useState } from "react";
import { Dialog } from '@headlessui/react';
import { updateIssue } from "../(fetchResource)";

interface FormContent
{
    number: number;
    html_url: string;
    title: string;
    body: string;
    labels: Labels[];
}
interface Labels
{
    color: string;
    id: number;
    name: string;
}

export default function UpdateIssueUI({token, data}:{token:string, data: FormContent})
{
    const [isopen, setIsopen] = useState(false);

    function handleSubmit(e:any)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        updateIssue(token, data.number, formJson).then(() => window.location.reload());
    }
    return (
        <>
        <button className="btn w-1/2" onClick={() => setIsopen(true)}>Edit</button>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 h-2/3 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-2xl font-bold text-center">Edit Issue</Dialog.Title>
                    {/* <div className="mt-8 max-w-md"> */}
                        <form method='post' onSubmit={handleSubmit} className="form-control w-full h-full">
                            <div className='w-full h-1/5'>
                                <label className="label">
                                    <span className="label-text">Title</span>
                                </label>
                                <input type="text" name="title" defaultValue={data ? data.title : ""} required className="input input-bordered w-full " />
                            </div>
                            <div className='w-full grow'>
                                <label className="label">
                                    <span className="label-text">Type Your Comment</span>
                                    <span className="label-text-alt">At least 30 words</span>
                                </label>
                                <textarea name='body' required minLength={30} className="textarea textarea-bordered h-4/5 w-full resize-none" placeholder="Comment here" defaultValue={data ? data.body : ""} />
                            </div>
                            <div className='flex w-full h-1/5 items-center justify-around'>
                                <button className="btn w-1/3 rounded-full" onClick={() => setIsopen(false)}>Cancel</button>
                                <button className="btn w-1/3 rounded-full" type="submit">Save</button>
                            </div>
                            {/* <label className='block'>
                                <span>Edit title : </span>
                                <input defaultValue={data ? data.title : ""} type="text" id="title" name="title" required className='indent-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'/>
                            </label>
                            <label>
                                <span className='mr-7'>Type your comment</span>
                                <span>at least 30 letters</span>
                                <textarea
                                    name='body'
                                    rows={4}
                                    cols={40}
                                    defaultValue={data ? data.body : ""}
                                    required
                                    minLength={30}
                                />
                            </label>                            
                            <div className="relative">
                                <button className="bg-red-300 rounded-full hover:bg-red-400 active:bg-red-500 left-0 w-5/12 absolute" type="submit">Edit Data</button>
                                <button className="bg-red-300 rounded-full hover:bg-red-400 active:bg-red-500 right-0 w-5/12 absolute" onClick={() => setIsopen(false)}>Cancel</button>
                            </div> */}
                        </form>
                    {/* </div> */}
                </Dialog.Panel>
            </div>
        </Dialog>
        </>
    )
}