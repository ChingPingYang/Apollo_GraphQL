import React from "react";
import { AuthContext } from "../../util/AuthContext";
import { withRouter, RouteComponentProps } from "react-router-dom";
import useLogout from "../../hooks/useLogout";
import Nav from "./Nav";

const menuItems = [
  { id: 0, name: "home", path: "/" },
  { id: 1, name: "Register", path: "/register" },
  { id: 2, name: "Login", path: "/login" },
];

const getInitSelect = (pathname: string): number => {
  const selected = menuItems.find((item) => item.path === pathname)!;
  return selected.id;
};

const NavContainer: React.FC<RouteComponentProps> = ({
  location: { pathname },
}) => {
  const { state } = React.useContext(AuthContext);

  const [selected, setSelected] = React.useState(getInitSelect(pathname));
  const handleIDChange = (id: number) => {
    setSelected(id);
  };

  const { logout } = useLogout();

  return (
    <Nav
      menuItems={menuItems}
      selected={selected}
      handleIDChange={handleIDChange}
      state={state}
      logout={logout}
    />
  );
};

export default withRouter(NavContainer);
