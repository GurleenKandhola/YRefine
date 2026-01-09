const axios = require("axios");

async function youtubeSearch({ q, maxResults, order }) {
  const key = process.env.YOUTUBE_API_KEY;
  if (!key) {
    throw new Error("Missing YOUTUBE_API_KEY in .env");
  }

  const url = "https://www.googleapis.com/youtube/v3/search";

  const res = await axios.get(url, {
    params: {
      part: "snippet",
      q,
      type: "video",
      maxResults,
      order,
      key,
    },
  });

  // Return only clean, useful fields to the frontend
  const items = (res.data.items || []).map((it) => ({
    videoId: it.id?.videoId,
    title: it.snippet?.title,
    channelTitle: it.snippet?.channelTitle,
    publishedAt: it.snippet?.publishedAt,
    thumbnail: it.snippet?.thumbnails?.medium?.url,
  }));

  return { query: q, count: items.length, items };
}

module.exports = { youtubeSearch };
