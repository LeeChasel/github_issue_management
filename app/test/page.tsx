'use client'
import { useSession, signIn, signOut } from "next-auth/react"

export default function CamperVanPage() {
    const { data: session, status } = useSession()
  
    if (status === "loading") {
      return <p>Hang on there...</p>
    }
  
    if (status === "authenticated") {
      return (
        <>
          <p>Signed in as {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
          <img src="https://cdn.pixabay.com/photo/2017/08/11/19/36/vw-2632486_1280.png" />
        </>
      )
    }
  
    return (
      <>
        <p>Not signed in.</p>
        <button onClick={() => signIn("github")}>Sign in</button>
      </>
    )
  }