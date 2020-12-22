import "./App.css";
import { useReducer } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "./util/AuthContext";
import { MessageContext } from "./util/MessageContext";
import AuthReducer, { initAuth } from "./util/AuthReducer";
import MessageReducer, { initMessage } from "./util/MessageReducer";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./queries/query";
import { ACTION } from "./util/AuthReducer";

import Nav from "./components/Nav";
import Home from "./components/homePage/Home";
import Register from "./components/registerPage/Register";
import Login from "./components/loginPage/Login";
import PublicRoute from "./components/routes/PublicRoute";

function App() {
  const [state, dispatch] = useReducer(AuthReducer, initAuth);
  const [messageState, messageDispatch] = useReducer(
    MessageReducer,
    initMessage
  );

  // If there's token in the localstorage, login the user automatically.
  const { loading, error, data } = useQuery(GET_USER, {
    onCompleted: (data) => {
      dispatch({ type: ACTION.GET_USER_SUCCESS, payload: data.user });
    },
    onError: (error) => {
      dispatch({
        type: ACTION.GET_USER_FAILED,
        payload: error.graphQLErrors,
      });
    },
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <MessageContext.Provider value={{ messageState, messageDispatch }}>
        <Router>
          <Nav />
          <Switch>
            <PublicRoute path="/" exact component={Home} />
            <PublicRoute path="/register" restricted component={Register} />
            <PublicRoute path="/login" restricted component={Login} />
          </Switch>
        </Router>
      </MessageContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
