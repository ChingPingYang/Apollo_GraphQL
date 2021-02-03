import React from "react";
import { Link, withRouter, RouteComponentProps } from "react-router-dom";
import { MenuItem, AuthState } from "../../types/types";
import clsx from "clsx";
import {
  AppBar,
  Toolbar,
  Button,
  makeStyles,
  Link as MUILink,
} from "@material-ui/core";

const useStyle = makeStyles((theme) => {
  return {
    selectedStyle: () => {
      return {
        color: theme.palette.primary.main,
        textDecoration: "underline",
      };
    },
  };
});

interface NavProps extends RouteComponentProps {
  menuItems: MenuItem[];
  selected: number;
  handleIDChange: (id: number) => void;
  state: AuthState;
  logout: () => void;
}

const Nav: React.FC<NavProps> = ({
  menuItems,
  selected,
  handleIDChange,
  state,
  logout,
}) => {
  const classes = useStyle();

  return (
    <AppBar position="static" color="default">
      {!state.loading && (
        <Toolbar style={{ justifyContent: "space-around" }}>
          {!state.authorized ? (
            <>
              {menuItems.map((item: any) => (
                <MUILink
                  key={item.id}
                  component={Link}
                  color="textSecondary"
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
      )}
    </AppBar>
  );
};

export default withRouter(Nav);
