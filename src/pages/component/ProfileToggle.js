import React, { useEffect, useState } from "react";
import { Button } from "flowbite-react";
import { useRouter } from "next/router";
const ProfileToggle = ({ profile }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const router = useRouter();
  const handleSignout = () => {
    localStorage.setItem("profile", JSON.stringify(null));
    window.location.reload();
  };
  const defaultPhotoURL =
    "https://tse3.mm.bing.net/th?id=OIP.t3ZYddn7rbYeCEhF5h0DiwHaHa&pid=Api&P=0&h=220";
  return (
    <>
      <div className="relative inline-block text-left flex">
        <button
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          type="button"
          className="relative inline-block text-left flex"
          onClick={toggleDropdown}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border border-grey mt-8 ml-0 ">
            <img
              src={profile?.currentUser?.photoURL || defaultPhotoURL}
              className="object-fill  "
            />
          </div>
          <div className=" w-auto h-10 mt-8 ml-2 flex justify-center items-center mr-3 ">
            <span className="whitespace-nowrap">
              {profile?.currentUser?.displayName || profile?.userData?.email}
            </span>
          </div>
        </button>
        {isDropdownOpen && (
          <div
            id="dropdownAction"
            className="absolute mt-20 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800 left-1/2 transform -translate-x-1/2  "
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <li>
                <button
                  href="#"
                  className="w-[100%] block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600"
                >
                  Change Accout
                </button>
              </li>
              <li>
                <button
                  onClick={handleSignout}
                  className=" w-[100%]  px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 flex justify-center"
                >
                  <div className="px-2 mt-[2px]">
                    <svg
                      className="w-4 h-4 text-gray-800 dark:text-white flex items-center justify-center"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                      />
                    </svg>
                  </div>
                  Sign Out
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfileToggle;
