import React, { useContext, useState } from "react";
import { MessageContext } from "../../util/MessageContext";
import { SEND_MESSAGE } from "../../queries/mutation";
import { useMutation } from "@apollo/client";

import Message from "./Message";

export default function Messages() {
  const { messageState } = useContext(MessageContext);
  const [message, setMessage] = useState("");

  const [sendMessage] = useMutation(SEND_MESSAGE, {
    onError: (error) => {
      console.log(error);
    },
  });

  const handleSubmit = (e, userId) => {
    e.preventDefault();
    if (message.trim() !== "" && messageState.selectedUser) {
      sendMessage({ variables: { content: message, to: userId } });
      setMessage("");
    }
  };
  if (!messageState.selectedUser) return <h1>Choose a person chat.</h1>;
  return (
    <div>
      <div
        style={{
          border: "solid 1px blue",
          width: "700px",
          height: "400px",
          padding: "20px",
          overflow: "scroll",
        }}
      >
        {messageState.messages.length ? (
          messageState.messages.map((message) => (
            <Message key={message.id} message={message} />
          ))
        ) : (
          <h2>Start a conversation with this user.</h2>
        )}
      </div>
      <form
        style={{
          width: "700px",
          height: "100px",
          border: "solid 1px blue",
          padding: "20px",
        }}
        onSubmit={(e) => handleSubmit(e, messageState.selectedUser)}
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">SEND</button>
      </form>
    </div>
  );
}
