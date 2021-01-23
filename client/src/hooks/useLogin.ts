import React from "react";
import { AuthContext } from "../util/AuthContext";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../queries/query";
import { ACTION_AUTH } from "../types/types";

const useLogin = () => {
  const { dispatch } = React.useContext(AuthContext);
  const [login, { loading, data }] = useLazyQuery(LOGIN_USER, {
    onCompleted: () => {
      if (data.login.ok && data.login.user.token) {
        dispatch({ type: ACTION_AUTH.LOGIN_SUCCESS, payload: data.login.user });
      } else {
        dispatch({
          type: ACTION_AUTH.LOGIN_FAILED,
          payload: data.login.errors,
        });
      }
      // This is for websocket to work... it will not work if we don't refresh when we log in
      window.location.href = "/";
    },
  });
  return { login, loading, data };
};
export default useLogin;
