import React from "react";
import Searchform from "../component/Searchform";
import { useRouter } from "next/router";
import ProfileToggle from "../component/ProfileToggle";
import { useState, useEffect } from "react";
import Product from "./Product";
import { GrLogin } from "react-icons/gr";
import { FaUserPlus } from "react-icons/fa6";
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
      <header className="fixed top-0 left-0 w-full bg-gradient-to-br from-purple-600 to-pink-300  flex z-50 h-36">
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
                className="bg-gray-200 text-black  h-10 px-2 rounded hover:bg-gray-300 flex items-center border-2 border-pink-500 font-sans"
              >
                <GrLogin className="mr-2" />
                Login
              </button>
              <button
                onClick={handleGoRegister}
                className="bg-gray-200 text-black  h-10 px-2 rounded hover:bg-gray-300 flex items-center border-2 border-pink-500 font-sans ml-3"
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
