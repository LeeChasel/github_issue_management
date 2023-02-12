// 'use client';

// import type { NextApiRequest, NextApiResponse } from 'next'
import { useRouter } from 'next/router'
// import { useEffect } from 'react';
import { clearTimeout } from 'timers';

export default function Home(
    // req: NextApiRequest,
    // res: NextApiResponse<any>,
) {
    // const router = useRouter();
    // console.log(router.query);
    
    // getGrant(req);
    const a = fetch();
    console.log(a);
    return (
        <>
        <main>
            <h1>將於3秒後轉移頁面</h1>
        </main>
        </>
    )
}

// async function getGrant(req: NextApiRequest)
// {
//     // const router = await useRouter();
//     // console.log(router.query);
//     // const a = await req.query;
//     // console.log(a);

//     useEffect(() => {
//         const timer = setTimeout(() => {window.alert(req.query), 2000}); 
//         () => clearTimeout(timer);
//         // const router = useRouter();
//         // console.log(router.query);
//      });
// }