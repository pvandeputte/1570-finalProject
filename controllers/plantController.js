const Plant = require("../models/Plant");
const { getPlantByName, getPlantsByRegion } = require("../config/perenualApi");

exports.listPlants = async (req, res) => {
  res.sendFile("home.html", { root: "views" });
};

exports.savedPlants = async (req, res) => {
  const plants = await Plant.find({ owner: req.session.user._id });
  res.json(plants);
};

exports.searchPlant = async (req, res) => {
  const results = await getPlantByName(req.query.q || "");
  res.json(results);
};

exports.regionPlants = async (req, res) => {
  const { lat, lon } = req.query;
  const results = await getPlantsByRegion(lat, lon);
  res.json(results);
};

exports.addPlant = async (req, res) => {
  const plant = new Plant({
    name: req.body.name,
    sunlight: req.body.sunlight,
    watering: req.body.watering,
    soil: req.body.soil,
    owner: req.session.user._id,
  });
  await plant.save();
  res.redirect("/home");
};

exports.savePlantFromSearch = async (req, res) => {
  const plant = new Plant({
    name: req.body.name,
    sunlight: req.body.sunlight || "",
    watering: req.body.watering || "",
    owner: req.session.user._id,
  });
  await plant.save();
  res.json({ success: true });
};

exports.deletePlant = async (req, res) => {
  await Plant.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
