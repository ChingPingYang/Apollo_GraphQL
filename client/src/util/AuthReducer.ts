import { ACTION_AUTH, Payload } from "../types/types";
export const initAuth = {
  loading: true,
  authorized: false,
  user: null,
  errors: [],
};

const AuthReducer = <T>(state = initAuth, action: Payload<T>) => {
  const { type, payload } = action;

  switch (type) {
    case ACTION_AUTH.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: true,
        user: payload,
        errors: [],
      };

    case ACTION_AUTH.REGISTER_USER_SUCCESS:
    case ACTION_AUTH.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loading: false,
        authorized: true,
        user: payload,
        errors: [],
      };

    case ACTION_AUTH.GET_USER_FAILED:
    case ACTION_AUTH.REGISTER_USER_FAILED:
    case ACTION_AUTH.LOGIN_FAILED:
    case ACTION_AUTH.LOGOUT:
      localStorage.removeItem("token");
      return {
        ...state,
        loading: false,
        authorized: false,
        user: null,
        errors: payload,
      };

    default:
      return state;
  }
};

export default AuthReducer;
