const Router = require("express").Router();
const { body, validationResult } = require("express-validator");
const prisma = require("../prisma");
const bcrypt = require("bcryptjs");

Router.post(
  "/",
  [
    body("firstName")
      .notEmpty()
      .withMessage("First name is empty")
      .isLength({ min: 2, max: 14 })
      .withMessage("First name must be between 2 and 14 characters"),
    body("lastName")
      .notEmpty()
      .withMessage("Last name is empty")
      .isLength({ min: 2, max: 14 })
      .withMessage("Last name must be between 2 and 14 characters"),
    body("username")
      .notEmpty()
      .withMessage("Username is empty")
      .isLength({ min: 3, max: 6 })
      .withMessage("Username must be between 3 and 6 characters"),
    body("password")
      .notEmpty()
      .withMessage("Password is empty")
      .isLength({ min: 6, max: 20 })
      .withMessage("Password must contain 6 characters or more")
      .isStrongPassword()
      .withMessage("Password not strong enough"),
  ],
  async (req, res, next) => {
    const { firstName, lastName, username, password } = req.body;

    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
      });
    }

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
  }
);

module.exports = Router;
