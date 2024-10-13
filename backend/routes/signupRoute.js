const Router = require("express").Router();
const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

Router.post("/", async (req, res, next) => {
  const { firstName, lastName, username, password } = req.body;

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
});

// app.post("/signup", async (req, res, next) => {
//     const { username, password } = req.body;

//     const hashedPassword = await bcrypt.hash(password, 10);
//     await prisma.user.create({
//       data: {
//         username,
//         password: hashedPassword,
//       },
//     });

//     res.json({ success: true, message: "Signup successful" });
//   });

module.exports = Router;
