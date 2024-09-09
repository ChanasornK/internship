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
          interval={3000} // ตั้งให้เลื่อนทุกๆ 5 วินาที
          infiniteLoop
          showThumbs={false}
          showStatus={false}
          useKeyboardArrows
          showArrows={false}
        >
          <div className="flex justify-center border rounded-3xl">
            <div
              style={{
                backgroundColor: "pink",
                width: "100%",
                height: "500px",
                border: "1px solid lightgray",
                borderRadius: "24px",
                overflow: "hidden",
              }}
            >
              <img
                src="https://scontent.fbkk29-4.fna.fbcdn.net/v/t1.15752-9/457491743_501321222620989_3333539029455903832_n.webp?_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG2IBv-3CWXHemjUGjNLfSsgfWqLfHa5LyB9aot8drkvGfF61WYUtbuvI_P4ZlXcbOic9AQaPEyUvW91CkZ6BVC&_nc_ohc=OXrZYOn9UAEQ7kNvgF2-aYf&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=Ak_a15_NmyBbOWSLlDYoK0v&oh=03_Q7cD1QEtMBJ4A5eWJ3RhQz1ufW_XJUGm9KQHi_qa35ttJmtD5Q&oe=67060255"
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
                backgroundColor: "pink",
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
                backgroundColor: "pink",
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
                backgroundColor: "pink",
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
