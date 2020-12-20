import React, { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";
import { Route, Redirect } from "react-router-dom";

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
  const {
    state: { loading, authorized },
  } = useContext(AuthContext);
  console.log(loading);
  if (loading) return <h1>Laoding!!!!!</h1>;

  return (
    <Route
      {...rest}
      render={(props) =>
        restricted && authorized ? (
          <Redirect to="/" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default PublicRoute;
