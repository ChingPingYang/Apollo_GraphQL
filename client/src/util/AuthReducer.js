export const ACTION = {
  GET_USER_SUCCESS: "GET_USER_SUCCESS",
  GET_USER_FAILED: "GET_USER_FAILED",
  LOGIN_SUCCESS: "LOGIN_SUCCESS",
  LOGIN_FAILED: "LOGIN_FAILED",
  LOGOUT: "LOGOUT",
};

export const initAuth = {
  loading: true,
  authorized: false,
  user: null,
  errors: [],
};

const AuthReducer = (state = initAuth, action) => {
  const { type, payload } = action;
  switch (type) {
    case ACTION.GET_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        authorized: true,
        user: payload,
        errors: [],
      };

    case ACTION.LOGIN_SUCCESS:
      localStorage.setItem("token", payload.token);
      return {
        ...state,
        loading: false,
        authorized: true,
        user: payload,
        errors: [],
      };

    case ACTION.GET_USER_FAILED:
    case ACTION.LOGIN_FAILED:
    case ACTION.LOGOUT:
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
