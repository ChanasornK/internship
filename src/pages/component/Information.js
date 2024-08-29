import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
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
  const [role, setRole] = useState("guest"); // ตั้งค่าเริ่มต้นเป็น "guest"
  const [email, setEmail] = useState("");
  const storedData = localStorage.getItem("profile");

  useEffect(() => {
    if (storedData) {
      const profile = JSON.parse(storedData);
      setRole(profile?.userData?.role || "guest"); // ถ้าไม่มี role จะเป็น "guest"
      setEmail(profile?.userData?.email);
    }
  }, []);

  const handleTypeSelect = (selectedItem) => {
    setType(selectedItem);
  };

  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };

  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("price", price);
    formData.append("detail", detail);
    formData.append("type", type);
    formData.append("rating", rating);
    formData.append("link", link);
    formData.append("email", email);

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
      window.location.reload();
    } catch (error) {
      setUploadStatus(`Upload failed: ${error.message}`);
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      {role !== "guest" && (
        <Button
          className="bg-gray-200 text-black hover:bg-gradient-to-br from-purple-400 to-pink-300 border-2 border-purple-400 "
          onClick={() => setOpenModal(true)}
        >
          <div className="flex items-center">
            <IoMdAddCircle className="mr-1 text-sm " />
            <span className="text-sm">เพิ่มข้อมูล</span>
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
            <Modal.Header className="modal-header h-auto w-auto mr-4 mt-4 flex justify-end"></Modal.Header>
            <div className="w-auto p-10">
              <Upload setImage={setImage} />
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
                className="w-32 bg-red-600 text-white font-medium py-1 text-sm rounded-lg shadow-md hover:bg-red-700 active:bg-red-800 transition-colors duration-200"
                onClick={() => setOpenModal(false)}
              >
                <div className="flex items-center">
                  <ImCross className="mr-2 text-sm " />
                  <span className="text-sm">ยกเลิก</span>
                </div>
              </Button>
            </div>
          </Modal>
          {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
        </>
      )}
    </>
  );
};

export default Information;
