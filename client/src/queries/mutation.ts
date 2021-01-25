import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!
  ) {
    register(
      username: $username
      email: $email
      password: $password
      confirmPassword: $confirmPassword
    ) {
      ok
      errors {
        message
      }
      user {
        username
        id
        email
        token
      }
    }
  }
`;

export const SEND_MESSAGE = gql`
  mutation($content: String!, $to: ID!) {
    sendMessage(content: $content, to: $to) {
      id
      from
      to
      content
      createdAt
    }
  }
`;
