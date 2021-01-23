import React from "react";
import { AuthContext } from "../util/AuthContext";
import { ACTION_AUTH } from "../types/types";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../queries/mutation";

const useRegister = () => {
  const { dispatch } = React.useContext(AuthContext);
  const [register, { data, loading }] = useMutation(REGISTER_USER, {
    onCompleted: ({ register }) => {
      if (register.ok) {
        dispatch({
          type: ACTION_AUTH.REGISTER_USER_SUCCESS,
          payload: register.user,
        });
      } else {
        dispatch({
          type: ACTION_AUTH.REGISTER_USER_FAILED,
          payload: register.errors,
        });
      }
      // This is for websocket to work... it will not work if we don't refresh when we register
      window.location.href = "/";
    },
  });
  return { register, data, loading };
};
export default useRegister;
