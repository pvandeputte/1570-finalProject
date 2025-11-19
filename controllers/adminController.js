const User = require("../models/User");
const Plant = require("../models/Plant");

exports.adminHome = async (req, res) => {
  if (!req.session.user || req.session.user.role !== "admin") {
    return res.send("Unauthorized");
  }

  res.send(`
    <h1>Admin Dashboard</h1>
    <p><a href="/admin/users">Manage Users</a></p>
    <p><a href="/admin/plants">Manage Plants</a></p>
  `);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

exports.getPlants = async (req, res) => {
  const plants = await Plant.find();
  res.json(plants);
};
