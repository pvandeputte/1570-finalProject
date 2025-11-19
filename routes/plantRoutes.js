const router = require("express").Router();
const plant = require("../controllers/plantController");

router.get("/", plant.listPlants);
router.get("/saved", plant.savedPlants);
router.get("/search", plant.searchPlant);
router.get("/region", plant.regionPlants);
router.post("/add", plant.addPlant);
router.post("/save", plant.savePlantFromSearch);
router.delete("/:id", plant.deletePlant);

module.exports = router;
