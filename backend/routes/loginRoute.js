const jwt = require("jsonwebtoken");
const Router = require("express").Router();

Router.post("/", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  // Add error messages later for user to visually see
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Validate Password
  const comparison = await bcrypt.compare(password, user.password);
  if (!comparison) {
    return res.status(403).json({ message: "Invalid Password" });
  }

  jwt.sign({ user }, process.env.SECRET_KEY, (err, token) => {
    if (err) {
      return res.status(403).json({ message: "Error when signing token" });
    }

    // signs and sends the token to the frontend with user and message attached
    res.json({
      message: `${user.username} logged in`,
      user,
      token,
    });
  });
});

module.exports = Router;
