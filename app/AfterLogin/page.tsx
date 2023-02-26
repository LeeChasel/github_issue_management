'use client'
import { useSearchParams } from 'next/navigation';
import React, { useState, useEffect} from 'react';
import useSWR from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';

let owner = "LeeChasel";
let repo = "dcard_intern_homework";

interface FormData 
{
    url: string;
    html_url: string;
    title: string;
    body: string; 
    number: string;
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
    const {data, error, isLoading} = useSWR(`https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue`, fetcher)
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

function fetchData(page:number, token:string): Promise<FormData[]>
{
    const pageSize = 10;
    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=${pageSize}&page=${page}`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(res => res.json())
}

function GetDataUseInfiniteScroll({token}:{token: string})
{
    const [items, setItems] = useState<FormData[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [page,  setPage] = useState<number>(1)        
    
    useEffect(() => {
        fetchData(1, token).then(res => {
            setItems(res);
            setHasMore(res.length > 0)
        })
    },[])

    function fetchMoreData()
    {
        fetchData(page + 1, token).then(res => {
            setItems([...items, ...res]);
            setHasMore(res.length > 0);
            setPage(page + 1);
        });
    };

    // const [issueNumber, setIssueNumber] = useState(0);
    // useEffect(() => {
    //     fetch(`https://api.github.com/search/issues?q=repo:${owner}/${repo}+type:issue`, {
    //         headers: {
    //             "Accept" : "application/vnd.github+json",
    //             "Authorization" : `Bearer ${token}`,
    //         }
    //     }).then(res => res.json()).then(data => setIssueNumber(data.total_count));
    // })

    return (
        <div>
            <h1>data is here</h1>
            <hr/>
            <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            height={200}
            endMessage={
                <p className='text-center'>
                    <b>This is the end</b>
                </p>
            }
            >
                {items.map((i) => (
                    <div key={i.number} className="h-7 m-1 p-1 border-2 border-solid border-green-400">
                        {i.title} - {i.body}
                    </div>
                ))}               
            </InfiniteScroll>
            {items.length}
        </div>
    )
}

export default function afterLogin()
{
    const searchParams = useSearchParams();
    const token: string = searchParams.get("access_token")!;
    return (
        <main>
            <GetDataUseInfiniteScroll token={token}/>
        </main>
    )
}
