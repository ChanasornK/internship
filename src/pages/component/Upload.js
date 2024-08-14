import React, { useState } from "react";
import { FileInput, Label } from "flowbite-react";
import axios from "axios";

const Upload = () => {
  const [image, setImage] = useState(null);
  const [imageName, setImageName] = useState("");
  const [uploadStatus, setUploadStatus] = useState(""); // เพิ่ม state สำหรับสถานะการอัปโหลด

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setImage(reader.result);
      setImageName(file.name);
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleConfirm = async (confirm) => {
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
      setUploadStatus("Upload successful!"); // ตั้งค่าสถานะเมื่ออัปโหลดสำเร็จ
      console.log(response.data);
    } catch (error) {
      setUploadStatus("Error uploading file."); // ตั้งค่าสถานะเมื่อเกิดข้อผิดพลาด
      console.error("Error uploading file:", error);
    }
  };

  return (
    <>
      <div className="flex w-full items-center justify-center">
        <Label
          htmlFor="dropzone-file"
          className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        >
          <div className="flex h-full w-full items-center justify-center pb-6 pt-5">
            {image ? (
              <img
                src={image}
                alt="Uploaded"
                className="h-full w-full object-cover"
              />
            ) : (
              <>
                <svg
                  className="mb-4 h-8 w-8 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 16"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                  />
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                  <span className="font-semibold">Click to upload</span> or drag
                  and drop
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  SVG, PNG, JPG or GIF (MAX. 1920x1080px)
                </p>
              </>
            )}
          </div>
          <FileInput 
            id="dropzone-file"
            className="hidden"
            onChange={handleImageUpload}
          />
        </Label>
        <button flex
          onClick={handleConfirm}
          
        >
          ยืนยัน
        </button>
      </div>
      {uploadStatus && <p className="mt-4 text-center">{uploadStatus}</p>}{" "}
      {/* แสดงสถานะการอัปโหลด */}
    </>
  );
};

export default Upload;