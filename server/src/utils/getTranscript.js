import { YoutubeTranscript } from "youtube-transcript";
import { getCachedTranscript, setCachedTranscript } from "./transcriptCache.js";

export async function getTranscript(videoId) {
  // 1️⃣ Check cache first
  const cached = getCachedTranscript(videoId);
  if (cached) return cached;

  // 2️⃣ Fetch transcript from YouTube
  try {
    const transcriptArray = await YoutubeTranscript.fetchTranscript(videoId);
    const transcriptText = transcriptArray.map(item => item.text).join(" ");

    // 3️⃣ Save to cache
    setCachedTranscript(videoId, transcriptText);

    return transcriptText;
  } catch (error) {
    // Transcript not available
    return "";
  }
}
