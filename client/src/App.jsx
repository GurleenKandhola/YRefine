import { useState } from "react";
import SearchBar from "./components/SearchBar";
import VideoList from "./components/VideoList";

function App() {
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(false);

  const searchVideos = async (query) => {
    setLoading(true);
    setVideos([]);

    try {
      const res = await fetch(
        `http://localhost:5000/api/search?q=${query}`
      );
      const data = await res.json();

      setVideos(data.items || []);
    } catch (error) {
      console.error("Error fetching videos", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>YouTube Search Refinement</h1>

      <SearchBar onSearch={searchVideos} />

      {loading && <p className="loading">Loading...</p>}

      {!loading && <VideoList videos={videos} />}
    </div>
  );
}

export default App;
