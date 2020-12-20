import React, { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const {
    state: { loading, authorized },
  } = useContext(AuthContext);

  if (loading) return <h1>Laoding!!!!!</h1>;

  return (
    <Route
      {...rest}
      render={(props) =>
        authorized ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
