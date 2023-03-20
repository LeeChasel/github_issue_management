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
        <button className="btn w-1/2" onClick={() => setIsopen(true)}>Delete</button>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-2xl font-bold text-center">Are you sure to delete this issue ?</Dialog.Title>
                    <div className="mt-8 max-w-md">                        
                            <div className="relative">
                                <button className="bg-red-300 rounded-full hover:bg-red-400 active:bg-red-500 left-0 w-5/12 absolute" onClick={handleDelete}>Delete</button>
                                <button className="bg-red-300 rounded-full hover:bg-red-400 active:bg-red-500 right-0 w-5/12 absolute" onClick={() => setIsopen(false)}>Cancel</button>
                            </div>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
        </>
    )
}