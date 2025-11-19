const router = require("express").Router();
const plant = require("../controllers/plantController");

// List user's plants (Saved Plants tab)
router.get("/", plant.listPlants);

// Add a plant manually
router.post("/add", plant.addPlant);

// Search plant (Perenual API)
router.get("/search", plant.searchPlant);

// Region-based recommendations (latitude & longitude)
router.get("/region", plant.regionPlants);

// Save plant from search results
router.post("/save", plant.savePlantFromSearch);

// Get saved plants as JSON (for the "Your Plants" tab)
router.get("/saved", plant.savedPlants);

// Delete a saved plant
router.delete("/:id", plant.deletePlant);

module.exports = router;
