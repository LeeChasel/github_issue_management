import { getServerSession } from "next-auth/next";
import { authOptions } from '@/pages/api/auth/[...nextauth]';
import LoginBtn from './login-btn';
import Home from "./Home";
import Welcome from './welcome';

export default async function LoginState() 
{
  const session = await getServerSession(authOptions);
  if (!session) return <LoginBtn/>
  return (
    <Home token={session.user.token}>
      <Welcome username={session.user.username}/>
    </Home>
  )
}