import React from "react";
import { Link } from "react-router-dom";

interface LoginProps {
  credential: {
    username: string;
    password: string;
  };
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  loading: boolean;
  data: any;
}

const Login: React.FC<LoginProps> = ({
  credential,
  handleOnchange,
  handleSubmit,
  loading,
  data,
}) => {
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
        data.login.errors.map((error: any, index: number) => (
          <h1 key={index}>{error.message}</h1>
        ))}
    </>
  );
};

export default Login;
