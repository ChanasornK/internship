import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Logo = () => {
  const router = useRouter();
  const [visibleLogos, setVisibleLogos] = useState(8); // เริ่มต้นด้วยการแสดง 8 รูปแรก
  const [currentStart, setCurrentStart] = useState(0); // index ของรูปที่เริ่มต้นแสดงผล
  const [fadeIn, setFadeIn] = useState(false); // ใช้สถานะเพื่อควบคุมการเฟดอิน
  const logos = [
    {
      name: "MSI",
      imgUrl:
        "https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/457131951_1923507011498718_6072730157360074857_n.png?stp=dst-png_s2048x2048&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEr1nKNr7SU0FoDQ2tHIP3E-mnH0pWFR4P6acfSlYVHgy4Z5CBKtkRMHX7y_HnCYkCBL2n2nGWnDMvmrO9sCn7e&_nc_ohc=Ncy6btG3GBkQ7kNvgHYzEOk&_nc_ht=scontent.fbkk29-7.fna&oh=03_Q7cD1QFcXtyfiBUvILNx8j-KSTI0j4ifqNfQf7GxO8uywfBhBQ&oe=67072CFE",
    },
    {
      name: "ASUS",
      imgUrl:
        "https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/457510754_955990786296520_499236372958089666_n.png?stp=dst-png_s2048x2048&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGwA8oCljuMiBsY0zUynhfWanuYmUJPaxZqe5iZQk9rEpv8OtOvAkTKGTeCs38ZDSrypTYiZiKEY8fMw6SO_Yo&_nc_ohc=jV5RYTwltRoQ7kNvgE5y9Sb&_nc_ht=scontent.fbkk29-7.fna&_nc_gid=AOjhZD_ISECOFfz8AW2LcZJ&oh=03_Q7cD1QHCClOx44iHxIhNaBjHD2aPtYHfdjENI8PfBQS1oKETiw&oe=67071B17",
    },
    {
      name: "Logitech",
      imgUrl:
        "https://scontent.fbkk29-9.fna.fbcdn.net/v/t1.15752-9/457447325_1715182919225000_8075187449906730638_n.png?stp=dst-png_s2048x2048&_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG3Ykvz8TtZwM6ocLwfCg2NLCSr8aShEywsJKvxpKETLIZURCJQPlfpENRyIuZj9EVSKqlQXbN4kLYfgFBHF7ao&_nc_ohc=YXrmIfBLu1sQ7kNvgHizcEh&_nc_ht=scontent.fbkk29-9.fna&_nc_gid=AOwZlXSpxWDkEOF8o81Z7HA&oh=03_Q7cD1QGcn0ztJCBFRQAyiJnCndfStCOxgDk3gETvzbhADwnpMQ&oe=67075D38",
    },
    {
      name: "Corsair",
      imgUrl:
        "https://scontent.fbkk29-4.fna.fbcdn.net/v/t1.15752-9/457510761_1222879655526200_8627781567526296244_n.png?stp=dst-png_s2048x2048&_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeF6M96ht1ltRKNlsV8ve6ne59vAzg-eOHfn28DOD544dwhbQb6zY2RxawwXksXDB85RMygALir8JcYMO9DKisZW&_nc_ohc=LeAVIpxuJdkQ7kNvgEluuO8&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=ALUmejZjfFcT-lOekdWvlRi&oh=03_Q7cD1QEcOPRvpxd2ubRv0HQAWYxSruFlDph1yjl4X0QA1c8YPA&oe=670767B3",
    },
    {
      name: "Lg",
      imgUrl:
        "https://www.freepnglogos.com/uploads/lg-logo-png/lg-logo-partnership-with-bang-olufsen-yields-top-class-1.png",
    },
    {
      name: "HyperX",
      imgUrl:
        "https://scontent.fbkk29-9.fna.fbcdn.net/v/t1.15752-9/457496665_1187869285625307_2132536490234750103_n.png?stp=dst-png_s2048x2048&_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHHcfWspjNJcIyyM7auTYppIj8F_ZXVjIgiPwX9ldWMiHVUre66pyKKxEwrgYq2Mji3YA99Vsl0WbWaY1pLChBl&_nc_ohc=W9hIXLy1Gu8Q7kNvgHx09Jz&_nc_ht=scontent.fbkk29-9.fna&oh=03_Q7cD1QFDg71iyLSu9EySSMg68vgiJ2z4vfKGGc5raEKDgYhDjw&oe=6707757E",
    },
    {
      name: "Razer",
      imgUrl:
        "https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458283147_1562015881087039_7138264112162137481_n.png?stp=dst-png_s2048x2048&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHXWnM9l6ugsbbRl-Ocq8jLVK9Mt03hqtVUr0y3TeGq1SeioT-3t2fHlfbjspVuepxdec81djOqVG0Ox7myew2I&_nc_ohc=95peJYqL1EAQ7kNvgHG6mtK&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=A1XcMIKIx4rylv_FfNdvAp2&oh=03_Q7cD1QGQ6sJ4OWU3oJ4OaqebCh4oh64h_u5tt1oVMbaT6ttK0w&oe=67075F11",
    },
    {
      name: "Asrock",
      imgUrl:
        "https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/458525523_512465604825616_7641958937197182963_n.png?_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEA1c59iN4py96ZgVrUF3yVz0IACBJmdDvPQgAIEmZ0Oyn4fyYfA4stfimWK712yX0HEkPWc3WZmITVX9zcdghb&_nc_ohc=u6P0yzzjWjwQ7kNvgGSdDtb&_nc_ht=scontent.fbkk29-7.fna&_nc_gid=AqYZhIuXXaTjLnPX1DWQhHW&oh=03_Q7cD1QFhlutG6Ybwb8HMnwaMr9T1LqSmYTOzAtoSWM0O9d1y1Q&oe=670F73C1",
    },
    {
      name: "Lenovo",
      imgUrl:
        "https://scontent.fbkk29-5.fna.fbcdn.net/v/t1.15752-9/456812688_1550154775591509_699400311333807581_n.png?stp=dst-png_s2048x2048&_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHgOYU5uE9zwRWvcA13cPIqpuMPuwhLmfCm4w-7CEuZ8DaMesTZdpaiAibGjD0HIa-_9zuwomlWcFo0bJ-S7Ru8&_nc_ohc=hysxZYPOrxEQ7kNvgFRwtUE&_nc_ht=scontent.fbkk29-5.fna&_nc_gid=AraH1-tfD9ifspqZ_IxU6NM&oh=03_Q7cD1QH_P870dbG0LbCWJinPaWUdiRufhy89cOLRF2T3lxEzDw&oe=6708BA96",
    },
    {
      name: "Samsung",
      imgUrl:
        "https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/459099897_1054276246087809_6410559811456905430_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE9A9dM9he32Mi5PPZ8l4uoSd2L51AQhcxJ3YvnUBCFzIxtj2QgQnDhIz-mibSSI6YPUt3qMU59653hpcwK7ujm&_nc_ohc=YiqPoSodvBsQ7kNvgHvMTMY&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=AbmWlD6XykaCZTdYnh5mneN&oh=03_Q7cD1QGrLPKYapWKsh4f9PjdnQhzbNTuLj-nd-XMLW2Rt7C4-Q&oe=6708CEE3",
    },
    {
      name: "Predator",
      imgUrl:
        "https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/457070509_1247376719748870_8094528576549176747_n.png?stp=dst-png_s2048x2048&_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHSApGL9baE3TxRrNHXs4dVA1_0JKEe_18DX_QkoR7_X03VtsoUpUWdOTpEu9lS1vPUKNG8k9zL6PaWQy_1yoC4&_nc_ohc=deuQh5AhR4gQ7kNvgFM2C2N&_nc_ht=scontent.fbkk29-1.fna&oh=03_Q7cD1QF6587kz73t8ucQkCvbX8XireHyVYirOK6YprhuNZcPQQ&oe=6708C590",
    },
    {
      name: "AOC",
      imgUrl:
        "https://download.logo.wine/logo/AOC_International/AOC_International-Logo.wine.png",
    },
    {
      name: "Gigabyte",
      imgUrl:
        "https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/458487742_1641849849706876_3918649815897531135_n.png?stp=dst-png_s2048x2048&_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHZGNN-hZEUhLtMJCelph0ZetbVpYoXhiR61tWliheGJNWlRX8RnKD1VtwlLnxo66Kun31a_dDcT5wWV-C2evlJ&_nc_ohc=M6k9CaJ6VNgQ7kNvgHsyfCQ&_nc_ht=scontent.fbkk29-1.fna&_nc_gid=As5-okg6gok-fg2mgqjIYoA&oh=03_Q7cD1QHHm906vzS0KS660YsIORlihPErjkYHtcrDd_74KqLyBg&oe=670F6D8F",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 8, // แสดงโลโก้ 8 รูปต่อหน้า
    slidesToScroll: 1, // เลื่อนทีละ 1 รูป
    autoplay: true,
    autoplaySpeed: 2500, // สไลด์ทุก 2.5 วินาที
    draggable: true, // เพิ่มตัวเลือกนี้เพื่อให้ลากด้วยเมาส์ได้
  };

  const goToPage = (brand) => {
    router.push(`../LogoPage/${brand}`);
  };

  useEffect(() => {
    setFadeIn(true); // เมื่อ component โหลดเสร็จ ให้เฟดอิน
  }, []);

  return (
    <div className={`w-[90%] ${fadeIn ? "fade-in" : ""}`}>
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div key={index} className="h-11 ml-5">
            <img
              src={logo.imgUrl}
              alt={logo.name}
              onClick={() => goToPage(logo.name)} // ย้าย onClick มาที่ img
              className="w-24 h-12 object-contain transform transition-transform duration-200 hover:scale-125 cursor-pointer"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Logo;
