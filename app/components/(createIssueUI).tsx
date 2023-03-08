import { Dialog } from '@headlessui/react';
import { useState, useEffect } from 'react';
import { getLebelsInRepo, createIssue } from '../(fetchResource)';
import { useRouter } from 'next/navigation';

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
    const router = useRouter()
    useEffect(() => {
        getLebelsInRepo(token).then(res => {
            let newRes: Labels[] = res.map((item:any) => {
                return {color: item.color, id: item.id, name: item.name};
            })
            setData([...data, ...newRes]);
        });
    }, [])

    function handleSubmit(e:any)
    {
        e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        createIssue(token, formJson);
        router.refresh();
        setIsopen(false)
    }

    return (
        <>
        <button onClick={() => setIsopen(true)}>create Issue</button>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-2xl font-bold text-center">Enter your Issue</Dialog.Title>
                    <div className="mt-8 max-w-md">
                        <form method='post' onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                            <label className='block'>
                                <span>Title</span>
                                <input type="text" id="title" name="title" required  className='indent-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'/>
                            </label>
                            <label className='block'>
                                <span>Type your comment</span>
                                <textarea
                                    name='body'
                                    rows={4}
                                    cols={40}
                                    required
                                    minLength={30}
                                />
                            </label>
                            <label>
                                <span>Choose label : </span>
                                <select name='labels'>
                                    <option value="none">None label</option>
                                    {data.map(label => (
                                        <option key={label.id} value={label.name}>{label.name}</option>
                                    ))}
                                </select>
                            </label>
                            <div className="relative">
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