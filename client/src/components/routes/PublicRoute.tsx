import React, { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";

import { Route, Redirect, RouteProps } from "react-router-dom";

interface PublicRouteProps extends RouteProps {
  component: React.FC<any>;
  path: string;
  restricted?: boolean;
  exact?: boolean;
  isPrivate: boolean;
}

const PublicRoute: React.FC<PublicRouteProps> = ({
  component: Component,
  restricted,
  ...rest
}) => {
  const {
    state: { loading, authorized },
  } = useContext(AuthContext);

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
