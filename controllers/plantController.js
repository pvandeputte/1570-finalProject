const Plant = require("../models/Plant");
const axios = require("axios");
const { getPlantByName } = require("../config/perenualApi");

// --------------------------------------------
// LIST PLANTS FOR LOGGED-IN USER
// --------------------------------------------
exports.listPlants = async (req, res) => {
  if (!req.session.user) return res.redirect("/");

  const plants = await Plant.find({ owner: req.session.user._id });
  res.sendFile("plants/home.html", { root: "views" });
};

// --------------------------------------------
// ADD A PLANT (manual add)
// --------------------------------------------
exports.addPlant = async (req, res) => {
  if (!req.session.user) return res.redirect("/");

  const { name, sunlight, watering, soil, days } = req.body;

  const plant = new Plant({
    name,
    sunlight,
    watering,
    soil,
    days_to_grow: days,
    owner: req.session.user._id,
  });

  await plant.save();
  res.redirect("/home");
};

// --------------------------------------------
// SEARCH PLANT BY NAME (Perenual API)
// --------------------------------------------
exports.searchPlant = async (req, res) => {
  try {
    const q = req.query.q;
    if (!q) return res.json({ error: "Missing search query" });

    const results = await getPlantByName(q);
    res.json(results);
  } catch (err) {
    console.error("Search error:", err);
    res.json({ error: "API lookup failed" });
  }
};

// --------------------------------------------
// GET REGION-BASED PLANT RECOMMENDATIONS
// --------------------------------------------
exports.regionPlants = async (req, res) => {
  try {
    const { lat, lon } = req.query;

    if (!lat || !lon) {
      return res.json({ error: "Missing coordinates" });
    }

    const url = `https://perenual.com/api/species-list?key=${process.env.PERENUAL_KEY}&lat=${lat}&lon=${lon}`;

    const apiRes = await axios.get(url);

    res.json(apiRes.data);
  } catch (err) {
    console.error("Region API error:", err);
    res.json({ error: "Failed to fetch region plants" });
  }
};

// --------------------------------------------
// SAVE A PLANT FROM LOOKUP RESULTS
// --------------------------------------------
exports.savePlantFromSearch = async (req, res) => {
  if (!req.session.user) return res.redirect("/");

  const { name, sunlight, watering, soil } = req.body;

  const plant = new Plant({
    name,
    sunlight: sunlight || "N/A",
    watering: watering || "N/A",
    soil: soil || "N/A",
    owner: req.session.user._id,
  });

  await plant.save();
  res.json({ success: true });
};

// --------------------------------------------
// RETURN USER'S SAVED PLANTS (JSON for home tabs)
// --------------------------------------------
exports.savedPlants = async (req, res) => {
  if (!req.session.user) return res.json([]);

  const plants = await Plant.find({ owner: req.session.user._id });
  res.json(plants);
};

// --------------------------------------------
// DELETE A PLANT (CRUD)
// --------------------------------------------
exports.deletePlant = async (req, res) => {
  if (!req.session.user) return res.redirect("/");

  await Plant.deleteOne({
    _id: req.params.id,
    owner: req.session.user._id,
  });

  res.json({ success: true });
};
