import React, { useEffect, useState } from "react";
import Menu from "../component/Menu";
import { useRouter } from "next/router";
import { Button } from "flowbite-react";

const Monitor = () => {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // ตั้งค่าว่าอยู่ในฝั่งลูกค้าแล้ว
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null; // หรือแสดง loading indicator ก็ได้
  }

  return (
    <div>
      <Menu />
      <div className="w-full h-[55%] bg-white mt-10">
        <div className="flex justify-center items-center">
          <div className="w-72 p-4 border border-gray-200 rounded-lg shadow-lg h-[450px] mr-4">
            <a href="https://ihavecpu.com/product/19485/monitor-(%E0%B8%88%E0%B8%AD%E0%B8%A1%E0%B8%AD%E0%B8%99%E0%B8%B4%E0%B9%80%E0%B8%95%E0%B8%AD%E0%B8%A3%E0%B9%8C)-lg-ultragear-24gs50f-b-23.8-va-fhd-180hz-(3y)">
              <button className="w-full">
                <div className="h-auto w-56 overflow-hidden mx-auto">
                  <img
                    src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products45446_800.jpg"
                    className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125 mt-2"
                  />
                </div>
                <h1 className="text-left mt-2 font-semibold">
                  MONITOR (จอมอนิเตอร์) LG ULTRAGEAR 24GS50F-B - 23.8 VA FHD
                  180Hz
                </h1>
                <h1 className="text-left mt-20 text-red-500 font-semibold">
                  ฿3,990
                </h1>
              </button>
            </a>
          </div>

          <div className="w-72 p-4 border border-gray-200 rounded-lg shadow-lg h-[450px] mr-4">
            <button className="w-full">
              <div className="h-auto w-56 overflow-hidden mx-auto">
                <img
                  src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products53156_800.jpg"
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125 mt-2"
                />
              </div>
              <h1 className="text-left mt-2 font-semibold">
                MONITOR (จอมอนิเตอร์) GIGABYTE GS27FA - 27 IPS FHD 180Hz (3Y)
              </h1>
              <h1 className="text-left mt-[105px] text-red-500 font-semibold">
                ฿5,190
              </h1>
            </button>
          </div>

          <div className="w-72 p-4 border border-gray-200 rounded-lg shadow-lg h-[450px] mr-4">
            <button className="w-full">
              <div className="h-auto w-56 overflow-hidden mx-auto">
                <img
                  src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products45446_800.jpg"
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125 mt-2"
                />
              </div>
              <h1 className="text-left mt-2 font-semibold">
                MONITOR (จอมอนิเตอร์) LG ULTRAGEAR 24GS50F-B - 23.8 VA FHD 180Hz
              </h1>
              <h1 className="text-left mt-20 text-red-500 font-semibold">
                ฿3,990
              </h1>
            </button>
          </div>

          <div className="w-72 p-4 border border-gray-200 rounded-lg shadow-lg h-[450px] mr-4">
            <button className="w-full">
              <div className="h-auto w-56 overflow-hidden mx-auto">
                <img
                  src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products45446_800.jpg"
                  className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-125 mt-2"
                />
              </div>
              <h1 className="text-left mt-2 font-semibold">
                MONITOR (จอมอนิเตอร์) LG ULTRAGEAR 24GS50F-B - 23.8 VA FHD 180Hz
              </h1>
              <h1 className="text-left mt-20 text-red-500 font-semibold">
                ฿3,990
              </h1>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Monitor;
