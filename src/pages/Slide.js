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
            .filter((image) => image.type === "Monitor")
            .map((image) => {
              const base64String = arrayBufferToBase64(image.image.data);
              return {
                id: image.id,
                price: image.price,

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
                    stroke="currentColor"
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
                    stroke="currentColor"
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
            {image.map(
              (image, index) =>
                index === 2 && (
                  <div
                    key={index}
                    className=" p-4 shadow-lg  bg-white m-2  w-1/3 h-96 mr-2 border border-gray-300 rounded overflow-hidden"
                  >
                    <button onClick={() => router.push(image.link)}>
                      {image.src && (
                        <div className="relative z-20 flex justify-center items-center ">
                          <img
                            src={image.src}
                            alt={`Fetched Image ${index}`}
                            className="w-auto h-64 object-cover "
                          />
                          <span className="absolute bottom-[-70px] left-0 bg-white bg-opacity-75 text-black flex justify-start text-left font-semibold text-base">
                            {image.detail}
                          </span>
                        </div>
                      )}
                      <span className="text-red-500  font-medium text-xl leading-7 tracking-wide">
                        {image.price}
                      </span>
                    </button>
                  </div>
                )
            )}

            <div
              style={{
                backgroundColor: "pink",
                width: "32%",
                height: "400px",
                marginRight: "2%",
                border: "1px solid lightgray",
                borderRadius: "5%",
                overflow: "hidden", // เพิ่มการตั้งค่านี้
              }}
            >
              <img
                src="https://assets.central.co.th//adobe/dynamicmedia/deliver/dm-aid--b45045ee-b880-4d3d-ab57-583d5416ea28/logitech-whitelogitechg715wirelessmechanicalgamingkeyboardswitchlinear-mkp1331482-2.jpg?preferwebp=true&quality=85&width=550"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} // เพิ่มการตั้งค่านี้
              ></img>
            </div>
            <div
              style={{
                backgroundColor: "pink",
                width: "32%",
                height: "400px",
                marginRight: "2%",
                border: "1px solid lightgray",
                borderRadius: "5%",
                overflow: "hidden", // เพิ่มการตั้งค่านี้
              }}
            >
              <img
                src="https://www.jib.co.th/img_master/product/original/20180718092410_30507_21_1.jpg"
                style={{ width: "100%", height: "100%", objectFit: "cover" }} // เพิ่มการตั้งค่านี้
              ></img>
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
                sdfsdfsd
              </button>
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default Slide;
