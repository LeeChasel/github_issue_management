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
        <button onClick={() => setIsopen(true)} className="btn gap-1 w-1/6 self-end mr-8 my-4">
            <IoIosAddCircleOutline className='h-5 w-5'/>
            Create Issue
        </button>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-2xl font-bold text-center">Enter your Issue</Dialog.Title>
                    <div className="mt-8 max-w-md">
                        <form method="POST" onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                            <label className='block'>
                                <span>Title</span>
                                <input type="text" id="title" name="title" required  className='indent-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'/>
                            </label>
                            <label className='block'>
                                <span className='mr-7'>Type your comment</span>
                                <span>at least 30 letters</span>
                                <textarea
                                    name='body'
                                    rows={4}
                                    cols={40}
                                    required
                                    minLength={30}
                                />
                            </label>
                            {username == process.env.NEXT_PUBLIC_REPO_OWNER && <CreateLabelUI token={token}/>}
                            <div className="relative" >
                                <button className="bg-red-300 rounded-full hover:bg-red-400 active:bg-red-500 left-0 w-5/12 absolute" type="submit">Create New Issue</button>
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