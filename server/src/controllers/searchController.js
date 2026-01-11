const axios = require("axios");
const { rankVideos } = require("../utils/rankVideos");

const searchVideos = async (req, res) => {
  const q = req.query.q;

  try {
    const response = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q,
          maxResults: 12,
          type: "video",
          key: process.env.YOUTUBE_API_KEY,
        },
      }
    );

    // Normalize YouTube response
    const videos = response.data.items.map((item) => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      channelTitle: item.snippet.channelTitle,
      publishedAt: item.snippet.publishedAt,
      thumbnail: item.snippet.thumbnails.medium.url,
    }));

    // 🔥 APPLY RANKING HERE
    const rankedVideos = rankVideos(videos, q);

    res.json({
      query: q,
      count: rankedVideos.length,
      items: rankedVideos,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while searching videos" });
  }
};

module.exports = { searchVideos };
