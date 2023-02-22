'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect} from 'react';
import useSWR from 'swr';

class data {
    title! : string
}

function GetIssues({token}:{token: string})
{    
    const [count, setCount] = useState<any>(null);
    let owner = "LeeChasel";
    let repo = "dcard_intern_homework"; 

    // useEffect(() => {
    //     const fetchdata = async () => {
    //     const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=2`, {
    //     headers: {
    //         "Accept" : "application/vnd.github+json",
    //         "Authorization" : `Bearer ${token}`,
    //     }}).then(res => res.json());
    //     setCount(res);
    // };
    //     fetchdata();
    // }, []);

    // useEffect(() => {
    //     fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=2`, {
    //         headers: {
    //                     "Accept" : "application/vnd.github+json",
    //                     "Authorization" : `Bearer ${token}`,
    //     }}).then((res) => res.json()).then((data) => setCount(data)).catch((err) => console.log(err));
    // }, []);





    // getdata().then(res => res.json()).then(r => setCount(r));
    // getdata();
    // console.log("qwert")
    // return count;
    // console.log(count)
    // return (
        
        
    //     <div>
    //         {count ? (
    //             <div>
    //                 {JSON.stringify(count)}
    //             </div>
    //         ) : (
    //             <h2>Loading</h2>
    //         )}
    //     </div>
    // )

    async function getdata() {
        const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=2`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }});        
        // return res;
    }
    
    // console.log(res)
    // const ss = await res.json();
    // console.log(ss);
    
}


async function Test({token}: {token: string})
{
    const [count, setCount] = useState(0);
    let owner = "LeeChasel";
    let repo = "dcard_intern_homework";

    // const fetcher = (ur: RequestInfo | URL) => fetch(ur, {
    //     headers: {
    //         "Accept" : "application/vnd.github+json",
    //         "Authorization" : `Bearer ${token}`,
    //     }
    // }).then(r => r.json()).then(r => console.log(r[0]));
    // const {data, error, isLoading} = useSWR(`https://api.github.com/repos/${owner}/${repo}/issues?state=all`, fetcher);
    // if (error) return <div>failed to load</div>
    // if (isLoading) return <div>loading...plz wait</div>
    // return (
    //     <>{typeof data}
        
    //         {/* <div>{data.title}</div> */}
    //     </>
    // )

}
function useUser(token: string)
{
    let owner = "LeeChasel";
    let repo = "dcard_intern_homework";
    const fetcher = (ur: RequestInfo | URL) => fetch(ur, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(r => r.json());
    const {data, error, isLoading} = useSWR(`https://api.github.com/repos/${owner}/${repo}/issues?state=all`, fetcher);


    return {
        user: data,
        isLoading,
        isError: error
    }
}

function GetData({token}: {token: string})
{
    const {user, isLoading, isError} = useUser(token);
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error happened !!</div>
    let obj = JSON.parse(user)

    return (        
        <div>{obj}</div>
    )



}

export default function afterLogin()
{
    const searchParams = useSearchParams();
    const token: string = searchParams.get("access_token")!;
    const [count, setCount] = useState<any>(null);
    // console.log("ss")
    // let ss = getIssues(token);
    return (
        <main>
            {/* <GetIssues token = {token}/> */}
            <GetData token = {token}/>
            
            {/* <button onClick={() => getIssues(token)}>Click to get issues on console</button> */}
            {/* <Test token={token}/> */}
        </main>
    )
}
