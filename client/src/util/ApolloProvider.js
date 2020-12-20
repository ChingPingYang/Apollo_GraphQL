import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  ApolloProvider as Provider,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
// import { useQuery } from "@apollo/client";
// import { GET_USER } from "../queries/query";

const httpLink = createHttpLink({
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
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const ApolloProvider = (props) => {
  // const { loading, error, data } = useQuery(GET_USER);
  return (
    <Provider client={client} {...props}>
      {props.children}
    </Provider>
  );
};

export default ApolloProvider;
