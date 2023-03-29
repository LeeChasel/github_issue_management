import NextAuth from "pages/api/auth/[...nextauth]"
import { getServerSession } from "next-auth/next"

export default async function Tt()
{
    const session = await getServerSession(NextAuth);
    return <pre>{JSON.stringify(session, null, 2)}</pre>

}