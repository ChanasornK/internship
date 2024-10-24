import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import LoadingModal from "./component/loading";
import LoadingMostView from "./component/loadingMostView";

const arrowStyles = {
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
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchAllImages = async () => {
      try {
        const response = await getImage();
        if (response) {
          const imageDataArray = response.data.imageData;

          const validImageDataArray = imageDataArray
            .map((image) => {
              const base64String = arrayBufferToBase64(image.image.data);
              return {
                id: image.id,
                price: image.price,
                rating: image.rating,
                views: image.view,
                src: `data:image/png;base64,${base64String}`,
                link: image.link,
              };
            })
            .sort((a, b) => b.views - a.views)
            .slice(0, 12); // Limit to top 12 images

          setImages(validImageDataArray);
          setIsLoaded(true); // Mark as loaded after fetching data
        }
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    };

    fetchAllImages();
  }, [router]);

  const getImage = async () => {
    try {
      const response = await fetch("http://localhost:8000/getAllImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();
      console.log(data); // ตรวจสอบการตอบสนองจาก API

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

  const chunkedImages = [];
  for (let i = 0; i < Math.min(images.length, 12); i += 3) {
    chunkedImages.push(images.slice(i, i + 3));
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
        console.log("เพิ่มจำนวนการเข้าชมสำเร็จ");
      } else {
        console.error("ไม่สามารถเพิ่มจำนวนการเข้าชมได้");
      }
    } catch (error) {
      console.error("เกิดข้อผิดพลาดในการเพิ่มจำนวนการเข้าชม:", error);
    }

    router.push(`/BUY/Buy_Information?id=${id}`);
  };

  return (
    <div className="flex justify-center items-center mt-10">
      {isLoaded ? (
        <div className="relative w-4/5 h-auto">
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            useKeyboardArrows
            showIndicators={false}
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
                    className="w-6 h-6 text-gray-800"
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
                    className="w-6 h-6 text-gray-800"
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
                      d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
                    />
                  </svg>
                </button>
              )
            }
          >
            {chunkedImages.map((group, index) => (
              <div key={index} className="flex justify-between">
                {group.map((img) => (
                  <div
                    key={img.id}
                    className="bg-[#D7DDE8] w-1/3 h-[370px] mx-1 border rounded-lg overflow-hidden transition-all duration-300 hover:bg-[#bdc3c7] hover:shadow-lg"
                  >
                    <button onClick={() => handleImageClick(img.id, img.link)}>
                      <div className="relative z-20 flex justify-center items-center">
                        <img
                          src={img.src}
                          alt={`Fetched Image ${img.id}`}
                          className="w-auto h-56 object-cover transition-transform duration-300 transform hover:scale-110 mt-10"
                        />
                      </div>
                    </button>

                    <div className="mt-2">
                      <span className="text-pink-600 flex justify-center font-medium text-2xl font-sans">
                        {img.price}
                      </span>
                      <div className="ml-1 mt-3 font-medium text-lg font-sans">
                        {img.views} views
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ))}
          </Carousel>
        </div>
      ) : (
        <LoadingMostView />
      )}
    </div>
  );
};

export default Slide;
