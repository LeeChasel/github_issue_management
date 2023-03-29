// 'use client'

import NextAuth from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"
import LoginBtn from './login-btn';

export default async function Home() 
{
  // const router = useRouter();
  const session = await getServerSession(NextAuth);
  if (!session) return <LoginBtn/>
  
  // return <pre>{JSON.stringify(session, null, 2)}</pre>

  return (
    <div></div>
  )
}