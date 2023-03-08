import { useEffect, useState } from "react";
import { Dialog } from '@headlessui/react';
import { updateIssue, getLebelsInRepo } from "../(fetchResource)";

interface FormContent
{
    number: number;
    state: string;
    title: string;
    body: string;
    labels: Labels[];
}
interface Labels
{
    color: string;
    id: number;
    name: string;
}

function LabelsSel({token, selectedLabel}: {token:string, selectedLabel:string})
{
    const [labels, setLabels] = useState<Labels[]>([])
    useEffect(() => {
        getLebelsInRepo(token).then(res => {
            let newRes: Labels[] = res.map((item:any) => {
                return {color: item.color, id: item.id, name: item.name};
            })
            setLabels([...labels, ...newRes]);
        });
    }, [])

    // use this way to set default option would cause err, but still working. change to react select package later.
    return (
        <>
        <label>
            <span>choose label : </span>
            <select name="labels">
                {labels.map(label => {
                    if (label.name == selectedLabel) return <option key={label.id} selected value={label.name}>{label.name}</option>
                    return <option key={label.id} value={label.name}>{label.name}</option>
                })}
            </select>
        </label>
        </>
    )
}

export default function UpdateIssueUI({token, data}:{token:string, data: FormContent})
{
    const [isopen, setIsopen] = useState(false);

    function handleSubmit(e:any)
    {
        // e.preventDefault();
        const formData = new FormData(e.target);
        const formJson = Object.fromEntries(formData.entries());
        updateIssue(token, data.number, formJson);
        // setIsopen(false)
    }
   
    return (
        <>
        <button onClick={() => setIsopen(true)}>Edit Issue</button>
        <Dialog open={isopen} onClose={() => setIsopen(false)} className="w-full relative z-50">
            <div className="fixed inset-0 flex items-center justify-center p-4 w-full">
                <Dialog.Panel className="w-1/3 rounded bg-sky-300 py-12 px-7">
                    <Dialog.Title className="text-2xl font-bold text-center">Enter your data</Dialog.Title>
                    <div className="mt-8 max-w-md">
                        <form method='post' onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
                            <label className='block'>
                                <span>Edit title : </span>
                                <input defaultValue={data ? data.title : ""} type="text" id="title" name="title" required className='indent-1 mt-1 block w-full rounded-md bg-gray-100 border-transparent focus:border-gray-500 focus:bg-white focus:ring-0'/>
                            </label>
                            <label>
                                Edit your Issue Comment here : 
                                <textarea
                                    name='body'
                                    rows={4}
                                    cols={40}
                                    defaultValue={data ? data.body : ""}
                                    required
                                    // minLength={30}
                                />
                            </label>
                            <LabelsSel token={token} selectedLabel={data ? data.labels[0].name : ""}/>
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