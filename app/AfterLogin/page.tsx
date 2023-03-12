'use client'
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useState, useEffect} from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import CreateIssueUI from '../components/(createIssueUI)';
import { getLebelsInRepo } from '../(fetchResource)';
import { getIssuesWithSearchstring } from '../(fetchResource)';
import { Switch } from '@headlessui/react'


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

function DataList({selectedLabel, searchString}:{selectedLabel:string, searchString:string})
{
    const [items, setItems] = useState<FormData[]>([]);
    const [hasMore, setHasMore] = useState(true);
    const [page,  setPage] = useState(1);
    const [sortByOld, SetSortByOld] = useState(false);

    useEffect(() => {
        setPage(1);
        getIssuesWithSearchstring(token, 1, selectedLabel, sortByOld, searchString).then(res => {
            setItems(res);
            setHasMore(res.length > 0);
        })
    }, [selectedLabel, searchString, sortByOld]);

    function fetchMoreData()
    {
        getIssuesWithSearchstring(token, page + 1, selectedLabel, sortByOld, searchString).then(res => {
            setItems([...items, ...res]);
            setHasMore(res.length > 0);
            setPage(page + 1);
        });
    };

    function SortToggle()
    {   
        return (
            <div className="py-2">
                <span>new to old</span>
                <Switch
                    checked={sortByOld}
                    onChange={SetSortByOld}
                    className={`${sortByOld ? 'bg-teal-900' : 'bg-teal-700'}
                    relative inline-flex h-[38px] w-[74px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75`}
                >
                    <span
                    aria-hidden="true"
                    className={`${sortByOld ? 'translate-x-9' : 'translate-x-0'}
                        pointer-events-none inline-block h-[34px] w-[34px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out`}
                    />
                </Switch>
                <span>old to new</span>
            </div>
        )
    }

    return (
        <>
        <SortToggle />
        <div>
            <InfiniteScroll
            dataLength={items.length}
            next={fetchMoreData}
            hasMore={hasMore}
            loader={<h4>Loading...</h4>}
            height={200}
            >
                {items.length ? items.map((item:FormData) => (
                    <div key={item.number} className="h-7 m-1 p-1 border-2 border-solid border-green-400">
                        <Link href={`/AfterLogin/issues/${item.number}?access_token=${token}`}>
                            <span>#{item.number}  _</span>
                        </Link>
                        <span>{item.title} - {item.labels.length ? item.labels[0].name : "None label"}</span>
                    </div>
                )) : <p>Don't have data</p>}
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
    }, []);

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

function SearchBox({searchString, setSearchString}:{searchString:string, setSearchString:any})
{
    function handleSubmit(e:any)
    {
        e.preventDefault();
        setSearchString(e.target.search.value);
    }
    return (
        <form method='POST' onSubmit={handleSubmit}>
        <label>Seach : </label>
        <input defaultValue={searchString} className="bg-gray-200" type="text" name='search'/>
        <button type='submit'>Search</button>
        </form>
    )
}

function DisplayIssue()
{
    const [selectedLabel, setSelectedLabel] = useState("All");
    const [searchString, setSearchString] = useState("");
    return (
        <>
            <SearchBox searchString={searchString} setSearchString={setSearchString}/>
            <LabelsSel setSelectedLabel={setSelectedLabel}/>
            <DataList selectedLabel={selectedLabel} searchString={searchString}/>
        </>
    )
}

export default function afterLogin()
{
    const searchParams = useSearchParams();
    token = searchParams.get("access_token")!;
    return (
        <main>
            <DisplayIssue />
            <CreateIssueUI token={token}/>
        </main>
    )
}
