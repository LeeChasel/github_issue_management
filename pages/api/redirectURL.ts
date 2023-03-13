import type { NextApiRequest, NextApiResponse } from 'next'

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse<any>
) {
    if (req.method === 'GET' && req.query.code != null)
    {
        res.redirect(301, `/authorizeRes?code=` + req.query.code);
    } else {
        res.status(200).json("You don't have code in url");
    }
}