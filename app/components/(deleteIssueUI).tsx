import { Dialog } from '@headlessui/react';
import { useState } from 'react';
import { deleteIssue } from '../(fetchResource)';
import { useRouter } from 'next/navigation';

export default function DeleteIssueUI({token, issue_number}:{token:string, issue_number:string})
{
    const [isopen, setIsopen] = useState(false);
    const router = useRouter();
    function handleDelete()
    {
        let alert: boolean = confirm("Sure to delete ?");
        if (alert)
        {
            deleteIssue(token, issue_number).then(() => router.back())
        }
    }

    return (
        <>
        <button className="btn w-1/2 text-lg" onClick={() => setIsopen(true)}>Delete</button>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 h-1/4 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-3xl font-bold text-center">Sure To Delete This Issue?</Dialog.Title>
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