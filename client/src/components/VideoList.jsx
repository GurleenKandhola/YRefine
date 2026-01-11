import VideoCard from "./VideoCard";

function VideoList({ videos }) {
  if (!videos.length) {
    return <p className="no-results">No videos found</p>;
  }

  return (
    <div className="video-grid">
      {videos.map((video) => (
        <VideoCard key={video.videoId} video={video} />
      ))}
    </div>
  );
}

export default VideoList;
