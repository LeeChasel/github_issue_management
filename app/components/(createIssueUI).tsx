import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { getLebelsInRepo, createIssue, getUsername } from '../(fetchResource)';
import CreateLabelUI from './(createLabelUI)';
import { IoIosAddCircleOutline } from 'react-icons/io'

interface Labels
{
    color: string;
    id: number;
    name: string;
}

export default function CreateIssueUI({token}:{token:string})
{
    const [isopen, setIsopen] = useState(false);
    const [data, setData] = useState<Labels[]>([]);
    const [username, setUsername] = useState("");

    useEffect(() => {
        getLebelsInRepo(token).then(res => {
            let newRes: Labels[] = res.map((item:any) => {
                return {color: item.color, id: item.id, name: item.name};
            })
            setData([...data, ...newRes]);
        });
        getUsername(token).then(res => setUsername(res));
    }, [])

    function handleSubmit(e:any)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        createIssue(token, formJson).then(() => window.location.reload());
    }

    return (
        <>
        <button onClick={() => setIsopen(true)} className="btn gap-2 w-1/6 self-end mr-11 my-3 text-lg">
            <IoIosAddCircleOutline className='h-6 w-6'/>
            Create Issue
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
                                {username == process.env.NEXT_PUBLIC_REPO_OWNER && <CreateLabelUI token={token}/>}
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