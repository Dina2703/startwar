import React from "react";
import { useQuery } from "react-query";
import Planet from "../components/Planet";

const fetchPlanets = async () => {
  const res = await fetch("http://swapi.dev/api/planets/");
  const data = await res.json();
  return data;
};

function Planets() {
  //'status' shows the query status like: error, loading, success
  //useQuery takes in 3 arguments: the query key(string) to use for this query, the query function, that gets a data, third argument is optional, we added config params to keep data fresh for 2sec. before it gets staled(old data).
  const { data, status } = useQuery("planets", fetchPlanets, {
    staleTime: 0,
    // cacheTime: 10,
    // onSuccess: console.log("data fetched"),
  });
  console.log(data);

  return (
    <div>
      <h2>Planets</h2>
      {/* <p>{status}</p>*/}
      {status === "loading" && <div>Loading data ...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <div>
          {data.results.map((planet) => (
            <Planet planet={planet} key={planet.diameter} />
          ))}
        </div>
      )}
    </div>
  );
}

export default Planets;
