import React from "react";
import Register from "./Register";
import useRegister from "../../hooks/useRegister";

const RegisterContainer = () => {
  const { register, data, loading } = useRegister();
  // Input state
  const [credential, setCredential] = React.useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  // Error state
  const [errorState, setErrorState] = React.useState({
    username: {
      error: false,
      helperText: "Username has to be at lease 2 characters long.",
    },
    email: { error: false, helperText: "Please insert a valid email." },
    password: {
      error: false,
      helperText: "Password has to be 4-16 characters long.",
    },
    confirmPassword: { error: false, helperText: "Password not matched" },
  });
  // Submit button state
  const [disable, setDisable] = React.useState(true);
  React.useEffect(() => {
    const allInputHasValue = Object.values(credential).every(
      (input) => input.length > 0
    );
    if (allInputHasValue) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [credential]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredential({ ...credential, [e.target.name]: e.target.value });
  };

  // Checking input when input is out of focus
  const handleError = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name } = e.target;
    let reg;
    let result: boolean;
    switch (name) {
      case "username":
        reg = /^[\w]{2,}$/;
        result = reg.test(credential.username);
        if (!result) {
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
        reg = /^([a-z\d\.-]+)@([a-z\d]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
        result = reg.test(credential.email);
        if (!result) {
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

      case "password":
        reg = /^[\w\+\!\@\#\$\%\^\&\*-]{4,16}$/;
        result = reg.test(credential.password);
        if (!result) {
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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const noError = Object.values(errorState).every(
      (error) => error.error === false
    );

    if (noError) {
      register({ variables: { ...credential } });
      // This is for websocket to work... it will not work if we don't refresh when we register
      window.location.href = "/";
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
      disable={disable}
    />
  );
};
export default RegisterContainer;
