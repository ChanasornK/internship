import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

const Searchform = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      try {
        const response = await axios.get("http://localhost:8000/searchImage", {
          params: { searchTerm: value },
        });

        setSearchResults(response.data.imageData || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]); // Clear results if search term is empty
    }
  };

  const handleOpenLinkInNewTab = (result) => {
    window.open(result.link, "_blank");
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSearchResults([]);
      setSearchTerm(""); // Close dropdown when clicking outside
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-[55%] ml-32 mt-10" ref={dropdownRef}>
      <label
        htmlFor="default-search"
        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
      >
        Search
      </label>
      <div className="relative">
        <input
          type="search"
          id="default-search"
          value={searchTerm}
          onChange={handleSearchChange}
          className="block w-full p-4 ps-12 text-sm text-gray-900 border-2 border-pink-400 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-purple-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-purple-500"
          placeholder="ค้นหาสินค้า ประเภทสินค้า"
          required
        />
        <svg
          className="w-5 h-5 absolute top-4 left-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 20 20"
        >
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop
                offset="0%"
                style={{ stopColor: "#9F7AEA", stopOpacity: 1 }}
              />{" "}
              {/* สี purple-400 */}
              <stop
                offset="100%"
                style={{ stopColor: "#F472B6", stopOpacity: 1 }}
              />{" "}
              {/* สี pink-300 */}
            </linearGradient>
          </defs>
          <path
            stroke="url(#gradient)"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
          />
        </svg>
      </div>

      {/* Display search results */}
      {searchResults.length > 0 && (
        <div className="mt-4 bg-white rounded-lg shadow-md">
          <ul>
            {searchResults.map((result) => (
              <li key={result.id} className="p-2 border-b border-gray-200">
                <button onClick={() => handleOpenLinkInNewTab(result)}>
                  {result.detail} - {result.type}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Searchform;
