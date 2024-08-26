import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";
import RatingStarz from "./RatingStarz";
import Dropdownz from "./Dropdownz";
import Upload2 from "./upload2";
import { IoTrashBin } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { FaCheck } from "react-icons/fa";
import ModalConfirm from "./ModalConfirm";

const FixInformation = ({ dataSource }) => {
  const [fixModal, setFixModal] = useState(false);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");
  const [imageId, setImageId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [role, setRole] = useState("");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
    setEmail(profile?.userData?.email)
    setRole(profile?.userData?.role || "user");
    }
  }, []);
  console.log(email)
  useEffect(() => {
    if (dataSource) {
      setPrice(dataSource.price || "");
      setDetail(dataSource.detail || "");
      setLink(dataSource.link || "");
      setType(dataSource.type || "");
      setRating(dataSource.rating || 0);
      setImage(dataSource?.src || null);
      setImage(dataSource?.src || null);
      setImageId(dataSource?.id || null); // Set imageId from dataSource
    }
  }, [dataSource]);

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleTypeSelect = (selectedItem) => {
    setType(selectedItem);
  };

  const handleConfirm = async () => {
    const formData = new FormData();
    console.log("form", formData)
    if (image) formData.append("image", image);
    formData.append("price", price);
    formData.append("detail", detail);
    if (type) formData.append("type", type);
    formData.append("rating", rating);
    formData.append("link", link);
    formData.append("id", dataSource?.id);
    formData.append("email", email);

    try {
      const response = await axios.post(
        "http://localhost:8000/update",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUploadStatus("");
      console.log(response.data);
      window.location.reload();
    } catch (error) {
      setUploadStatus(`Upload Failed: ${error.message}`);
      console.error("Error uploading file:", error);
    }
  };

  const handleDeleteClick = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const deleteImage = async (imageId) => {
    try {
      console.log("Deleting image with ID:", imageId); // ตรวจสอบค่า imageId
      const response = await axios.delete("http://localhost:8000/deleteImage", {
        data: { id: imageId },
      });

      console.log("Server response:", response); // ตรวจสอบการตอบกลับจากเซิร์ฟเวอร์

      if (response.status === 200) {
        setFixModal(false); // ปิด Modal หลังจากลบเสร็จสิ้น
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
    <>
      
        <Button
          onClick={() => setFixModal(true)}
          className="text-black hover:bg-gradient-to-b from-purple-600 to-pink-200 bg-purple-400 scroll-py-1  "
        >
          แก้ไข
        </Button>
    

      {fixModal && (
        <>
          <div
            className="fixed inset-0 bg-gray-700 opacity-75 z-50"
            onClick={() => setFixModal(false)}
          ></div>
          <Modal
            dismissible
            show={fixModal}
            onClose={() => setFixModal(false)}
            className="relative z-50 w-auto max-w-2xl mx-auto mt-2 h-screen "
          >
            <Modal.Header className="modal-header h-auto w-auto mr-4 mt-4 flex justify-end "></Modal.Header>
            <div className="w-auto p-10 ">
              <Upload2 setImage={setImage} image={image} />
            </div>
            <input
              id="detail-input"
              placeholder="รายละเอียด"
              className="bg-gray-50 text-gray-700 mt-2 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />

            <input
              id="price-input"
              placeholder="ราคา"
              className="bg-gray-50 text-gray-700 mt-6 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              id="link-input"
              placeholder="Link"
              className="bg-gray-50 text-gray-700 mt-6 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <div className="flex items-center mt-6">
              <Dropdownz onSelectItem={handleTypeSelect} value={type} />
              <div className="ml-7">
                <RatingStarz
                  onRatingSelect={handleRatingSelect}
                  value={rating}
                />
              </div>
            </div>

            <div className="flex pb-4 justify-center gap-4 mt-12">
              <Button
                onClick={handleConfirm}
                className="w-32 bg-green-400 text-white font-medium py-1 text-sm rounded-lg shadow-md hover:bg-green-500 active:bg-green-600 transition-colors duration-200"
              >
                <div className="flex items-center">
                  <FaCheck className="mr-2 text-sm " />
                  <span className="text-sm">ยืนยัน</span>
                </div>
              </Button>
              <Button
                className="w-32 bg-red-600 text-white font-medium py-1 text-sm rounded-lg shadow-md hover:bg-orange-400 active:bg-red-800 transition-colors duration-200"
                onClick={() => setFixModal(false)}
              >
                <div className="flex items-center">
                  <ImCross className="mr-2 text-sm " />
                  <span className="text-sm">ยกเลิก</span>
                </div>
              </Button>
              <div>
                <Button
                  onClick={handleDeleteClick}
                  className="w-32 bg-black text-white font-medium py-1 text-sm rounded-lg shadow-md hover:bg-purple-500 active:bg-purple-500 transition-colors duration-200 flex items-center justify-center"
                >
                  <div className="flex items-center">
                    <IoTrashBin className="mr-2 text-sm" />
                    <span className="text-sm">ลบข้อมูล</span>
                  </div>
                </Button>

                <ModalConfirm
                  isOpen={isModalOpen}
                  imageId={imageId}
                  onClose={handleCloseModal}
                />
              </div>
            </div>
          </Modal>
          {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
        </>
      )}
    </>
  );
};

export default FixInformation;