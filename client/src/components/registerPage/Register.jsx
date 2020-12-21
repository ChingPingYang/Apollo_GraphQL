import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../util/AuthContext";
import { ACTION } from "../../util/AuthReducer";
import { useMutation } from "@apollo/client";
import { REGISTER_USER } from "../../queries/mutation";

const Register = () => {
  const { dispatch } = useContext(AuthContext);
  const [register, { data, loading }] = useMutation(REGISTER_USER, {
    update: (cache, { data: { register } }) => {
      if (register.ok) {
        console.log(register);
        dispatch({
          type: ACTION.REGISTER_USER_SUCCESS,
          payload: register.user,
        });
      } else {
        dispatch({
          type: ACTION.REGISTER_USER_FAILED,
          payload: register.errors,
        });
      }
    },
  });

  const [credential, setCredential] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleOnchange = (e) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    register({ variables: { ...credential } });
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <h1>Register</h1>
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
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              onChange={handleOnchange}
              value={credential.email}
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
          <div>
            <label htmlFor="confirmPassword">ConfirmPassword</label>
            <input
              id="confirmPassword"
              type="password"
              onChange={handleOnchange}
              value={credential.confirmPassword}
            />
          </div>
        </div>
        <button type="submit">submit</button>
        <div>
          <small>
            Have an account?<Link to="/login">Login</Link>
          </small>
        </div>
      </form>
      {loading ? <h1>Loading</h1> : <h1>Done</h1>}
      {data?.register.errors.length > 0 &&
        data.register.errors.map((error, index) => (
          <h1 key={index}>{error.message}</h1>
        ))}
    </>
  );
};

export default Register;
