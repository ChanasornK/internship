import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Menu from "../component/Menu";
import RatingStarz from "../component/RatingStarz";
import { FaCartShopping } from "react-icons/fa6";
import LoadingModal from "../component/loading";
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
  const [loading, setLoading] = useState(true);
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
    // Simulate loading process
    setTimeout(() => {
      setLoading(false); // ปิด loading เมื่อโหลดข้อมูลเสร็จ
    }, 500);

    // Check if the login was successful by looking at the query parameters
  }, []);
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
      {loading ? (
        <LoadingModal />
      ) : (
        <div className="h-dvh">
          <Menu />
          <div className="h-full pt-40 p-26 flex justify-center bg-gray-100">
            <div className="w-96 h-[500px] gap-8 ml-28">
              <img
                className="object-cover w-auto h-96"
                src={
                  imageData ? imageData.src : "/path/to/placeholder-image.png"
                }
                alt="Monitor Image"
              />
              <div className="bg-pink-500 w-[850px] h-56">Hello</div>
            </div>

            <div className=" ml-20 w-96 pt-16 h-1/2">
              <div className="font-bold text-xl">{imageData?.detail}</div>
              <div className=" mt-9">
                <RatingStarz getRating={imageData?.rating} isEnabled={false} />
              </div>
              <div className=" text-pink-600 text-2xl font-semibold">
                {imageData?.price}
              </div>
              <button
                className="bg-pink-600 mt-8 w-full rounded-lg h-10 flex items-center justify-center space-x-2 "
                onClick={() => {
                  if (imageData?.link) {
                    window.open(imageData.link, "_blank"); // Opens the link in a new tab
                  } else {
                    console.error("Link not available");
                  }
                }}
              >
                <FaCartShopping className="text-lg " />
                <span className="text-lg">Buy</span>
              </button>
            </div>

            <div className=" ml-32 w-80 bg-red-600 mb-7 ">Comment</div>
          </div>
        </div>
      )}
    </>
  );
};

export default MonitorTest;
