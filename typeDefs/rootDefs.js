const { gql } = require("apollo-server");

// Query doesn't need to user exclamation mark, cuz it might not return anything
exports.typeDefs = gql`
  type User {
    id: ID
    username: String!
    email: String!
    password: String!
    token: String
    createdAt: String
  }

  type Message {
    id: ID!
    content: String!
    from: ID!
    to: ID!
    createdAt: String
  }

  type Error {
    message: String!
  }
  type AuthResponse {
    ok: Boolean
    errors: [Error]
    user: User
  }

  type Query {
    user: User
    users: [User]
    login(username: String!, password: String!): AuthResponse!

    getMessages(from: ID!): [Message]!
  }

  type Mutation {
    register(
      username: String!
      email: String!
      password: String!
      confirmPassword: String!
    ): AuthResponse!

    sendMessage(content: String!, to: ID!): Message!
  }

  type Subscription {
    messageSent: Message!
  }
`;
