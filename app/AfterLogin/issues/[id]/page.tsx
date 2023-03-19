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
    state: string;
    title: string;
    body: string;
    user: FormUser;
    labels: Labels[];
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
        getIssueContent(token, issue_number).then(res => {
            setData(res);
        })
    }, []);
    return (
        <div className="bg-gray-400">
        <div>
            <h1 className="text-red-600 font-bold text-4xl">{data?.title} #{issue_number}</h1>
        </div>
        {/* <div>
            <p className="bg-gray-400">{data?.body}</p>
            <h3 className="text-blue-500">created by {data?.user.login}</h3>
            <h3 className="text-blue-500">status: {data?.state}</h3>
            <h3 className="text-blue-500">label: {data?.labels.length ? data?.labels[0].name : "don't have label"}</h3>
        </div> */}
        {(username == data?.user.login || username == process.env.NEXT_PUBLIC_REPO_OWNER) &&
            <div>
                <UpdateIssueUI token={token} data={data!}/>
                <DeleteIssueUI token={token} issue_number={issue_number}/>
            </div>
        }
        {username == process.env.NEXT_PUBLIC_REPO_OWNER && 
            <UpdateLabelUI token={token} issue_number={issue_number}/>
        }
        <br/>
        </div>
    )
}

function IssueComments()
{
    const [comments, setComments] = useState<FormComment[]>([]);
    useEffect(() => {
        getComments(token, issue_number).then(res => setComments(res));
    }, [])
    return (
        <>
        {comments.map(comment => (
            <div key={comment.id}>
                <br/>
                <div className="bg-yellow-300 p-2">
                    <h2 className="text-blue-500">{comment.user.login}</h2>
                    <pre>{comment.body}</pre>
                    {(username == comment.user.login || username == process.env.NEXT_PUBLIC_REPO_OWNER) &&
                     <div>
                        <UpdateCommentUI token={token} id={comment.id} text={comment.body}/>
                        <DeleteCommentUI token={token} id={comment.id}/>
                    </div>
                    }
                </div>
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

export default function IssueDetailPage({params}:{params:{id: string}})
{
    const searchParams = useSearchParams();
    token = searchParams.get("access_token")!;
    issue_number = params.id;
    username = setUsername();
    return (
        <main className="h-full flex flex-col">
        {/* <div className="flex justify-center"> */}
            {/* <div className="h-full"> */}
                <IssueContent />
                <IssueComments />
                <CreateCommentUI issue_number={issue_number} token={token}/>
            {/* </div> */}
        {/* </div> */}
        </main>
    )
}