import React, { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";
import moment from "moment";
import { MessageType } from "../../types/graphQLTypes";

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const {
    state: { user },
  } = useContext(AuthContext);

  const fromUser = user!.id === message.from;

  const userText: {} = {
    border: "solid 1px red",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  };
  const senderText: {} = {
    border: "solid 1px red",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  return (
    <div style={fromUser ? userText : senderText}>
      <h4>{message.content}</h4>
      <h6>{moment(message.createdAt).format("MMMM DD, YYYY @ h:mm a")}</h6>
    </div>
  );
};
export default Message;
