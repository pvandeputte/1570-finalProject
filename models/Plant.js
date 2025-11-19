const mongoose = require("mongoose");

const plantSchema = new mongoose.Schema({
  common_name: String,
  scientific_name: String,
  sunlight: [String],
  watering: String,
  cycle: String,
  image: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("Plant", plantSchema);
