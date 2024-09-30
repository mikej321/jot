const express = require("express");
const jwt = require("jsonwebtoken");
const prisma = require("./prisma");
const bcrypt = require("bcryptjs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Prisma Client
const prisma = require("./prisma");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Parsing middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// Middleware for checking the headers for every request made
app.use((req, res, next) => {
  console.log("Request Headers:", req.headers);
  res.on("finish", () => {
    console.log("Response Headers:", res.getHeaders());
  });
  next();
});

// relative path options and cors options middleware
app.options("*", cors(corsOptions));
app.use(express.static(path.join(__dirname, "../frontend/build")));

// middleware function for verifying token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) console.log("Token received successfully", token);

  if (token !== undefined) {
    req.token = token;
    next();
  } else {
    return res.status(403).json({ message: "Token is undefined" });
  }
};

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Test successful" });
});

// Login Route
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  // Validate Password
  const comparison = await bcrypt.compare(password, user.password);
  if (!comparison) {
    return res.status(403).json({ message: "Invalid Password" });
  }

  /* This sign method is just a test. Later on, change the
  secret key to something more appropriate, like a uuid */
  jwt.sign(
    { user },
    process.env.SECRET_KEY,
    { expiresIn: "15m" },
    (err, token) => {
      if (err) {
        return res.status(403).json({ message: "Error when signing token" });
      }

      res.json({
        message: `${user.username} logged in`,
        user,
        token,
      });
    }
  );
});

// Sign up route
app.post("/api/signup", async (req, res, next) => {
  const { username, password } = req.body;

  const hashedPassword = await bcrypt.hash(password, 10);
  await prisma.user.create({
    data: {
      username,
      password: hashedPassword,
    },
  });

  res.json({ success: true, message: "Signup successful" });
});

// Main react route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// listen method
app.listen(process.env.BACKEND_PORT, () => {
  console.log(`listening on port ${process.env.BACKEND_PORT}`);
});
