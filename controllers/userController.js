const User = require("../models/User");

exports.updateUser = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await User.findById(req.session.user._id);

  user.name = name;
  user.email = email;

  if (password && password.length >= 8) {
    user.password = password;
  }

  await user.save();
  req.session.user = user;

  res.redirect("/profile");
};
