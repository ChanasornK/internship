import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Searchform from "./component/Searchform";
import Slide from "./Slide";
import { Button } from "flowbite-react";
import ProfileToggle from "./component/ProfileToggle";
import axios from "axios";
import Menu from "./component/Menu";
const index = () => {
  const handleCpu = () => {
    router.push("./IT/Cpu");
  };
  const handleMainboard = () => {
    router.push("./IT/Mainboard");
  };
  const handleKeyboard = () => {
    router.push("./IT/Keyboard");
  };
  const handleGraphic = () => {
    router.push("./IT/Graphic");
  };
  const handleMouse = () => {
    router.push("./IT/Mouse");
  };
  const handleLaptop = () => {
    router.push("./IT/Laptop");
  };
  const router = useRouter();
  const handleHomePage = () => {
    window.location.reload();
  };
  const handleRam = () => {
    router.push("./IT/Ram");
  };
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
    const storedData = localStorage.getItem("profile");
    console.log(storedData);
    if (storedData) {
      setUserProfile(JSON.parse(storedData));
    }
  }, []);
  console.log(profile);
  const handleMonitor = () => {
    router.push("./IT/Monitor");
  };
  console.log(userProfile);
  return (
    <div className="w-full h-auto  ">
      <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-purple-400 to-pink-300  flex z-50 h-36">
        <div className=" w-4/5 ml-24 ">
          <div className=" flex">
            <span
              className="font-bold font-serif text-4xl cursor-pointer mt-10 h-10 text-white "
              onClick={handleHomePage}
            >
              Review.com
            </span>
            <Searchform />
          </div>
        </div>
        <div>
          {profile ? (
            <div className="mr-2 mt-2">
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
      <div className=" w-full h-[55%] bg-[#F8F5FD] mt-36  ">
        <div className="ml-52 font-medium text-xl font-sans px-6 pt-10 flex items-center">
          <svg
            className="w-6 h-6 text-gray-800 dark:text-white mr-3"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            fill="#FF8FAB"
            viewBox="0 0 24 24"
          >
            <path
              fillRule="evenodd"
              d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2ZM7 12.5a.5.5 0 0 1 .495.43.762.762 0 0 0 .157.096c.213.106.553.208 1.005.295.896.173 2.111.262 3.343.262 1.232 0 2.447-.09 3.343-.262.452-.087.792-.19 1.006-.295a.764.764 0 0 0 .156-.096.5.5 0 0 1 .995.07c0 1.19-.644 2.438-1.618 3.375C14.9 17.319 13.531 18 12 18c-1.531 0-2.9-.681-3.882-1.625C7.144 15.438 6.5 14.19 6.5 13a.5.5 0 0 1 .5-.5Zm9.519.417l.003-.004-.003.004Zm-9.038 0a.017.017 0 0 1-.003-.004l.003.004Zm.901-4.853L9 6.81l.619 1.253 1.381.2-1 .976.236 1.376-1.237-.65-1.235.65L8 9.239l-1-.975 1.382-.2Zm6 0L15 6.81l.619 1.253 1.381.2-1 .976.236 1.376-1.237-.65-1.235.65L14 9.239l-1-.975 1.382-.2Z"
              clipRule="evenodd"
            />
          </svg>
          หมวดหมู่สินค้า
        </div>

        <div className="flex justify-center items-center mt-12">
          <div className="rounded-lg w-80 p-4 border-2 border-solid bg-gradient-to-t from-blue-200 to-pink-200 h-64 w-42 flex items-center justify-center mr-2 mb-2">
            <button onClick={handleMonitor}>
              <div className="h-40 w-56">
                <img
                  src="https://scontent-atl3-2.xx.fbcdn.net/v/t1.15752-9/455781387_996798958857539_7944499843495434905_n.png?stp=dst-png_p206x206&_nc_cat=101&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeFdj4wovrUL7vG0mFtHv4t6zwWf7y8pTUHPBZ_vLylNQVqIDZ3jgoKil3-ryVZUJm7OAdlfibq0efQ40lrDMG7S&_nc_ohc=GGZTEIvtp2AQ7kNvgFEw5tg&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-2.xx&oh=03_Q7cD1QGJominLjV8mSShhZgc4hhmOTHQsKpTnDMschd1TQuWDw&oe=66EBC72E"
                  className="w-full h-full object-cover"
                />
                <h1 className="font-medium text-lg font-sans">Monitors</h1>
              </div>
            </button>
          </div>

          <div className="rounded-lg w-80  p-4 border-2 border-solid  bg-gradient-to-t from-blue-200 to-pink-200  h-64 w-42 flex items-center justify-center mr-2 mb-2">
            <button onClick={handleLaptop}>
              <div className="  h-40 w-56">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/455827025_553516126998035_2811257514390542398_n.png?stp=dst-png_p206x206&_nc_cat=100&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeGW82o8UJRooopHTNTp3dTCgnM2pRHP5PeCczalEc_k91NoHJkEpEoBcuNSs3-uQDBMOtpq-UNKHfnbr8hgGl5p&_nc_ohc=GKrTlcFXbFIQ7kNvgGRGcJL&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QGa_1LFTEU4bxeOxeopSXqXa9bQ4HfNA1dz9QAnCurCPg&oe=66EBB911"
                  className="w-full h-full object-cover"
                ></img>
                <h1 className="font-medium text-lg font-sans">Laptops</h1>
              </div>
            </button>
          </div>
          <button onClick={handleRam}>
            <div className=" rounded-lg w-80  p-4 border-2 border-solid  bg-gradient-to-t from-blue-200 to-pink-200  h-64 w-42 flex items-center justify-center mr-2 mb-2">
              <div className="  h-40 w-56">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/454741255_2830441413922118_486956867719846047_n.png?stp=dst-png_p206x206&_nc_cat=103&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHyHevdOtuT0Fi5pbL8eQz998iF7J9f6Yn3yIXsn1_piUO57erntEwbafcTUH2QWcrbgnCGSoKI_FJDYrMhndLl&_nc_ohc=YFGUwmaYdEEQ7kNvgGDf58f&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QGyFa_p8wu4CjLc3kJmMtvtpDgZbskxz78uLhxyc5BVWw&oe=66EBCC56"
                  className="w-full h-full object-cover"
                ></img>
                <h1 className="font-medium text-lg font-sans">Ram</h1>
              </div>
            </div>
          </button>
          <button onClick={handleCpu}>
            <div className="rounded-lg w-80  p-4 border-2 border-solid  bg-gradient-to-t from-blue-200 to-pink-200  h-64 w-42 flex items-center justify-center mr-2 mb-2">
              <div className="  h-40 w-56">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/454013932_8045529075567082_7996735512788385954_n.png?stp=dst-png_p206x206&_nc_cat=106&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHf-NhX6KAjpZmMhCPame2giOb1XGAXTxmI5vVcYBdPGVOj4A-BqkHMJvQ9kQALhbl6yIQGSe1S93UwAMMJPwkZ&_nc_ohc=PkX6LE4uJrYQ7kNvgGzGnOd&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QFFLiKRRWWbmmmMG7vpdvVGSZvMvmld8FBMnl6cDPmIyg&oe=66EBB7DF"
                  className="w-full h-full object-cover"
                ></img>
                <h1 className="font-medium text-lg font-sans">CPU</h1>
              </div>
            </div>
          </button>
        </div>
      </div>
      <div className=" w-full h-[55%] bg-[#F8F5FD]  ">
        <div className="flex justify-center items-center">
          <div className=" rounded-lg w-80  p-4 border-2 border-solid  bg-gradient-to-t from-pink-200 to-blue-200  h-64 w-42 flex items-center justify-center mr-2 mb-2">
            <button onClick={handleGraphic}>
              <div className="  h-40 w-56">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/454100142_1695084344660877_1592313795624777958_n.png?stp=dst-png_p206x206&_nc_cat=108&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeHZHLTMbJiPxni0JbXzUfWxLbpse851V4stumx7znVXixRqXnVCia0EGkcb9EXEdfz4ocR1wQNGroyd1AZcwFsx&_nc_ohc=KwM8IkSZZRkQ7kNvgFDK4a9&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QGm5kfVgsuWmmmkXD7gBkQMqd3F7xumB5xRXIzHXtMfbA&oe=66EBACE5"
                  className="w-full h-full object-cover"
                ></img>
                <h1 className="font-medium text-lg font-sans">Graphic Card</h1>
              </div>
            </button>
          </div>
          <div className="rounded-lg w-80  p-4 border-2 border-solid  bg-gradient-to-t from-pink-200 to-blue-200  h-64 w-42 flex items-center justify-center mr-2 mb-2">
            <button onClick={handleMouse}>
              <div className="  h-40 w-56">
                <img
                  src="https://scontent-atl3-1.xx.fbcdn.net/v/t1.15752-9/370225849_1041626030487065_5887468006243962269_n.png?stp=dst-png_p206x206&_nc_cat=107&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeG8dNuUOdTpyx1CU0t1QUP4uhWPR3Rov6K6FY9HdGi_opYYzES2uml2vdLbDRroTHuqcxv7sKINVRDj5oyphFFh&_nc_ohc=WJ6A5jWB-cgQ7kNvgFsFwHW&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-1.xx&oh=03_Q7cD1QEqOwMQCvpDL28Zd4avahbU3VlCtYyod5QFOuO_KoreaA&oe=66EBB3F7"
                  className="w-full h-full object-cover"
                ></img>
                <h1 className="font-medium text-lg font-sans">Mouse</h1>
              </div>
            </button>
          </div>
          <button onClick={handleKeyboard}>
            <div className="rounded-lg w-80  p-4 border-2 border-solid  bg-gradient-to-t from-pink-200 to-blue-200  h-64 w-42 flex items-center justify-center mr-2 mb-2">
              <div className="  h-40 w-56">
                <img
                  src="https://scontent-atl3-2.xx.fbcdn.net/v/t1.15752-9/346103947_539803734793246_515299174836356142_n.png?stp=dst-png_p206x206&_nc_cat=104&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeEWJEnmvmoBtHWORVULRu3WcdNsGeDdFIFx02wZ4N0UgRz_8QbEe_wvH3GnUPkna_-cIdlo4eFxIMJOgnaG70iz&_nc_ohc=4HL-bJofi5YQ7kNvgF9TjDw&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-2.xx&oh=03_Q7cD1QFbMIUwr9GBLjKnoypskL_WWgQnFyV-sD1ssbbdLzfxKA&oe=66EBBE45"
                  className="w-full h-full object-cover"
                ></img>
                <h1 className="font-medium text-lg font-sans">Keyboard</h1>
              </div>
            </div>
          </button>
          <button onClick={handleMainboard}>
            <div className="rounded-lg w-80  p-4 border-2 border-solid  bg-gradient-to-t from-pink-200 to-blue-200  h-64 w-42 flex items-center justify-center mr-2 mb-2">
              <div className="  h-40 w-56">
                <img
                  src="https://scontent-atl3-2.xx.fbcdn.net/v/t1.15752-9/456104035_483817987744850_1471080268211175341_n.png?stp=dst-png_p206x206&_nc_cat=105&ccb=1-7&_nc_sid=0024fc&_nc_eui2=AeE4zUiQpfzQcb91TCa9m-B-eztp9zvv2p97O2n3O-_an9KUE6SHvOe-HovDmzLcJdVUUy_yVpEAYGdAWH_SAZuJ&_nc_ohc=FOfjzCS7N8UQ7kNvgEZQemK&_nc_ad=z-m&_nc_cid=0&_nc_ht=scontent-atl3-2.xx&oh=03_Q7cD1QGhg5zR5KnANCJT86hf9cQ82mzUydBn2K4xMXx6xVJ4CA&oe=66EBAC57"
                  className="w-full h-full object-cover"
                ></img>
                <h1 className="font-medium text-lg font-sans">Mainboard</h1>
              </div>
            </div>
          </button>
        </div>
      </div>

      <div className="bg-[#F8F5FD]  w-full h-[500px] overflow-hidden">
        <h1 className="ml-52 pt-10 mb-10 font-medium text-2xl font-sans ">
          Most View
        </h1>
        <Slide />
      </div>
    </div>
  );
};

export default index;
