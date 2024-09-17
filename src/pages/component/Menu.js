import React from "react";
import Searchform from "../component/Searchform";
import { useRouter } from "next/router";
import ProfileToggle from "../component/ProfileToggle";
import { useState, useEffect } from "react";
import Product from "./Product";
import { GrLogin } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa6";
import { SiReactos } from "react-icons/si";

const Menu = () => {
  const handleHomePage = () => {
    router.push("./../");
  };
  const handleGoRegister = () => {
    router.push("../Register");
  };
  const handleGoLogin = () => {
    router.push("../Login");
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
  const router = useRouter();

  return (
    <>
      <header className="fixed top-0 left-0 w-full  bg-gradient-to-r from-[#6A82FB] to-[#FC5C7D] flex z-50 h-36">
        <div className="w-4/5 ml-24">
          <div className="flex">
            <div
              className="font-bold font-serif text-3xl cursor-pointer mt-10 h-10 text-white flex items-center group"
              onClick={handleHomePage}
            >
              <img
                src="https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458802193_443422025395135_5023098190288504627_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGsvhUqiFI2qfwLotyWmZhEHd1t-B62SgQd3W34HrZKE4xCsI1KQ3Ujgl8xM6tYkfrHIPiZqWI6QkxmepUb6zn&_nc_ohc=QOH9wPGvvU0Q7kNvgG3q1YJ&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=AIjsg8BkR9RPCPVN4o52Vzj&oh=03_Q7cD1QHZnrRI-bLWf-7dxyKZ1kf1jHuINieX_YjZdvCUTAXf3Q&oe=6710882F"
                className="mr-4 transition-transform duration-500 group-hover:rotate-180 group-hover:text-black"
              />
              <span className="hover:text-black">ReviewZone</span>
            </div>

            <Searchform />
          </div>
          <div className="absolute top-[90px] w-full">
            <Product />
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
    </>
  );
};

export default Menu;
