
import { useState } from "react";
import { useRouter } from "next/navigation";
import { FiSearch } from "react-icons/fi";

export default function SearchBar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [fullResults, setFullResults] = useState(null);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  const router = useRouter();

  const handleChange = async (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    setFullResults(null);
    setMessage("");
    setMessageType("");

    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(value)}`);
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Search failed");
      }
      const data = await res.json();

      const preview = [
        ...data.users.slice(0, 3).map((u) => ({ label: u.name, type: "User", link: "/dashboard/users" })),
        ...data.articles.slice(0, 3).map((a) => ({ label: a.title, type: "Article", link: "/dashboard/content" })),
        ...data.quotes.slice(0, 3).map((q) => ({
          label: q.text,
          type: q.type || "Quote",
          link: "/dashboard/content",
        })),
      ];
      setSuggestions(preview);
    } catch (err) {
      console.error("Error fetching suggestions:", err);
      setSuggestions([]);
      setMessage(err.message || "Failed to fetch search suggestions.");
      setMessageType("error");
    }
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.error || "Search failed");
        }
        const data = await res.json();

        const allResults = [
          ...data.users.map((u) => ({ label: u.name, type: "User", link: "/dashboard/users" })),
          ...data.articles.map((a) => ({ label: a.title, type: "Article", link: "/dashboard/content" })),
          ...data.quotes.map((q) => ({
            label: q.text,
            type: q.type || "Quote",
            link: "/dashboard/content",
          })),
        ];

        setFullResults(allResults);
        setSuggestions([]);
        setMessage("");
        setMessageType("");
      } catch (err) {
        console.error("Error fetching search results:", err);
        setFullResults([]);
        setMessage(err.message || "Failed to fetch search results.");
        setMessageType("error");
      }
    }
  };

  return (
    <div className="relative w-full sm:w-64">
      {message && (
        <p
          className={`text-center mb-2 text-sm ${
            messageType === "error" ? "text-red-600" : "text-green-600"
          }`}
        >
          {message}
        </p>
      )}

      <div className="flex items-center border rounded-lg px-3 py-2 bg-white shadow-sm focus-within:border-indigo-500 transition">
        <FiSearch className="text-gray-400 mr-2" />
        <input
          type="text"
          placeholder="Search users, articles, quotes..."
          value={searchQuery}
          onChange={handleChange}
          onKeyDown={handleSearch}
          className="w-full outline-none focus:outline-none focus:ring-0 border-none text-sm"
        />
      </div>

      {/* Suggestions Dropdown */}
      {suggestions.length > 0 && (
        <div className="absolute left-0 mt-1 w-full bg-white shadow-lg rounded-lg border max-h-60 overflow-y-auto z-50">
          {suggestions.map((item, index) => (
            <div
              key={index}
              onClick={() => {
                setSearchQuery(item.label);
                setSuggestions([]);
                router.push(item.link);
              }}
              className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between"
            >
              <span className="truncate">{item.label}</span>
              <span className="text-gray-500 text-sm">{item.type}</span>
            </div>
          ))}
        </div>
      )}

      {/* Full search results */}
      {fullResults && (
        <div className="mt-6 bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-bold mb-2">Search Results</h2>
          {fullResults.length > 0 ? (
            fullResults.map((item, index) => (
              <div
                key={index}
                onClick={() => router.push(item.link)}
                className="px-4 py-2 cursor-pointer hover:bg-gray-100 flex justify-between"
              >
                <span className="truncate">{item.label}</span>
                <span className="text-gray-500 text-sm">{item.type}</span>
              </div>
            ))
          ) : (
            <p className="text-sm text-gray-500">No results found</p>
          )}
        </div>
      )}
    </div>
  );
}