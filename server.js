require("dotenv").config();
const { ApolloServer } = require("apollo-server");
const PORT = process.env.PORT || 8000;
const { connectDB } = require("./config/db");
const { typeDefs } = require("./typeDefs/root");
const { resolvers } = require("./resolvers/rootResolver");

//connect to MongoDB Atlas
connectDB();

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen(PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
