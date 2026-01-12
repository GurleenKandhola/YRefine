import { useState, useEffect } from "react";

function SearchBar({ onSearch }) {
  const [query, setQuery] = useState("");

  // Debounce typing
  useEffect(() => {
    if (!query.trim()) return;

    const timer = setTimeout(() => {
      onSearch(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query, onSearch]);

  const handleButtonClick = () => {
    if (!query.trim()) return;
    onSearch(query);
  };

  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search YouTube videos..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={handleButtonClick}>Search</button>
    </div>
  );
}

export default SearchBar;
