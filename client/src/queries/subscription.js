import { gql } from "@apollo/client";

export const MESSAGE_SENT = gql`
  subscription {
    messageSent {
      id
      from
      to
      content
      createdAt
    }
  }
`;
