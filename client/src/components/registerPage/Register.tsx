import React from "react";
import { Link } from "react-router-dom";
import { Button, Box, Grid, makeStyles, Typography } from "@material-ui/core";
import Input from "../share-components/Input";
import { InputError } from "../../types/types";

interface RegisterProps {
  credential: {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  handleOnchange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleError: (e: React.FocusEvent<HTMLInputElement>) => void;
  errorState: {
    username: InputError;
    email: InputError;
    password: InputError;
    confirmPassword: InputError;
  };
  data: any;
  loading: boolean;
  disable: boolean;
}

const Register: React.FC<RegisterProps> = ({
  credential,
  handleOnchange,
  handleSubmit,
  handleError,
  errorState,
  data,
  loading,
  disable,
}) => {
  const classes = useStyle();

  return (
    <Box className={classes.root}>
      <form className={classes.form} onSubmit={handleSubmit} autoComplete="off">
        <Grid container direction="column" justify="center" spacing={2}>
          <Grid item>
            <Input
              name="username"
              type="text"
              label="Username"
              variant="outlined"
              onChange={handleOnchange}
              handleError={handleError}
              errorState={errorState.username}
              value={credential.username}
            />
          </Grid>
          <Grid item>
            <Input
              name="email"
              type="email"
              label="Email"
              variant="outlined"
              onChange={handleOnchange}
              handleError={handleError}
              errorState={errorState.email}
              value={credential.email}
            />
          </Grid>
          <Grid item>
            <Input
              name="password"
              type="password"
              label="Password"
              variant="outlined"
              onChange={handleOnchange}
              handleError={handleError}
              errorState={errorState.password}
              value={credential.password}
            />
          </Grid>
          <Grid item>
            <Input
              name="confirmPassword"
              type="password"
              label="Confirm Password"
              variant="outlined"
              onChange={handleOnchange}
              handleError={handleError}
              errorState={errorState.confirmPassword}
              value={credential.confirmPassword}
            />
          </Grid>
        </Grid>
        <Typography variant="caption" display="block" color="textSecondary">
          Already have an account? <Link to="/login">login</Link>
        </Typography>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={disable}
        >
          submit
        </Button>
      </form>

      {loading && <h1>Loading</h1>}
      {data?.register.errors.length > 0 &&
        data.register.errors.map((error: any, index: number) => (
          <h1 key={index}>{error.message}</h1>
        ))}
    </Box>
  );
};

const useStyle = makeStyles((theme) => ({
  root: {
    padding: "100px 0px",
    width: "100%",
    display: "flex",
    justifyContent: "center",
  },
  form: {
    position: "relative",
    display: "block",
    width: "700px",
    height: "50%",
    padding: "50px",
    backgroundColor: "white",
  },
}));

export default Register;
