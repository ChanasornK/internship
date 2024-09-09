import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";

const EditProfile = ({ openModal, setOpenModal }) => {
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    const fileURL = URL.createObjectURL(selectedFile);
    setPreviewImage(fileURL);
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("image", file);
    formData.append("id", profile?.id);

    try {
      const response = await axios.post(
        "http://localhost:8000/uploadImageEditProfile",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      const base64Image = await convertToBase64(file);
      const updatedProfile = { ...profile, image: base64Image };
      setProfile(updatedProfile);
      localStorage.setItem(
        "profile",
        JSON.stringify({ userData: updatedProfile })
      );
      window.location.reload();
      console.log("Updated profile with Base64 image:", updatedProfile);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
      setProfile(profile?.userData);
      setPreviewImage(profile?.userData?.image);
    }
  }, []);

  useEffect(() => {
    if (openModal) {
      setFile(null);
      setPreviewImage(null); // Reset the preview image when the modal opens
    }
  }, [openModal]);

  return (
    <>
      {openModal && (
        <>
          <div
            className="fixed inset-0 bg-gray-700 opacity-75 z-50"
            onClick={() => setOpenModal(false)}
          ></div>
          <Modal
            show={openModal}
            onClose={() => setOpenModal(false)}
            className="relative z-50 w-auto max-w-2xl mx-auto mt-28 "
          >
            <Modal.Header className="modal-header h-auto w-auto mr-4 mt-4 flex justify-end"></Modal.Header>

            <div className=" w-full items-center ">
              <label
                htmlFor="dropzone-file"
                className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100 dark:border-gray-600 dark:bg-gray-700 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex h-full w-full items-center justify-center pb-6 pt-5">
                  {previewImage ? (
                    <img
                      src={previewImage}
                      alt="Preview"
                      className="h-full w-full object-cover rounded-lg"
                    />
                  ) : (
                    <>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold flex items-center">
                          <svg
                            className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400"
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
                          Click to upload photo (MAX.500 KB)
                        </span>
                      </p>
                    </>
                  )}
                </div>
                <input
                  id="dropzone-file"
                  className="hidden"
                  type="file"
                  onChange={handleFileChange}
                />
              </label>
            </div>

            <div className="flex justify-center gap-4 mt-4 mb-4">
              <Button
                className="w-32 bg-green-400 text-white hover hover:bg-green-500"
                onClick={handleSubmit}
              >
                Save
              </Button>
              <Button
                className="w-32 bg-red-500 text-white hover hover:bg-red-700"
                onClick={() => setOpenModal(false)}
              >
                Cancel
              </Button>
            </div>
          </Modal>
        </>
      )}
    </>
  );
};

export default EditProfile;
