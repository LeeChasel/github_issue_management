'use client'

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsInfoCircle } from "react-icons/bs";
import InfiniteScroll from "react-infinite-scroll-component";
import type { FormIssue } from "@/types/FormIssue";

async function getIssuesWithSearchstring(token:string, page:number, label:string, sortByOld:boolean, searchstring:string)
{
    const pageSize = 10;
    const order = sortByOld ? "asc" : "desc";
    const queryString = 'q=' + encodeURIComponent(`${searchstring} repo:${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME} type:issue in:title,body,comments state:open ${label == "All" ? "" : `label:${label}`}`)
    const res = await fetch(`https://api.github.com/search/issues?per_page=${pageSize}&page=${page}&sort=created&order=${order}&${queryString}`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
    })
    if (!res.ok) 
    {
        throw new Error('Failed to fetch data');
    }
    const json = await res.json();
    const data = json.items;
    return data;
}

export default function IssueList({token, selectedLabel, searchString, sortByOld}:{token:string, selectedLabel:string, searchString:string, sortByOld:boolean})
{
    const [ items, setItems ] = useState<FormIssue[]>([]);
    const [ hasMore, setHasMore ] = useState(true);
    const [ page,  setPage ] = useState(1);

    useEffect(() => {
        let isCancelled = false;
        getIssuesWithSearchstring(token, 1, selectedLabel, sortByOld, searchString).then(res => {
            if (!isCancelled)
            {
                setPage(1);
                setItems(res);
                setHasMore(res.length == 10);
            }
        })
        return () => {
            isCancelled=true;
        }
    }, [selectedLabel, searchString, sortByOld]);

    function fetchMoreData()
    {
        getIssuesWithSearchstring(token, page + 1, selectedLabel, sortByOld, searchString).then(res => {
            setItems([...items, ...res]);
            setHasMore(res.length == 10);
            setPage(prev => prev + 1);
        });
    };

    const router = useRouter()
    return (
        <>
            <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<button className="btn btn-ghost loading disabled text-lg">loading</button>}
            endMessage={
                <div className="alert alert-info shadow-lg rounded-t-none justify-center">
                    <div>
                        <BsInfoCircle className='w-5 h-5'/>
                        <span className='text-lg'>No more data.</span>
                    </div>
                </div>
            }
            scrollableTarget="scrollableDiv"
            >
                <table className='table w-full'>
                    <thead>
                        <tr className='h-28'>
                            <th className='text-base pl-8'>#</th>
                            <th className='text-base'>Title</th>
                            <th className='text-base'>Comment</th>
                            <th className='text-base'>Author</th>
                            <th className='text-base'>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((item:FormIssue) => (
                            <tr key={item.number} onClick={() => router.push(`/issues/${item.number}`)} className="bg-red-200 hover cursor-pointer h-28">
                                <th className='text-lg pl-8 rounded-bl-none'>{item.number}</th>
                                <td className='text-lg'>{item.title}</td>
                                <td className='text-lg'>{item.body}</td>
                                <td className='text-lg'>{item.user.login}</td>
                                <td className='rounded-br-none'>
                                    {item.labels.length ? (
                                        <div className="badge text-base px-5 h-8">{item.labels[0].name}</div>
                                        ) : null
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </InfiniteScroll>
        </>
    )
}