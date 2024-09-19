import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { useRouter } from "next/router"; // Import useRouter
import LoadingModal from "./loading";
const Searchform = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const dropdownRef = useRef(null);
  const router = useRouter(); // Initialize useRouter

  const handleSearchChange = async (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value.length > 0) {
      try {
        const response = await axios.get("http://localhost:8000/searchImage", {
          params: { searchTerm: value },
        });

        const filteredResults = response.data.imageData.map((result) => {
          const base64String = arrayBufferToBase64(result.image.data);
          return {
            ...result,
            src: `data:image/png;base64,${base64String}`,
          };
        });

        setSearchResults(filteredResults || []);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  const handleImageClick = async (id, link) => {
    try {
      const response = await fetch("http://localhost:8000/increment-view", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      if (response.ok) {
        console.log("เพิ่มจำนวนการเข้าชมสำเร็จ");
      } else {
        console.error("ไม่สามารถเพิ่มจำนวนการเข้าชมได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มจำนวนการเข้าชม:", error);
    }

    // Navigate to the desired page and send id through URL
    router.push(`/BUY/Buy_Information?id=${id}`).then(() => {
      router.reload();
    });
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setSearchResults([]);
      setSearchTerm("");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  return (
    <>
      <div className="w-[55%] ml-36 mt-10" ref={dropdownRef}>
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
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "#F472B6", stopOpacity: 1 }}
                />
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
          <div
            className={`mt-4 bg-white rounded-lg shadow-md ${
              searchResults.length > 9 ? "max-h-[500px] overflow-y-auto" : ""
            }`}
          >
            <ul>
              {searchResults.map((result) => (
                <li
                  key={result.id}
                  className="rounded-lg border-b border-gray-200 hover:bg-pink-300 hover:shadow-lg flex justify-between items-center cursor-pointer hover:text-pink-600"
                  onClick={() => handleImageClick(result.id, result.link)}
                >
                  <div className="ml-3">{result.detail}</div>

                  {result.src && (
                    <img
                      src={result.src}
                      alt={result.detail}
                      className="w-16 h-16 rounded-lg object-cover ml-4"
                    />
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default Searchform;
