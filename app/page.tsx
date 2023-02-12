'use client';

async function getData()
{
  // const res = await fetch("https://github.com/login/oauth/authorize?" + new URLSearchParams({
  //   response_type : "code",
  //   client_id : "a72341c3b401536e1dea",
  // }), {
  //   mode : "no-cors",
  // });
  
  window.location.replace("https://github.com/login/oauth/authorize?client_id=a72341c3b401536e1dea&scope=repo");
}

export default function Home() {
  return (
    <main>
      <button onClick={() => getData()}>Login</button>
    </main>
  )
}
