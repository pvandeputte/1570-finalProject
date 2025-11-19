const axios = require("axios");

async function getPlantByName(name) {
  const url = `https://perenual.com/api/species-list?key=${process.env.PERENUAL_KEY}&q=${name}`;

  try {
    const res = await axios.get(url);
    return res.data;
  } catch (err) {
    console.error("API error:", err);
    return null;
  }
}

module.exports = { getPlantByName };
