const JWT = require("jsonwebtoken");

exports.verifyJWT = (req) => {
  let token = null;
  if (!req.headers[`auth-token`]) return { message: "No token provided" };
  token = req.headers[`auth-token`];
  try {
    const decoded = JWT.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    return { message: "Token is not valid" };
  }
};
