function VideoCard({ video }) {
  return (
    <div className="video-card">
      <img src={video.thumbnail} alt={video.title} />
      <h3>{video.title}</h3>
      <p>{video.channelTitle}</p>
      <small>{new Date(video.publishedAt).toDateString()}</small>

      <a
        href={`https://www.youtube.com/watch?v=${video.videoId}`}
        target="_blank"
        rel="noreferrer"
      >
        Watch on YouTube
      </a>
    </div>
  );
}

export default VideoCard;
