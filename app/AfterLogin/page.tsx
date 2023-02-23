'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect} from 'react';
import useSWR from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';

let owner = "LeeChasel";
let repo = "dcard_intern_homework";

class FormData
{
    url!: string;
    html_url!: string;
    title!: string;
    body!: string; 
    number!: string;   
}

function getissues(token: string)
{
    const fetcher = (ur: RequestInfo | URL) => fetch(ur, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(r => r.json());
    const {data, error, isLoading} = useSWR(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=10&page=3`, fetcher);
    return {
        issues: data,
        isLoading,
        isError: error
    }
}

function getNumberOfIssues(token: string)
{
    const fetcher = (ur: RequestInfo | URL) => fetch(ur, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(r => r.json());
    const {data, error, isLoading} = useSWR("https://api.github.com/search/issues?q=repo:LeeChasel/dcard_intern_homework+type:issue", fetcher)
    return {
        numberOfIssues: data,
        numberError: error,
        numberIsLoading: isLoading
    }
}

function GetData({token}: {token: string})
{
    const {issues, isLoading, isError} = getissues(token);
    // const {numberOfIssues, numberError, numberIsLoading} = getNumberOfIssues(token);
    // const {}
    if (isLoading) return <div>Loading...</div>
    if (isError) return <div>Error happened !!</div>
    // return (
    //     <div>
    //         <p>{numberOfIssues.item}</p>
    //     </div>
    // )

    // let hasMore: boolean = (issues.length > 10) ? true : false;
    // var reverseUser = issues.map((item: FormData) => item).reverse();

    // function fetchMoreData(){
    //     if ()
    // }
    
    return (
        // <div>
        //     <h1 className='text-center'>Data</h1>
        //     <hr/>
        //     <InfiniteScroll
        //         dataLength={12}


            
            
        //     >
        //     </InfiniteScroll>
        // </div>

        <div>{issues.length}</div>
        // <div className="relative">
        //     <div className='flex flex-col bg-gray-400 absolute left-1/2 top-1/2'>
        //         {/* <p>{issues[0].number}</p> */}
        //     {issues.map((data: FormData) => {
        //         return (                   
        //             <div key={data.number} className="flex flex-row">
        //                 <h3 className='bg-red-200'>{data.title}</h3>
        //                 <p className='bg-blue-200'>{data.body}</p>
        //             </div>
        //         )
        //     })}
        //     </div>
        // </div>
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
