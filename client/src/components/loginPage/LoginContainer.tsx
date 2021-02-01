import React from "react";
import Login from "./Login";
import useLogin from "../../hooks/useLogin";

const LoginContainer = () => {
  const { login, loading, data } = useLogin();

  const [credential, setCredential] = React.useState({
    username: "",
    password: "",
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login({ variables: { ...credential } });
  };
  return (
    <Login
      credential={credential}
      handleOnchange={handleOnchange}
      handleSubmit={handleSubmit}
      loading={loading}
      data={data}
    />
  );
};

export default LoginContainer;
