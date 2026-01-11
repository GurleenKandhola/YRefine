import { YoutubeTranscript } from "youtube-transcript";

export async function getTranscript(videoId) {
  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId);

    // Convert transcript array to plain text
    return transcript.map(item => item.text).join(" ");
  } catch (error) {
    // Transcript not available (very common)
    return "";
  }
}
