import { useRouter } from "next/router";
import React from "react";
import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Button } from "flowbite-react";
import { auth, googleProvider } from "./test";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { FaSignInAlt } from "react-icons/fa";
const Login = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const ResetPassword = () => {
    router.push("./ForgetPassword");
  };
  const handleClick = async () => {
    if (!email || !password) {
      setError("กรุณากรอก Email และ Password.");
      try {
        const result = await VerifyUsers(email, password);
        console.log(result?.data);
        if (result) {
          localStorage.setItem("profile", JSON.stringify(result?.data));
          router.push("./");
        } else {
          setError("การเข้าสู้ระบบล้มเหลว โปรดตรวจสอบ email และ password");
        }
      } catch (error) {
        // Handle unexpected errors (e.g., network issues)
        console.error("Error during sign-in:", error);
        setError("เกิดข้อผิดพลาดในการลงชื่อเข้าใช้ โปรดลองอีกครั้ง");
      }
      setLoading(true); // Set loading state to true
      setTimeout(() => {
        router.push("./"); // Navigate to desired route after 2 seconds
        setLoading(false); // Set loading state back to false
      }, 1000);
    }

    // ตรวจสอบข้อมูลผู้ใช้
    const verificationResult = await VerifyUsers(email, password);
    if (verificationResult) {
      console.log("Login successful");
      router.push("./");
    } else {
      setError("Incorrect email or password.");
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
        return { data }; // Indicate success
      } else {
        console.error("Verification failed:", data.message);
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error during verification:", error);
      return false; // Handle network errors or other unexpected issues
    }
  };
  const loginAction = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(function (result) {
        if (!result) return;
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential?.accessToken;
        const user = {
          role: "user", // ตั้งบทบาทเป็น "user"
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
        localStorage.setItem("profile", JSON.stringify({ userData: user }));
        console.log(
          "Saved auth to localStorage:",
          JSON.parse(localStorage.getItem("profile"))
        );

        router.push("./");
      })
      .catch(function (error) {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.email;
        const credential = error.credential;
        if (errorCode === "auth/account-exists-with-different-credential") {
          alert(
            "You have already signed up with a different auth provider for that email."
          );
        } else {
          console.log(error);
        }
      });
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  useEffect(() => {
    // Add keydown listener to the document
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [email, password]);
  const handleClickSignup = () => {
    router.push("./Register");
  };

  return (
    <div className="flex">
      <div className="w-full min-h-screen bg-gradient-to-t from-blue-200 to-pink-200 flex justify-center items-center">
        <form className="max-w-sm mx-auto flex-grow">
          <div className="mb-3">
            <label
              htmlFor="text"
              className=" mb-7 text-xl font-medium text-gray-900 dark:text-white flex justify-center items-center"
            >
              Welcome
            </label>
            <Button
              onClick={loginAction}
              type="button"
              className="text-black bg-[#f4f6f8] focus:ring-purple-600 focus:border-purple-600  hover:bg-pink-200  text-center focus:ring-4 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55 mb-2 w-full h-12 border border-pink-500 hover:border-pink-600"
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
            </Button>
          </div>
          <div className="mb-5">
            <div className="flex justify-center mb-7 mt-7">
              <div className="bg-white h-0.5 border-stone-300 w-full mt-3 "></div>
              <button className="mx-2">or</button>
              <div className="bg-white h-0.5 border-stone-300 w-full mt-3 "></div>
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
                className="ms-2 text-sm font-medium text-[#6B7280] dark:text-gray-300"
              >
                Remember me
              </h1>
              <button
                onClick={ResetPassword}
                type="button"
                className="font-bold text-[#1C64F2] flex justify-end text-sm ml-36 hover:text-purple-600 transition-colors duration-200 hover:underline "
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
              className="text-[#4285F4] text-base font-bold ml-2 hover:underline  hover:text-purple-600"
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
