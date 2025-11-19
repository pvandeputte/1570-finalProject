const express = require("express");
const path = require("path");
const session = require("express-session");
const connectDB = require("./config/db");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
connectDB();

// Body parser
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Sessions
app.use(
  session({
    secret: "supersecretkey",
    resave: false,
    saveUninitialized: false,
  })
);

// Static files
app.use(express.static(path.join(__dirname, "public")));

// ROUTES
app.use("/", require("./routes/homeRoutes"));
app.use("/", require("./routes/authRoutes"));
app.use("/plants", require("./routes/plantRoutes"));
app.use("/admin", require("./routes/adminRoutes"));

app.listen(PORT, () =>
  console.log(`🌱 Server running at http://localhost:${PORT}`)
);
// server.js
const express = require("express");
const path = require("path");
const session = require("express-session");
const dotenv = require("dotenv");

dotenv.config();
require("./config/db"); // Connect MongoDB

const app = express();
const PORT = process.env.PORT || 3000;

// ---- Body Parsing ---- //
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ---- Sessions ---- //
app.use(
  session({
    secret: "supersecret",
    resave: false,
    saveUninitialized: false,
  })
);

// ---- Static Files ---- //
// CSS + JS
app.use("/public", express.static(path.join(__dirname, "public")));
// Images
app.use("/images", express.static(path.join(__dirname, "images")));
// Views folder static (styles.css is inside views)
app.use(express.static(path.join(__dirname, "views")));

// ---- ROUTES ---- //
const authRoutes = require("./routes/authRoutes");
const plantRoutes = require("./routes/plantRoutes");
const adminRoutes = require("./routes/adminRoutes");
const homeRoutes = require("./routes/homeRoutes");

app.use("/", authRoutes);
app.use("/home", homeRoutes);
app.use("/plants", plantRoutes);
app.use("/admin", adminRoutes);

// ---- HOME (default login page) ---- //
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

// ---- 404 ---- //
app.use((req, res) => {
  res.status(404).send("Page Not Found");
});

// ---- LISTEN ---- //
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
