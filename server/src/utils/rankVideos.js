const rankVideos = (videos, query) => {
  const keywords = query.toLowerCase().split(" ");

  return videos
    .map((video) => {
      let score = 0;
      const title = video.title.toLowerCase();

      keywords.forEach((word) => {
        if (title.includes(word)) score += 2;
      });

      return { ...video, score };
    })
    .sort((a, b) => b.score - a.score);
}

module.exports = { rankVideos };
