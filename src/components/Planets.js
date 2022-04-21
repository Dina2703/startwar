import { useState } from "react";
import { useQuery } from "react-query";
import Planet from "../components/Planet";

const fetchPlanets = async (greet, page) => {
  console.log(greet);
  const res = await fetch(`https://swapi.dev/api/planets/?page=${page}`);
  return await res.json();
};

function Planets() {
  //'status' shows the query status like: error, loading, success
  //useQuery takes in 3 arguments: the query key(string) to use for this query, the query function, that gets a data, third argument is optional, we added config params to keep data fresh for 2sec. before it gets staled(old data).
  //["planets", 'hello World'],"planets" is a key, the second argument is a variable, that we want to pass into query func,
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(
    ["planets", "hello", page],
    ({ queryKey }) => fetchPlanets(queryKey[1], page)
  );
  return (
    <div>
      <h2>Planets</h2>

      <button onClick={() => setPage(1)}>page 1</button>
      <button onClick={() => setPage(2)}>page 2</button>
      <button onClick={() => setPage(3)}>page 3</button>
      {/* <p>{status}</p>*/}
      {status === "loading" && <div>Loading data ...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.name} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Planets;
