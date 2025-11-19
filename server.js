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
