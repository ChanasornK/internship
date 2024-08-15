import React, { useEffect, useState } from "react";
import Menu from "../component/Menu";
import { useRouter } from "next/router";
import Information from "../component/Information";

const Monitor = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showInformation, setShowformation] = useState(false);
  useEffect(() => {
    // ตั้งค่าว่าอยู่ในฝั่งลูกค้าแล้ว
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // หรือแสดง loading indicator ก็ได้
  }

  const getImage = async () => {
    try {
      const response = await fetch("http://localhost:8000/getImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        return { data }; // Indicate success
      } else {
        console.error("Fetch image failed:", data.message);
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error during fetch image:", error);
      return false; // Handle network errors or other unexpected issues
    }
  };
  return (
    <div>
      <Menu />
      <div className="bg-white flex justify-end mt-6 mr-10 ">
        <Information />
      </div>
      <div className="w-full h-[55%] bg-white mt-6">
        <div className="flex justify-center items-center">
          <div className="w-72 p-4 border border-gray-200 rounded-lg shadow-lg h-[450px] mr-4 bg-pink-400">
            <button className="w-full">
              <div className="h-auto w-56 overflow-hidden mx-auto">
                <img
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125 mt-2 relative z-20" // ตั้ง z-index ให้ hover อยู่ข้างหลัง backdrop
                />
              </div>
              <h1 className="text-left mt-2 font-semibold"></h1>
              <h1 className="text-left mt-20 text-red-500 font-semibold"></h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
