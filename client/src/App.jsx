import { useState, useCallback } from "react";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchVideos = useCallback(async (query) => {
    if (!query.trim()) return;

    setLoading(true);

    try {
      const res = await fetch(`http://localhost:5000/api/search?q=${query}`);
      const data = await res.json();

      // Check for data.items
      if (data.items && data.items.length > 0) {
        setVideos(data.items);
      } else {
        setVideos([]); // no results
      }
    } catch (error) {
      console.error("Error fetching videos", error);
      setVideos([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return (
    <div className="app">
      <h1>YouTube Search Refinement</h1>

      <SearchBar onSearch={searchVideos} />

      {loading && <p className="loading">Loading...</p>}

      {!loading && videos.length === 0 && <p>No videos found</p>}

      {!loading && videos.length > 0 && <VideoList videos={videos} />}
    </div>
  );
}

export default App;
