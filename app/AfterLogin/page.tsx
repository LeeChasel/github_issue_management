'use client'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect} from 'react';
// import useSWR from 'swr';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateIssueUI from '../components/(createIssueUI)';
import { getLebelsInRepo } from '../(fetchResource)';

let owner = "LeeChasel";
let repo = "dcard_intern_homework";
let token = "";

interface FormData 
{
    title: string;
    body: string; 
    number: string;
    labels: Labels[];
}
interface Labels
{
    color: string;
    id: number;
    name: string;
}
    // var reverseUser = issues.map((item: FormData) => item).reverse();

function fetchData(page:number, labels:string): Promise<FormData[]>
{
    if (labels == "All") labels = "";
    const pageSize = 10;
    return fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=${pageSize}&page=${page}&labels=${labels}`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        },
    }).then(res => res.json())
}

function GetDataUseInfiniteScroll()
{
    const [items, setItems] = useState<FormData[]>([]);
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [page,  setPage] = useState<number>(1)
    const [selectedLabel, setSelectedLabel] = useState("All");

    useEffect(() => {
        setPage(1)
        fetchData(1, selectedLabel).then(res => {
            setItems(res);
            setHasMore(res.length > 0)
        })     
    }, [selectedLabel])

    function fetchMoreData()
    {
        fetchData(page + 1, selectedLabel).then(res => {
            setItems([...items, ...res]);
            setHasMore(res.length > 0);
            setPage(page + 1);
        });
    };

    let nonedata = (items.length == 0) ? <p>None data</p> : null
    return (
        <>
        <LabelsSel setSelectedLabel={setSelectedLabel}/>
        <div>
            <br/>
            <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            height={200}
            >
                {items.map((item:FormData) => {
                    return (
                    <div key={item.number} className="h-7 m-1 p-1 border-2 border-solid border-green-400">
                        <Link href={`/AfterLogin/issues/${item.number}?access_token=${token}`}>
                            <span>#{item.number}  _</span>
                        </Link>
                        <span>{item.title} - {item.body} - {item.labels.map(i => {return i.name})}</span>
                    </div>
                    )
                })}
                {nonedata}
                <br/>
            </InfiniteScroll>
        </div>
        </>
    )
}

function LabelsSel({setSelectedLabel}:{setSelectedLabel: any})
{
    const [data, setData] = useState<Labels[]>([{color: "33FFE6", id: 0, name: "All"}]);
    useEffect(() => {
        getLebelsInRepo(token).then(res => {
            let newRes: Labels[] = res.map((item:any) => {
                return {color: item.color, id: item.id, name: item.name};
            })
            setData([...data, ...newRes]);
        });
    }, [])

    return (
        <>
        <select name="selectLabel" onChange={e => setSelectedLabel(e.target.value)}>
            {data.map(value => (
                //補顏色 use value.color
                <option key={value.id} value={value.name}>{value.name}</option>
            ))}
        </select>
        </>
    )
}

export default function afterLogin()
{
    const searchParams = useSearchParams();
    token = searchParams.get("access_token")!;
    return (
        <main>
            <GetDataUseInfiniteScroll/>
            <CreateIssueUI token={token}/>
        </main>
    )
}
