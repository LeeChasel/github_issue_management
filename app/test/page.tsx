import {headers} from 'next/headers'

import Btn from "./btn";

export default function Page({searchParams}:{searchParams:any})
{
  const headersList = headers();
  // const a = headersList.forEach(r => (
  //   // <div>{r}</div>
  //   console.log(r)
  // ))
  // const h = headersList.get('x-url') || "";
  return (
    <>
    <p>{searchParams.b}</p>

    <Btn/>
    </>
  )

}