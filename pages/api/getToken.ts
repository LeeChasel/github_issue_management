import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {    
    const code = req.query.code;
    fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        body: JSON.stringify({
            "client_id" : process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID,
            "client_secret" : process.env.OAUTH_CLIENT_SECRETS,
            "code" : code,
        }),
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        }
    }).then(res => res.json()).then(token => res.json(token));
}