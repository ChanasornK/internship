import React, { useState } from "react";
import { Dropdown } from "flowbite-react";
import { IoIosArrowDown } from "react-icons/io";
const Dropdownz = ({ onSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState("Type");

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelectItem(item);
  };

  return (
    <div className="relative ml-10  w-auto text-gray-700 ">
      <Dropdown
        label={<span className="text-pink-600 flex ">{selectedItem}<IoIosArrowDown className=" mt-[5px] ml-2" /></span>}
        dismissOnClick={true}
        className="z-10 "
      >
        <div className="h-32 max-h-48 overflow-y-auto ">
          <Dropdown.Item
            onClick={() => handleSelect("Monitor")}
            className="text-black hover:bg-gradient-to-t from-blue-200 to-pink-200"
          >
            Monitor
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleSelect("Laptop")}
            className="text-black hover:bg-gradient-to-t from-blue-200 to-pink-200"
          >
            Laptop
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleSelect("Ram")}
            className="text-black hover:bg-gradient-to-t from-blue-200 to-pink-2000"
          >
            Ram
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleSelect("CPU")}
            className="text-black hover:bg-gradient-to-t from-blue-200 to-pink-200"
          >
            CPU
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleSelect("Graphic")}
            className="text-black hover:bg-gradient-to-t from-blue-200 to-pink-200"
          >
            Graphic
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleSelect("Mouse")}
            className="text-black hover:bg-gradient-to-t from-blue-200 to-pink-200"
          >
            Mouse
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleSelect("Keyboard")}
            className="text-black hover:bg-gradient-to-t from-blue-200 to-pink-200"
          >
            Keyboard
          </Dropdown.Item>
          <Dropdown.Item
            onClick={() => handleSelect("Mainboard")}
            className="text-black hover:bg-gradient-to-t from-blue-200 to-pink-200"
          >
            Mainboard
          </Dropdown.Item>
        </div>
      </Dropdown>
    </div>
  );
};

export default Dropdownz;
