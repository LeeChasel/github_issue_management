'use client'


export default function P3({a, b}:{a:any, b:number })
{
    console.log("Render result")
    return (
        <div>
        <div>{`a is ${a}`}</div>
        <div>{`b is ${b}`}</div>
        </div>
    )

}