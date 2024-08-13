import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Searchform from "./component/Searchform";
import Slide from "./Slide";
import { Button } from "flowbite-react";
import ProfileToggle from "./component/ProfileToggle";
const index = () => {
  const handlecpu =() =>{
    
  }
  const handleGraphic = () => {
    router.push("./IT/Graphic");
  };
  const handleLaptop =() =>{
    router.push("./IT/Laptop");
  }
  const router = useRouter();
  const handleHomePage = () => {
    window.location.reload();
  };
  const handleRam =() =>{
    router.push('./IT/Ram')
  }
  const handleGoRegister = () => {
    router.push("./Register");
  };
  const handleGoLogin = () => {
    router.push("./Login");
  };
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      setProfile(JSON.parse(storedData));
    }
  }, []);
  const [userProfile, setUserProfile] = useState(null);
  useEffect(() => {
    const storedData = localStorage.getItem("userProfile");
    if (storedData) {
      setUserProfile(JSON.parse(storedData));
    }
  }, []);
  console.log(profile);
  const handleMonitor = () => {
    router.push("./IT/Monitor");
  };
  return (
    <div className="">
      <div className="w-full h-auto ">
      <header className="w-full bg-[#FF8FAB] text-white flex">
          <div className="flex  justify-start w-4/5 ml-24  text-white  h-36">
            <button
              className="-mt-[3%] font-bold font-serif text-4xl"
              onClick={handleHomePage}
            >
              IT.com
            </button>
            <Searchform />
          </div>
          <div>
            {profile ? (
              <div className="mr-2">
                <ProfileToggle profile={profile} />
              </div>
            ) : (
              <div className="flex ml-3 mt-8 mx-auto">
                <button
                  onClick={handleGoLogin}
                  className="bg-white text-blue-600 h-10 px-2 rounded hover:bg-[#D1D5DB]/90"
                >
                  เข้าสู่ระบบ
                </button>
                <button
                  onClick={handleGoRegister}
                  className="bg-white text-blue-600 h-10 ml-3 px-2 rounded hover:bg-[#D1D5DB]/90"
                >
                  ลงทะเบียน
                </button>
              </div>
            )}
          </div>
        </header>
        <div>
          <h1 className="ml-32 mt-10 font-medium font-serif text-2xl">
            หมวดหมู่สินค้า
          </h1>
        </div>
        <div className=" w-full h-[55%] bg-white mt-10 ">
          <div className="flex justify-center items-center">
            <div className=" w-80   p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
              <button onClick={handleMonitor}>
                <div className="  h-40 w-56 ">
                  <img
                    src="https://ihcupload.s3.ap-southeast-1.amazonaws.com/img/product/products46916_800.jpg"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Monitors</h1>
                </div>
              </button>
            </div>
            <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
              <button onClick={handleLaptop}>
                <div className="  h-40 w-56">
                  <img
                    src="https://th.store.asus.com/media/catalog/product/g/7/g713-perkey_1__3.jpg?width=439&height=439&store=th_TH&image-type=image"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Laptops</h1>
                </div>
              </button>
            </div>
            <button onClick={handleRam}>
              <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
                <div className="  h-40 w-56">
                  <img
                    src="https://www.jib.co.th/img_master/product/original/20180718092410_30507_21_1.jpg"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Ram</h1>
                </div>
              </div>
            </button>
            <button>
              <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
                <div className="  h-40 w-56">
                  <img
                    src="https://img.advice.co.th/images_nas/pic_product4/A0154877/A0154877OK_BIG_1.jpg"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>CPU</h1>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className=" w-full h-[55%] bg-white  ">
          <div className="flex justify-center items-center">
            <div className=" w-80   p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
              <button onClick={handleGraphic}>
                <div className="  h-40 w-56">
                  <img
                    src="https://image.makewebeasy.net/makeweb/m_1920x0/YLLBGff3K/Zotac/zt_d40720q_10m_image01.jpg"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1 className="">Graphic Card</h1>
                </div>
              </button>
            </div>
            <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
              <button>
                <div className="  h-40 w-56">
                  <img
                    src="https://cdn.ut.in.th/media/catalog/product/cache/5e6411639b53504723017d869741d016/p/r/pro-x-superlight-white-gallery-6_1_1.png"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Mouse</h1>
                </div>
              </button>
            </div>
            <button>
              <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
                <div className="  h-40 w-56">
                  <img
                    src="https://assets.central.co.th//adobe/dynamicmedia/deliver/dm-aid--b45045ee-b880-4d3d-ab57-583d5416ea28/logitech-whitelogitechg715wirelessmechanicalgamingkeyboardswitchlinear-mkp1331482-2.jpg?preferwebp=true&quality=85&width=550"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Keyboard</h1>
                </div>
              </div>
            </button>
            <button>
              <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
                <div className="  h-40 w-56">
                  <img
                    src="https://www.jib.co.th/img_master/product/original/2020092508482042835_1.jpg"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Mainboard</h1>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="bg-white w-full mt-12 font-medium font-serif text-xl">
          <h1 className="ml-32">Most View</h1>
        </div>
        <div className="bg-white w-full h-[600px] mt-12">
          <Slide />
        </div>
      </div>
    </div>
  );
};

export default index;
