import React, { useEffect, useState } from "react";
import Menu from "../component/Menu";
import { useRouter } from "next/router";
import Information from "../component/Information";

const Monitor = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showInformation, setShowformation] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);
  const [price, setPrice] = useState(null);
  const [detail, setDetail] = useState(null);
  const [image, setImages] = useState([]);
  console.log(image);
  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const fetchAllImages = async () => {
        try {
          const response = await getImage(); // ดึงข้อมูลภาพทั้งหมดจาก API
          const imageDataArray = response.data.imageData; // สมมติว่า API คืนข้อมูลภาพทั้งหมดใน array `imageData`

          const validImageDataArray = imageDataArray.map((image) => {
            const base64String = arrayBufferToBase64(image.image.data);
            return {
              id: image.id,
              src: `data:image/png;base64,${base64String}`,
              price: image.price,
              detail: image.detail,
            };
          });

          // ตั้งค่า state ที่นี่
          setImages(validImageDataArray);
        } catch (error) {
          console.error("Error fetching images:", error);
          // จัดการกับ error ที่นี่ถ้าจำเป็น
        }
      };

      fetchAllImages();
    }
  }, [isClient]);

  const getImage = async (id) => {
    try {
      const response = await fetch("http://localhost:8000/getAllImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();

      if (response.ok) {
        return { data };
      } else {
        console.error("Fetch image failed:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Error during fetch image:", error);
      return false;
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  if (!isClient) {
    return null;
  }

  return (
    <div>
      <Menu />
      <div className="bg-white flex justify-end mt-6 mr-10 ">
        <Information />
      </div>
      <div className="w-full h-[55%] bg-white mt-6">
        <div className="flex justify-center items-center">
          <button>
            <div className="flex flex-wrap">
              {image.map((image, index) => (
                <div
                  key={index}
                  className="w-72 p-4 border border-gray-600 rounded-lg shadow-lg h-[450px] bg-white m-2"
                >
                  {image.src && (
                    <div className="relative z-20 flex justify-center items-center">
                      <img
                        src={image.src}
                        alt={`Fetched Image ${index}`}
                        className="w-auto h-[250px] object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                      <span className="absolute bottom-[-40px] left-0 bg-white bg-opacity-75 text-black flex justify-start text-left font-semibold text-base">
                        {image.detail} {/* แสดงข้อมูล detail */}
                      </span>
                    </div>
                  )}
                  <div className="mt-32">
                    <span className="text-red-600 flex justify-start font-medium">
                      {image.price}
                    </span>{" "}
                    {/* แสดงข้อมูล price */}
                  </div>
                  <button className="w-full">
                    {/* <div className="h-auto w-56 overflow-hidden mx-auto">
                      <img
                        className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125 mt-2 relative z-20"
                        src={image.buttonImageSrc} // ใช้ source ของภาพใน button
                        alt={`Button Image ${index}`}
                      />
                    </div> */}
                    <h1 className="text-left mt-2 font-semibold">
                      {image.title} {/* แสดงข้อมูล title */}
                    </h1>
                    <h1 className="text-left mt-20 text-red-500 font-semibold">
                      {image.subtitle} {/* แสดงข้อมูล subtitle */}
                    </h1>
                  </button>
                </div>
              ))}
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
