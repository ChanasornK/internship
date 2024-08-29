import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";

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

const AutoSlider = () => {
  return (
    <div>
      <div
        style={{
          width: "75%",
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
          // renderArrowPrev={(onClickHandler, hasPrev, label) =>
          //   hasPrev && (
          //     <button
          //       type="button"
          //       onClick={onClickHandler}
          //       title={label}
          //       style={{
          //         ...arrowStyles,
          //         position: "absolute",
          //         left: 30,
          //         top: "50%",
          //         transform: "translateY(-50%)",
          //         backgroundColor: "white",
          //       }}
          //     >
          //       <svg
          //         className="w-6 h-6 text-gray-800 dark:text-white"
          //         aria-hidden="true"
          //         xmlns="http://www.w3.org/2000/svg"
          //         fill="none"
          //         viewBox="0 0 8 14"
          //       >
          //         <path
          //           stroke="currentColor"
          //           stroke-linecap="round"
          //           stroke-linejoin="round"
          //           stroke-width="2"
          //           d="M7 1 1.3 6.326a.91.91 0 0 0 0 1.348L7 13"
          //         />
          //       </svg>
          //     </button>
          //   )
          // }
          // renderArrowNext={(onClickHandler, hasNext, label) =>
          //   hasNext && (
          //     <button
          //       type="button"
          //       onClick={onClickHandler}
          //       title={label}
          //       style={{
          //         ...arrowStyles,
          //         position: "absolute",
          //         right: 30,
          //         top: "50%",
          //         transform: "translateY(-50%)",
          //         backgroundColor: "white",
          //       }}
          //     >
          //       <svg
          //         className="w-6 h-6 text-gray-800 dark:text-white"
          //         aria-hidden="true"
          //         xmlns="http://www.w3.org/2000/svg"
          //         fill="none"
          //         viewBox="0 0 8 14"
          //       >
          //         <path
          //           stroke="currentColor"
          //           stroke-linecap="round"
          //           stroke-linejoin="round"
          //           stroke-width="2"
          //           d="m1 13 5.7-5.326a.909.909 0 0 0 0-1.348L1 1"
          //         />
          //       </svg>
          //     </button>
          //   )
          // }
        >
          <div className="flex justify-center bg-pink-600 border rounded-xl">
            <div
              style={{
                backgroundColor: "pink",
                width: "auto",
                height: "450px",
                border: "2px solid lightgray",
                borderRadius:"12px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://scontent.fbkk13-3.fna.fbcdn.net/v/t1.15752-9/456244270_1221966438935767_7749756092563509472_n.png?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeGajNPyGXST3y10SxllLuIud_0oR6ZYdOJ3_ShHplh04ohA-62Cab7cZDhsudHasCXkqPbyDNlaPSRlRzf_lop4&_nc_ohc=cN36yf9N76sQ7kNvgER3ygZ&_nc_ht=scontent.fbkk13-3.fna&oh=03_Q7cD1QEzVOzaXB3SQAEEZLvuZ1s1vpzqApvK-2mjavRLL2LbiA&oe=66F7C9E6"
                style={{ width: "full", height: "full", objectFit: "cover" }}
              ></img>
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                backgroundColor: "black",
                width: "32%",
                height: "400px",
                marginRight: "2%",
                borderRadius: "5%",
              }}
            >
              sdfsdfsd
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                backgroundColor: "green",
                width: "32%",
                height: "400px",
                marginRight: "2%",
                borderRadius: "5%",
              }}
            >
              sdfsdfsdf
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "center" }}>
            <div
              style={{
                backgroundColor: "red",
                width: "32%",
                height: "400px",
                marginRight: "2%",
                borderRadius: "5%",
              }}
            >
              sdfsdfsd
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default AutoSlider;
