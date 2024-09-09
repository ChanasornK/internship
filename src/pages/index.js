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
import { LuMonitor } from "react-icons/lu";
const Index = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);
  const [showPopup, setShowPopup] = useState(false); // State for success popup
  const handleNavigation = (path) => {
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

  // Show the loading modal while the page is loading
  if (loading) {
    return <LoadingModal />;
  }

  return (
    <div className="w-full h-auto">
      <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-purple-500 to-pink-300 flex z-50 h-36">
        <div className="w-4/5 ml-24">
          <div className="flex">
            <div
              className="font-bold font-serif text-4xl cursor-pointer mt-10 h-10 text-white flex items-center"
              onClick={handleHomePage}
            >
             <SiReactos className="mr-4 " />
              Reviews
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

      <div className="w-full h-[55%] bg-[#F8F5FD] ">
        <div className="pt-44 ">
          <AutoSlider />
        </div>

        <div className="flex items-center font-medium text-xl font-sans px-4 py-2 ml-48 pt-10 mt-48">
          <BiSolidCategory className="mr-2 " />
          หมวดหมู่สินค้า
        </div>

        <div className="flex justify-center items-center mt-10">
          <div className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-blue-300 hover:to-pink-300">
            <button onClick={() => handleNavigation("./IT/Monitor")}>
              <div className="h-40 w-56">
                <img
                  src="https://scontent-atl3-2.xx.fbcdn.net/v/t1.15752-9/455781387_996798958857539_7944499843495434905_n.png?stp=dst-png_p206x206&_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeFdj4wovrUL7vG0mFtHv4t6zwWf7y8pTUHPBZ_vLylNQVqIDZ3jgoKil3-ryVZUJm7OAdlfibq0efQ40lrDMG7S&_nc_ohc=GGZTEIvtp2AQ7kNvgFEw5tg&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-2.xx&oh=03_Q7cD1QGJominLjV8mSShhZgc4hhmOTHQsKpTnDMschd1TQuWDw&oe=66EBC72E"
                  className="w-full h-full object-cover"
                />
                <h1 className="font-medium text-lg font-sans">Monitors</h1>
              </div>
            </button>
          </div>

          <div className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-blue-400 hover:to-pink-400">
            <button onClick={() => handleNavigation("./IT/Laptop")}>
              <div className="h-40 w-56 ">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/455827025_553516126998035_2811257514390542398_n.png?stp=dst-png_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGW82o8UJRooopHTNTp3dTCgnM2pRHP5PeCczalEc_k91NoHJkEpEoBcuNSs3-uQDBMOtpq-UNKHfnbr8hgGl5p&_nc_ohc=GKrTlcFXbFIQ7kNvgGRGcJL&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QGa_1LFTEU4bxeOxeopSXqXa9bQ4HfNA1dz9QAnCurCPg&oe=66EBB911"
                  className="w-full h-full object-cover  "
                />
                <h1 className="font-medium text-lg font-sans  text-gray-800">
                  Laptops
                </h1>
              </div>
            </button>
          </div>

          <div className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-blue-400 hover:to-pink-400">
            <button onClick={() => handleNavigation("./IT/Ram")}>
              <div className="h-40 w-56">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/454741255_2830441413922118_486956867719846047_n.png?stp=dst-png_p206x206&_nc_cat=103&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHyHevdOtuT0Fi5pbL8eQz998iF7J9f6Yn3yIXsn1_piUO57erntEwbafcTUH2QWcrbgnCGSoKI_FJDYrMhndLl&_nc_ohc=YFGUwmaYdEEQ7kNvgGDf58f&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QGyFa_p8wu4CjLc3kJmMtvtpDgZbskxz78uLhxyc5BVWw&oe=66EBCC56"
                  className="w-full h-full object-cover"
                />
                <h1 className="font-medium text-lg font-sans ">Ram</h1>
              </div>
            </button>
          </div>

          <div className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 flex items-center justify-center mr-2 mb-2 hover:bg-gradient-to-t hover:from-blue-400 hover:to-pink-400">
            <button onClick={() => handleNavigation("./IT/cpu")}>
              <div className="h-40 w-56">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/454013932_8045529075567082_7996735512788385954_n.png?stp=dst-png_p206x206&_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHf-NhX6KAjpZmMhCPame2giOb1XGAXTxmI5vVcYBdPGVOj4A-BqkHMJvQ9kQALhbl6yIQGSe1S93UwAMMJPwkZ&_nc_ohc=PkX6LE4uJrYQ7kNvgGzGnOd&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QFFLiKRRWWbmmmMG7vpdvVGSZvMvmld8FBMnl6cDPmIyg&oe=66EBB7DF"
                  className="w-full h-full object-cover"
                />
                <h1 className="font-medium text-lg font-sans">CPU</h1>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-[55%] bg-[#F8F5FD]">
        <div className="flex justify-center items-center">
          <div className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-pink-200 to-blue-200 h-64 flex items-center justify-center mr-2 mb-2">
            <button onClick={() => handleNavigation("./IT/Graphic")}>
              <div className="h-40 w-56">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/454100142_1695084344660877_1592313795624777958_n.png?stp=dst-png_p206x206&_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHZHLTMbJiPxni0JbXzUfWxLbpse851V4stumx7znVXixRqXnVCia0EGkcb9EXEdfz4ocR1wQNGroyd1AZcwFsx&_nc_ohc=KwM8IkSZZRkQ7kNvgFDK4a9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QGm5kfVgsuWmmmkXD7gBkQMqd3F7xumB5xRXIzHXtMfbA&oe=66EBACE5"
                  className="w-full h-full object-cover"
                />
                <h1 className="font-medium text-lg font-sans">Graphic Card</h1>
              </div>
            </button>
          </div>

          <div className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-pink-200 to-blue-200 h-64 flex items-center justify-center mr-2 mb-2">
            <button onClick={() => handleNavigation("./IT/Mouse")}>
              <div className="h-40 w-56">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/370225849_1041626030487065_5887468006243962269_n.png?stp=dst-png_p206x206&_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeG8dNuUOdTpyx1CU0t1QUP4uhWPR3Rov6K6FY9HdGi_opYYzES2uml2vdLbDRroTHuqcxv7sKINVRDj5oyphFFh&_nc_ohc=WJ6A5jWB-cgQ7kNvgFsFwHW&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QEqOwMQCvpDL28Zd4avahbU3VlCtYyod5QFOuO_KoreaA&oe=66EBB3F7"
                  className="w-full h-full object-cover"
                />
                <h1 className="font-medium text-lg font-sans">Mouse</h1>
              </div>
            </button>
          </div>

          <div className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-pink-200 to-blue-200 h-64 flex items-center justify-center mr-2 mb-2">
            <button onClick={() => handleNavigation("./IT/Keyboard")}>
              <div className="h-40 w-56">
                <img
                  src="https://scontent-atl3-2.xx.fbcdn.net/v/t1.15752-9/346103947_539803734793246_515299174836356142_n.png?stp=dst-png_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEWJEnmvmoBtHWORVULRu3WcdNsGeDdFIFx02wZ4N0UgRz_8QbEe_wvH3GnUPkna_-cIdlo4eFxIMJOgnaG70iz&_nc_ohc=4HL-bJofi5YQ7kNvgF9TjDw&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-2.xx&oh=03_Q7cD1QFbMIUwr9GBLjKnoypskL_WWgQnFyV-sD1ssbbdLzfxKA&oe=66EBBE45"
                  className="w-full h-full object-cover"
                />
                <h1 className="font-medium text-lg font-sans ">Keyboard</h1>
              </div>
            </button>
          </div>

          <div className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-pink-200 to-blue-200 h-64 flex items-center justify-center mr-2 mb-2">
            <button onClick={() => handleNavigation("./IT/Mainboard")}>
              <div className="h-40 w-56">
                <img
                  src="https://scontent-atl3-2.xx.fbcdn.net/v/t1.15752-9/456104035_483817987744850_1471080268211175341_n.png?stp=dst-png_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeE4zUiQpfzQcb91TCa9m-B-eztp9zvv2p97O2n3O-_an9KUE6SHvOe-HovDmzLcJdVUUy_yVpEAYGdAWH_SAZuJ&_nc_ohc=FOfjzCS7N8UQ7kNvgEZQemK&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-2.xx&oh=03_Q7cD1QGhg5zR5KnANCJT86hf9cQ82mzUydBn2K4xMXx6xVJ4CA&oe=66EBAC57"
                  className="w-full h-full object-cover"
                />
                <h1 className="font-medium text-lg font-sans">Mainboard</h1>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="bg-[#F8F5FD] w-full h-[500px] overflow-hidden">
        <div className="flex items-center font-medium text-xl font-sans px-4 py-2 ml-48 mt-4">
          <BsFillEmojiSmileFill className="mr-3" />
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
  );
};

export default Index;
