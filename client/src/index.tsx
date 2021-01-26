import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ApolloProvider from "./util/ApolloProvider";
import { theme } from "./styles/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";
import Global from "./styles/Global";

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider>
      <MuiThemeProvider theme={theme}>
        <App />
        <Global />
      </MuiThemeProvider>
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
