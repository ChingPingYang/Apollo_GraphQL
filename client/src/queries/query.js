import { gql } from "@apollo/client";

export const GET_USER = gql`
  query($id: ID!) {
    user(id: $id) {
      username
    }
  }
`;

export const LOGIN_USER = gql`
  query($username: String!, $password: String!) {
    login(username: $username, password: $password) {
      ok
      errors {
        message
      }
      user {
        username
        createdAt
        token
      }
    }
  }
`;
