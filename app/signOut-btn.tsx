'use client'

import { signOut } from "next-auth/react"

export default function SignOutBtn()
{
    return (
        <button onClick={() => signOut()} className="btn w-full text-lg mt-5">sign out</button>
    )
}