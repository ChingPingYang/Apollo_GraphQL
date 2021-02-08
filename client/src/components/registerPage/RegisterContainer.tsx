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
  const [errorState, setErrorState] = React.useState({
    username: { error: false, helperText: "Username is required" },
    email: { error: false, helperText: "Username is required" },
    password: { error: false, helperText: "Password is required" },
    confirmPassword: { error: false, helperText: "Password not matched" },
  });

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(credential);
    register({ variables: { ...credential } });

    // This is for websocket to work... it will not work if we don't refresh when we register
    // window.location.href = "/";
  };

  // function for checking each field input
  const handleError = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    switch (name) {
      case "username":
      case "password":
        if (value.length <= 0) {
          setErrorState((prev) => ({
            ...prev,
            [name]: { ...prev[name], error: true },
          }));
        } else {
          setErrorState((prev) => ({
            ...prev,
            [name]: { ...prev[name], error: false },
          }));
        }
        break;
      case "email":
        break;

      case "confirmPassword":
        if (credential.password !== credential.confirmPassword) {
          setErrorState((prev) => ({
            ...prev,
            [name]: { ...prev[name], error: true },
          }));
        } else {
          setErrorState((prev) => ({
            ...prev,
            [name]: { ...prev[name], error: false },
          }));
        }
        break;
      default:
        break;
    }
  };

  return (
    <Register
      credential={credential}
      handleOnchange={handleOnchange}
      handleSubmit={handleSubmit}
      handleError={handleError}
      errorState={errorState}
      data={data}
      loading={loading}
    />
  );
};
export default RegisterContainer;
