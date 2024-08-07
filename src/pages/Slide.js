import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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
                src="https://www.jib.co.th/img_master/product/original/2020092508482042835_1.jpg"
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
