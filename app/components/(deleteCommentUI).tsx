import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { deleteComment } from '../(fetchResource)';

export default function DeleteCommentUI({token, id}:{token:string, id:string})
{
    const [isopen, setIsopen] = useState(false);
    function handleDelete()
    {
        deleteComment(token, id).then(() => window.location.reload());
    }

    return (
        <>
        <li><button onClick={() => setIsopen(true)}>Delete</button></li>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/2 h-2/5 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-2xl font-bold text-center">Sure To Delete The Comment?</Dialog.Title>
                        <div className='flex justify-around mt-16'>
                            <button className="btn w-1/3 rounded-full" onClick={() => setIsopen(false)}>Cancel</button>
                            <button className="btn w-1/3 rounded-full" onClick={handleDelete}>Delete</button>
                        </div>
                </Dialog.Panel>
            </div>
        </Dialog>
        </>
    )
}