import React, { useState, useContext } from "react";
import { AuthContext } from "../../util/AuthContext";
import { ACTION } from "../../util/AuthReducer";
import { Link } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { LOGIN_USER } from "../../queries/query";

const Login = (props) => {
  // Global State
  const { state, dispatch } = useContext(AuthContext);
  // GraphQL Query
  const [login, { loading, data }] = useLazyQuery(LOGIN_USER, {
    onCompleted: () => {
      console.log("completed!");
      if (data.login.ok && data.login.user.token) {
        dispatch({ type: ACTION.LOGIN_SUCCESS, payload: data.login.user });
      } else {
        dispatch({ type: ACTION.LOGIN_FAILED, payload: data.login.errors });
      }
    },
  });

  const [credential, setCredential] = useState({
    username: "",
    password: "",
  });
  const handleOnchange = (e) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    login({ variables: { ...credential } });
  };

  if (loading) return <h1>Loading</h1>;

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Login</h1>
          <div>
            <label htmlFor="username">Username</label>
            <input
              id="username"
              type="text"
              onChange={handleOnchange}
              value={credential.username}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              onChange={handleOnchange}
              value={credential.password}
            />
          </div>
        </div>
        <button type="submit">submit</button>
        <div>
          <small>
            Don't have an account?<Link to="/register">register</Link>
          </small>
        </div>
      </form>
      {data?.login.errors.length > 0 &&
        data.login.errors.map((error, index) => (
          <h1 key={index}>{error.message}</h1>
        ))}
    </>
  );
};

export default Login;
