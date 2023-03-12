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
const owner = "LeeChasel";

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
    const [content, setContent] = useState<FormContent>()
    useEffect(() => {
        getIssueContent(token, issue_number).then(res => {
            setContent(res);
        })
    }, []);
    return (
        <div className="mt-3 bg-gray-400 p-2">
        <div>
            <h1 className="text-red-600 font-bold text-4xl">{content?.title} #{issue_number}</h1>
        </div>
        <div>
            <p className="bg-gray-400">{content?.body}</p>
            <h3 className="text-blue-500">created by {content?.user.login}</h3>
            <h3 className="text-blue-500">status: {content?.state}</h3>
            <h3 className="text-blue-500">label: {content?.labels.length ? content?.labels[0].name : "don't have label"}</h3>
        </div>
        {(username == content?.user.login || username == owner) &&
            <div>
                <UpdateIssueUI token={token} data={content!}/>
                <DeleteIssueUI token={token} issue_number={issue_number}/>
            </div>
        }
        {username == owner && 
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
                    {(username == comment.user.login || username == owner) &&
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
        <div className="flex justify-center">
            <div className="w-3/4">
                <IssueContent />
                <IssueComments />
                <CreateCommentUI issue_number={issue_number} token={token}/>
            </div>
        </div>
    )
}