'use client'

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function AuthPopup()
{
    const { data: session, status } = useSession();
    useEffect(() => {
        if (!(status === "loading") && !session) void signIn("github");
        if (session)
        {
            // window.opener.location.reload()
            window.close();
        }
    }, [session, status]);

    return (
        <div className="w-screen h-screen absolute left-0 top-0 bg-white"></div>
    );
}