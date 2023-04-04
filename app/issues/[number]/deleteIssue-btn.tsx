'use client'

import { Dialog } from "@headlessui/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

export default function DeleteIssueBtn({number}:{number:string})
{
    const [ isopen, setIsopen ] = useState(false);
    const router = useRouter();
    const { data: session } = useSession();

    async function handleDelete()
    {
        const alert = confirm("Sure to delete ?");
        if (alert)
        {
            const res = await fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/issues/${number}`, {
                headers: {
                    "Accept" : "application/vnd.github+json",
                    "Authorization" : `Bearer ${session?.user.token}`,
                },
                method: "PATCH",
                body: JSON.stringify({state:"closed"})
            })

            if (res.ok)
            {
                window.alert("Deleted issue successfully")
                router.back()
            } else {
                window.alert("Failed to delete issue")
            }
        }        
    }

    return (
        <>
        <button className="btn btn-primary bg-yellow-400 hover:bg-yellow-500 w-1/2 text-lg" onClick={() => setIsopen(true)}>Delete</button>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 h-1/4 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-3xl font-bold text-center">Sure To Delete This Issue?</Dialog.Title>
                    <div className='flex justify-around mt-12'>
                        <button className="btn btn-primary bg-yellow-400 hover:bg-yellow-500 w-1/3 rounded-full text-lg" onClick={() => setIsopen(false)}>Cancel</button>
                        <button className="btn btn-primary bg-yellow-400 hover:bg-yellow-500 w-1/3 rounded-full text-lg" onClick={handleDelete}>Delete</button>
                    </div>
                </Dialog.Panel>
            </div>
        </Dialog>
        </>
    )
}