import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Menu from "../component/Menu";
import RatingStarz from "../component/RatingStarz";
import { FaCartShopping } from "react-icons/fa6";
import LoadingModal from "../component/loading";
import { BsChatHeart } from "react-icons/bs";
import Head from "next/head";
import SuccessPopup from "../SuccessPopup";
import { GrSend } from "react-icons/gr";
import { IoCloseSharp } from "react-icons/io5";
import FixInformation2 from "../component/FixInformation2";
import EditComment from "../component/editComment";
const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const reviewProduct = () => {
  const router = useRouter();
  const { id } = router.query; // Get id from URL
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [message, setMessage] = useState(null);
  const [profile, setProfile] = useState(null); // Set initial state to null
  const [comments, setComments] = useState([]); // State to store comments
  const [showPopup, setShowPopup] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(true);
  const latestCommentRef = useRef(null);
  const [storedEmail, setStoredEmail] = useState(null);
  const [hasScrolledToLatestComment, setHasScrolledToLatestComment] =
    useState(false);
  const previousCommentsLengthRef = useRef(0);
  const [openModal, setOpenModal] = useState(false);
  const [editingCommentId, setEditingCommentId] = useState(null); // ID of the comment being edited
  const [editText, setEditText] = useState("");
  const openEditModal = (commentId, commentText) => {
    console.log("Setting selected comment for editing:", {
      commentId,
      commentText,
    });
    setSelectedComment({ id: commentId, comment_text: commentText });
    setOpenModal(true);
  };
  const [selectedComment, setSelectedComment] = useState({
    id: null,
    comment_text: "",
  });

  const getImage = async (id) => {
    try {
      const response = await fetch("http://localhost:8000/getImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });

      const data = await response.json();
      if (response.ok) {
        const base64String = arrayBufferToBase64(data.imageData.image.data);
        const validImageData = {
          id: data.imageData.id,
          src: `data:image/png;base64,${base64String}`,
          price: data.imageData.price,
          detail: data.imageData.detail,
          link: data.imageData.link,
          type: data.imageData.type,
          rating: data.imageData.rating,
          views: data.imageData.view,
          email: data.imageData.email,
          review: data.imageData.review,
        };
        setImageData(validImageData);
      }
    } catch (error) {
      console.error("Error fetching image:", error);
    }
  };

  useEffect(() => {
    if (id) {
      getImage(id);
    }
  }, [id]);
  const getComments = async (id) => {
    try {
      const response = await fetch("http://localhost:8000/getComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });

      const data = await response.json();
      if (response.ok) {
        // Process comments data
        const processedComments = data.imageData.map((comment) => {
          if (comment.userImage && comment.userImage.data) {
            const base64String = arrayBufferToBase64(comment.userImage.data);
            return {
              ...comment,
              userImage: `data:image/png;base64,${base64String}`,
            };
          }
          return comment;
        });
        setComments(processedComments); // Update state with processed comments
        return data;
      } else {
        console.error("Fetch comments failed:", data.message);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const submitComment = async () => {
    if (!commentText) return;

    const newComment = {
      id: `temp-${Date.now()}`, // Temporary ID
      user_name: profile?.username || profile?.displayName || "User", // Placeholder user
      comment_text: commentText,
    };

    // Optimistic UI update: Add the new comment to the list immediately
    setComments((prevComments) => [...prevComments, newComment]);
    setCommentText("");
    try {
      const response = await fetch("http://localhost:8000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product_id: id,
          comment_text: commentText,
          user_name: profile?.username || profile?.displayName,
          userImage: getProfileImageSrc(), // Send the profile image URL or base64 string
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Comment submitted successfully");
        setMessage("คอมเมนต์ของคุณถูกส่งแล้ว");

        // Clear input field
        setCommentText("");

        // Refresh comments to get the actual data from the server
        await getComments(id);
      } else {
        console.log("Error:", data.error);
        setMessage(data.error);

        // Remove the optimistic comment on error
        setComments((prevComments) =>
          prevComments.filter((comment) => comment.id !== newComment.id)
        );
      }
    } catch (error) {
      console.log("Error submitting comment:", error.message);
      setMessage("Error submitting comment: " + error.message);

      // Remove the optimistic comment on error
      setComments((prevComments) =>
        prevComments.filter((comment) => comment.id !== newComment.id)
      );
    }
  };

  const handleEditClick = (commentId, currentText) => {
    setEditingCommentId(commentId);
    setEditText(currentText);
  };

  const handleSaveEdit = async (commentId) => {
    console.log("Saving edit for:", commentId, editText);
    try {
      const response = await fetch("http://localhost:8000/editComment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: commentId, comment_text: editText }),
      });

      const data = await response.json();
      if (response.ok) {
        setComments((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId
              ? { ...comment, comment_text: editText }
              : comment
          )
        );
        setEditingCommentId(null);
        setEditText("");
      } else {
        console.error("Failed to update comment:", data.message);
      }
    } catch (error) {
      console.error("Error updating comment:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null); // Cancel editing
    setEditText(""); // Clear edit input
  };

  useEffect(() => {
    if (!loading && comments.length > 0 && !hasScrolledToLatestComment) {
      // เลื่อนไปที่คอมเมนต์ล่าสุดเมื่อหน้าโหลดเสร็จและยังไม่เคยเลื่อนไป
      latestCommentRef.current?.scrollIntoView({ behavior: "smooth" });
      setHasScrolledToLatestComment(true); // ตั้งค่าให้ไม่เลื่อนอัตโนมัติอีก
    }
  }, [loading, comments, hasScrolledToLatestComment]);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false); // ปิด loading เมื่อโหลดข้อมูลเสร็จ
    }, 500);
    if (localStorage.getItem("loginSuccess") === "true") {
      setShowPopup(true); // แสดงป๊อปอัปเมื่อ loginSuccess เป็น true
      localStorage.removeItem("loginSuccess"); // ลบข้อมูลหลังแสดงผลเพื่อไม่ให้แสดงอีกครั้ง
    }
  }, []);
  useEffect(() => {
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
      setProfile(profile?.userData || null); // Handle case where profile is null
    } else {
      setProfile(null); // Ensure profile is null if not found
    }
  }, []);

  useEffect(() => {
    if (id) {
      const fetchCommentData = async () => {
        console.log(id);
        try {
          const data = await getComments(id);
          console.log(data);
          if (data) {
            const imageData = data.imageData;
            if (imageData) {
              console.log(imageData);
              // Process comments data
              const processedComments = imageData.map((comment) => {
                if (comment.userImage && comment.userImage.data) {
                  const base64String = arrayBufferToBase64(
                    comment.userImage.data
                  );
                  return {
                    ...comment,
                    userImage: `data:image/png;base64,${base64String}`,
                  };
                }
                return comment;
              });
              setComments(processedComments);
            } else {
              console.error("imageData is not available:", imageData);
            }
          }
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };
      fetchCommentData();
    }
  }, [id]);

  // Scroll to the latest comment only when there is a new comment
  useEffect(() => {
    if (comments.length > previousCommentsLengthRef.current) {
      // Scroll to the latest comment only if there are new comments
      latestCommentRef.current?.scrollIntoView({ behavior: "smooth" });
    }
    // Update the previous comments length
    previousCommentsLengthRef.current = comments.length;
  }, [comments]);

  useEffect(() => {
    if (id) {
      const fetchImageData = async () => {
        try {
          const data = await getImage(id);
          if (data) {
            const imageData = data.imageData;
            if (imageData) {
              const base64String = arrayBufferToBase64(imageData.image.data);
              const validImageData = {
                id: imageData.id,
                src: `data:image/png;base64,${base64String}`,
                price: imageData.price,
                detail: imageData.detail,
                link: imageData.link,
                type: imageData.type,
                rating: imageData.rating,
                views: imageData.view,
                email: imageData.email,
                review: imageData.review,
              };

              setImageData(validImageData);
            } else {
              console.error("imageData is not available:", imageData);
            }
          }
        } catch (error) {
          console.error("Error fetching images:", error);
        }
      };

      fetchImageData();
      getComments(id); // Fetch comments when id changes
    }
  }, [id]);

  const getProfileImageSrc = () => {
    if (profile?.photoURL) {
      return profile?.photoURL; // If there's a photoURL, return it directly
    } else {
      // Convert the image data to base64
      const base64String = arrayBufferToBase64(profile?.image?.data);
      return `data:image/png;base64,${base64String}`; // Return base64 image
    }
  };
  const updateCommentInList = (commentId, newCommentText) => {
    setComments((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? { ...comment, comment_text: newCommentText }
          : comment
      )
    );
  };
  return (
    <>
      {loading ? (
        <LoadingModal />
      ) : (
        <div className="h-dvh">
          <Head>
            <title>Review_Product</title>
            <link
              rel="icon"
              href="https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458802193_443422025395135_5023098190288504627_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGsvhUqiFI2qfwLotyWmZhEHd1t-B62SgQd3W34HrZKE4xCsI1KQ3Ujgl8xM6tYkfrHIPiZqWI6QkxmepUb6zn&_nc_ohc=QOH9wPGvvU0Q7kNvgG3q1YJ&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=AIjsg8BkR9RPCPVN4o52Vzj&oh=03_Q7cD1QHZnrRI-bLWf-7dxyKZ1kf1jHuINieX_YjZdvCUTAXf3Q&oe=6710882F"
              className="Kuromi "
            />
          </Head>
          <Menu />

          <div className="h-full pt-40 flex justify-center  bg-gradient-to-t from-blue-200 to-pink-200 ">
            <div className="w-96 h-[500px] ml-60">
              <img
                className="object-cover w-auto h-[350px]"
                src={
                  imageData ? imageData.src : "/path/to/placeholder-image.png"
                }
                alt="Monitor Image"
              />
              <div className="w-[850px] h-56 bg-gray-200 rounded-xl  ">
                <p className="text-xl font-semibold  pl-4 pt-3 flex">
                  Review <BsChatHeart className="ml-3" />
                </p>
                <div className="pl-4 pt-5"> {imageData?.review || ""}</div>
              </div>
            </div>

            <div className="ml-20 w-96 pt-16 h-1/2">
              <div className="font-bold text-xl">{imageData?.detail}</div>
              <div className="mt-9">
                <RatingStarz getRating={imageData?.rating} isEnabled={false} />
              </div>
              <div className="text-pink-600 text-2xl font-semibold">
                {imageData?.price}
              </div>
              <button
                className="bg-pink-600 mt-8 w-full rounded-lg h-10 flex items-center justify-center space-x-2 transform transition-transform duration-200 hover:scale-110"
                onClick={() => {
                  if (imageData?.link) {
                    window.open(imageData.link, "_blank");
                  } else {
                    console.error("Link not available");
                  }
                }}
              >
                <FaCartShopping className="text-lg text-white" />
                <span className="text-lg text-white">Buy</span>
              </button>
            </div>

            <div>
              {!isChatVisible && <FixInformation2 dataSource={imageData} />}

              {!isChatVisible && (
                <button
                  onClick={() => setIsChatVisible(true)}
                  className="fixed bottom-10 right-5 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center transform transition-transform duration-200 hover:scale-125"
                >
                  💬
                </button>
              )}
              <div
                className={`ml-24 w-[450px] border border-pink-600 bg-cover bg-center flex flex-col justify-end rounded-lg h-[550px] mt-10 relative chat-box ${
                  isChatVisible ? "fade-in" : "fade-out"
                }`}
                style={{
                  backgroundImage: `url('https://images.squarespace-cdn.com/content/v1/5e949a92e17d55230cd1d44f/c936e01c-2f6b-4bc3-b6ce-d029296e18cc/Nebula_resized.png?format=1500w')`,
                }}
              >
                <button
                  className="absolute top-2 right-4 text-white hover:bg-purple-500 rounded-full flex items-center justify-center  transform transition-transform duration-200 hover:scale-125"
                  onClick={() => setIsChatVisible(false)}
                >
                  <IoCloseSharp className="text-3xl " />
                </button>
                <div className="relative w-full">
                  <div className="mt-4 max-h-[455px] overflow-y-scroll scrollbar-hide">
                    {Array.isArray(comments) &&
                      comments.map((comment, index) => (
                        <div
                          key={comment.id}
                          ref={
                            index === comments.length - 1
                              ? latestCommentRef
                              : null
                          }
                          className="p-2 rounded mb-2 px-3 flex items-center comment-animation"
                        >
                          {editingCommentId === comment.id ? (
                            // Editing mode
                            <div className="flex items-center w-full">
                              <input
                                type="text"
                                value={editText}
                                onChange={(e) => setEditText(e.target.value)}
                                className="w-64 h-8 pl-2 pr-2 bg-gray-200 border-2 border-gray-300 rounded-lg"
                              />
                              <button
                                className="ml-2 bg-blue-500 text-white px-2 rounded hover:bg-blue-600"
                                onClick={() => handleSaveEdit(comment.id)}
                              >
                                Save
                              </button>
                              <button
                                className="ml-2 bg-gray-300 text-black px-2 rounded hover:bg-gray-400"
                                onClick={handleCancelEdit}
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            // Display mode
                            <div className="flex items-center w-full">
                              <div className="px-2 bg-gray-200 rounded-lg w-full">
                                <p className="pl-1 font-bold">
                                  {comment.user_name}
                                </p>
                                <p className="pl-1">{comment.comment_text}</p>
                              </div>
                              {(comment.user_name === profile?.username ||
                                comment.user_name === profile?.displayName) && (
                                <button
                                  className="ml-4 h-8 w-8 rounded-full hover:bg-gray-200"
                                  onClick={() =>
                                    handleEditClick(
                                      comment.id,
                                      comment.comment_text
                                    )
                                  }
                                >
                                  ...
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      ))}
                  </div>

                  {/* Input สำหรับพิมพ์ข้อความ */}
                  <div className="relative w-full">
                    <input
                      className="w-full h-12 pl-5 pr-20 bg-gray-200 border-2 border-gray-300 rounded-lg focus:outline-none"
                      type="text"
                      placeholder="Comment Text"
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault(); // ป้องกันการทำงานเริ่มต้นของ Enter
                          submitComment();
                        }
                      }}
                    />

                    <button
                      className="absolute top-0 right-0 h-12 bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
                      onClick={submitComment}
                    >
                      <GrSend />
                    </button>
                  </div>
                </div>
                {message && <div className="mt-2 text-red-500">{message}</div>}
              </div>

              {/* CSS animation */}
              <style jsx>{`
                .chat-box {
                  animation: fadeIn 0.5s ease-in-out forwards;
                }

                .fade-in {
                  animation: fadeIn 0.5s ease-in-out forwards;
                }

                .fade-out {
                  animation: fadeOut 0.5s ease-in-out forwards;
                }

                @keyframes fadeIn {
                  from {
                    opacity: 0;
                    transform: scale(0.9);
                  }
                  to {
                    opacity: 1;
                    transform: scale(1);
                  }
                }

                @keyframes fadeOut {
                  from {
                    opacity: 1;
                    transform: scale(1);
                  }
                  to {
                    opacity: 0;
                    transform: scale(0.9);
                  }
                }
                .comment-animation {
                  opacity: 0;
                  transform: translateY(20px);
                  animation: fadeInUp 1s ease forwards; /* ใช้อนิเมชัน */
                }

                @keyframes fadeInUp {
                  to {
                    opacity: 1;
                    transform: translateY(0);
                  }
                }
              `}</style>
            </div>
          </div>
          {showPopup && (
            <SuccessPopup
              message="Login Successful!"
              showPopup={showPopup}
              onClose={() => setShowPopup(false)}
            />
          )}
        </div>
      )}
    </>
  );
};

export default reviewProduct;
