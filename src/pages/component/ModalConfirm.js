import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { TbAlertCircleFilled } from "react-icons/tb";
import axios from "axios";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";
const ModalConfirm = ({ isOpen, onClose, imageId, dataSource }) => {
  useEffect(() => {
    if (dataSource) {
      setPrice(dataSource.price || "");
      setDetail(dataSource.detail || "");
      setLink(dataSource.link || "");
      setType(dataSource.type || "");
      setRating(dataSource.rating || 0);
      setImage(dataSource?.src || null);
      setImageId(dataSource?.id || null); // Set imageId from dataSource
      // If image URL is provided, you can set it as well
      // setImage(dataSource.image || null);
    }
  }, [dataSource]);

  const deleteImage = async () => {
    try {
      console.log("Deleting image with ID:", imageId); // ตรวจสอบค่า imageId
      const response = await axios.delete("http://localhost:8000/deleteImage", {
        data: { id: imageId },
      });

      console.log("Server response:", response); // ตรวจสอบการตอบกลับจากเซิร์ฟเวอร์

      if (response.status === 200) {
        onClose(); // ปิด Modal หลังจากลบเสร็จสิ้น
        window.location.reload(); // รีเฟรชหน้าเพื่อแสดงข้อมูลที่อัปเดต
      } else {
        alert(response.data.message || "Failed to delete image");
      }
    } catch (error) {
      console.error("Error deleting image:", error);
      alert("Error deleting image");
    }
  };

  return (
    <Modal
      show={isOpen}
      size="md"
      onClose={onClose}
      popup
      backdrop
      className="relative z-50 w-auto max-w-md mx-auto mt-56 p-auto rounded-md " // เพิ่ม rounded-md ตรงนี้
    >
      <Modal.Body className="w-auto rounded-md border-2 border-purple-500  ">
        <Modal.Header className="bg-pink w-auto rounded-md   bg-gradient-to-t from-pink-200 to-pink-200  " />
        <div className="text-center rounded-md  bg-gradient-to-t from-blue-200 to-pink-200 ">
          <TbAlertCircleFilled className="mx-auto mb-4 h-14 w-14  dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">
            คุณต้องการที่จะลบข้อมูลนี้
          </h3>
          <div className="flex justify-center gap-4 py-5">
            <Button
              color=""
              onClick={deleteImage}
              className="flex items-center rounded-md bg-green-400"
            >
              <div className="flex items-center">
                <FaCheck className="mr-2 text-sm " />
                <span className="text-sm">ยืนยัน</span>
              </div>
            </Button>
            <Button
              color=""
              onClick={onClose}
              className="flex items-center rounded-md bg-red-600"
            >
              <div className="flex items-center">
                <ImCross className="mr-2 text-sm " />
                <span className="text-sm">ยกเลิก</span>
              </div>
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfirm;
