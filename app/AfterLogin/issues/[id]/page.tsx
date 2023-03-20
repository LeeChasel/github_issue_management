'use client'

import { useSearchParams } from "next/navigation";
import { useState, useEffect} from "react"
import { getIssueContent, getComments, getUsername } from "@/app/(fetchResource)";
import CreateCommentUI from "@/app/components/(createCommentUI)";
import UpdateCommentUI from "@/app/components/(updateCommentUI)";
import UpdateIssueUI from "@/app/components/(updateIssueUI)";
import DeleteCommentUI from "@/app/components/(deleteCommentUI)";
import DeleteIssueUI from "@/app/components/(deleteIssueUI)";
import UpdateLabelUI from "@/app/components/(updateLabelUI)";
import { FiMoreHorizontal } from 'react-icons/fi'

let issue_number = "";
let token = "";
let username = "";

interface FormComment 
{
    id: string;
    body: string;
    user: FormUser;
}
interface FormUser
{
    login: string;
    avatar_url: string;
}
interface FormContent
{
    number: number;
    html_url: string;
    title: string;
    body: string;
    user: FormUser;
    labels: Labels[];
    created_at: Date;
    updated_at: Date;
}
interface Labels
{
    color: string;
    id: number;
    name: string;
}

function IssueContent()
{
    const [data, setData] = useState<FormContent>()
    useEffect(() => {
        getIssueContent(token, issue_number).then(res => setData(res))
    }, []);
    return (
        <div className="flex items-center mt-3 bg-gray-400">
            <h1 className="grow font-bold text-4xl">{data?.title}</h1>
            {(username == data?.user.login || username == process.env.NEXT_PUBLIC_REPO_OWNER) &&
            <div className="flex gap-1 items-center basis-1/6 m-3">
                <DeleteIssueUI token={token} issue_number={issue_number}/>
                <UpdateIssueUI token={token} data={data!}/>
            </div>
            }
        </div>
    )
}

function IssueComments()
{
    const [comments, setComments] = useState<FormComment[]>([]);
    const [data, setData] = useState<FormContent>();
    useEffect(() => {
        getComments(token, issue_number).then(res => setComments(res));
        getIssueContent(token, issue_number).then(res => setData(res));
    }, []);
    return (
        <>
        <div className="w-full flex flex-col p-4 gap-2 bg-blue-600">
            <h2>{data?.user.login}</h2>
            <pre className="w-full h-20 bg-yellow-200">bb</pre>
        </div>
        {comments.map(comment => (
            <div key={comment.id} className="w-full flex flex-col p-4 gap-1 bg-blue-600">
                <div className="flex items-center">
                    <h2 className="grow">{comment.user.login}</h2>
                    {(username == comment.user.login || username == process.env.NEXT_PUBLIC_REPO_OWNER) &&
                    <div className="dropdown dropdown-left">
                        <label tabIndex={0} className="btn btn-sm btn-ghost m-1"><FiMoreHorizontal/></label>
                        <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
                            <UpdateCommentUI token={token} id={comment.id} text={comment.body}/>
                            <DeleteCommentUI token={token} id={comment.id}/>
                        </ul>
                    </div>
                    }
                </div>
                <pre className="w-full h-20 bg-yellow-200">{comment.body}</pre>
            </div>
        ))}
        </>
    )
}

function setUsername()
{
    const [name, setName] = useState("");
    useEffect(() => {
        getUsername(token).then(res => setName(res));
    },[])
    return name;
}

function IssueInfo()
{
    const [data, setData] = useState<FormContent>()
    useEffect(() => {
        getIssueContent(token, issue_number).then(res => {
            setData(res);
        })
    }, []);
    return (
        <>
        <span>ID : {data?.number}</span>
        <span>Author : {data?.user.login}</span>
        <div>
            <span>State : {data?.labels.length ? data.labels[0].name: null}</span>
            {username == process.env.NEXT_PUBLIC_REPO_OWNER && 
            <UpdateLabelUI token={token} issue_number={issue_number}/>
            }
        </div>
        <span>Created Time : {data ? new Date(data.created_at.toString()).toLocaleString() : ""}</span>
        <span>Updated Time : {data ? new Date(data.updated_at.toString()).toLocaleString() : ""}</span>                
        </>
    )
}

export default function IssueDetailPage({params}:{params:{id: string}})
{
    const searchParams = useSearchParams();
    token = searchParams.get("access_token")!;
    issue_number = params.id;
    username = setUsername();
    return (
        <main className="h-full flex flex-col">
                <IssueContent />
                <div className="divider m-1"/>
                <div className="flex grow bg-red-200">
                    <div className="flex flex-col w-1/6 bg-blue-200">
                        <IssueInfo/>
                    </div>
                    <div className="flex justify-center items-center w-5/6 bg-yellow-300">
                        <div className="w-10/12 h-5/6 bg-green-400">
                            <IssueComments />
                            {/* <CreateCommentUI issue_number={issue_number} token={token}/> */}
                        </div>
                    </div>
                </div>
        </main>
    )
}