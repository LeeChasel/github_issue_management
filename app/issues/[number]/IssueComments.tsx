import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import type { FormIssue } from '@/types/FormIssue'
import { FormComment } from "@/types/FormComment";
import CommentAction from "./commentAction";

async function getComments(token:string, number:string):Promise<FormComment[]>
{
    const res = await fetch(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/issues/${number}/comments`,{
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
        cache: "no-cache"
    });

    if (!res.ok) console.log("Fetch comment data error");
    return res.json()
}

async function getIssueData(token:string, number:string):Promise<FormIssue>
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

export default async function IssueComments({number}:{number:string})
{  
    const session = await getServerSession(authOptions);
    if(!session) return <div>Not loggin</div>

    const issueContentData = getIssueData(session.user.token, number);
    const commentsData = getComments(session.user.token, number);

    // Parallel Data Fetching
    const [issueContent, comments] = await Promise.all([issueContentData, commentsData]);
    return (
        <>
        {/* Issue body text */}
        <div className={`w-full flex flex-col p-2 gap-2 bg-blue-600 align-middle border-2 ${session.user.username === issueContent.user.login ? "border-red-200" : "border-green-200"} rounded-lg mb-5`}>
            <h2 className="px-1 text-xl">{issueContent.user.login}</h2>
            <p className="p-2 w-full min-h-8 bg-yellow-200 whitespace-pre-wrap text-lg rounded-lg">{issueContent.body}</p> 
        </div>

        {/* Issue comments text */}
        <div className="flex flex-col w-full">
            {comments.map(comment => (
                <div key={comment.id} className={`w-full flex flex-col p-2 bg-blue-600 border-2 ${session.user.username === comment.user.login ? "border-red-200" : "border-green-200"} rounded-lg mb-5`}>
                    <div className="flex items-center">
                        <h2 className="grow px-1 text-xl">{comment.user.login}</h2>
                        {(session.user.username === comment.user.login || session.user.username === process.env.NEXT_PUBLIC_REPO_OWNER) &&
                            <CommentAction token={session.user.token} id={comment.id} text={comment.body}/>  
                        }
                    </div>
                    <p className="p-2 w-full min-h-8 bg-yellow-200 whitespace-pre-wrap text-lg rounded-lg">{comment.body}</p>      
                </div>
            ))}
        </div>
        </>
    )
}