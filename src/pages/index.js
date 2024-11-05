import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Searchform from "../component/Searchform";
import Slide from "./Slide";
import ProfileToggle from "../component/ProfileToggle";
import { GrLogin } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa6";
import LoadingModal from "../component/loading";
import SuccessPopup from "./SuccessPopup"; // Import the SuccessPopup component
import AutoSlider from "./AutoSlider";
import Head from "next/head";
import Logo from "./IT/Logo";
import Menu from "./component/Menu";
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
    }, 500);
  }, [router.query]);
  useEffect(() => {
    // ตรวจสอบว่า login สำเร็จจาก localStorage หรือไม่
    if (localStorage.getItem("loginSuccess") === "true") {
      setShowPopup(true); // แสดงป๊อปอัปเมื่อ loginSuccess เป็น true
      localStorage.removeItem("loginSuccess"); // ลบข้อมูลหลังแสดงผลเพื่อไม่ให้แสดงอีกครั้ง
    }
  }, []);

  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setProfile(parsedData);
    }
  }, []);
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
  const imageUrl = {
    MonitorUrl: "/Item/Monitor.png",
    NotebookUrl: "/Item/Notebook.png",
    Ram: "/Item/Ram1.png",
    Cpu: "/Item/CPU.png",
    Gpu: "/Item/GPU.png",
    Mouse: "/Item/Mouse.png",
    Keyboard: "/Item/Keyboard.png",
    Mainboard: "/Item/Mainboard.png",
    imageProfileWeb: "/Profile.png",
    iconproduct: "/getergory.png",
    mostview: "/K1.png",
  };

  return (
    <>
      <Head>
        <title>ReviewZone</title>
        <link
          rel="icon"
          href="https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458802193_443422025395135_5023098190288504627_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGsvhUqiFI2qfwLotyWmZhEHd1t-B62SgQd3W34HrZKE4xCsI1KQ3Ujgl8xM6tYkfrHIPiZqWI6QkxmepUb6zn&_nc_ohc=QOH9wPGvvU0Q7kNvgG3q1YJ&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=AIjsg8BkR9RPCPVN4o52Vzj&oh=03_Q7cD1QHZnrRI-bLWf-7dxyKZ1kf1jHuINieX_YjZdvCUTAXf3Q&oe=6710882F"
          className="Kuromi "
        />
      </Head>
      {loading ? (
        <LoadingModal />
      ) : (
        <div className="w-full h-auto">
          <Menu />
          <div className="w-full h-[55%] bg-stone-100  ">
            <div className="pt-44 ">
              <AutoSlider />
            </div>
            <div className="mt-56 ml-44">
              <Logo />
            </div>
            <div className="flex items-center font-medium text-xl font-sans px-4 py-2 ml-48 pt-8 mt-4">
              <div className="font-medium font-sansew text-xl  h-10 text-black flex items-center ">
                <img src={imageUrl.iconproduct} className=" mr-3" />
              </div>
              <span>หมวดหมู่สินค้า</span>
            </div>
            <div className="flex justify-center items-center mt-10">
              <div
                className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-blue-300 hover:to-pink-300 cursor-pointer"
                onClick={() => handleNavigation("./IT/Monitor")}
              >
                <div className="h-40 w-56">
                  <img
                    src={imageUrl.MonitorUrl}
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-semibold  text-lg font-sans text-center text-pink-500">
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
                    src={imageUrl.NotebookUrl}
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-semibold  text-lg font-sans text-pink-500 text-center ">
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
                    src={imageUrl.Ram}
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-semibold  text-lg font-sans text-center text-pink-500">
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
                    src={imageUrl.Cpu}
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-semibold  text-lg font-sans text-center text-pink-500">
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
                    src={imageUrl.Gpu}
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-semibold  text-lg font-sans text-center text-blue-600">
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
                    src={imageUrl.Mouse}
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-semibold  text-lg font-sans text-center text-blue-600">
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
                    src={imageUrl.Keyboard}
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-semibold  text-lg font-sans text-center text-blue-600">
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
                    src={imageUrl.Mainboard}
                    className="w-full h-full object-cover"
                  />
                  <h1 className="font-semibold text-lg font-sans text-center text-blue-600">
                    Mainboard
                  </h1>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-stone-100  w-full h-[500px] overflow-hidden pb-10">
            <div className="flex items-center font-medium text-xl font-sans px-4 py-2 ml-48 mt-4 ">
              <div className="font-medium font-sansew text-xl  h-10 text-black flex items-center ">
                <img src={imageUrl.mostview} className=" mr-4" />
                <span className="text-black mt-1 text-nowrap">Most View</span>
              </div>
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
