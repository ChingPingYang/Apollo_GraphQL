const JWT = require("jsonwebtoken");

exports.verifyJWT = (context) => {
  let token = null;
  if (!context.req.headers[`auth-token`]) {
    token = { message: "No token provided" };
    context.token = token;
    return context;
  }
  token = context.req.headers[`auth-token`];
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    context.token = decoded;
    return context;
  } catch (err) {
    token = { message: "Token is not valid" };
    context.token = decoded;
    return context;
  }
};
