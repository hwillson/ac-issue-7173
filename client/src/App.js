import React, { useState } from "react";
import { gql, useQuery } from "@apollo/client";

const SEARCH_QUERY = gql`
  query SearchQuery(
    $index: String!
    $query: String
    $filter: String
    $page: Int!
    $perPage: Int!
    $ranking: [String!]
    $hasFooIds: Boolean = false
    $fooIds: [String]
  ) {
    search(
      index: $index
      query: $query
      filter: $filter
      page: $page
      perPage: $perPage
      ranking: $ranking
    ) {
      totalResults
      page
      perPage
      results {
        id
        name
        description

        foos(ids: $fooIds) @include(if: $hasFooIds) {
          id
          name
        }
      }
    }
  }
`;

export default function App() {
  const [fooIds, setFooIds] = useState([]);
  const [filter, setFilter] = useState("a");

  const { loading, data, fetchMore, client } = useQuery(SEARCH_QUERY, {
    fetchPolicy: "network-only",
    nextFetchPolicy: "cache-first",
    notifyOnNetworkStatusChange: true,
    variables: {
      index: "a",
      query: "test",
      filter,
      page: 0,
      perPage: 2,
      ranking: ["a"],
      hasFooIds: false,
      fooIds,
    },
  });

  return (
    <main>
      <h1>Test</h1>
      <h2>Results</h2>
      {loading ? (
        <p>Loading…</p>
      ) : data.search.results.length === 0 ? (
        <p>No more results</p>
      ) : (
        <ul>
          {data?.search?.results.map((result) => (
            <li key={result.id}>
              {result.name}: {result.description}
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={() => {
          fetchMore({
            variables: {
              index: "a",
              query: "test",
              filter: "a",
              page: data.search.page + 1,
              perPage: 2,
              ranking: ["a"],
              hasFooIds: false,
              fooIds,
            },
          });
        }}
      >
        Next
      </button>
      <button
        onClick={() => {
          setFooIds(["a"]);
        }}
        style={{ marginLeft: "0.5em" }}
      >
        Change fooIds
      </button>
      <button
        onClick={() => {
          setFilter("b");
        }}
        style={{ marginLeft: "0.5em" }}
      >
        Change filter
      </button>

      <h2>Cache</h2>
      <pre>{JSON.stringify(client.cache.extract(), undefined, 2)}</pre>
    </main>
  );
}
