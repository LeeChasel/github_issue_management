'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect} from 'react';
import useSWR from 'swr';

class FormData
{
    url!: string;
    html_url!: string;
    title!: string;
    body!: string; 
    number!: string;   
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
    
    const {data, error, isLoading} = useSWR(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=10&page=2`, fetcher);
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
    var reverseUser = user.map((item: FormData) => item).reverse();
    
    return (
        <div className="relative">
            <div className='flex flex-col bg-gray-400 absolute left-1/2 top-1/2'>
            {reverseUser.map((data: FormData) => {
                return (                   
                    <div key={data.number} className="flex flex-row">
                        <h3 className='bg-red-200'>{data.title}</h3>
                        <p className='bg-blue-200'>{data.body}</p>
                    </div>
                )
            })          
            }
            </div>
        </div>
   )
}

export default function afterLogin()
{
    const searchParams = useSearchParams();
    const token: string = searchParams.get("access_token")!;
    // const [count, setCount] = useState<any>(null);
    return (
        <main>
            <GetData token = {token}/>
        </main>
    )
}
