import { useState } from "react";
import "./App.css";

function App() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await fetch(`/api/search?q=${query}`);
      const data = await res.json();

      console.log("API response:", data);
      console.log("First item:", data.items?.[0]);

      // Defensive: ensure items is always an array
      setResults(Array.isArray(data.items) ? data.items : []);
    } catch (err) {
      console.error("Search error:", err);
      setError("Failed to fetch videos. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1>YouTube Search Refinement</h1>

      {/* Search bar */}
      <div className="search-box">
        <input
          type="text"
          placeholder="Search YouTube..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Loading state */}
      {loading && <p>Loading results...</p>}

      {/* Error state */}
      {error && <p className="error">{error}</p>}

      {/* Results */}
      <ul className="results">
        {results.map((video) => (
          <li key={video.videoId} className="video-card">
            <img src={video.thumbnail} alt={video.title} />
            <p>{video.title}</p>
            <small>{video.channelTitle}</small>
          </li>
        ))}
      </ul>

      {/* No results */}
      {!loading && query && results.length === 0 && (
        <p>No videos found.</p>
      )}
    </div>
  );
}

export default App;
