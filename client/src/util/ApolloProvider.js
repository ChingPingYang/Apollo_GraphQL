import React from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider as Provider,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "http://localhost:8000/",
  cache: new InMemoryCache(),
});

const ApolloProvider = (props) => {
  return (
    <Provider client={client} {...props}>
      {props.children}
    </Provider>
  );
};

export default ApolloProvider;
