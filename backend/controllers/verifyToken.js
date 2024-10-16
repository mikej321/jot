const { verify } = require("jsonwebtoken");

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) console.log("Token received successfully", token);

  // A check to see if the token exists
  // If it's not undefined, it will be attached to the request and proceed
  if (token !== undefined) {
    req.token = token;
    next();
  } else {
    return res.status(403).json({ message: "Token is undefined" });
  }
};

module.exports = verifyToken;
