'use client'

import DeleteIssueBtn from "./deleteIssue-btn";
import UpdateIssueBtn from "./updateIssue-btn";
import type { FormIssue } from "@/types/FormIssue";

export default function IssueTitle({data, username}:{data:FormIssue, username:string})
{
    return (
        <div className="flex items-center h-[10%] bg-gray-400">
            <h1 className="grow font-bold text-4xl ml-7">{data.title}</h1>
            {(username == data.user.login || username == process.env.NEXT_PUBLIC_REPO_OWNER) &&
                <div className="flex gap-4 items-center justify-center basis-1/6 ml-5 mr-10">
                    <DeleteIssueBtn number={data.number}/>
                    <UpdateIssueBtn number={data.number} data={data}/>
                </div>
            }
        </div>
    )
}