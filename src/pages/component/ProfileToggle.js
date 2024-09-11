import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import EditProfile from "./EditProfile"; // Import component EditProfile
import { RiEdit2Fill } from "react-icons/ri";
import { MdPostAdd } from "react-icons/md";
const ProfileToggle = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [profile, setProfile] = useState(null);
  const [openModal, setOpenModal] = useState(false); // เพิ่ม state สำหรับ modal
  const dropdownRef = useRef(null);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
      setProfile(profile?.userData);
    }
  }, []);

  const handleSignout = () => {
    localStorage.setItem("profile", JSON.stringify(null));
    router.push({
      pathname: "./",
      query: { loginSuccess: "false" },
    });
    window.location.reload();
  };

  const handleChangeAccount = () => {
    localStorage.setItem("profile", JSON.stringify(null));
    router.push("../Login");
  };
  const handleMyReview = () => {
    router.push("../Myreview");
  };
  const handleEditProfile = () => {
    setOpenModal(true); // เปิด modal แทนการ redirect
  };

  const defaultPhotoURL =
    "https://tse3.mm.bing.net/th?id=OIP.t3ZYddn7rbYeCEhF5h0DiwHaHa&pid=Api&P=0&h=220";

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const getProfileImageSrc = () => {
    if (profile?.image?.data) {
      const base64String = arrayBufferToBase64(profile.image.data);
      return `data:image/png;base64,${base64String}`;
    } else {
      return profile?.image || defaultPhotoURL;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);
  console.log(profile);
  return (
    <>
      <div className="relative text-left flex" ref={dropdownRef}>
        <button
          id="dropdownActionButton"
          data-dropdown-toggle="dropdownAction"
          type="button"
          className="relative text-left flex"
          onClick={toggleDropdown}
        >
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-pink-600 mt-8 ml-0">
            <img
              src={getProfileImageSrc()}
              className="object-cover w-full h-full" // Use object-cover to maintain aspect ratio
              alt="Profile Image"
            />
          </div>
          <div className="w-auto h-10 mt-8 ml-2 flex justify-center items-center mr-3 text-white font-medium text-base font-sans">
            <span className="whitespace-nowrap">
              {profile?.username || profile?.displayName || profile?.email}
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
              <li>
                <button
                  onClick={handleEditProfile} // เปิด modal แทนการไปหน้า edit
                  className="w-[100%] px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center "
                >
                  <RiEdit2Fill className="text-lg ml-4" /> {/* ปรับขนาดไอคอน */}
                  <span className="text-sm pl-3">Edit Profile</span>
                </button>
              </li>
              <li>
                <button
                  onClick={handleMyReview} // เปิด modal แทนการไปหน้า edit
                  className="w-[100%] px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center "
                >
                  <MdPostAdd className="text-lg ml-4" /> {/* ปรับขนาดไอคอน */}
                  <span className="text-sm pl-3">MyPost</span>
                </button>
              </li>

              <li>
                <button
                  onClick={handleChangeAccount}
                  className="w-[100%] px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
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
              </li>

              <li>
                <button
                  onClick={handleSignout}
                  className="w-[100%] px-4 py-2 hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center justify-center"
                >
                  <div className="mt-[2px] flex items-center mr-8">
                    <svg
                      className="w-4 h-4 mr-4 text-gray-800 dark:text-white"
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
                    <span className="text-start">Sign Out</span>
                  </div>
                </button>
              </li>
            </ul>
          </div>
        )}
      </div>
      {/* แสดง EditProfile Modal */}
      <EditProfile openModal={openModal} setOpenModal={setOpenModal} />
    </>
  );
};

export default ProfileToggle;
