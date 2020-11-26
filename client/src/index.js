import React from "react";
import { render } from "react-dom";
import { ApolloClient, InMemoryCache, ApolloProvider } from "@apollo/client";

import App from "./App";

import "./index.css";

const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        search: {
          keyArgs(
            { index, query, filter, ranking, perPage },
            { variables: { fooIds } }
          ) {
            return JSON.stringify({
              index,
              query,
              filter,
              ranking,
              perPage,
              fooIds,
            });
          },
        },
      },
    },
  },
});

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache,
});

render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
