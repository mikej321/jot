const { verify } = require("jsonwebtoken");
require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    verify(token, process.env.SECRET_KEY, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Token is invalid or expired" });
      }

      req.userId = decoded.id;

      next();
    });
  } else {
    return res.status(403).json({ message: "Token is undefined" });
  }
};

module.exports = verifyToken;
