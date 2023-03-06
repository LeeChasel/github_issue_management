'use client'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect} from 'react';
// import useSWR from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateIssueUI from '../components/(createIssueUI)';
import { getLebelsInRepo } from '../(fetchResource)';
import { Listbox } from '@headlessui/react'

let owner = "LeeChasel";
let repo = "dcard_intern_homework";
let token = "";

interface FormData 
{
    url: string;
    html_url: string;
    title: string;
    body: string; 
    number: string;
}
    // var reverseUser = issues.map((item: FormData) => item).reverse();

function fetchData(page:number): Promise<FormData[]>
{
    const pageSize = 10;
    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=${pageSize}&page=${page}`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    }).then(res => res.json())
}

function GetDataUseInfiniteScroll()
{
    const [items, setItems] = useState<FormData[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [page,  setPage] = useState<number>(1)        
    
    useEffect(() => {
        fetchData(1).then(res => {
            setItems(res);
            setHasMore(res.length > 0)
        })
    },[])

    function fetchMoreData()
    {
        fetchData(page + 1).then(res => {
            setItems([...items, ...res]);
            setHasMore(res.length > 0);
            setPage(page + 1);
        });
    };

    return (
        <div>
            <br/>
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
                {items.map((item) => (
                    <div key={item.number} className="h-7 m-1 p-1 border-2 border-solid border-green-400">
                        <Link href={`/AfterLogin/issues/${item.number}?access_token=${token}`}>
                            <span>{item.number}.  </span>
                        </Link>
                        <span>{item.title} - {item.body}</span>
                    </div>
                ))}
            <br/>
            </InfiniteScroll>
        </div>
    )
}

function LabelsSel()
{

    const labels = getLebelsInRepo(token);
    console.log(labels)
    // const [selectedLabel, setSelectedLabel] = useState(labels[0])

    


}

export default function afterLogin()
{
    const searchParams = useSearchParams();
    token = searchParams.get("access_token")!;
    return (
        <main>
            <LabelsSel />
            <GetDataUseInfiniteScroll/>
            <CreateIssueUI token={token}/>
            
        </main>
    )
}
