import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { AuthContext } from "../../util/AuthContext";
import { ACTION_AUTH } from "../../types/types";
import clsx from "clsx";

import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Link as MUILink,
} from "@material-ui/core";

const useStyle = makeStyles({
  selectedStyle: (props) => {
    return {
      color: props ? "red" : "blue",
      textDecoration: "underline",
    };
  },
});

const menuItems = [
  { id: 0, name: "home", path: "/" },
  { id: 1, name: "Register", path: "/register" },
  { id: 2, name: "Login", path: "/login" },
];

const getInitSelect = (pathname: string): number => {
  const selected = menuItems.find((item) => item.path === pathname)!;
  return selected.id;
};

const Nav: React.FC<any> = ({ selected, handleIDChange, state, logout }) => {
  const classes = useStyle();
  // const { state, dispatch } = React.useContext(AuthContext);
  // const [selected, setSelected] = React.useState(getInitSelect(pathname));

  // const handleOnclick = (id: number) => {
  //   setSelected(id);
  // };

  return (
    <AppBar position="static" color="default">
      <Toolbar style={{ justifyContent: "space-around" }}>
        {!state.authorized ? (
          <>
            {menuItems.map((item) => (
              <MUILink
                key={item.id}
                component={Link}
                to={item.path}
                onClick={() => handleIDChange(item.id)}
                className={clsx({
                  [classes.selectedStyle]: selected === item.id,
                })}
              >
                {item.name}
              </MUILink>
            ))}
          </>
        ) : (
          <Button onClick={logout} variant="text">
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(Nav);
