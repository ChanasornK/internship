import React from "react";
import { Dropdown } from "flowbite-react";
const Product = () => {
  return (
    <>
      <div className="w-auto ">
        <Dropdown label="หมวดหมู่" placement="bottom">
          <Dropdown.Item>Monitor</Dropdown.Item>
          <Dropdown.Item>Laptop</Dropdown.Item>
          <Dropdown.Item>Ram</Dropdown.Item>
          <Dropdown.Item>CPU</Dropdown.Item>
          <Dropdown.Item>Graphic Card</Dropdown.Item>
          <Dropdown.Item>Mouse</Dropdown.Item>
          <Dropdown.Item>Keyboard</Dropdown.Item>
          <Dropdown.Item>Mainboard</Dropdown.Item>
        </Dropdown>
      </div>
    </>
  );
};

export default Product;
