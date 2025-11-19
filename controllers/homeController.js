exports.getIndex = (req, res) => {
  res.sendFile("index.html", { root: "views" });
};

exports.getHome = (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.sendFile("home.html", { root: "views" });
};

exports.getProfile = (req, res) => {
  if (!req.session.user) return res.redirect("/");
  res.sendFile("profile.html", { root: "views" });
};
