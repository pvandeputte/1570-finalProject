const router = require("express").Router();
const plant = require("../controllers/plantController");

router.get("/search", plant.search);
router.get("/region", plant.region);
router.get("/saved", plant.getSaved);
router.post("/save", plant.savePlant);
router.delete("/:id", plant.deletePlant);

module.exports = router;
