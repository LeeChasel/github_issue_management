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
            <div className="flex bg-red-200 h-[90%]">
                    <div className="flex flex-col w-1/6 bg-blue-200">
                        <ReturnBtn/>
                        <IssueDetail data={issueContent} session={session} labels={labels}/>
                    </div>
                    <div className="flex justify-center h-full items-center w-5/6 bg-yellow-300">
                        <div className="w-full mx-10 h-[95%] overflow-y-auto overflow-x-hidden">
                            <div className="w-full bg-gray-100 rounded-lg p-5">
                                {children}
                                <CreateCommentBtn token={session.user.token} number={issueContent.number} />
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    )
}