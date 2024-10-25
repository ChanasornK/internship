import React, { useState, useEffect } from "react";
import { Button, Modal } from "flowbite-react";
import axios from "axios";

const EditComment = ({
  openModal,
  setOpenModal,
  commentId,
  initialCommentText,
  fetchComments, // Accept fetchComments prop
}) => {
  const [commentText, setCommentText] = useState(initialCommentText);
  const [errorMessage, setErrorMessage] = useState("");
  const [isSaving, setIsSaving] = useState(false);
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  useEffect(() => {
    if (openModal && commentId) {
      setCommentText(initialCommentText);
    }
  }, [openModal, commentId, initialCommentText]);

  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
      setEmail(profile?.userData?.email);
      setRole(profile?.userData?.role || "user");
    }
  }, []);
  console.log(email);
  const handleSave = async () => {
    if (!commentText.trim()) {
      setErrorMessage("Comment text cannot be empty");
      return;
    }

    setIsSaving(true);
    try {
      const response = await axios.post("http://localhost:8000/editComment", {
        id: commentId,
        comment_text: commentText,
      });

      if (response.status === 200) {
        setOpenModal(false); // Close modal on success
        await fetchComments(); // Fetch the updated comments list
      } else {
        setErrorMessage(response.data.message || "Failed to update comment");
      }
    } catch (error) {
      setErrorMessage("An error occurred while updating the comment");
      console.error("Error updating comment:", error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
        className="fixed inset-0 bg-gray-700 pt-56 z-50"
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h1>Edit Comment</h1>
            <input
              type="text"
              className="bg-purple-400 mt-10 p-2 w-[90%] rounded-lg"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Edit Comment"
            />
            {errorMessage && (
              <p className="text-red-500 mt-2">{errorMessage}</p>
            )}

            <div className="flex justify-center gap-4 mt-5 mb-5">
              <Button
                className={`bg-red-600 text-white hover:bg-red-700 ${
                  isSaving ? "cursor-not-allowed" : ""
                }`}
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? "Saving..." : "Save"}
              </Button>
              <Button
                className="bg-gray-500 text-white hover:bg-gray-600"
                onClick={() => setOpenModal(false)}
                disabled={isSaving}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default EditComment;
