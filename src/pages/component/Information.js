import React, { useState, useEffect } from "react";
import { Button, Modal, Spinner } from "flowbite-react";
import Upload from "./Upload";
import axios from "axios";
import RatingStarz from "./RatingStarz";
import Dropdownz from "./Dropdownz";
import { IoMdAddCircle } from "react-icons/io";
import { FaCheck } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const Information = () => {
  const [openModal, setOpenModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);
  const [rating, setRating] = useState(0);
  const [link, setLink] = useState("");
  const [role, setRole] = useState("guest");
  const [email, setEmail] = useState("");
  const storedData = localStorage.getItem("profile");
  const [review, setReview] = useState("");
  const [loading, setLoading] = useState(false); // สถานะการโหลด

  useEffect(() => {
    if (storedData) {
      const profile = JSON.parse(storedData);
      setRole(profile?.userData?.role || "guest");
      setEmail(profile?.userData?.email);
    }
  }, []);

  const handleTypeSelect = (selectedItem) => {
    setType(selectedItem);
  };

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
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
            "X-Api-Key": "oHKxBqxbJGeqGuQU6dftNFsg",
            "Content-Type": "multipart/form-data",
          },
          responseType: "longblob",
        }
      );
      return response.data;
    } catch (error) {
      console.error("", error);
      return null;
    }
  };

  const handleConfirm = async () => {
    setLoading(true); // เริ่มการโหลด
    const formData = new FormData();

    let removedBgImage = image; 

    if (imageHasBackground(image)) {
      removedBgImage = await handleRemoveBackground(image); 
    }

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
      const response = await axios.post(
        "http://localhost:8000/uploadImage",
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
      setLoading(false); 
    }
  };

  const imageHasBackground = (image) => {
    return true; // คืนค่า true ถ้าคุณต้องการลบพื้นหลัง
  };

  return (
    <>
      {role !== "guest" && (
        <Button
          className="bg-gray-200 text-pink-500  border-2 border-pink-500 rounded-lg transform transition-transform duration-300 hover:scale-110"
          onClick={() => setOpenModal(true)}
        >
          <div className="flex items-center">
            <IoMdAddCircle className="mr-1 text-sm " />
            <span className="text-sm font-semibold">เพิ่มข้อมูล</span>
          </div>
        </Button>
      )}

      {openModal && (
        <>
          <div
            className="fixed inset-0 bg-gray-700 opacity-75 z-50"
            onClick={() => setOpenModal(false)}
          ></div>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
            className="relative z-50 w-auto max-w-2xl mx-auto mt-2 h-screen"
          >
            <Modal.Header className="modal-header h-10 w-auto mr-4 flex justify-end pt-4"></Modal.Header>
            <div className="w-auto p-10">
              <Upload setImage={setImage} />
            </div>
            <input
              id="detail-input"
              placeholder="รายละเอียด"
              className="bg-gray-50 text-gray-700 mt-2 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500 "
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            />

            <input
              id="price-input"
              placeholder="ราคา"
              className="bg-gray-50 text-gray-700 mt-6 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500  "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              id="link-input"
              placeholder="Link"
              className="bg-gray-50 text-gray-700 mt-6 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500  "
              value={link}
              onChange={(e) => setLink(e.target.value)}
            />
            <input
              id="review-input"
              placeholder="รีวิว"
              className="bg-gray-50 text-gray-700 mt-6 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-1 focus:ring-pink-500 focus:border-pink-500  "
              value={review}
              onChange={(e) => setReview(e.target.value)}
            />

            <div className="flex items-center mt-6  ">
              <Dropdownz
                onSelectItem={handleTypeSelect}
                value={type}
                onChange={(e) => setType(e.target.value)}
              />
              <div className="ml-7">
                <RatingStarz
                  onRatingSelect={handleRatingSelect}
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
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
                className="w-32 bg-red-600 text-white font-medium py-1 text-sm rounded-lg shadow-md hover:bg-red-700 active:bg-red-800 transition-colors duration-200"
                onClick={() => setOpenModal(false)}
              >
                <div className="flex items-center">
                  <ImCross className="mr-2 text-sm " />
                  <span className="text-sm">ยกเลิก</span>
                </div>
              </Button>
            </div>

            {loading && ( // Spinner จะแสดงเมื่อกำลังโหลด
              <div className="fixed inset-0 flex justify-center items-center bg-gray-700 bg-opacity-50 z-50">
                <div className="relative">
                  <div className="w-12 h-12 border-4 border-white border-opacity-75 rounded-full"></div>
                  <div className="absolute top-0 left-0 w-12 h-12 border-4 border-t-pink-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                </div>
              </div>
            )}

            {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
          </Modal>
        </>
      )}
    </>
  );
};

export default Information;
