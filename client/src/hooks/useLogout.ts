import React from "react";
import { AuthContext } from "../util/AuthContext";
import { ACTION_AUTH } from "../types/types";

const useLogout = () => {
  const { dispatch } = React.useContext(AuthContext);
  const logout = () => {
    dispatch({ type: ACTION_AUTH.LOGOUT, payload: [] });
    window.location.href = "/login";
  };
  return { logout };
};
export default useLogout;
