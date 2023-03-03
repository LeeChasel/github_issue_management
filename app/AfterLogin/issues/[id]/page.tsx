'use client'

import { useSearchParams } from "next/navigation";
import {useState, useEffect} from "react"
import { getUsername, getIssueContent, getComments } from "@/app/(fetchResource)";

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

function setUsername()
{
    const [name, setName] = useState("");
    useEffect(() => {
        getUsername(token).then(res => setName(res));
    },[])
    return name;
}

function IssueContent()
{
    const [content, setContent] = useState<FormContent>()
    useEffect(() => {
        getIssueContent(token, issue_number).then(res => setContent(res))
    }, []);
    return (
        <div>
        <h1>{content?.title}</h1>
        <p>{content?.body}</p>
        <p>from {content?.user.login}</p>
        </div>
    )
}

function IssueComments()
{
    const [comments, setComments] = useState<FormComment[]>([]);
    useEffect(() => {
        getComments(token, issue_number).then(res => setComments(res))
    },[])
    return (
        <div>
            {comments.map((comment) => (
                <div key={comment.id}>
                    {comment.user.login} - {comment.body}
                    <br/>
                </div>
            ))}
        </div>
    )
}

export default function IssueDetailPage({params}:{params:{id: string}})
{
    const searchParams = useSearchParams();
    token = searchParams.get("access_token")!;
    issue_number = params.id;
    username = setUsername();
    
    return (
        <>
        <IssueContent />
        <IssueComments/>
        </>
    )
}