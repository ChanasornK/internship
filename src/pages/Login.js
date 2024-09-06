import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Button } from "flowbite-react";
import { auth, googleProvider } from "./test";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { FaSignInAlt } from "react-icons/fa";
import SuccessPopup from "./SuccessPopup";

const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const ResetPassword = () => {
    router.push("./ForgetPassword");
  };

  const handleClick = async () => {
    if (!email || !password) {
      setError("กรุณากรอก Email และ Password.");
    } else {
      setLoading(true);
      const verificationResult = await VerifyUsers(email, password);
      if (verificationResult) {
        console.log("Login successful");
        setShowPopup(true); // Show success popup
        setTimeout(() => {
          router.push({
            pathname: "./",
            query: { loginSuccess: "true" },
          });
          setLoading(false);
        }, 1000);
      } else {
        setError("Incorrect email or password.");
      }
    }
  };

  const VerifyUsers = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/verifyUser", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Verification successful:", data);
        localStorage.setItem("profile", JSON.stringify(data));
        return { data };
      } else {
        console.error("Verification failed:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Error during verification:", error);
      return false;
    }
  };

  const loginAction = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(function (result) {
        if (!result) return;
        const user = {
          role: "user",
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        localStorage.setItem("profile", JSON.stringify({ userData: user }));
        setShowPopup(true); // Show popup on successful login
        setTimeout(() => {
          router.push("./");
        }, 1000);
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);

  const handleClickSignup = () => {
    router.push("./Register");
  };

  // Check if the current path is "./" to show popup
  const shouldShowPopup = () => {
    return router.pathname === "/";
  };

  useEffect(() => {
    setTimeout(() => {
      setSlideIn(true); // เริ่ม animation หลังจากโหลดหน้า
    }, 150); // ปรับเวลาเริ่มต้นของเอฟเฟกต์
  }, []);

  return (
    <div className="flex">
      <div className="w-full min-h-screen bg-gradient-to-t from-blue-200 to-pink-200 flex justify-center items-center">
        <div
          className={`w-full max-w-sm bg-gray-100 p-8 rounded-xl shadow-lg relative transform transition-all duration-700 ease-in-out ${
            slideIn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          }`}
        >
          <form className="max-w-sm mx-auto flex-grow">
            <div className="mb-3">
              <label
                htmlFor="text"
                className=" mb-7 text-3xl font-medium text-gray-900 dark:text-white flex justify-center items-center ml-2"
              >
                Login
              </label>
              <button
                onClick={loginAction}
                type="button"
                className="border-pink-500 border text-black bg-[#f4f6f8] hover:bg-pink-300 text-center focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-base px-5 py-2.5 inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mb-2 w-full h-12"
              >
                <svg
                  className="w-4 h-4 me-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                >
                  <path
                    fill="#4285F4"
                    d="M24 9.5c3.48 0 6.42 1.16 8.82 3.44l6.24-6.24C34.56 2.78 29.72 1 24 1 14.76 1 6.64 6.48 2.64 14.5l7.54 5.88C12.52 14.32 17.88 9.5 24 9.5z"
                  />
                  <path
                    fill="#34A853"
                    d="M46.5 24c0-1.6-.16-3.16-.46-4.66H24v9.32h12.8c-.56 2.8-2.22 5.16-4.72 6.74l7.54 5.88C44.36 37.52 46.5 31.24 46.5 24z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M7.88 28.62c-.84-2.48-.84-5.16 0-7.64l-7.54-5.88C-1.36 19.48-1.36 28.52 7.88 33.38l7.54-5.88C12.36 29.28 10.6 29.48 7.88 28.62z"
                  />
                  <path
                    fill="#EA4335"
                    d="M24 46.5c5.72 0 10.56-1.78 14.24-4.82l-7.54-5.88c-2.24 1.48-4.86 2.38-6.7 2.38-5.12 0-9.48-3.82-10.98-9.38l-7.54 5.88C6.64 41.52 14.76 46.5 24 46.5z"
                  />
                </svg>
                Sign in with Google
              </button>
            </div>
            <div className="mb-5">
              <div className="flex items-center justify-center mb-7 mt-7">
                <div className="flex-1 bg-gradient-to-r from-blue-400 to-pink-400 h-0.5"></div>
                <span className="mx-4 font-semibold font-sans  mb-1">or</span>
                <div className="flex-1 bg-gradient-to-r from-blue-400 to-pink-400 h-0.5"></div>
              </div>
              {error && <div className="text-red-500 mb-4">{error}</div>}
              <div className="mb-7">
                <label
                  htmlFor="email-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Email
                </label>
                <input
                  type="text"
                  placeholder="example@gmail.com"
                  id="email-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className=" h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-600 dark:focus:border-purple-600 pr-10"
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="password-input"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Password
                </label>
                <div className="relative w-full">
                  <input
                    placeholder="••••••••••"
                    type={showPassword ? "text" : "password"}
                    id="password-input"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-600 dark:focus:border-purple-600 pr-10"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <GoEyeClosed /> : <GoEye />}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex items-start mb-5">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  type="checkbox"
                  value=""
                  className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                />
              </div>
              <div className="flex ">
                <h1
                  htmlFor="remember"
                  className="ms-2 text-sm font-medium text-[#6B7280] dark:text-gray-300 text-nowrap"
                >
                  Remember me
                </h1>
                <button
                  onClick={ResetPassword}
                  type="button"
                  className=" text-nowrap font-bold text-[#1C64F2] flex justify-end text-sm ml-20 hover:text-purple-600 transition-colors duration-200 hover:underline "
                >
                  Forget Password?
                </button>
              </div>
            </div>
            <button
              onClick={handleClick}
              type="button"
              className="text-white bg-blue-500 hover:bg-blue-600 text-center focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-base px-5 py-2.5 inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mb-2 w-full h-12"
            >
              Sign In
              <FaSignInAlt className="ml-2" />
            </button>

            <div className="text-base font-normal flex mt-4">
              Don’t have an account yet?
              <button
                onClick={handleClickSignup}
                type="button"
                className="text-[#1C64F2] text-base font-bold ml-2 hover:underline  hover:text-purple-600"
              >
                Sign Up
              </button>
            </div>

            {showPopup && shouldShowPopup() && (
              <SuccessPopup
                message="Login successful!"
                showPopup={showPopup}
                onClose={() => setShowPopup(false)}
              />
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
