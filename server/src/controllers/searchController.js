const { youtubeSearch } = require("../services/youtubeService");

async function searchVideos(req, res) {
  try {
    const q = (req.query.q || "").trim();
    if (!q) {
      return res.status(400).json({ error: "Missing query parameter: q" });
    }

    const maxResults = Number(req.query.maxResults || 12);
    const order = req.query.order || "relevance";

    const data = await youtubeSearch({ q, maxResults, order });
    res.json(data);
  } catch (err) {
    console.error(err?.response?.data || err.message);
    res.status(500).json({ error: "Server error while searching videos" });
  }
}

module.exports = { searchVideos };
