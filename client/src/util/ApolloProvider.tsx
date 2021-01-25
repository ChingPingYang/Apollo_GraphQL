import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider as Provider,
  split,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { getMainDefinition } from "@apollo/client/utilities";
import { WebSocketLink } from "@apollo/client/link/ws";

// For HTTP link!
let httpLink = createHttpLink({
  uri: "http://localhost:8000/",
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      [`auth-token`]: token ? token : "",
    },
  };
});

httpLink = authLink.concat(httpLink);

// For WebSocket link!
const wsLink = new WebSocketLink({
  uri: `ws://localhost:8000/graphql`,
  options: {
    reconnect: true,
    connectionParams: {
      [`auth-token`]: localStorage.getItem("token"),
    },
  },
});

// If the queries are mutation or query, use httpLink. Otherwise, use websocket link
const splitLink = split(
  ({ query }) => {
    const definition = getMainDefinition(query);
    return (
      definition.kind === "OperationDefinition" &&
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
);

const client = new ApolloClient({
  link: splitLink,
  cache: new InMemoryCache(),
});

interface ApolloProviderProps {
  children: React.ReactNode;
}

const ApolloProvider: React.FC<ApolloProviderProps> = (props) => {
  return (
    <Provider client={client} {...props}>
      {props.children}
    </Provider>
  );
};

export default ApolloProvider;
