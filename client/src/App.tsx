import { useReducer, Suspense } from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import { AuthContext } from "./util/AuthContext";
import { MessageContext } from "./util/MessageContext";
import AuthReducer, { initAuth } from "./util/AuthReducer";
import MessageReducer, { initMessage } from "./util/MessageReducer";
import { useQuery } from "@apollo/client";
import { GET_USER } from "./queries/query";
import { ACTION_AUTH } from "./types/types";

import Nav from "./components/navbar/NavContainer";
import routeMap from "./components/routes/routeMap";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";

function App() {
  const [state, dispatch] = useReducer(AuthReducer, initAuth);
  const [messageState, messageDispatch] = useReducer(
    MessageReducer,
    initMessage
  );

  // If there's token in the localstorage, login the user automatically.
  useQuery(GET_USER, {
    onCompleted: (data) => {
      dispatch({ type: ACTION_AUTH.GET_USER_SUCCESS, payload: data.user });
    },
    onError: (error) => {
      dispatch({
        type: ACTION_AUTH.GET_USER_FAILED,
        payload: error.graphQLErrors,
      });
    },
  });

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <MessageContext.Provider value={{ messageState, messageDispatch }}>
        <Router>
          <Nav />
          <Suspense fallback={<p>loading</p>}>
            <Switch>
              {routeMap.map((route, index) =>
                route.isPrivate ? (
                  <PrivateRoute key={index} {...route} />
                ) : (
                  <PublicRoute key={index} {...route} />
                )
              )}
            </Switch>
          </Suspense>
        </Router>
      </MessageContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
