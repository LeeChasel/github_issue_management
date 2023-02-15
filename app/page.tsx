'use client'

function login()
{
  let windowWidth : number = 500;
  let windowHeight : number = 700;
  let cliend_id = "a72341c3b401536e1dea";
  let scope = "repo";
  const y = window.top!.outerHeight / 2 + window.top!.screenY - (windowHeight / 2);
  const x = window.top!.outerWidth / 2 + window.top!.screenX - (windowWidth / 2);
  let popup = window.open(`https://github.com/login/oauth/authorize?client_id=${cliend_id}&scope=${scope}`,"", `top=${y}, left=${x}, width=${windowWidth}, height=${windowHeight}`);
  var timer = setInterval(() => checkWindow(), 1000);
  
  function checkWindow(): void
  {
    try{
      let query = popup!.location.search;
      if (query?.indexOf("code") != -1)
      {
        clearInterval(timer);
        let code = processQuery(query);        
        sleep(3000).then(() => popup?.close())
                   .then(() => sleep(500))
                   .then(() => getToken(code))
                   .then(token => toAfterLogin(token));
      }
    } catch (e) {
      console.log(e);
    }

    function sleep(ms:number) {
      return new Promise(resolve => setTimeout(resolve, ms));
    }

    function processQuery(query: string): string
    {
      query = query.substring(1);
      let parameters = query.split("&");
      for (let parameter of parameters)
      {
        if (parameter.includes("code"))
        {
          return parameter;
        }
      }
      return "Not found";
    }

    async function getToken(code: string)
    {
      let token = await fetch("api/getToken?" + code).then(res => res.json());
      return token;
    }

    function toAfterLogin(token: string)
    {
      window.location.replace("AfterLogin?access_token=" + token);
    }
  } 
}

export default function Home() {
  return (
    <main>
      <button onClick={() => login()}>Click to oauth</button>
    </main>
  )
}
