'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function Btn()
{
    const { data: session} = useSession()
    if(session) return <button onClick={() => signOut()}>Sign out</button>
    return <div>btn</div>
    
}