import React, { useState } from "react";
import { Dropdown } from "flowbite-react";

const Dropdownz = ({ onSelectItem }) => {
  const [selectedItem, setSelectedItem] = useState("Type");

  const handleSelect = (item) => {
    setSelectedItem(item);
    onSelectItem(item);
  };

  return (
    <div className="relative ml-10 mt-5 bg-gray-50 w-24 ">
      <Dropdown
        label={<span className="text-gray-700 ">{selectedItem}</span>}
        dismissOnClick={true}
        className="z-10 "
      >
        <div className="h-32 max-h-48 overflow-y-auto   ">
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
            onClick={() => handleSelect("Graphic Card")}
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
