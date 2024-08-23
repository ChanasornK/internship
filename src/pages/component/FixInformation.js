import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import Upload from "./Upload";
import axios from "axios";
import RatingStarz from "./RatingStarz";
import Dropdownz from "./Dropdownz";
import Upload2 from "./upload2";

const FixInformation = ({ dataSource }) => {
  const [fixModal, setFixModal] = useState(false);
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [detail, setDetail] = useState("");
  const [link, setLink] = useState("");
  const [type, setType] = useState("");
  const [rating, setRating] = useState(0);
  const [uploadStatus, setUploadStatus] = useState("");

  useEffect(() => {
    if (dataSource) {
      setPrice(dataSource.price || "");
      setDetail(dataSource.detail || "");
      setLink(dataSource.link || "");
      setType(dataSource.type || "");
      setRating(dataSource.rating || 0);
      setImage(dataSource?.src || null);
      // If image URL is provided, you can set it as well
      // setImage(dataSource.image || null);
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
    if (image) formData.append("image", image);
    formData.append("price", price);
    formData.append("detail", detail);
    if (type) formData.append("type", type);
    formData.append("rating", rating);
    formData.append("link", link);

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
      <Button onClick={() => setFixModal(true)} className="text-black">
        แก้ไข
      </Button>
      {fixModal && (
        <>
          <div className="fixed inset-0 bg-gray-700 opacity-75 z-50"></div>
          <Modal
            dismissible
            show={fixModal}
            onClose={() => setFixModal(false)}
            className="relative z-50 w-auto max-w-2xl mx-auto mt-2 h-screen"
          >
            <Modal.Header className="modal-header h-auto w-auto mr-4 mt-4 flex justify-end"></Modal.Header>
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
                ยืนยัน
              </Button>
              <Button
                className="w-32 bg-red-600 text-white font-medium py-1 text-sm rounded-lg shadow-md hover:bg-red-700 active:bg-red-800 transition-colors duration-200"
                onClick={() => setFixModal(false)}
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

export default FixInformation;
