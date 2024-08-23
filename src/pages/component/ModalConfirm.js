import React, { useEffect, useState } from "react";
import { Button, Modal } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import axios from "axios";

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
      <Modal.Header className="bg-pink w-auto rounded-md  bg-[#fce4ec]" />

      <Modal.Body className="w-auto rounded-md ">
        <div className="text-center rounded-md bg-[#fce4ec]">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-black dark:text-gray-400">
            คุณต้องการที่จะลบข้อมูลนี้ 
          </h3>
          <div className="flex justify-center gap-4 py-5">
            <Button
              color="gray"
              onClick={deleteImage}
              className="rounded-md"
            >
              ยืนยัน
            </Button>
            <Button color="gray" onClick={onClose} className="rounded-md">
              ยกเลิก
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default ModalConfirm;
