import "./App.css";
import { useReducer, useEffect, useRef } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "./util/AuthContext";
import AuthReducer, { initAuth } from "./util/AuthReducer";
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
  // If there's token in the localstorage, login the user automatically.
  const { loading, error, data } = useQuery(GET_USER);

  useEffect(() => {
    if (error && !data) {
      dispatch({
        type: ACTION.GET_USER_FAILED,
        payload: error.graphQLErrors,
      });
    } else if (data) {
      dispatch({ type: ACTION.GET_USER_SUCCESS, payload: data.user });
    }
  }, [loading]);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <Router>
        <Nav />
        <Switch>
          <PublicRoute path="/" exact component={Home} />
          <PublicRoute path="/register" restricted component={Register} />
          <PublicRoute path="/login" restricted component={Login} />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default App;
