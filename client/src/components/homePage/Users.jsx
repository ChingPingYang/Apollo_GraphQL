import React, { useContext, useEffect } from "react";
import { MessageContext } from "../../util/MessageContext";
import { ACTION_MESSAGE } from "../../util/MessageReducer";

import { useLazyQuery } from "@apollo/client";
import { GET_USERS, GET_MESSAGES } from "../../queries/query";

const Users = () => {
  const { messageState, messageDispatch } = useContext(MessageContext);

  // Use "useLazyQuery" to avoid React error:
  /*Warning: Can't perform a React state update on an unmounted component. This is a
    no-op, but it indicates a memory leak in your application. To fix, cancel all
    subscriptions and asynchronous tasks in a useEffect cleanup function. */
  const [getUsers, { loading, error, data }] = useLazyQuery(GET_USERS, {
    onCompleted: (data) => {
      messageDispatch({
        type: ACTION_MESSAGE.GET_USERS_SUCCESS,
        payload: data.users,
      });
    },
    onError: (error) => {
      messageDispatch({
        type: ACTION_MESSAGE.GET_USERS_FAILED,
        payload: error.graphQLErrors,
      });
    },
  });

  // Execute "useLazyQuery" in the uesEffect to avoid error.
  useEffect(() => {
    getUsers(GET_USERS);
  }, [getUsers]);

  const [getMessages, _] = useLazyQuery(GET_MESSAGES, {
    onCompleted: (data) => {
      messageDispatch({
        type: ACTION_MESSAGE.GET_MESSAGES_SUCCESS,
        payload: data.getMessages,
      });
    },
    onError: (error) => {
      messageDispatch({
        type: ACTION_MESSAGE.GET_MESSAGES_FAILED,
        payload: error.graphQLErrors,
      });
    },
    fetchPolicy: "no-cache",
  });

  const handleSelectUser = (userId) => {
    messageDispatch({
      type: ACTION_MESSAGE.CHANGE_SELECTED_USER,
      payload: userId,
    });
  };

  useEffect(() => {
    if (messageState.selectedUser) {
      getMessages({ variables: { from: messageState.selectedUser } });
    }
  }, [messageState.selectedUser]);

  if (loading) return <h1>Loading users...</h1>;

  return (
    <div>
      {messageState.users?.map((user) => (
        <h1
          key={user.id}
          style={{ border: "solid 1px red", cursor: "pointer" }}
          onClick={() => handleSelectUser(user.id)}
        >
          {user.username}
        </h1>
      ))}
    </div>
  );
};
export default Users;
