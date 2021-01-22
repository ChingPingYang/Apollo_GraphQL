import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../util/AuthContext";
import { ACTION_AUTH } from "../types/types";

const Nav = () => {
  const { dispatch } = useContext(AuthContext);

  return (
    <div>
      <ul>
        <Link to="/">Home</Link>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
        <button
          onClick={() => {
            dispatch({ type: ACTION_AUTH.LOGOUT, payload: [] });
            window.location.href = "/login";
          }}
        >
          Logout
        </button>
      </ul>
    </div>
  );
};

export default Nav;
