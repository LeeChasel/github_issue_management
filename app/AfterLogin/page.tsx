'use client'
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, FormEvent, ChangeEvent } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateIssueUI from '../components/(createIssueUI)';
import { getLebelsInRepo, getIssuesWithSearchstring, getUsername } from '../(fetchResource)';
import { CgSearch } from 'react-icons/cg'
import { BsInfoCircle } from 'react-icons/bs'
import { useRouter } from 'next/navigation';

let token = "";
let username = "";

interface FormData 
{
    title: string;
    body: string; 
    number: string;
    labels: Labels[];
    user: {login:string}
}
interface Labels
{
    color: string;
    id: number;
    name: string;
}

function setUsername()
{
    const [name, setName] = useState("");
    useEffect(() => {
        getUsername(token).then(res => setName(res));
    },[])
    return name;
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
    const router = useRouter();    
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
                        {items && items.map((item:FormData) => (
                            <tr key={item.number} className="bg-red-200 hover cursor-pointer h-28" onClick={() => router.push(`/AfterLogin/issues/${item.number}?access_token=${token}`)}>
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

function LabelsSel({selectedLabel, setSelectedLabel}:{selectedLabel:any, setSelectedLabel: any})
{
    const [data, setData] = useState<Labels[]>([{color: "33FFE6", id: 0, name: "All"}]);
    useEffect(() => {
        getLebelsInRepo(token).then(res => {
            let newRes: Labels[] = res.map((item:any) => {
                return {color: item.color, id: item.id, name: item.name};
            })
            setData([...data, ...newRes]);
        });
    }, []);

    return (
        <div className='pt-4'>
            <h2 className='text-center text-lg'>Filter</h2>
            <div className="form-control w-full">
                <label className='label'>
                    <span className='label-text text-base'>Pick a filter</span>
                </label>
                <select className='select select-bordered text-base' value={selectedLabel} onChange={e => setSelectedLabel(e.target.value)}>
                {data.map(value => (
                    <option key={value.id} value={value.name} className="text-lg">{value.name}</option>
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
        <div className="form-control w-full h-[10%] items-center">
            <form className="h-full input-group justify-center items-center" method='POST' onSubmit={handleSubmit}>
                <input type="text" name='search' placeholder='Search' defaultValue={searchString} className="input input-bordered w-1/6 h-2/3 text-lg" />
                <button className="btn btn-square h-2/3" type='submit'>
                    <CgSearch className='w-1/2 h-1/2'/>
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
        <div className='h-full flex flex-col'>
            <SearchBox searchString={searchString} setSearchString={setSearchString}/>
            <div className='flex h-[90%]'>
                <div className='flex flex-col w-1/6 gap-y-4 divide-y bg-blue-200 px-2'>
                    <h3 className='text-center text-lg pt-4'>Welcome {username.toString()}</h3>
                    <LabelsSel selectedLabel={selectedLabel} setSelectedLabel={setSelectedLabel}/>
                    <div className='flex flex-col items-center pt-4'>
                        <h2 className='text-lg'>Sort</h2>                        
                        <form className="form-control w-full">
                            <label className="label cursor-pointer">
                                <span className="label-text text-base">Newest</span> 
                                <input type="radio" value="newest" onChange={handleSort} checked={!sortByOld} className="radio checked:bg-red-500" />
                            </label>
                            <label className="label cursor-pointer">
                                <span className="label-text text-base">Oldest</span> 
                                <input type="radio" value="oldest" onChange={handleSort} checked={sortByOld} className="radio checked:bg-blue-500" />
                            </label>
                        </form>
                    </div>
                </div>
                <div className='flex flex-col w-5/6 h-full bg-yellow-300'>
                    <CreateIssueUI token={token}/>
                    <div className="mx-10 h-[90%] overflow-y-auto" id='scrollableDiv'>
                        <DataList selectedLabel={selectedLabel} searchString={searchString} sortByOld={sortByOld}/>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default function afterLogin()
{
    const searchParams = useSearchParams()!;
    token = searchParams.get("access_token")!;
    username = setUsername();
    return (
        <main className='bg-red-300 h-full'>
            <DisplayIssue />
        </main>
    )
}
