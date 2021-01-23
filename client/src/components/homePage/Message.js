import React, { useContext } from "react";
import { AuthContext } from "../../util/AuthContext";
import moment from "moment";

export default function Message({ message }) {
  const {
    state: { user },
  } = useContext(AuthContext);

  const fromUser = user.id === message.from;

  const userText = {
    border: "solid 1px red",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
  };
  const senderText = {
    border: "solid 1px red",
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
  };

  return (
    <div style={fromUser ? userText : senderText}>
      <h4>{message.content}</h4>
      <h6>{moment(message.createdAt).format("MMMM DD, YYYY @ h:mm a")}</h6>
      <Form value="10">{(value) => <h1>{value}</h1>}</Form>
    </div>
  );
}
const Form = (props) => {
  return props.children(props.value);
};
