'use client'

import { FiMoreHorizontal } from "react-icons/fi"
import UpdateCommentBtn from "./updateComment-btn"
import DeleteCommentBtn from "./deleteComment-btn"

export default function CommentAction({token, id, text}:{token:string, id:string, text:string})
{
    return (
        <div className="dropdown dropdown-left">
            <label tabIndex={0} className="btn btn-sm btn-ghost m-1"><FiMoreHorizontal className="w-5 h-5"/></label>
            <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-48">
                <UpdateCommentBtn token={token} id={id} text={text}/>
                <DeleteCommentBtn token={token} id={id}/>
            </ul>
        </div>
    )
}