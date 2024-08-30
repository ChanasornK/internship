import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const ProfileToggle = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const router = useRouter();

  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
      setProfile(profile?.userData);
      console.log("profile", profile);
      const role = profile?.userData?.role;
      console.log("User role:", role);
    }
  }, []);

  const handleSignout = () => {
    localStorage.setItem("profile", JSON.stringify(null));
    window.location.reload();
  };

  const handleChangeAccout = () => {
    localStorage.setItem("profile", JSON.stringify(null));
    router.push("../Login");
  };

  const defaultPhotoURL =
    "https://tse3.mm.bing.net/th?id=OIP.t3ZYddn7rbYeCEhF5h0DiwHaHa&pid=Api&P=0&h=220";

  return (
    <>
      <div className="relative text-left flex">
        <button
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          type="button"
          className="relative text-left flex"
          onClick={toggleDropdown}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border border-grey mt-8 ml-0">
            <img
              src={profile?.photoURL || defaultPhotoURL}
              className="object-fill"
            />
          </div>
          <div className="w-auto h-10 mt-8 ml-2 flex justify-center items-center mr-3 text-black font-medium text-base font-sans">
            <span className="whitespace-nowrap">
              {profile?.displayName || profile?.email}
            </span>
          </div>
        </button>
        {isDropdownOpen && (
          <div
            id="dropdownAction"
            className="absolute mt-20 w-48 bg-white rounded-md shadow-lg dark:bg-gray-800 left-1/2 transform -translate-x-1/2"
          >
            <ul
              className="py-1 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownActionButton"
            >
              <div className="px-2 mt-[2px] flex">
                <button
                  onClick={handleChangeAccout}
                  className="w-[100%]  px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 flex justify-center"
                >
                  <svg
                    className="w-5 h-5 mr-2 text-gray-800 dark:text-white"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Change Account
                </button>
              </div>
              <li>
                <button
                  onClick={handleSignout}
                  className="w-[100%]  px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 flex justify-center"
                >
                  <div className="mt-[2px]">
                    <svg
                      className="w-4 h-4 mr-7 text-gray-800 dark:text-white flex items-center justify-center"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 16 16"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4 8h11m0 0-4-4m4 4-4 4m-5 3H3a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3"
                      />
                    </svg>
                  </div>
                  <div className="mr-3">Sign Out</div>
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
