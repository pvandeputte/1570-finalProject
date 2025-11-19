const router = require("express").Router();
const user = require("../controllers/userController");

router.post("/update", user.updateUser);

module.exports = router;
