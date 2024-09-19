import { useRouter } from "next/router";
import { useEffect, useState, useRef } from "react";
import Menu from "../component/Menu";
import RatingStarz from "../component/RatingStarz";
import { FaCartShopping } from "react-icons/fa6";
import LoadingModal from "../component/loading";

const arrayBufferToBase64 = (buffer) => {
  let binary = "";
  const bytes = new Uint8Array(buffer);
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return window.btoa(binary);
};

const MonitorTest = () => {
  const router = useRouter();
  const { id } = router.query; // Get id from URL
  const [imageData, setImageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState("");
  const [userName, setUserName] = useState("");
  const [message, setMessage] = useState(null);
  const [profile, setProfile] = useState("");
  const [comments, setComments] = useState([]); // State to store comments

  // Ref for the latest comment
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

  // Function to fetch comments from the API
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
        setComments(data?.imageData); // Update state with comments
      } else {
        console.error("Fetch comments failed:", data.message);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };

  const submitComment = async () => {
    if (!id || !commentText) {
      setMessage("Please provide all required fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8000/comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          post_id: id,
          comment_text: commentText,
          user_name: profile.username || "Anonymous",
        }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Comment submitted successfully");
        setMessage("Comment added successfully");
        setCommentText(""); // Clear the comment input
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
    const storedData = localStorage.getItem("profile");
    if (storedData) {
      const profile = JSON.parse(storedData);
      setProfile(profile?.userData);
    }
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

  // Scroll to the latest comment only when there is a new comment
  useEffect(() => {
    if (comments.length > previousCommentsLengthRef.current) {
      // Scroll to the latest comment
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
  return (
    <>
      {loading ? (
        <LoadingModal />
      ) : (
        <div className="h-dvh">
          <Menu />
          <div className="h-full pt-40 flex justify-center bg-gray-100">
            <div className="w-96 h-[500px] ml-28">
              <img
                className="object-cover w-auto h-96"
                src={
                  imageData ? imageData.src : "/path/to/placeholder-image.png"
                }
                alt="Monitor Image"
              />
              <div className="bg-pink-500 w-[850px] h-56">Hello</div>
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
                className="bg-pink-600 mt-8 w-full rounded-lg h-10 flex items-center justify-center space-x-2"
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

            <div className="ml-32 w-[400px] bg-purple-300 mb-7 flex flex-col justify-end rounded-lg h-[550px]">
              <div className="relative w-full">
                <div className="mt-4 max-h-[450px] overflow-y-auto">
                  {Array.isArray(comments) &&
                    comments.map((comment, index) => (
                      <div
                        key={index}
                        ref={index === comments.length - 1 ? latestCommentRef : null}
                        className="bg-gray-200 p-2 rounded mb-2"
                      >
                        <p>
                          <strong>{comment.user_name}:</strong> {comment.comment_text}
                        </p>
                      </div>
                    ))}
                </div>
                <div className="relative w-full">
                  <input
                    className="w-full h-12 pl-5 pr-20 bg-gray-200 border-2 border-gray-300 rounded-lg focus:outline-none"
                    type="text"
                    placeholder="Comment Text"
                    value={commentText}
                    onChange={(e) => setCommentText(e.target.value)}
                  />
                  <button
                    className="absolute top-0 right-0 h-12 bg-blue-500 text-white px-4 rounded-r-lg hover:bg-blue-600"
                    onClick={submitComment}
                  >
                    Submit
                  </button>
                </div>
              </div>
              {message && <div className="mt-2 text-red-500">{message}</div>}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MonitorTest;
