import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloProvider from "./util/ApolloProvider";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
