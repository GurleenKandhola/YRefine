export function rankVideos(videos, query) {
  const keywords = query.toLowerCase().split(" ");

  return videos
    .map(video => {
      let score = 0;

      const title = video.title.toLowerCase();
      const description = video.description?.toLowerCase() || "";
      const transcript = video.transcript?.toLowerCase() || "";

      keywords.forEach(keyword => {
        if (title.includes(keyword)) score += 5;
        if (description.includes(keyword)) score += 3;
        if (transcript.includes(keyword)) score += 10; // 🔥 strongest signal
      });

      return { ...video, score };
    })
    .sort((a, b) => b.score - a.score);
}
