import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../util/AuthContext";
import { MessageContext } from "../../util/MessageContext";
import { ACTION_MESSAGE } from "../../types/types";
import { useSubscription } from "@apollo/client";
import { MESSAGE_SENT } from "../../queries/subscription";

import Users from "./Users";
import Messages from "./Messages";

const Home: React.FC = () => {
  const { state } = useContext(AuthContext);
  const { messageDispatch } = useContext(MessageContext);

  // For receiving websocket message and updating message context.
  const { data, error } = useSubscription(MESSAGE_SENT);
  useEffect(() => {
    if (data) {
      messageDispatch({
        type: ACTION_MESSAGE.SEND_MESSAGE,
        payload: data.messageSent,
      });
    }
  }, [data, error]);

  if (!state.user) return <h1>Please log in first.</h1>;
  return (
    <div>
      <div style={{ display: "flex" }}>
        <div style={{ border: "solid 1px red", width: "200px" }}>
          <Users />
        </div>
        <Messages />
      </div>
    </div>
  );
};
export default Home;
