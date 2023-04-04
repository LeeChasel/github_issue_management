'use client'

import IssueTitle from "./issueTitle";
import ReturnBtn from "./return-btn";
import IssueDetail from "./issueDetail";
import { useSession } from "next-auth/react"
import CreateCommentBtn from "./createComment-btn";

export default function Home({issueContent, labels, children}:{issueContent:any, labels:any, children:React.ReactNode})
{
    const { data: session} = useSession();
    if (!session) return <div>Plase Logging</div>
    return (
    <div className="h-full flex flex-col">
            <IssueTitle data={issueContent} username={session.user.username}/>
            <div className="flex h-[90%] divide-x-2 bg-blue-400">
                    <div className="flex flex-col w-1/6 bg-blue-400">
                        <ReturnBtn/>
                        <IssueDetail data={issueContent} session={session} labels={labels}/>
                    </div>
                    <div className="flex justify-center h-full items-center w-5/6 ">
                        <div className="w-full mx-10 h-[95%] overflow-y-auto overflow-x-hidden">
                            <div className="w-full bg-gray-200 rounded-lg p-5">
                                {children}
                                <CreateCommentBtn token={session.user.token} number={issueContent.number} />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}