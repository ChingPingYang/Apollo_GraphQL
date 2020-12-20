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
      }
    }
  }
`;
