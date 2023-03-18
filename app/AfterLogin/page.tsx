'use client'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateIssueUI from '../components/(createIssueUI)';
import { getLebelsInRepo, getIssuesWithSearchstring } from '../(fetchResource)';
import { CgSearch } from 'react-icons/cg'
import { BsInfoCircle } from 'react-icons/bs'

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

function DataList({selectedLabel, searchString, sortByOld}:{selectedLabel:string, searchString:string, sortByOld:boolean})
{
    const [items, setItems] = useState<FormData[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page,  setPage] = useState(1);

    useEffect(() => {
        let isCancelled = false;     
        getIssuesWithSearchstring(token, 1, selectedLabel, sortByOld, searchString).then(res => {
            if (!isCancelled)
            {
                setPage(1);
                setItems(res);
                setHasMore(res.length > 0);
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
            setHasMore(res.length > 0);
            setPage(prev => prev + 1);
        });
    };
    const [table , setTable] = useState(450);
    useEffect(() => {
        setTable(document.getElementById("scrollableDiv")?.offsetHeight!)
    }, [])
    return (
        <>
        <div className='h-full max-h-full max-w-full grow bg-pink-400 overflow-auto' id='scrollableDiv'>
            <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<button className="btn btn-ghost loading disabled">loading</button>}
            height={table}
            endMessage={
                <div className="alert alert-info shadow-lg justify-center">
                    <div>
                        <BsInfoCircle className='w-5 h-5'/>
                        <span>No more data.</span>
                    </div>
                </div>
            }
            >   
                <table className='table table-zebra w-full'>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Comment</th>
                            <th>Author</th>
                            <th>State</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items && items.map((item:FormData) => (
                            <tr key={item.number}>
                                <th>
                                    <Link href={`/AfterLogin/issues/${item.number}?access_token=${token}`}>
                                        {item.number}
                                    </Link>
                                </th>
                                <td>{item.title}</td>
                                <td>{item.body}</td>
                                <td>Author</td>
                                <td>{item.labels.length ? item.labels[0].name : null}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </InfiniteScroll>
        </div>
        </>
    )
}

function LabelsSel({selectedLabel, setSelectedLabel}:{selectedLabel:any, setSelectedLabel: any})
{
    const [data, setData] = useState<Labels[]>([{color: "33FFE6", id: 0, name: "All"}]);
    // const [selectedLabel, setselectedLabel] = useState("All");
    useEffect(() => {
        getLebelsInRepo(token).then(res => {
            let newRes: Labels[] = res.map((item:any) => {
                return {color: item.color, id: item.id, name: item.name};
            })
            setData([...data, ...newRes]);
        });
    }, []);

    return (
        <div>
            <h2 className='text-center'>Filter</h2>
            <div className="form-control w-full max-w-xs">
                <label className='label'>
                    <span className='label-text'>Pick a filter</span>
                </label>
                <select className='select select-bordered' value={selectedLabel} onChange={e => setSelectedLabel(e.target.value)}>
                {data.map(value => (
                    //補顏色
                    <option key={value.id} value={value.name}>{value.name}</option>
                ))}
                </select>
            </div>
        </div>
    )
}

function SearchBox({searchString, setSearchString}:{searchString:string, setSearchString:any})
{
    function handleSubmit(e:FormEvent<HTMLFormElement>)
    {
        e.preventDefault();
        setSearchString(e.currentTarget.search.value);
    }
    return (
        <div className="form-control pt-3">
            <form className="input-group justify-center" method='POST' onSubmit={handleSubmit}>
                <input type="text" name='search' placeholder='Search' defaultValue={searchString} className="input input-bordered" />
                <button className="btn btn-square" type='submit'>
                    <CgSearch className='w-5 h-5'/>
                </button>
             </form>
        </div>
    )
}

function DisplayIssue()
{
    const [selectedLabel, setSelectedLabel] = useState("All");
    const [searchString, setSearchString] = useState("");
    const [sortByOld, setSortByOld] = useState(false);

    function handleSort(e:ChangeEvent<HTMLInputElement>)
    {
        setSortByOld(e.target.value === "oldest")
    }
    return (
        <div className='h-full relative flex flex-col'>
            <SearchBox searchString={searchString} setSearchString={setSearchString}/>
            <div className="divider m-1" />
            <div className='flex bg-red-500 grow'>
                <div className='flex flex-col w-1/6 gap-y-4 divide-y bg-blue-200'>
                    <h3 className='text-center pt-2'>Welcome, name</h3>
                    <LabelsSel selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel}/>
                    <div>
                        <h2>Sort</h2>                        
                        <form className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Newest</span> 
                                <input type="radio" value="newest" onChange={handleSort} checked={!sortByOld} className="radio checked:bg-red-500" />
                            </label>
                            <label className="label cursor-pointer">
                                <span className="label-text">Oldest</span> 
                                <input type="radio" value="oldest" onChange={handleSort} checked={sortByOld} className="radio checked:bg-blue-500" />
                            </label>
                        </form>
                    </div>
                </div>
                <div className='flex flex-col w-5/6 relative bg-yellow-300'>
                        <CreateIssueUI token={token}/>
                        <DataList selectedLabel={selectedLabel} searchString={searchString} sortByOld={sortByOld}/>
                </div>
            </div> 
        </div>
    )
}

export default function afterLogin()
{
    const searchParams = useSearchParams();
    token = searchParams.get("access_token")!;
    return (
        <main className='bg-red-300 h-full'>
            <DisplayIssue />
        </main>
    )
}
