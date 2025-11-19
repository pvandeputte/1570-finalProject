const router = require("express").Router();
const admin = require("../controllers/adminController");

router.get("/", admin.adminHome);
router.get("/users", admin.getUsers);
router.get("/plants", admin.getPlants);

module.exports = router;
