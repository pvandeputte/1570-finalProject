const express = require("express");
const mongoose = require("mongoose");
const session = require("express-session");
const path = require("path");

require("dotenv").config();

const mainRoutes = require("./routes/mainRoutes");
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Session middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret123",
    resave: false,
    saveUninitialized: false,
  })
);

// Parse requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("public"));
app.use("/images", express.static(path.join(__dirname, "public/images")));

// Views folder
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", mainRoutes);
app.use("/", authRoutes);
app.use("/plants", plantRoutes);
app.use("/users", userRoutes);

// Connect MongoDB
require("./config/db")();

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
