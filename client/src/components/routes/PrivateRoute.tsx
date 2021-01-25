import React, { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";
import { Route, Redirect } from "react-router-dom";

interface PrvateRouteProps {
  component: React.FC<any>;
  path: string;
  restricted?: boolean;
  exact?: boolean;
  isPrivate: boolean;
}

const PrivateRoute: React.FC<PrvateRouteProps> = ({
  component: Component,
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
        authorized ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
