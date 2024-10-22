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
import { MdOutlineAutoFixHigh } from "react-icons/md";
const FixInformation2 = ({ dataSource }) => {
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
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false); // สถานะการโหลด
  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
      setEmail(profile?.userData?.email);
      setRole(profile?.userData?.role || "user");
    }
  }, []);
  console.log(email);
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
      setReview(dataSource?.review || '');
    }
  }, [dataSource]);

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleTypeSelect = (selectedItem) => {
    setType(selectedItem);
  };

  const handleRemoveBackground = async (imageFile) => {
    const formData = new FormData();
    formData.append("image_file", imageFile);
    formData.append("size", "auto");

    try {
      const response = await axios.post(
        "https://api.remove.bg/v1.0/removebg",
        formData,
        {
          headers: {
            "X-Api-Key": "75Ps8tChpFRGaKweqexWWDGd",
            "Content-Type": "multipart/form-data",
          },
          responseType: "blob",
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error removing background:", error);
      return null;
    }
  };
  const handleConfirm = async () => {
    setLoading(true); // เริ่มการโหลด
    const formData = new FormData();
    const removedBgImage = await handleRemoveBackground(image);

    if (!removedBgImage) {
      setUploadStatus("Error removing background");
      setLoading(false); // หยุดการโหลดเมื่อเกิดข้อผิดพลาด
      return;
    }

    formData.append("image", removedBgImage);
    formData.append("price", price);
    formData.append("detail", detail);
    formData.append("type", type);
    formData.append("rating", rating);
    formData.append("link", link);
    formData.append("email", email);
    formData.append("review", review);

    try {
      const response = await axios.put(
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
      setLoading(false); // หยุดการโหลดหลังการอัปโหลดเสร็จสิ้น
      window.location.reload();
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      console.error("Error uploading file:", error);
      setLoading(false); // หยุดการโหลดเมื่อเกิดข้อผิดพลาด
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
      <button
        onClick={() => setFixModal(true)}
        className="text-black hover:bg-gradient-to-b from-purple-600 to-pink-200 bg-purple-400 px-2 rounded-lg flex items-center"
      >
        <MdOutlineAutoFixHigh className="mr-1" />
        แก้ไข
      </button>

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
            <Modal.Header className="modal-header h-10 w-auto mr-4  flex justify-end  pt-4"></Modal.Header>
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
              id="review-input"
              placeholder="รีวิว"
              className="bg-gray-50 text-gray-700 mt-6 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500  "
              value={review}
              onChange={(e) => setReview(e.target.value)}
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

            <div className="flex pb-4 justify-center gap-4 mt-8">
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

export default FixInformation2;