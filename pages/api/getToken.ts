import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    getToken(req).then(token => res.status(200).json(token.access_token));
}

async function getToken(req: NextApiRequest)
{
    let code = req.query.code;
    let client_id = "a72341c3b401536e1dea";
    let client_secret = "dfbbee099001397be518aef648a2f47e3ac3dd19";

    let token = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        body: JSON.stringify({
            "client_id" : client_id,
            "client_secret" : client_secret,
            "code" : code,
        }),
        headers: new Headers({
            "Accept" : "application/json",
            "Content-Type" : "application/json",
        })
    });
    return await token.json();
}