const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const path = require("path");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Prisma Client
const prisma = require("./prisma");

// Token middleware check function
const verifyToken = require("./controllers/verifyToken");

// Routes
const signupRoute = require("./routes/signupRoute");
const loginRoute = require("./routes/loginRoute");
const dashboardRoute = require("./routes/dashboardRoute");
const aboutMeRoute = require("./routes/aboutMeRoute");

const corsOptions = {
  origin: "http://localhost:3000",
  methods: ["GET", "POST", "DELETE", "PUT", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true,
};

// Parsing middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// relative path options and cors options middleware
app.options("*", cors(corsOptions));
app.use(express.static(path.join(__dirname, "../frontend/build")));

// Test route
app.get("/test", (req, res) => {
  res.json({ message: "Test successful" });
});

// Sign up route
app.use("/api/signup", signupRoute);

// Login route
app.use("/api/login", loginRoute);

// Dashboard route
app.use("/api/dashboard", verifyToken, dashboardRoute);

// About me route
app.use("/api/about-me", verifyToken, aboutMeRoute);

// Main react route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/build", "index.html"));
});

// listen method
app.listen(process.env.BACKEND_PORT, () => {
  console.log(`listening on port ${process.env.BACKEND_PORT}`);
});
