'use client'

import { useRouter } from "next/navigation"
import { GrCaretPrevious } from "react-icons/gr"

export default function ReturnBtn()
{
    const router = useRouter()
    return (
        <button onClick={() => router.push("/")} className="btn btn-primary bg-yellow-400 hover:bg-yellow-500 m-3 gap-2 w-[40%] text-lg">
            <GrCaretPrevious className="w-4 h-4"/>
            Previous
        </button>
    )
}