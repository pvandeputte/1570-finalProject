const User = require("../models/User");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  const exists = await User.findOne({ email });
  if (exists) return res.send("User already exists!");

  const user = new User({ name, email, password });
  await user.save();

  req.session.user = user;
  res.redirect("/home");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("Invalid login");

  const match = await user.comparePassword(password);
  if (!match) return res.send("Wrong password");

  req.session.user = user;
  res.redirect("/home");
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};

