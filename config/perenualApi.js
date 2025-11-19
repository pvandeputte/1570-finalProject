const axios = require("axios");

const API_KEY = process.env.PERENUAL_API_KEY;

exports.getPlantByName = async (name) => {
  const url = `https://perenual.com/api/species-list?key=${API_KEY}&q=${name}`;
  const res = await axios.get(url);
  return res.data.data || [];
};

exports.getPlantsByRegion = async (lat, lon) => {
  const url = `https://perenual.com/api/species-list?key=${API_KEY}&indoor=0&hardiness=7`;
  const res = await axios.get(url);
  return res.data.data || [];
};
