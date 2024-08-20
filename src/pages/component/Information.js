import React, { useState } from "react";
import { Button, Modal } from "flowbite-react";
import Upload from "./Upload";
import axios from "axios";
import RatingStarz from "./RatingStarz";
import Dropdownz from "./Dropdownz";

const Information = () => {
  const handleRatingSelect = (selectedRating) => {
    setRating(selectedRating);
  };
  const handleTypeSelect = (selectedItem) => {
    setType(selectedItem);
  };
  const [openModal, setOpenModal] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [image, setImage] = useState(null);
  const [type, setType] = useState(null);
  const [rating, setRating] = useState(0);
  const handleConfirm = async () => {
    const formData = new FormData();
    formData.append("image", image);
    formData.append("price", price);
    formData.append("detail", detail);
    formData.append("type", type);
    formData.append("rating", rating);
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
      <Button
        className="bg-white text-black hover:bg-gray-300 border-2 border-blue-300 mt-44 "
        onClick={() => setOpenModal(true)}
      >
        เพิ่มข้อมูล
      </Button>

      {openModal && (
        <>
          <div
            className="fixed inset-0 bg-gray-700 opacity-75 z-40"
            onClick={() => setOpenModal(false)}
          ></div>
          <Modal
            dismissible
            show={openModal}
            onClose={() => setOpenModal(false)}
            className="relative z-50 mt-10 w-2/5 mx-auto"
          >
            <Modal.Header className="h-auto w-auto mr-4 mt-6"></Modal.Header>
            <div className="w-auto p-10 py">
              <Upload setImage={setImage} />
            </div>
            <input
              id="detail-input"
              placeholder="รายละเอียด"
              className="bg-gray-50 text-gray-700 mt-6 ml-10 w-[86%] h-10 p-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
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
            <Dropdownz
              onSelectItem={handleTypeSelect}
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <div className="ml-10 mt-5">
              <RatingStarz
                onRatingSelect={handleRatingSelect}
                value={rating}
                onChange={(e) => setRating(e.target.value)}
              />
            </div>
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
          {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}
        </>
      )}
    </>
  );
};

export default Information;
