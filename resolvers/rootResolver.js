const user = require("./user");
const message = require("./message");

exports.resolvers = {
  Message: {
    createdAt: (parent) => parent.createdAt.toISOString(),
  },
  Query: {
    ...user.Query,
    ...message.Query,
  },

  Mutation: {
    ...user.Mutation,
    ...message.Mutation,
  },
};
