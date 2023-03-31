export default async function Page()
{
  const data = await fet();
  
  return (
    <>
    <div>{data? JSON.stringify(data) : "loading"}</div>
    </>
  )

}

async function fet() {
  console.log("fet be called")
  const data = await fetch('https://jsonplaceholder.typicode.com/todos/1');
  if (!data.ok){
    throw new Error('Failed to fetch data');
  }
  return data.json();
}