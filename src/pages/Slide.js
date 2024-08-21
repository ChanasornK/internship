import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import RatingStarz from "./component/RatingStarz";

const arrowStyles = {
  //   backgroundColor: "white",
  borderRadius: "50%",
  width: "50px",
  height: "50px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  border: "2px solid lightgray",
  cursor: "pointer",
};

const Slide = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [image, setImages] = useState([]);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      const fetchAllImages = async () => {
        try {
          const response = await getImage(); // Fetch all images from API
          const imageDataArray = response.data.imageData; // Assuming the API returns an array `imageData`

          const validImageDataArray = imageDataArray
            // .filter((image) => image.type === "Monitor")
            .map((image) => {
              const base64String = arrayBufferToBase64(image.image.data);
              return {
                id: image.id,
                price: image.price,
                rating: image.rating,

                src: `data:image/png;base64,${base64String}`,
                // Assume rating comes from API or set it to 0 if not available
              };
            });

          // Set state here
          setImages(validImageDataArray);
        } catch (error) {
          console.error("Error fetching images:", error);
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
      <div
        style={{
          width: "85%",
          height: "300px",
          margin: "auto",
          position: "relative",
        }}
      >
        <Carousel
          showThumbs={false}
          showStatus={false}
          infiniteLoop
          useKeyboardArrows
          renderArrowPrev={(onClickHandler, hasPrev, label) =>
            hasPrev && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  ...arrowStyles,
                  position: "absolute",
                  left: 30,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "white",
                }}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    stroke="#FF8FAB"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
                  />
                </svg>
              </button>
            )
          }
          renderArrowNext={(onClickHandler, hasNext, label) =>
            hasNext && (
              <button
                type="button"
                onClick={onClickHandler}
                title={label}
                style={{
                  ...arrowStyles,
                  position: "absolute",
                  right: 30,
                  top: "50%",
                  transform: "translateY(-50%)",
                  backgroundColor: "white",
                }}
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 8 14"
                >
                  <path
                    stroke="#A6C3E4"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                  />
                </svg>
              </button>
            )
          }
        >
          <div style={{ display: "flex" }}>
            {image
              .filter((img) => img.id === 1) // Filter เพียง id ที่เลือก
              .map((image) => (
                <div
                  key={image.id}
                  className=" bg-gray-100  w-1/3 h-[370px] mr-2 border-2 border-[#FF8FAB] rounded-lg overflow-hidden "
                >
                  <button
                    onClick={() =>
                      router.push(
                        "https://ihavecpu.com/product/19945/monitor-(%E0%B8%88%E0%B8%AD%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%B4%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C)-lg-ultragear-27gs60f-b-27-ips-fhd-180hz-(3y)"
                      )
                    }
                  >
                    {image.src && (
                      <div className="relative z-20 flex justify-center items-center">
                        <img
                          src={image.src}
                          alt={`Fetched Image ${image.id}`}
                          className="w-auto h-64 object-cover transition-transform duration-300 transform hover:scale-125 mt-10"
                        />
                      </div>
                    )}
                  </button>

                  <div className="mt-4">
                    <span className="text-pink-600 flex justify-center font-medium text-2xl font-sans">
                      {image.price}
                    </span>
                  </div>
                </div>
              ))}

            {image
              .filter((img) => img.id === 11) // Filter เพียง id ที่เลือก
              .map((image) => (
                <div
                  key={image.id}
                  className="bg-gray-100 w-1/3 h-[370px] mr-2 border-2 border-[#FF8FAB] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      router.push(
                        "https://www.jib.co.th/web/product/readProduct/58409/NOTEBOOK--%E0%B9%82%E0%B8%99%E0%B9%89%E0%B8%95%E0%B8%9A%E0%B8%B8%E0%B9%8A%E0%B8%84--ASUS-ROG-STRIX-SCAR-17-G733PZ-LL023W--OFF-BLACK-"
                      )
                    }
                  >
                    {image.src && (
                      <div className="relative z-20 flex justify-center items-center">
                        <img
                          src={image.src}
                          alt={`Fetched Image ${image.id}`}
                          className="w-auto h-64 object-cover transition-transform duration-200 transform hover:scale-110 mt-10"
                        />
                      </div>
                    )}
                  </button>

                  <div className="mt-4">
                    <span className="text-pink-600 flex justify-center font-medium text-2xl font-sans">
                      {image.price}
                    </span>
                  </div>
                </div>
              ))}

            {image
              .filter((img) => img.id === 13) // Filter เพียง id ที่เลือก
              .map((image) => (
                <div
                  key={image.id}
                  className="bg-gray-100 w-1/3 h-[370px] mr-2 border-2 border-[#FF8FAB] rounded-lg overflow-hidden"
                >
                  <button
                    onClick={() =>
                      router.push(
                        "https://shopee.co.th/VGA-(%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B9%8C%E0%B8%94%E0%B9%81%E0%B8%AA%E0%B8%94%E0%B8%87%E0%B8%9C%E0%B8%A5)-ASUS-ROG-MATRIX-PLATINUM-GEFORCE-RTX-4090-24GB-GDDR6X-i.17333589.24426570729?publish_id=&sp_atk=382239d3-37b8-4431-90fc-038fb1419fbb&xptdk=382239d3-37b8-4431-90fc-038fb1419fbb"
                      )
                    }
                  >
                    {image.src && (
                      <div className="relative z-20 flex justify-center items-center">
                        <img
                          src={image.src}
                          alt={`Fetched Image ${image.id}`}
                          className="w-auto h-64 object-cover transition-transform duration-200 transform hover:scale-110 mt-10"
                        />
                      </div>
                    )}
                  </button>

                  <div className="mt-4">
                    <span className="text-pink-600 flex justify-center font-medium text-2xl font-sans">
                      {image.price}
                    </span>
                  </div>
                </div>
              ))}
          </div>

          {image
            .filter((img) => img.id === 32) // Filter เพียง id ที่เลือก
            .map((image) => (
              <div
                key={image.id}
                className=" bg-gray-100  w-1/3 h-[370px] mr-2 border-2 border-[#FF8FAB] rounded-lg overflow-hidden "
              >
                <button
                  onClick={() =>
                    router.push(
                      "https://ihavecpu.com/product/19945/monitor-(%E0%B8%88%E0%B8%AD%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%B4%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C)-lg-ultragear-27gs60f-b-27-ips-fhd-180hz-(3y)"
                    )
                  }
                >
                  {image.src && (
                    <div className="relative z-20 flex justify-center items-center">
                      <img
                        src={image.src}
                        alt={`Fetched Image ${image.id}`}
                        className="w-auto h-64 object-cover transition-transform duration-300 transform hover:scale-125 mt-10"
                      />
                    </div>
                  )}
                </button>

                <div className="mt-4">
                  <span className="text-pink-600 flex justify-center font-medium text-2xl font-sans">
                    {image.price}
                  </span>
                </div>
              </div>
            ))}

          <div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  backgroundColor: "black",
                  width: "32%",
                  height: "400px",
                  marginRight: "2%",
                }}
              >
                sdfsdfsd
              </div>
              <div
                style={{
                  backgroundColor: "green",
                  width: "32%",
                  height: "auto",
                  marginRight: "2%",
                }}
              >
                sdfsdfsdf
              </div>
              <button
                style={{ backgroundColor: "red", width: "32%", height: "auto" }}
              >
                sdfsdfsd
              </button>
            </div>
          </div>

          <div>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  backgroundColor: "black",
                  width: "32%",
                  height: "400px",
                  marginRight: "2%",
                }}
              >
                sdfsdfsd
              </div>
              <div
                style={{
                  backgroundColor: "green",
                  width: "32%",
                  height: "auto",
                  marginRight: "2%",
                }}
              >
                sdfsdfsdf
              </div>
              <button
                style={{ backgroundColor: "", width: "32%", height: "auto" }}
              >
                sdfsdfsd97898
              </button>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Slide;
