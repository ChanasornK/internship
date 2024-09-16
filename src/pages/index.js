import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Searchform from "./component/Searchform";
import Slide from "./Slide";
import ProfileToggle from "./component/ProfileToggle";
import { BiSolidCategory } from "react-icons/bi";
import { BsFillEmojiSmileFill } from "react-icons/bs";
import { GrLogin } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa6";
import { SiReactos } from "react-icons/si";
import LoadingModal from "./component/loading";
import SuccessPopup from "./SuccessPopup"; // Import the SuccessPopup component
import AutoSlider from "./AutoSlider";
import Logo from "./IT/Logo";
const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for success popup
  const handleNavigation = (path) => {
    setLoading(true);
    router.push(path);
  };
  useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setLoading(false); // ปิด loading เมื่อโหลดข้อมูลเสร็จ
    }, 1000);

    // Check if the login was successful by looking at the query parameters
    if (router.query.loginSuccess === "true") {
      setShowPopup(true); // Show success popup when loginSuccess is true
      // ลบ query ทิ้งเพื่อไม่ให้แสดง popup ซ้ำอีกครั้งเมื่อเปลี่ยนหน้า
      router.replace({ pathname: router.pathname }, undefined, {
        shallow: true,
      });
    }
  }, [router.query]);

  useEffect(() => {
    // Check profile.role from localStorage
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProfile(parsedData);
    }
  }, []);

  // คุณสามารถใช้งาน SuccessPopup ได้ตามเดิม
  const handleHomePage = () => {
    window.location.reload();
  };

  const handleGoRegister = () => {
    localStorage.setItem("profile", JSON.stringify(null));
    router.push("./Register");
  };

  const handleGoLogin = () => {
    localStorage.setItem("profile", JSON.stringify(null));
    router.push("./Login");
  };

  // useEffect(() => {
  //   if (loading) {
  //     return <LoadingModal />;
  //   }

  // }, [loading]);

  return (
    <>
      {loading ? (
        <LoadingModal />
      ) : (
        <div className="w-full h-auto">
          <header className="fixed top-0 left-0 w-full bg-gradient-to-r from-[#6A82FB] to-[#FC5C7D] flex z-50 h-36">
            <div className="w-4/5 ml-24">
              <div className="flex">
                <div
                  className="font-bold font-serif text-4xl cursor-pointer mt-10 h-10 text-white flex items-center group"
                  onClick={handleHomePage}
                >
                  <SiReactos className=" mr-4 transition-transform duration-500 group-hover:rotate-180   group-hover:text-black" />
                  <span className="hover:text-black">ReviewZone</span>
                </div>

                <Searchform />
              </div>
            </div>
            <div>
              {profile ? (
                <div className="mr-2 mt-2">
                  <ProfileToggle profile={profile} />
                </div>
              ) : (
                <div className="flex ml-10 mt-8 mx-auto">
                  <button
                    onClick={handleGoLogin}
                    className="bg-gray-200 text-purple-600 h-10 px-4 rounded-lg hover:bg-purple-300 flex items-center border-2 border-purple-600 font-sans"
                  >
                    <GrLogin className="mr-2" />
                    Login
                  </button>
                  <button
                    onClick={handleGoRegister}
                    className="bg-gray-200 text-pink-600 h-10 px-4 rounded-lg hover:bg-pink-300 flex items-center border-2 border-pink-600 font-sans ml-3 text-nowrap mr-3"
                  >
                    <FaUserPlus className="mr-1" />
                    Sign up
                  </button>
                </div>
              )}
            </div>
          </header>

          <div className="w-full h-[55%] bg-stone-100  ">
            <div className="pt-44 ">
              <AutoSlider />
            </div>
            <div className="mt-56 ml-44">
              <Logo />
            </div>
            <div className="flex items-center font-medium text-xl font-sans px-4 py-2 ml-48 pt-8 mt-4">
              <BiSolidCategory className="mr-2 text-purple-600 mt-1" />
              <span>หมวดหมู่สินค้า</span>
            </div>
            <div className="flex justify-center items-center mt-10">
              <div
                className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-blue-300 hover:to-pink-300 cursor-pointer"
                onClick={() => handleNavigation("./IT/Monitor")}
              >
                <div className="h-40 w-56">
                  <img
                    src="https://www.autonetpc.com/wp-content/uploads/2023/07/imageedit_1_9528890449.png"
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-medium text-lg font-sans text-center">
                    Monitor
                  </h1>
                </div>
              </div>

              <div
                className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-blue-300 hover:to-pink-300 cursor-pointer"
                onClick={() => handleNavigation("./IT/Notebook")}
              >
                <div className="h-40 w-56">
                  <img
                    src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/455827025_553516126998035_2811257514390542398_n.png?stp=dst-png_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGW82o8UJRooopHTNTp3dTCgnM2pRHP5PeCczalEc_k91NoHJkEpEoBcuNSs3-uQDBMOtpq-UNKHfnbr8hgGl5p&_nc_ohc=GKrTlcFXbFIQ7kNvgGRGcJL&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QGa_1LFTEU4bxeOxeopSXqXa9bQ4HfNA1dz9QAnCurCPg&oe=66EBB911"
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-medium text-lg font-sans text-gray-800 text-center">
                    Notebook
                  </h1>
                </div>
              </div>

              <div
                className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-blue-300 hover:to-pink-300 cursor-pointer"
                onClick={() => handleNavigation("./IT/Ram")}
              >
                <div className="h-40 w-56">
                  <img
                    src="https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458775275_1853795235148550_8265704230189766468_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEIATptC4-2qRbykpzeRO425ozDkelu_MvmjMOR6W78y78SZ9pCnqFOJamgbITGez6tm5Rx7BpRbzYztoK5YnM1&_nc_ohc=oDS7IbsZJ0MQ7kNvgEwDAR5&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=Al5B7BANIrw7moorXV_ETBT&oh=03_Q7cD1QFemRLB21U_AGK5W-ve5WOfSKRJXBuNVwvXBbHVYl6yqA&oe=670A1C5F"
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-medium text-lg font-sans text-center">
                    Ram
                  </h1>
                </div>
              </div>

              <div
                className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-blue-300 hover:to-pink-300 cursor-pointer"
                onClick={() => handleNavigation("./IT/cpu")}
              >
                <div className="h-40 w-56">
                  <img
                    src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/454013932_8045529075567082_7996735512788385954_n.png?stp=dst-png_p206x206&_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHf-NhX6KAjpZmMhCPame2giOb1XGAXTxmI5vVcYBdPGVOj4A-BqkHMJvQ9kQALhbl6yIQGSe1S93UwAMMJPwkZ&_nc_ohc=PkX6LE4uJrYQ7kNvgGzGnOd&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QFFLiKRRWWbmmmMG7vpdvVGSZvMvmld8FBMnl6cDPmIyg&oe=66EBB7DF"
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-medium text-lg font-sans text-center">
                    CPU
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-[55%] bg-stone-100 ">
            <div className="flex justify-center items-center">
              <div
                className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-pink-200 to-blue-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-pink-300 hover:to-blue-300 cursor-pointer"
                onClick={() => handleNavigation("./IT/Graphic")}
              >
                <div className="h-40 w-56">
                  <img
                    src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/454100142_1695084344660877_1592313795624777958_n.png?stp=dst-png_p206x206&_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHZHLTMbJiPxni0JbXzUfWxLbpse851V4stumx7znVXixRqXnVCia0EGkcb9EXEdfz4ocR1wQNGroyd1AZcwFsx&_nc_ohc=KwM8IkSZZRkQ7kNvgFDK4a9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QGm5kfVgsuWmmmkXD7gBkQMqd3F7xumB5xRXIzHXtMfbA&oe=66EBACE5"
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-medium text-lg font-sans text-center">
                    GPU
                  </h1>
                </div>
              </div>

              <div
                className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-pink-200 to-blue-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-pink-300 hover:to-blue-300 cursor-pointer"
                onClick={() => handleNavigation("./IT/Mouse")}
              >
                <div className="h-40 w-56">
                  <img
                    src="https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/pro-x-superlight-2/gallery-1-pro-x-superlight-2-gaming-mouse-black.png?v=1"
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-medium text-lg font-sans text-center">
                    Mouse
                  </h1>
                </div>
              </div>

              <div
                className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-pink-200 to-blue-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-pink-300 hover:to-blue-300 cursor-pointer"
                onClick={() => handleNavigation("./IT/Keyboard")}
              >
                <div className="h-40 w-56">
                  <img
                    src="https://resource.logitech.com/content/dam/gaming/en/products/pro-x-keyboard/pro-x-keyboard-gallery-1.png"
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-medium text-lg font-sans text-center">
                    Keyboard
                  </h1>
                </div>
              </div>

              <div
                className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-pink-200 to-blue-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-pink-300 hover:to-blue-300 cursor-pointer"
                onClick={() => handleNavigation("./IT/Mainboard")}
              >
                <div className="h-40 w-56">
                  <img
                    src="https://dlcdnwebimgs.asus.com/gain/A3777166-EF70-4D33-915B-EC65CF77CAE5/w1000/h732"
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-medium text-lg font-sans text-center">
                    Mainboard
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-100  w-full h-[500px] overflow-hidden">
            <div className="flex items-center font-medium text-xl font-sans px-4 py-2 ml-48 mt-4">
              <BsFillEmojiSmileFill className="mr-3 text-pink-600" />
              Mostview
            </div>

            <Slide />
          </div>

          {/* Show success popup if login was successful */}
          {showPopup && (
            <SuccessPopup
              message="Login Successful!"
              showPopup={showPopup}
              onClose={() => setShowPopup(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Index;
