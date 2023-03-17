'use client'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateIssueUI from '../components/(createIssueUI)';
import { getLebelsInRepo, getIssuesWithSearchstring } from '../(fetchResource)';
import { CgSearch } from 'react-icons/cg'
import { TbArrowsSort } from 'react-icons/tb'

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
    return (
        <>
        <div className='w-full'>
            <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<button className="btn btn-ghost loading disabled">loading</button>}
            height={400}
            endMessage={<p>The end</p>}
            className="w-full"
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

function LabelsSel({setSelectedLabel}:{setSelectedLabel: any})
{
    const [data, setData] = useState<Labels[]>([{color: "33FFE6", id: 0, name: "All"}]);
    const [checkedLabel, setCheckedLabel] = useState("All");
    useEffect(() => {
        getLebelsInRepo(token).then(res => {
            let newRes: Labels[] = res.map((item:any) => {
                return {color: item.color, id: item.id, name: item.name};
            })
            setData([...data, ...newRes]);
        });
    }, []);

    function changeLabel(e:ChangeEvent<HTMLInputElement>)
    {
        setSelectedLabel(e.target.value);
        setCheckedLabel(e.target.value);
    }

    return (
        <div className='basis-1/3'>
            <h2 className='text-center'>Filter</h2>
            <form className="form-control">
                {data.map(value => (
                    //補顏色
                    <label key={value.id} className="label cursor-pointer">
                        <span className="label-text">{value.name}</span> 
                        <input type="radio" value={value.name} onChange={changeLabel} checked={checkedLabel === value.name} className="radio checked:bg-red-500" />
                    </label>
                ))}
            </form>
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
        <div className="form-control mt-5">
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
        <>
            <SearchBox searchString={searchString} setSearchString={setSearchString}/>
            <div className="divider" />
            <div className='flex flex-row w-full h-full'>
                <div className='flex flex-col basis-1/5 bg-blue-200'>
                    <h3 className='basis-1/3 text-center mt-2'>Welcome, name</h3>
                    <div className="divider" />
                    {/* <LabelsSel setSelectedLabel={setSelectedLabel}/> */}
                    <div className="divider" />
                    <div className='basis-1/3'>
                        <h2>Sort</h2>                        
                        <form className="form-control">
                            <label className="label cursor-pointer">
                                <span className="label-text">Newest To Oldest</span> 
                                <input type="radio" value="newest" onChange={handleSort} checked={!sortByOld} className="radio checked:bg-red-500" />
                            </label>
                            <label className="label cursor-pointer">
                                <span className="label-text">Oldest To Newest</span> 
                                <input type="radio" value="oldest" onChange={handleSort} checked={sortByOld} className="radio checked:bg-blue-500" />
                            </label>
                        </form>
                    </div>                    
                </div>
                <div className='basis-4/5 bg-yellow-300'>
                    <DataList selectedLabel={selectedLabel} searchString={searchString} sortByOld={sortByOld}/>
                </div>
            </div> 
        </>
    )
}

export default function afterLogin()
{
    const searchParams = useSearchParams();
    token = searchParams.get("access_token")!;
    return (
        <main className='max-w-full max-h-full'>
            <DisplayIssue />
            {/* <CreateIssueUI token={token}/> */}
        </main>
    )
}
