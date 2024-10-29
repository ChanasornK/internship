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
        "/Logo/MSI.png",
    },
    {
      name: "ASUS",
      imgUrl:
        "/Logo/ASUS.png",
    },
    {
      name: "Logitech",
      imgUrl:
        "/Logo/Logitech.png",
    },
    {
      name: "Corsair",
      imgUrl:
        "/Logo/Corsair.png",
    },
    {
      name: "Lg",
      imgUrl:
        "https://www.freepnglogos.com/uploads/lg-logo-png/lg-logo-partnership-with-bang-olufsen-yields-top-class-1.png",
    },
    {
      name: "HyperX",
      imgUrl:
        "/Logo/HyperX.png",
    },
    {
      name: "Razer",
      imgUrl:
        "/Logo/Razer.png",
    },
    {
      name: "Asrock",
      imgUrl:"/Logo/Asrock.png",
       
    },
    {
      name: "Lenovo",
      imgUrl:
        "/Logo/lenovo.png",
    },
    {
      name: "Samsung",
      imgUrl:
        "/Logo/Samsung.png",
    },
    {
      name: "Predator",
      imgUrl:
        "/Logo/Predator.png",
    },
    {
      name: "AOC",
      imgUrl:
        "https://download.logo.wine/logo/AOC_International/AOC_International-Logo.wine.png",
    },
    {
      name: "Gigabyte",
      imgUrl:"/Logo/GG.png"
        
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
            <a
              href={`../LogoPage/${logo.name}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={logo.imgUrl}
                alt={logo.name}
                className="w-24 h-12 object-contain transform transition-transform duration-200 hover:scale-125 cursor-pointer"
              />
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Logo;
