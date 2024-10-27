const Router = require("express").Router();
const jwt = require("jsonwebtoken");
const prisma = require("../prisma");
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

Router.post("/title-add", verifyToken, async (req, res) => {
  const { title, blockChoice } = req.body;

  if (!title) return res.status(403).json({ message: "Title not added" });

  try {
    let createdTitleForJot = await prisma.jots.create({
      data: {
        title: title,
        category: blockChoice,
        userId: req.userId,
      },
      include: {
        user: true,
      },
    });

    res.json({
      createdTitleForJot,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating jot" });
  }
});

/* Figure out why the jot is not adding with the userId and id tomorrow. See if it
comes from verifyToken like it's supposed to and if it's not, see if there's another
way to send the user's id to the backend */

Router.post("/jot-add", verifyToken, async (req, res) => {
  const { title, content } = req.body;

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
});

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

module.exports = Router;
