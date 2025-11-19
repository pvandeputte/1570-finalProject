const axios = require("axios");

const API_KEY = process.env.PERENUAL_API_KEY;

exports.searchPlants = async (query) => {
  const url = `https://perenual.com/api/species-list?key=${API_KEY}&q=${query}`;
  const { data } = await axios.get(url);

  return (data?.data || []).map((p) => ({
    common_name: p.common_name || "Unknown",
    scientific_name: p.scientific_name?.[0] || "N/A",
    sunlight: p.sunlight || [],
    watering: p.watering || "N/A",
    cycle: p.cycle || "N/A",
    image: p.default_image?.medium_url || "",
  }));
};

exports.regionPlants = async (lat, lon) => {
  const url = `https://perenual.com/api/species-list?key=${API_KEY}&indoor=0`;
  const { data } = await axios.get(url);

  return (data?.data || []).slice(0, 10).map((p) => ({
    common_name: p.common_name || "Unknown",
    scientific_name: p.scientific_name?.[0] || "N/A",
    image: p.default_image?.medium_url,
  }));
};
