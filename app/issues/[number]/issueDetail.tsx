'use client'

import { FormIssue } from "@/types/FormIssue";
import type { Session } from "next-auth";
import UpdateLabelBtn from "./updateLabel-btn";

export default function IssueDetail({data, session, labels}:{data:FormIssue, session:Session, labels:any})
{
    return (
        <div className="flex flex-col w-full px-3">
            <dl>
                <div className="bg-gray-100 grid grid-cols-3 gap-4 p-5 text-lg rounded-t-lg">
                    <dt>ID</dt>
                    <dd className="col-span-2">{data.number}</dd>
                </div>
                <div className="bg-white grid grid-cols-3 gap-4 p-5 text-lg">
                    <dt>Author</dt>
                    <dd className="col-span-2">{data.user.login}</dd>
                </div>
                <div className="bg-gray-100 grid grid-cols-3 gap-4 p-5 text-lg items-center">
                    <dt>State</dt>
                    <dd>{data.labels.length ? data.labels[0].name: null}</dd>
                    <dd>
                        {(session && session.user.username) == process.env.NEXT_PUBLIC_REPO_OWNER &&
                            <UpdateLabelBtn token={session.user.token} number={data.number} labels={labels}/>
                        }
                    </dd>
                </div>
                <div className="bg-white grid grid-cols-3 gap-4 p-5 text-lg">
                    <dt>Created Time</dt>
                    <dd className="col-span-2">{data ? new Date(data.created_at.toString()).toLocaleString() : ""}</dd>
                </div>
                <div className="bg-gray-100 grid grid-cols-3 gap-4 p-5 text-lg rounded-b-lg">
                    <dt>Updated Time</dt>
                    <dd className="col-span-2">{data ? new Date(data.updated_at.toString()).toLocaleString() : ""}</dd>
                </div>
            </dl>             
        </div>
    )
}