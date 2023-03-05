'use client'

import { useSearchParams } from "next/navigation";
import { useState, useEffect} from "react"
import { getIssueContent, getComments, getUsername } from "@/app/(fetchResource)";
import CreateCommentUI from "@/app/components/createCommentUI";
import UpdateCommentUI from "@/app/components/(updateCommentUI)";
import { DeleteCommentUI } from "@/app/components/(deleteCommentUI)";

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
    state: string;
    title: string;
    body: string;
    user: FormUser;
}

function IssueContent()
{
    const [content, setContent] = useState<FormContent>()
    useEffect(() => {
        getIssueContent(token, issue_number).then(res => setContent(res))
    }, []);
    return (
        <div className="mt-3 bg-gray-400 p-2">
        <div>
            <h1 className="text-red-600 font-bold text-4xl">{content?.title} #{issue_number}</h1>
        </div>
        <div className="">
            <h3 className="text-blue-500">created by {content?.user.login}</h3>
            <p className="bg-gray-400">{content?.body}</p>
        </div>
        <br/>
        </div>
    )
}

function IssueComments()
{
    const [comments, setComments] = useState<FormComment[]>([]);
    useEffect(() => {
        getComments(token, issue_number).then(res => setComments(res));
        const interval = setInterval(() => {
            getComments(token, issue_number).then(res => setComments(res));
        }, 4000);
        return () => clearInterval(interval)
    }, [])
    return (
        <>
        {comments.map( function(comment) {
            let operateComment;
            if (comment.user.login == username)
            {
                operateComment = 
                    <div className="">
                    <UpdateCommentUI token={token} id={comment.id} text={comment.body}/>
                    <DeleteCommentUI token={token} id={comment.id}/>
                    </div>
            } else {
                operateComment = <div></div>
            }

            return (
            <div key={comment.body}>
                <br/>
                <div className="bg-yellow-300 p-2">
                    <h2 className="text-blue-500">{comment.user.login}</h2>
                    <pre>{comment.body}</pre>
                    {operateComment}
                </div>
            </div>
        )})}
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