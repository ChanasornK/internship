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

          // กรองข้อมูลที่มี type เป็น "Laptop"
          const validImageDataArray = imageDataArray
            .filter((image) => image.type === "Monitor")
            .map((image) => {
              const base64String = arrayBufferToBase64(image.image.data);
              return {
                id: image.id,
                src: `data:image/png;base64,${base64String}`,
                price: image.price,
                detail: image.detail,
                link: image.link,
                type: image.Laptop,
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
          <div className="flex flex-wrap">
            {image.map((image, index) => (
              <div
                key={index}
                className="w-72 p-4 border border-gray-600 rounded-lg shadow-lg h-[450px] bg-white m-2"
              >
                <button onClick={() => router.push(image.link)}>
                  {image.src && (
                    <div className="relative z-20 flex justify-center items-center">
                      <img
                        src={image.src}
                        alt={`Fetched Image ${index}`}
                        className="w-auto h-[250px] object-cover transform transition-transform duration-300 hover:scale-110"
                      />
                      <span className="absolute bottom-[-40px] left-0 bg-white bg-opacity-75 text-black flex justify-start text-left font-semibold text-base">
                        {image.detail}
                      </span>
                    </div>
                  )}
                  <div className="mt-32">
                    <span className="text-red-600 flex justify-start font-medium">
                      {image.price}
                    </span>
                  </div>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
