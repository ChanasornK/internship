import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";

const EditProfile = ({ openModal, setOpenModal }) => {
  const [file, setFile] = useState(null);
  const [profile, setProfile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [username, setUsername] = useState(""); // Add state for username
  const defaultPhotoURL =
    "https://tse3.mm.bing.net/th?id=OIP.t3ZYddn7rbYeCEhF5h0DiwHaHa&pid=Api&P=0&h=220";

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
    try {
      let imageUrl = profile?.image || defaultPhotoURL; // Use existing image if no new file is uploaded

      if (file) {
        const formData = new FormData();
        formData.append("image", file);
        formData.append("id", profile?.id);

        // Upload the new image if a file is selected
        const uploadImageResponse = await axios.post(
          "http://localhost:8000/uploadImageEditProfile",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Convert the new image to base64
        imageUrl = await convertToBase64(file);
      }

      const updatedProfile = { ...profile, image: imageUrl };
      setProfile(updatedProfile);

      // Update username after the image upload
      const updateUsernameResponse = await axios.put(
        "http://localhost:8000/updateUsername",
        { id: profile?.id, username }
      );

      // Update localStorage with the new image and username
      localStorage.setItem(
        "profile",
        JSON.stringify({
          userData: { ...updatedProfile, username },
        })
      );

      window.location.reload(); // Reload the page after update
    } catch (error) {
      console.error("Error updating profile or username:", error);
    }
  };

  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
      setProfile(profile?.userData);
      setPreviewImage(profile?.userData?.image);
      setUsername(profile?.userData?.username || ""); // Set the current username
    }
  }, []);

  useEffect(() => {
    if (openModal) {
      setFile(null);
      setPreviewImage(profile?.image || null); // Reset to the current profile image when the modal opens
    }
  }, [openModal, profile]);

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
            className="relative z-50 w-auto max-w-2xl mx-auto mt-28"
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
                          Choose Photo Profile (MAX.500 KB)
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

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)} // Bind input to username state
              className="bg-gray-100 flex justify-center w-[90%] mx-auto border-1 rounded-lg mt-4  focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600 dark:focus:ring-purple-600 dark:focus:border-purple-600"
            />

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
