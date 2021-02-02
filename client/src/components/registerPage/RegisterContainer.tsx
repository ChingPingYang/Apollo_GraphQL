import React from "react";
import Register from "./Register";
import useRegister from "../../hooks/useRegister";

const RegisterContainer = () => {
  const { register, data, loading } = useRegister();

  const [credential, setCredential] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential({ ...credential, [e.target.id]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    register({ variables: { ...credential } });
  };
  return (
    <Register
      credential={credential}
      handleOnchange={handleOnchange}
      handleSubmit={handleSubmit}
      data={data}
      loading={loading}
    />
  );
};
export default RegisterContainer;
