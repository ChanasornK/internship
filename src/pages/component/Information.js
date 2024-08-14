import React from "react";
import { Button, Modal } from "flowbite-react";
import { useState } from "react";
import Card from "./Card";
import Upload from "./Upload";
import axios from "axios";

const Information = () => {
  const [openModal, setOpenModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append("image", document.getElementById("dropzone-file").files[0]);

    try {
      const response = await axios.post(
        "http://localhost:8000/uploadImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus(""); // ตั้งค่าสถานะเมื่ออัปโหลดสำเร็จ
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Error uploading file."); // ตั้งค่าสถานะเมื่อเกิดข้อผิดพลาด
      console.error("Error uploading file:", error);
    }
  };
  return (
    <>
      <Button
        className="bg-white text-black hover:bg-gray-300 border-2 border-blue-300"
        onClick={() => setOpenModal(true)}
      >
        เพิ่มข้อมูล
      </Button>

      {openModal && (
        <>
          <div
            className="fixed inset-0 bg-gray-700 opacity-75 z-40" // เพิ่ม z-index เพื่อให้ backdrop อยู่เลเยอร์หน้าสุด
            onClick={() => setOpenModal(false)}
          ></div>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
            className="relative z-50 mt-16 w-3/5 mx-auto" // ตั้ง z-index ต่ำกว่า backdrop และกำหนดความกว้างเป็น w-96
          >
            <Modal.Header className="h-auto w-auto mr-4 mt-3"></Modal.Header>
            <div className="w-auto p-10 py">
              <Upload />
            </div>
            <div className="flex pb-4 justify-center gap-4">
              <Button onClick={handleConfirm} className="w-40 bg-green-400">
                ยืนยัน
              </Button>
              <Button
                className="w-40 bg-red-600"
                onClick={() => setOpenModal(false)} // เพิ่มฟังก์ชันปิด Modal ที่นี่
              >
                ยกเลิก
              </Button>
            </div>
          </Modal>
          {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}{" "}
          {/* แสดงสถานะการอัปโหลด */}
        </>
      )}
    </>
  );
};

export default Information;
