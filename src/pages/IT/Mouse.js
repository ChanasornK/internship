import React, { useEffect, useState } from "react";
import Menu from "../component/Menu";
import { useRouter } from "next/router";
import Information from "../component/Information";
import RatingStarz from "../component/RatingStarz";
import LoadingModal from "../component/loading";
import FixInformation from "../component/FixInformation";

const Mouse = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [image, setImages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [role, setRole] = useState(null);
  const [storedEmail, setStoredEmail] = useState(null);

  useEffect(() => {
    setIsClient(true);

    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
      setRole(profile?.userData?.role);
      setStoredEmail(profile?.userData?.email); // Save email to state
    }
  }, []);

  useEffect(() => {
    if (isClient) {
      const fetchAllImages = async () => {
        try {
          const response = await getImage();
          const imageDataArray = response.data.imageData;
          const validImageDataArray = imageDataArray
            .filter((image) => image.type === "Mouse")
            .map((image) => {
              const base64String = arrayBufferToBase64(image.image.data);
              return {
                id: image.id,
                src: `data:image/png;base64,${base64String}`,
                price: image.price,
                detail: image.detail,
                link: image.link,
                type: image.type,
                rating: image.rating,
                views: image.view,
                email: image.email,
              };
            });

          setImages(validImageDataArray);
        } catch (error) {
          console.error("Error fetching images:", error);
        } finally {
          setLoading(false);
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

  if (!isClient || loading) {
    return <LoadingModal />;
  }

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
        console.log("View count incremented successfully");
      } else {
        console.error("Failed to increment view count");
      }
    } catch (error) {
      console.error("Error incrementing view count:", error);
    }

    // เปิดลิงก์ในแท็บใหม่
    window.open(link, "_blank");
  };
  return (
    <>
      <Menu />
      <div className="min-h-screen w-full bg-gradient-to-t from-blue-200 to-pink-200 overflow-auto">
        <div className="flex justify-end w-full ">
          <div className="mr-10 mt-44">
            <Information />
          </div>
        </div>

        <div className="flex justify-center items-center -mt-5 ">
          <div className="flex flex-wrap justify-center w-4/5 mb-5">
            {image.map((img, index) => (
              <div
                key={index}
                className="w-64 p-4 border-2 border-[#FF8FAB] rounded-lg shadow-lg h-[450px] bg-gray-100 mx-3 overflow-hidden mt-10"
              >
                <button onClick={() => handleImageClick(img.id, img.link)}>
                  {img.src && (
                    <div className="relative z-20">
                      <img
                        src={img.src}
                        alt={`Fetched Image ${index}`}
                        className="w-auto h-56 object-cover transform transition-transform duration-200 hover:scale-125"
                      />
                      <span className="absolute bottom- left-0 bg-gray-100 bg-opacity-75 text-black flex justify-start text-left font-semibold text-base">
                        {img.detail}
                      </span>
                    </div>
                  )}
                </button>
                <div className="mt-32">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <RatingStarz getRating={img.rating} isEnabled={false} />
                    </div>
                    {((img.email === storedEmail && role) ||
                      role === "admin") && <FixInformation dataSource={img} />}
                  </div>

                  <div className="flex justify-between mt-2">
                    <span className="text-red-600 font-medium">
                      {img.price}
                    </span>
                    <div className="ml-1">{img.views} views</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Mouse;
