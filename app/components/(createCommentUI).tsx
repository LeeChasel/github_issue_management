import { Dialog } from '@headlessui/react';
import React, {useState} from 'react';
import { createComment } from '../(fetchResource)';

export default function CreateCommentUI({issue_number, token}:{issue_number:string, token:string})
{
    const [isopen, setIsopen] = useState(false);
    
    function handleSubmit(e:any)
    {
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        createComment(formJson, issue_number, token);
    }

    if (!isopen) return <button onClick={() => setIsopen(true)}>write comment</button>
    
    return (
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-2xl font-bold text-center">Enter your data</Dialog.Title>
                    <div className="mt-8 max-w-md">
                        <form method='post' onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                            <label>
                                Type your comment here : 
                                <textarea
                                    name='body'
                                    rows={4}
                                    cols={40}
                                    autoFocus
                                    required
                                />
                            </label>
                            <div className="relative">
                                <button className="bg-red-300 rounded-full hover:bg-red-400 active:bg-red-500 left-0 w-5/12 absolute" type="submit">Create New Data</button>
                                <button className="bg-red-300 rounded-full hover:bg-red-400 active:bg-red-500 right-0 w-5/12 absolute" onClick={() => setIsopen(false)}>Cancel</button>
                            </div>
                        </form>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
    )
}