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
          className="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ค้นหาสินค้า ประเภทสินค้า"
          required
        />
        <button
          type="button"
          className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </button>
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
