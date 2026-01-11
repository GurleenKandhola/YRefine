import axios from "axios";
import { rankVideos } from "../utils/rankVideos.js";
import { getTranscript } from "../utils/getTranscript.js";

export const searchVideos = async (req, res) => {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: "Query is required" });
    }

    const ytResponse = await axios.get(
      "https://www.googleapis.com/youtube/v3/search",
      {
        params: {
          part: "snippet",
          q: query,
          maxResults: 10,
          key: process.env.YOUTUBE_API_KEY,
          type: "video"
        }
      }
    );

    const videos = ytResponse.data.items.map(item => ({
      videoId: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      channelTitle: item.snippet.channelTitle,
      thumbnail: item.snippet.thumbnails.medium.url,
      publishedAt: item.snippet.publishedAt
    }));

    // 🔥 Fetch transcripts
    const videosWithTranscript = await Promise.all(
      videos.map(async video => {
        const transcript = await getTranscript(video.videoId);
        return { ...video, transcript };
      })
    );

    const rankedVideos = rankVideos(videosWithTranscript, query);

    res.json({
      query,
      count: rankedVideos.length,
      items: rankedVideos
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server error while searching videos" });
  }
};
