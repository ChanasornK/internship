import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Menu from "../component/Menu";
import RatingStarz from "../component/RatingStarz";
import { FaCartShopping } from "react-icons/fa6";
import LoadingModal from "../component/loading";
import { BsChatHeart } from "react-icons/bs";
import Head from "next/head";
import SuccessPopup from "../SuccessPopup";
import { motion, AnimatePresence } from "framer-motion"; // นำเข้า AnimatePresence

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
  const [isChatVisible, setIsChatVisible] = useState(false);
  const latestCommentRef = useRef(null);
  // Ref for storing the previous comments length
  const previousCommentsLengthRef = useRef(0);

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
        return data;
      } else {
        console.error("Fetch image failed:", data.message);
        return null;
      }
    } catch (error) {
      console.error("Error during fetch image:", error);
      return null;
    }
  };

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
    if (!profile) {
      setMessage("กรุณาเข้าสู่ระบบเพื่อแสดงความคิดเห็น.");
      return;
    }
    if (!id || !commentText) {
      setMessage("");
      return;
    }
    setCommentText(""); // Clear the comment input

    try {
      const response = await fetch("http://localhost:8000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: id,
          comment_text: commentText,
          user_name: profile.username || profile?.displayName,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Comment submitted successfully");
        setMessage("Comment added successfully");
        getComments(id); // Refresh comments
      } else {
        console.log("Error:", data.error);
        setMessage(data.error);
      }
    } catch (error) {
      console.log("Error submitting comment:", error.message);
      setMessage("Error submitting comment: " + error.message);
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);
  useEffect(() => {
    if (id) {
      getComments(id);

      const interval = setInterval(() => {
        getComments(id);
      }, 500); // Fetch new comments every 500 milliseconds

      return () => clearInterval(interval);
    }
  }, [id]);
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
    // Simulate loading process
    setTimeout(() => {
      setLoading(false); // ปิด loading เมื่อโหลดข้อมูลเสร็จ
    }, 500);

    // Check if the login was successful by looking at the query parameters
    const loginSucess = sessionStorage.getItem("loginSucess");

    if (loginSucess === "true") {
      // ทำงานตามต้องการ เช่น แสดงข้อความ หรือทำ redirect
      console.log("Login successful!");
      setShowPopup(true);
      // ลบค่าออกหลังใช้งานเสร็จ
      sessionStorage.removeItem("loginSucess");
    }
  }, [router.query]);
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
      return profile?.photoURL;
    } else if (profile?.image?.data) {
      const base64String = arrayBufferToBase64(profile.image.data);
      return `data:image/png;base64,${base64String}`;
    } else {
      return profile?.image || defaultPhotoURL;
    }
  };
  useEffect(() => {
    // ตรวจสอบว่า login สำเร็จจาก localStorage หรือไม่
    if (localStorage.getItem("loginSuccess") === "true") {
      setShowPopup(true); // แสดงป๊อปอัปเมื่อ loginSuccess เป็น true
      localStorage.removeItem("loginSuccess"); // ลบข้อมูลหลังแสดงผลเพื่อไม่ให้แสดงอีกครั้ง
    }
  }, []);
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
            <div className="w-96 h-[500px] ml-48">
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
              {!isChatVisible && (
                <button
                  onClick={() => setIsChatVisible(true)}
                  className="fixed bottom-10 right-16 w-12 h-12 bg-purple-500 text-white rounded-full flex items-center justify-center"
                >
                  💬
                </button>
              )}

              {/* กล่องแชท */}
              <div
                className={`ml-32 w-[400px] bg-purple-300 flex flex-col justify-end rounded-lg h-[550px] mt-10 relative chat-box ${
                  isChatVisible ? "fade-in" : "fade-out"
                }`}
              >
                {/* ปุ่มปิดแชท */}
                <button
                  className="absolute top-2 right-2 text-white bg-red-500 w-8 h-8 rounded-full flex items-center justify-center hover:bg-red-600"
                  onClick={() => setIsChatVisible(false)}
                >
                  &times;
                </button>

                <div className="relative w-full">
                  <div className="mt-4 max-h-[450px] overflow-y-scroll scrollbar-hide">
                    {Array.isArray(comments) &&
                      comments.map((comment, index) => (
                        <div
                          key={index}
                          className="p-2 rounded mb-2 px-3 flex items-center"
                        >
                          <img
                            src={
                              comment.userImage ||
                              "/path/to/placeholder-image.png"
                            }
                            alt="User Profile"
                            className="w-10 h-10 rounded-full"
                          />
                          <p className="px-2">
                            <strong>{comment.user_name} : </strong>
                            {comment.comment_text}
                          </p>
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
                          submitComment();
                        }
                      }}
                    />
                    <button
                      className="absolute top-0 right-0 h-12 bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
                      onClick={submitComment}
                    >
                      Send
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
