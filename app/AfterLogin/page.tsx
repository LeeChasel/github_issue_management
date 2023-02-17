'use client'
import { useSearchParams } from 'next/navigation';

async function getIssues(token: string)
{
    let owner = "LeeChasel";
    let repo = "dcard_intern_homework";    
    const res = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues?state=all&per_page=2`, {
        headers: {
            "Accept" : "application/vnd.github+json",
            "Authorization" : `Bearer ${token}`,
        }
    });
    const ss = await res.json();
    console.log(ss);
    
}

export default function afterLogin()
{
    const searchParams = useSearchParams();
    const token: string = searchParams.get("access_token")!;
    return (
        <main>
            <button onClick={() => getIssues(token)}>Click to get issues on console</button>
            <table>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>4</td>
                    </tr>
                </tbody>
            </table>
        </main>
    )
}
