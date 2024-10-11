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
          width: "78%",
          height: "300px",
          margin: "auto",
          position: "relative",
        }}
      >
        <Carousel
          className="custom-carousel"
          autoPlay
          interval={3000} // ตั้งให้เลื่อนทุกๆ 3 วินาที
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows
          showArrows={false}
        >
          <div className="flex justify-center border rounded-3xl">
            <div
              style={{
                backgroundColor: "",
                width: "100%",
                height: "500px",
                border: "1px solid lightgray",
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://dlcdnwebimgs.asus.com/gain/A6A079BA-9DDF-49FD-8C57-C60671DDC6F7/fwebp"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />
            </div>
          </div>
          <div className="flex justify-center border rounded-3xl">
            <div
              style={{
                backgroundColor: "",
                width: "100%",
                height: "500px",
                border: "1px solid lightgray",
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://storage-asset.msi.com/global/picture/banner/banner_1695860274cca8d0fdad8514150ac910e77b87ba63.jpeg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />
            </div>
          </div>
          <div className="flex justify-center border rounded-3xl">
            <div
              style={{
                backgroundColor: "",
                width: "100%",
                height: "500px",
                border: "1px solid lightgray",
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://dlcdnwebimgs.asus.com/gain/6E8AEDE3-3C93-459E-AFDB-C03436221DC9"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />
            </div>
          </div>
          <div className="flex justify-center border rounded-3xl">
            <div
              style={{
                backgroundColor: "",
                width: "100%",
                height: "500px",
                border: "1px solid lightgray",
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://www.asrock.com/images/index_MonitorF.jpg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />
            </div>
          </div>

          <div className="flex justify-center  border rounded-3xl">
            <div
              style={{
                backgroundColor: "",
                width: "100%",
                height: "500px",
                border: "1px solid lightgray",
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://p2-ofp.static.pub/ShareResource/na/faqs/img/intel-glossary-hero-new-notext.jpg"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  borderRadius: "24px",
                }}
              />
            </div>
          </div>
        </Carousel>
      </div>
    </div>
  );
};

export default AutoSlider;
