'use client'

import { memo } from "react"
function P2({b,setB}:{b:number, setB:any})
{
    console.log("Render b")
    return (
        <button onClick={() => setB(b+1)}>{b}</button>

    )

}

export default memo(P2)