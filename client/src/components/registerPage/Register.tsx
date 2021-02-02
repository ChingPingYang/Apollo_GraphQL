import React from "react";
import { Link } from "react-router-dom";
// import useRegister from "../../hooks/useRegister";
import { Button } from "@material-ui/core";

interface RegisterProps {
  credential: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  data: any;
  loading: boolean;
}

const Register: React.FC<RegisterProps> = ({
  credential,
  handleOnchange,
  handleSubmit,
  data,
  loading,
}) => {
  // const { register, data, loading } = useRegister();

  // const [credential, setCredential] = useState({
  //   username: "",
  //   email: "",
  //   password: "",
  //   confirmPassword: "",
  // });
  // const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   setCredential({ ...credential, [e.target.id]: e.target.value });
  // };
  // const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   register({ variables: { ...credential } });
  // };
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
        <Button type="submit">submit</Button>
        <div>
          <small>
            Have an account?<Link to="/login">Login</Link>
          </small>
        </div>
      </form>
      {loading ? <h1>Loading</h1> : <h1>Done</h1>}
      {data?.register.errors.length > 0 &&
        data.register.errors.map((error: any, index: number) => (
          <h1 key={index}>{error.message}</h1>
        ))}
    </>
  );
};

export default Register;
