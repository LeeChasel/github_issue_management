'use client'

import { useSearchParams } from "next/navigation";
import {useState, useEffect} from "react"

let owner = "LeeChasel";
let repo = "dcard_intern_homework";
let issue_number = "0";
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

function getUsername()
{
    const [username, setUsername] = useState("");
    useEffect(() => {
        fetch("https://api.github.com/user", {
            headers: {
                "Accept" : "application/vnd.github+json",
                "Authorization" : `Bearer ${token}`,
            }
        }).then(res => res.json()).then(r => setUsername(r.login));
    },[])
    return username;
}

function fetchData(): Promise<FormComment[]>
{
    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}/comments`,{
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(res => res.json())
}

function IssueComments()
{
    const [comments, setComments] = useState<FormComment[]>([]);
    useEffect(() => {
        fetchData().then(res => {
            setComments(res);
        })
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
    username = getUsername();

    return (
        <>
        <div>{username}</div>
        <IssueComments/>
        </>
    )
}