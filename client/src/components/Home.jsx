import React, { useContext } from "react";
import { AuthContext } from "../util/AuthContext";

const Home = () => {
  const { state, dispatch } = useContext(AuthContext);

  return (
    <div>
      <h1>Home</h1>
      {state.user && <h1>{state.user.username}</h1>}
    </div>
  );
};
export default Home;
