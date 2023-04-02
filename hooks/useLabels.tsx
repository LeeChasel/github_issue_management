'use client'
import useSWR from 'swr'

export default function useLabels(token:string)
{
    const fetcher = (url:string) => fetch(url, {
        headers: {
        "Accept" : "application/vnd.github+json",
        "Authorization" : `Bearer ${token}`
    }}).then(res => res.json())
        
    const { data, error, isLoading } = useSWR(`https://api.github.com/repos/${process.env.NEXT_PUBLIC_REPO_OWNER}/${process.env.NEXT_PUBLIC_REPO_NAME}/labels`, fetcher)
    return {
        labels: data,
        isError: error,
        isLoading
    }
}