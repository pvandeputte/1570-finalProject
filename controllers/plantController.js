const Plant = require("../models/Plant");
const { searchPlants, regionPlants } = require("../config/perenualApi");

exports.search = async (req, res) => {
  const results = await searchPlants(req.query.q);
  res.json(results);
};

exports.region = async (req, res) => {
  const { lat, lon } = req.query;
  const results = await regionPlants(lat, lon);
  res.json(results);
};

exports.savePlant = async (req, res) => {
  const plant = await Plant.create({
    ...req.body,
    owner: req.session.user._id,
  });

  res.json({ success: true, plant });
};

exports.getSaved = async (req, res) => {
  const plants = await Plant.find({ owner: req.session.user._id });
  res.json(plants);
};

exports.deletePlant = async (req, res) => {
  await Plant.findByIdAndDelete(req.params.id);
  res.json({ success: true });
};
