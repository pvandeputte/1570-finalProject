const router = require("express").Router();
const home = require("../controllers/homeController");

router.get("/", home.getIndex);
router.get("/home", home.getHome);
router.get("/profile", home.getProfile);

module.exports = router;
