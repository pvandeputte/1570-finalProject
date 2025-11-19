const mongoose = require("mongoose");

const PlantSchema = new mongoose.Schema({
  name: String,
  sunlight: String,
  watering: String,
  soil: String,
  days_to_grow: Number,
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

module.exports = mongoose.model("Plant", PlantSchema);
