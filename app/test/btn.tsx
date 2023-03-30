'use client'
import { useRouter } from "next/navigation"
export default function Btn()
{
    const router = useRouter()
    return (
        <>
        <button onClick={() => router.push("/test?a=1&b=2")}>a and b</button>
        <button onClick={() => router.push("/test?c=3")}>only c</button>
        </>
    )
}