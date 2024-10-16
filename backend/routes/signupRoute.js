const Router = require("express").Router();
const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

Router.post("/", async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: {
        firstName,
        lastName,
        username,
        password: hashedPassword,
      },
    });
    res.json({ success: true, message: "Signup successful" });
  } catch (err) {
    console.error("Error creating user:", err);
    res.status(500).json({ success: false, message: "signup failed" });
  }
});

module.exports = Router;
