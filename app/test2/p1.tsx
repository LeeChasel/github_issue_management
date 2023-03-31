'use client'

import { memo } from "react"
function P1({a,setA}:{a:number, setA:any})
{
    
    console.log("render A")
    return (
        <button onClick={() => setA(a+1)}>{a}</button>
    )

}
export default memo(P1);