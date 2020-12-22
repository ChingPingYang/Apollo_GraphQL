const JWT = require("jsonwebtoken");
const { PubSub } = require("apollo-server");
const pubsub = new PubSub();

exports.verifyJWT = (context) => {
  let token = null;
  context.pubsub = pubsub;

  // 1) Check if token exists and if it's from websocket or HTTP request
  if (context.req && context.req.headers[`auth-token`]) {
    // if it comes here, it's from HTTP
    token = context.req.headers[`auth-token`];
  } else if (context.connection && context.connection.context[`auth-token`]) {
    // if it comes here, it's from websocket
    token = context.connection.context[`auth-token`];
  } else {
    token = { message: "No token provided" };
    context.token = token;
    return context;
  }

  // 2) Verify token
  if (!token.message) {
    try {
      const decoded = JWT.verify(token, process.env.JWT_SECRET);
      context.token = decoded;
    } catch (err) {
      context.token = { message: "Token is not valid" };
    }
  }
  return context;
};
