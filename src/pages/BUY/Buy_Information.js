import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Menu from "../component/Menu";
import RatingStarz from "../component/RatingStarz";
import { FaCartShopping } from "react-icons/fa6";
// Function to convert ArrayBuffer to Base64
const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const MonitorTest = () => {
  const router = useRouter();
  const { id } = router.query; // Get id from URL
  const [imageData, setImageData] = useState(null);

  // Function to fetch image data from the API
  const getImage = async (id) => {
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
        return data;
      } else {
        console.error("Fetch image failed:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error during fetch image:", error);
      return null;
    }
  };

  useEffect(() => {
    if (id) {
      // Fetch image data by id
      const fetchImageData = async () => {
        try {
          const data = await getImage(id); // Call getImage with the id
          if (data) {
            const imageData = data.imageData;
            console.log(imageData);

            // Check if imageData exists
            if (imageData) {
              const base64String = arrayBufferToBase64(imageData.image.data);
              const validImageData = {
                id: imageData.id,
                src: `data:image/png;base64,${base64String}`,
                price: imageData.price,
                detail: imageData.detail,
                link: imageData.link,
                type: imageData.type,
                rating: imageData.rating, // Ensure this line is present
                views: imageData.view,
                email: imageData.email,
              };

              setImageData(validImageData);
            } else {
              console.error("imageData is not available:", imageData);
            }
          }
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };
      fetchImageData();
    }
  }, [id]);

  return (
    <>
      <div className="h-dvh">
        <Menu />
        <div className="h-full pt-40 p-26 flex justify-center bg-gray-100">
          <div className="w-96 h-[550px] gap-8 ml-28">
            <img
              className="object-cover w-auto h-96"
              src={imageData ? imageData.src : "/path/to/placeholder-image.png"}
              alt="Monitor Image"
            />
            {/* Center the RatingStarz component */}
            <div className="flex justify-center mt-4">
              <RatingStarz getRating={imageData?.rating} isEnabled={false} />
            </div>
          </div>

          <div className=" ml-20 w-96 pt-16">
            <div className="font-bold text-xl">{imageData?.detail}</div>
            <div className="mt-10 text-pink-600 text-xl font-semibold">
              {imageData?.price}
            </div>
            <button
              className="bg-pink-600 mt-16 w-full rounded-lg h-10 flex items-center justify-center space-x-2"
              onClick={() => {
                if (imageData?.link) {
                  window.open(imageData.link, "_blank"); // Opens the link in a new tab
                } else {
                  console.error("Link not available");
                }
              }}
            >
              <FaCartShopping className="text-lg" />
              <span className="text-lg">Buy</span>
            </button>
          </div>

          <div className=" ml-32 w-80 bg-red-600 ">Comment</div>
        </div>
      </div>
    </>
  );
};

export default MonitorTest;
