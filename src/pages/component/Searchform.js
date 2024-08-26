import React, { useState, useEffect } from "react";
import axios from "axios";

const Searchform = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    const fetchSearchResults = async () => {
      if (searchTerm) {
        try {
          const response = await axios.post("/searchImage", { searchTerm });
          setSearchResults(response.data.imageData);
        } catch (error) {
          console.error("Error during search:", error);
        }
      } else {
        setSearchResults([]);
      }
    };
    
    fetchSearchResults();
  }, [searchTerm]);

  return (
    <div className="w-[55%] ml-32 mt-10">
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
          className="block w-full p-4 ps-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-100 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="ค้นหาสินค้า ประเภทสินค้า"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          required
        />
        <button
          type="button"
          className="text-white absolute end-2.5 bottom-2.5 bg-gradient-to-br from-purple-500 to-pink-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          onClick={() => setSearchTerm(searchTerm)}
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

      {/* แสดงผลการค้นหา */}
      <div className="mt-5">
        {searchResults.map((result, index) => (
          <div key={index} className="p-4 border-b border-gray-300">
            <h3 className="text-lg font-semibold">{result.detail}</h3>
            {/* เพิ่มการแสดงผลของข้อมูลอื่นๆ ที่ต้องการ */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchform;
