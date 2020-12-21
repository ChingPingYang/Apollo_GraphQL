import { gql } from "@apollo/client";

export const GET_USER = gql`
  query {
    user {
      username
      id
      email
      createdAt
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
        id
        username
        createdAt
        token
      }
    }
  }
`;

export const GET_USERS = gql`
  query {
    users {
      username
      id
    }
  }
`;
