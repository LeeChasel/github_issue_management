'use client'

import { signOut } from "next-auth/react"

export default function SignOutBtn()
{
    return (
        <button onClick={() => signOut()} className="btn btn-primary bg-yellow-300 hover:bg-yellow-400 w-full text-lg mt-5">sign out</button>
    )
}