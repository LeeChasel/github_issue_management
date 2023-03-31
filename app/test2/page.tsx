'use client'
import { useState } from "react"
import P1 from "./p1"
import P2 from "./p2"
import P3 from "./p3"

export default function Home()
{
    const [a, setA] = useState(0)
    const [b, setB] = useState(0)
    return (
        <div>
            <P1 a={a} setA={setA}/>
            <br/>
            <hr/>
            <P2 b={b} setB={setB}/>
            <br/>
            <P3 a={a} b={b}/>
        </div>
    )

    
}