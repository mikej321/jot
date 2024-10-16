const Router = require("express").Router();
const jwt = require("jsonwebtoken");

// Token middleware check function
const verifyToken = require("../controllers/verifyToken");

Router.post("/", verifyToken, (req, res) => {
  const { token } = req;

  if (!token)
    return res.status(403).json({ message: "Token not sent on request" });

  jwt.verify(token, process.env.SECRET_KEY, (err, authData) => {
    if (err)
      return res.status(403).json({ message: "Token not verified properly" });

    res.json({
      message: `${authData.user.username} logged in!`,
      authData,
    });
  });
});

module.exports = Router;
