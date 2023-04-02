import "server-only";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import LoginBtn from "@/app/login-btn";
import Home from "./Home";
import IssueComments from "./IssueComments";
export function generateMetadata({ params }:{params:{number:string}}) {
    return { 
        title: `Issue ${params.number}`,
        description: "Issue Detail"
    }
}

async function getLabels(token:string)
{
    const res = await fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/labels`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
    });
    if (!res.ok) console.log("Fetch labels error");
    return res.json();
}

async function getIssueData(token:string, number:string)
{
    const res = await fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/issues/${number}`,{
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
        cache: "no-cache"
    });
    if (!res.ok) console.log("Fetch issue data error");
    return res.json()
}

export default async function Page({params}:{params:{number:string}})
{
    const session = await getServerSession(authOptions);
    if (!session) return <LoginBtn/>

    const issueContentData = getIssueData(session.user.token, params.number);
    const labelsData = getLabels(session.user.token);

    // Parallel Data Fetching
    const [issueContent, labels] = await Promise.all([issueContentData, labelsData]);

    return (
        <Home issueContent={issueContent} labels={labels}>
            {/* @ts-expect-error Async Server Component */}
            <IssueComments number={params.number}/>
        </Home>
    )    
}