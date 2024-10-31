const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");
const { body, validationResult } = require("express-validator");
require("dotenv").config();

// Token middleware check function
const verifyToken = require("../controllers/verifyToken");

Router.post("/", (req, res) => {
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

/* Figure out why the jot is not adding with the userId and id tomorrow. See if it
comes from verifyToken like it's supposed to and if it's not, see if there's another
way to send the user's id to the backend */

Router.post(
  "/jot-add",
  [
    body("title")
      .notEmpty()
      .withMessage("Please add a title to your jot")
      .isLength({ min: 2, max: 20 }),
    body("content").notEmpty().withMessage("Please add content to your jot"),
  ],
  verifyToken,
  async (req, res) => {
    const { title, content } = req.body;
    const validationErrors = validationResult(req);

    if (!validationErrors.isEmpty()) {
      return res.status(400).json({
        errors: validationErrors.array(),
      });
    }

    if (!title) {
      return res
        .status(403)
        .json({ message: "Please enter a title before continuing" });
    } else if (!content) {
      return res
        .status(403)
        .json({ message: "Please enter content before continuing" });
    }

    try {
      const newJot = await prisma.jots.create({
        data: {
          title,
          content,
          userId: req.userId,
        },
        include: {
          user: true,
        },
      });
      res.json({
        newJot,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error creating jot" });
    }
  }
);

Router.get("/get-jots", verifyToken, async (req, res) => {
  try {
    const jots = await prisma.jots.findMany({
      where: {
        userId: req.userId,
      },
    });
    res.json({
      jots,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error retrieving jots" });
  }
});

Router.delete("/delete-jot/:id", verifyToken, async (req, res) => {
  try {
    const jotId = req.params.id; // Access the ID from the URL parameters

    const deletedJot = await prisma.jots.delete({
      where: {
        id: parseInt(jotId),
      },
    });

    res.json({ message: "Jot deleted successfully", deletedJot });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error deleting jot" });
  }
});

Router.put("/edit-jot-title/:id", verifyToken, async (req, res) => {
  try {
    const jotId = req.params.id;
    const { title } = req.body;

    const jotToUpdate = await prisma.jots.update({
      where: {
        id: parseInt(jotId),
      },
      data: {
        title,
      },
    });
    res.json({
      jotToUpdate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error editing jot title" });
  }
});

Router.put("/edit-jot-content/:id", verifyToken, async (req, res) => {
  try {
    const jotId = req.params.id;
    const { content } = req.body;

    const jotToUpdate = await prisma.jots.update({
      where: {
        id: parseInt(jotId),
      },
      data: {
        content,
      },
    });
    res.json({
      jotToUpdate,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error editing jot content" });
  }
});

module.exports = Router;
