import { Button } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useState, useEffect, useRef } from "react";
import { PiMonitor } from "react-icons/pi";
import { MdLaptopMac } from "react-icons/md";
import { BsMemory } from "react-icons/bs";
import { LuCpu } from "react-icons/lu";
import { PiGraphicsCard } from "react-icons/pi";
import { PiMouseLight } from "react-icons/pi";
import { FaRegKeyboard } from "react-icons/fa";
import { BsFillMotherboardFill } from "react-icons/bs";
const Product = () => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleNavigation = (path) => {
    router.push(path);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <Button
        className="mt-[150px] bg-gray-200 flex items-center text-black"
        onClick={toggleDropdown}
      >
        หมวดหมู่
        <svg
          className="w-6 h-6 ml-2 text-gray-800 dark:text-white"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m19 9-7 7-7-7"
          />
        </svg>
      </Button>

      <div
        className={`absolute left-0 mt-2 w-48 bg-white rounded-lg transform transition-all duration-300 ease-out ${
          isOpen ? "scale-y-100 opacity-100" : "scale-y-0 opacity-0"
        } origin-top`}
      >
        <ul>
          <li
            onClick={() => handleNavigation("../IT/Monitor")}
            className="py-2 hover:bg-blue-300 cursor-pointer w-full pl-2 flex items-center text-base"
          >
            <PiMonitor className="mr-2" />
            <span className="flex-grow">Monitor</span>
          </li>
          <li
            onClick={() => handleNavigation("../IT/Laptop")}
            className="py-2 hover:bg-blue-300 cursor-pointer w-full pl-2 flex items-center text-base"
          >
            <MdLaptopMac className="mr-2 text-base flex-shrink-0" />
            <span className="flex-grow">Laptop</span>
          </li>

          <li
            onClick={() => handleNavigation("../IT/Ram")}
            className="py-2 hover:bg-blue-300 cursor-pointer w-full pl-2 flex items-center text-base"
          >
            <BsMemory className="mr-2 text-base flex-shrink-0" />
            <span className="flex-grow">Ram</span>
          </li>
          <li
            onClick={() => handleNavigation("../IT/Cpu")}
            className="py-2 hover:bg-blue-300 cursor-pointer w-full pl-2 flex items-center text-base"
          >
            <LuCpu className="mr-2 text-base flex-shrink-0" />
            <span className="flex-grow">CPU</span>
          </li>
          <li
            onClick={() => handleNavigation("../IT/Graphic")}
            className="py-2 hover:bg-blue-300 cursor-pointer w-full pl-2 flex items-center text-base"
          >
            <PiGraphicsCard className="mr-2 text-base flex-shrink-0" />
            <span className="flex-grow">Graphic Card</span>
          </li>
          <li
            onClick={() => handleNavigation("../IT/Mouse")}
            className="py-2 hover:bg-blue-300 cursor-pointer w-full pl-2 flex items-center text-base"
          >
            <PiMouseLight className="mr-2 text-base flex-shrink-0" />
            <span className="flex-grow"> Mouse</span>
          </li>
          <li
            onClick={() => handleNavigation("../IT/Keyboard")}
            className="py-2 hover:bg-blue-300 cursor-pointer w-full pl-2 flex items-center text-base"
          >
            <FaRegKeyboard className="mr-2 text-base flex-shrink-0" />
            <span className="flex-grow"> Keyboard</span>
          </li>
          <li
            onClick={() => handleNavigation("../IT/Mainboard")}
            className="py-2 hover:bg-blue-300 cursor-pointer w-full pl-2 flex items-center text-base"
          >
            <BsFillMotherboardFill className="mr-2 text-base flex-shrink-0" />
            <span className="flex-grow"> Mainboard</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Product;
