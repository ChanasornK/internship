import React, { useEffect, useState } from "react";
import Menu from "../component/Menu";
import { useRouter } from "next/router";
import Information from "../component/Information";

const Monitor = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [showInformation, setShowformation] = useState(false);
  useEffect(() => {
    // ตั้งค่าว่าอยู่ในฝั่งลูกค้าแล้ว
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // หรือแสดง loading indicator ก็ได้
  }
  const products = [
    {
      id: 1,
      name: "MONITOR (จอมอนิเตอร์) LG ULTRAGEAR 24GS50F-B - 23.8 VA FHD 180Hz",
      price: "฿3,990",
      imageUrl:
        "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products45446_800.jpg",
      link: "https://ihavecpu.com/product/19485/monitor-(%E0%B8%88%E0%B8%AD%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%B4%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C)-lg-ultragear-24gs50f-b-23.8-va-fhd-180hz-(3y)",
    },
    {
      id: 2,
      name: "MONITOR (จอมอนิเตอร์) GIGABYTE GS27FA - 27 IPS FHD 180Hz (3Y)",
      price: "฿5,190",
      imageUrl:
        "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products53156_800.jpg",
      link: "#",
    },
    {
      id: 3,
      name: "MONITOR (จอมอนิเตอร์) LG ULTRAGEAR 24GS50F-B - 23.8 VA FHD 180Hz",
      price: "฿3,990",
      imageUrl:
        "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products45446_800.jpg",
      link: "#",
    },
    {
      id: 4,
      name: "MONITOR (จอมอนิเตอร์) LG ULTRAGEAR 24GS50F-B - 23.8 VA FHD 180Hz",
      price: "฿3,990",
      imageUrl:
        "https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products45446_800.jpg",
      link: "#",
    },
  ];

  return (
    <div>
      <Menu />
      <div className="bg-white flex justify-end mt-6 mr-10 ">
        <Information />
      </div>
      <div className="w-full h-[55%] bg-white mt-10">
        <div className="flex justify-center items-center">
          {products.map((product, index) => (
            <div
              key={index}
              className="w-72 p-4 border border-gray-200 rounded-lg shadow-lg h-[450px] mr-4"
            >
              <a href={product.link}>
                <button className="w-full">
                  <div className="h-auto w-56 overflow-hidden mx-auto">
                    <img
                      src={product.imageUrl}
                      className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125 mt-2 relative z-20" // ตั้ง z-index ให้ hover อยู่ข้างหลัง backdrop
                    />
                  </div>
                  <h1 className="text-left mt-2 font-semibold">
                    {product.name}
                  </h1>
                  <h1 className="text-left mt-20 text-red-500 font-semibold">
                    {product.price}
                  </h1>
                </button>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Monitor;
