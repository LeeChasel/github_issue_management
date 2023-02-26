'use client'

import { useSearchParams } from "next/navigation";
import {useState, useEffect} from "react"

let owner = "LeeChasel";
let repo = "dcard_intern_homework";
let issue_number = "0";
let token = "0";

interface FormData 
{
    title: string;
    body: string; 
}

function fetchData(): Promise<FormData>
{
    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues/${issue_number}`,{
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(res => res.json())
}

function IssueData()
{
    const [data, setData] = useState<FormData>({title: "", body: ""});

    useEffect(() => {
        fetchData().then(res => {
            setData(res)
        });
    },[])
     
    return (
        <div>
            {data.title} : {data.body}
        </div>
    )
}

export default function IssueDetailPage({params}:{params:{id: string}})
{
    const searchParams = useSearchParams();
    token = searchParams.get("access_token")!;
    issue_number = params.id;
    return (
        <IssueData/>
    )
}