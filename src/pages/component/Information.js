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
            className="relative z-50 mt-12 w-2/5 mx-auto" // ตั้ง z-index ต่ำกว่า backdrop และกำหนดความกว้างเป็น w-96
          >
            <Modal.Header className="h-auto w-auto mr-4 mt-6"></Modal.Header>
            <div className="w-auto p-10 py">
              <Upload />
            </div>
            
              <input
                placeholder="รายละเอียด"
                className="bg-gray-50 text-gray-700 mt-4 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              />
            
            <input
              placeholder="ราคา"
              className="bg-gray-50 text-gray-700 mt-6 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />

            <div className="flex pb-4 justify-center gap-4 mt-5">
              <Button
                onClick={handleConfirm}
                className="w-32 bg-green-400 text-white font-medium py-1 text-sm rounded-lg shadow-md hover:bg-green-500 active:bg-green-600 transition-colors duration-200"
              >
                ยืนยัน
              </Button>
              <Button
                className="w-32 bg-red-600 text-white font-medium py-1 text-sm rounded-lg shadow-md hover:bg-red-700 active:bg-red-800 transition-colors duration-200"
                onClick={() => setOpenModal(false)}
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
