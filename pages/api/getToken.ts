import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {    
    const code = req.query.code;
    const client_id = "a72341c3b401536e1dea";
    const client_secret = "dfbbee099001397be518aef648a2f47e3ac3dd19";
    fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        body: JSON.stringify({
            "client_id" : client_id,
            "client_secret" : client_secret,
            "code" : code,
        }),
        headers: {
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        }
    }).then(res => res.json()).then(token => res.json(token));
}