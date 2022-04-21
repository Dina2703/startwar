import React from "react";
import { useQuery } from "react-query";
import Planet from "../components/Planet";

const fetchPlanets = async () => {
  const res = await fetch("http://swapi.dev/api/planets/");
  const data = await res.json();
  return data;
};

function Planets() {
  //'status' shows the query status
  const { data, status } = useQuery("planets", fetchPlanets);
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
