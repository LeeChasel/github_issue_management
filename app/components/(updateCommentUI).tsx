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
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full h-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full h-full">
                <Dialog.Panel className="w-1/2 rounded bg-sky-300 py-12 px-7 h-1/3 ">
                    <Dialog.Title className="text-2xl font-bold text-center">Type Comment</Dialog.Title>
                    <div className="mt-8 w-full">
                        <form method='post' onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                        <div className='w-full h-2/5'>
                                    <label className="label">
                                        <span className="label-text">Type your comment</span>
                                        <span className="label-text-alt">At least 30 words</span>
                                    </label>
                                    <textarea name='body' required minLength={30} className="textarea textarea-bordered h-4/5 w-full" placeholder="Comment here" />
                                </div>


                            {/* <label>
                                Edit your comment here : 
                                <textarea
                                    name='body'
                                    rows={4}
                                    cols={40}
                                    defaultValue={text}
                                    autoFocus
                                    required
                                />
                            </label> */}
                            <div className="relative">
                                <button className="bg-red-300 rounded-full hover:bg-red-400 active:bg-red-500 left-0 w-5/12 absolute" type="submit">Edit Data</button>
                                <button className="bg-red-300 rounded-full hover:bg-red-400 active:bg-red-500 right-0 w-5/12 absolute" onClick={() => setIsopen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
        </>
    )


}