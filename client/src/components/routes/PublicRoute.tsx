import React, { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";
import { Route, Redirect } from "react-router-dom";

interface PublicRouteProps {
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
  } = useContext<any>(AuthContext);

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
