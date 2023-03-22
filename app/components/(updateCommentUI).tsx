import { useState } from "react";
import { Dialog } from '@headlessui/react';
import { updateComment } from "../(fetchResource)";

export default function UpdateCommentUI({token, id, text}:{token:string, id: string, text: string})
{
    const [isopen, setIsopen] = useState(false);

    function handleSubmit(e:any)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        updateComment(formJson, id, token).then(() => window.location.reload());
    }
    
    return (
        <>
        <li><button onClick={() => setIsopen(true)}>Edit</button></li>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/2 h-96 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-2xl font-bold text-center">Edit Comment</Dialog.Title>
                        <form method='post' onSubmit={handleSubmit} className="flex flex-col w-full h-full pb-6 space-y-6">
                            <div className='form-control justify-evenly w-full h-full'>
                                <label className="label">
                                    <span className="label-text">Type Your Comment</span>
                                </label>
                                <textarea name='body' defaultValue={text} autoFocus required className="textarea textarea-bordered w-full h-full resize-none" placeholder="Comment here" />
                            </div>
                            <div className='flex justify-around w-full'>
                                <button className="btn w-1/3 rounded-full" onClick={() => setIsopen(false)}>Cancel</button>
                                <button className="btn w-1/3 rounded-full" type="submit">Update Comment</button>
                            </div>
                        </form>
                </Dialog.Panel>
            </div>
        </Dialog>
        </>
    )


}