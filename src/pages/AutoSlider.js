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
                height: "400px",
                border: "2px solid lightgray",
                borderRadius: "12px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://scontent.fbkk8-2.fna.fbcdn.net/v/t1.15752-9/455977415_1988731918229749_9033544694730235664_n.png?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEI35HlTW4FgIUv_e9cxQcDkvUgCV6mO4WS9SAJXqY7hQEQeMYaSHfzi5JrY2Amm1v4zRpRyx4kAAUx7143MYvL&_nc_ohc=jnIocmcMWoIQ7kNvgH5YQvZ&_nc_ht=scontent.fbkk8-2.fna&oh=03_Q7cD1QFasiuwTNQLoaDvcsFlKnXWMcL2bZqTGuGxQOP0Vo_jRw&oe=66F8924D"
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
