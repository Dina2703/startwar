import { useState } from "react";
import { useQuery } from "react-query";
import Person from "../components/Person";

const fetchPeople = async (page) => {
  const res = await fetch(`https://swapi.dev/api/people/?page=${page}`);
  const data = await res.json();
  return data;
};

function People() {
  const [page, setPage] = useState(1);
  const { data, status } = useQuery(["people", page], () => fetchPeople(page), {
    keepPreviousData: true,
  });
  console.log(data);
  return (
    <div>
      <h2>People</h2>
      {status === "loading" && <div>Loading data ...</div>}
      {status === "error" && <div>Error fetching data</div>}
      {status === "success" && (
        <>
          <button
            onClick={() => setPage((old) => Math.max(old - 1, 0))}
            disabled={page === 1}
          >
            Previous Page
          </button>
          <span>{page}</span>
          <button
            onClick={() =>
              setPage((old) => (!data || !data.next ? old : old + 1))
            }
            disabled={!data || !data.next}
          >
            Next Page
          </button>
          <div>
            {data.results.map((person) => (
              <Person person={person} key={person.name} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default People;
