'use client'

import { useSession, signOut } from "next-auth/react"

export default function SignOutBtn()
{
    const { data: session } = useSession();

    if (!session) return <div>Please Login</div>

    return (
        <button onClick={() => signOut()} className="btn w-full text-lg mt-5">sign out</button>
    )
}