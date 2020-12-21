import React, { useEffect } from "react";
import { AuthContext } from "../../util/AuthContext";
import { useLazyQuery, useQuery } from "@apollo/client";
import { GET_USERS } from "../../queries/query";

const Home = () => {
  // Use "useLazyQuery" to avoid React error:
  /*Warning: Can't perform a React state update on an unmounted component. This is a
    no-op, but it indicates a memory leak in your application. To fix, cancel all
    subscriptions and asynchronous tasks in a useEffect cleanup function. */
  const [getUsers, { loading, error, data }] = useLazyQuery(GET_USERS);

  // Execute "useLazyQuery" in the uesEffect to avoid error.
  useEffect(() => {
    getUsers(GET_USERS);
  }, [getUsers]);

  if (loading) return <h1>Fetching data....</h1>;
  if (error) return <h1>Failed to authorize user</h1>;

  return (
    <div>
      <h1>Home</h1>
      {data?.users.map((user) => (
        <h1 key={user.id}>{user.username}</h1>
      ))}
    </div>
  );
};
export default Home;
