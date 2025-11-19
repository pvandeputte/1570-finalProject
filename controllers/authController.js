const User = require("../models/User");

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ email }))
    return res.send("Email already registered.");

  const user = await User.create({ name, email, password });
  req.session.user = user;

  res.redirect("/home");
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.send("Invalid login.");

  const match = await user.comparePassword(password);
  if (!match) return res.send("Wrong password.");

  req.session.user = user;
  res.redirect("/home");
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect("/");
};
