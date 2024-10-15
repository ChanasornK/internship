import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";
import { Button } from "flowbite-react";
import { auth, googleProvider } from "./test";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { RiGhostFill } from "react-icons/ri";
import Head from "next/head";

const Register = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [slideIn, setSlideIn] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const Already = () => {
    router.push("./Login");
  };
  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const loginAction = async () => {
    await signInWithPopup(auth, googleProvider)
      .then(async function (result) {
        if (!result) return;
        const user = {
          role: "user",
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL,
        };
  
        localStorage.setItem("profile", JSON.stringify({ userData: user }));
        console.log("Login successful");
  
        // เก็บสถานะการล็อกอินสำเร็จใน localStorage
        localStorage.setItem("loginSuccess", "true");
  
        // บันทึกข้อมูลผู้ใช้ลงฐานข้อมูล
        await registerUser(user);
  
        setShowPopup(true); // Show success popup
        setTimeout(() => {
          router.push("./"); // ใช้ router.back() เพื่อกลับไปหน้าก่อนหน้า
          setLoading(false);
        }, 1000);
      })
      .catch(function (error) {
        console.error(error);
      });
  };
  const registerUser = async (user) => {
    try {
      console.log("Sending user data to register API:", user); // ตรวจสอบข้อมูลที่จะส่งไปยัง API

      const response = await fetch("http://localhost:8000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: user.email,
          password: "google-oauth", // ใช้ค่าเริ่มต้นสำหรับ Google OAuth
          username: '',
          image: user.photoURL, // ส่ง photoURL ไปด้วย
        }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(
          "User registered and saved to database successfully:",
          data
        );
      } else {
        console.error("Failed to register user to database:", data.message);
      }
    } catch (error) {
      console.error("Error registering user to database:", error);
    }
  };

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError("กรุณากรอก Email, Password ");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password และ Confirm Password ไม่ตรงกัน.");
      return;
    }

    try {
      setLoading(true); // Set loading state to true
      const result = await register(email, password);
      if (result) {
        localStorage.setItem("profile", JSON.stringify(result?.data));
        alert("Sign Up Successful!"); // Notify on successful sign-up
        router.push("./Login");
      } else if (result.error === "email-already-in-use") {
        setError("");
      } else {
        setError("การลงทะเบียนล้มเหลวมีผู้ใช้ email นี้แล้ว");
      }
    } catch (error) {
      console.error("Error during sign-up:", error);
      setError("เกิดข้อผิดพลาดในการลงชื่อเข้าใช้ โปรดลองอีกครั้ง");
    } finally {
      setLoading(false); // Set loading state back to false
    }
  };
  const shouldShowPopup = () => {
    return router.pathname === "/";
  };
  const register = async (email, password) => {
    try {
      const response = await fetch("http://localhost:8000/register", {
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
      } else if (data.message === "email-already-in-use") {
        // Handle email duplication
        return { error: "email-already-in-use" };
      } else {
        console.error("Verification failed:", data.message);
        return false; // Indicate failure
      }
    } catch (error) {
      console.error("Error during verification:", error);
      return false; // Handle network errors or other unexpected issues
    }
  };

  useEffect(() => {
    setTimeout(() => {
      setSlideIn(true); // ตั้งค่าเพื่อเริ่ม animation หลังจากโหลดหน้า
    }, 150); // ปรับเวลาเริ่มต้นของเอฟเฟกต์
  }, []);

  return (
    <>
      <Head>
        <title>Register</title>
        <link
          rel="icon"
          href="https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458802193_443422025395135_5023098190288504627_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGsvhUqiFI2qfwLotyWmZhEHd1t-B62SgQd3W34HrZKE4xCsI1KQ3Ujgl8xM6tYkfrHIPiZqWI6QkxmepUb6zn&_nc_ohc=QOH9wPGvvU0Q7kNvgG3q1YJ&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=AIjsg8BkR9RPCPVN4o52Vzj&oh=03_Q7cD1QHZnrRI-bLWf-7dxyKZ1kf1jHuINieX_YjZdvCUTAXf3Q&oe=6710882F"
          className="Kuromi "
        />
      </Head>
      <div className="flex max-h-dvh">
        <div className="bg-gradient-to-r from-blue-200 to-pink-200 w-full  h-screen flex justify-center items-center">
          <div
            className={`w-full max-w-sm bg-gray-100 p-8 rounded-xl shadow-lg relative transform transition-all duration-700 ease-in-out ${
              slideIn ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
            }`}
          >
            <form className="max-w-sm mx-auto flex-grow ">
              <div className="mb-3">
                <label
                  htmlFor="text"
                  className="mb-7  text-3xl font-medium text-black dark:text-white  flex justify-center"
                >
                  Create Account
                </label>
                <button
                  onClick={loginAction}
                  type="button"
                  className="  border-pink-500 border text-black bg-[#f4f6f8] hover:bg-pink-300 ftext-center focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-base px-5 py-2 inline-flex items-center justify-center dark:focus:ring-[#4285F4]/55  w-full h-12"
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
                  Sign up with Google
                </button>
              </div>
              <div className="mb-5">
                <div className="flex items-center justify-center mb-7 mt-7">
                  <div className="flex-1 bg-gradient-to-br from-purple-600 to-pink-600 h-0.5"></div>
                  <span className="mx-4 font-semibold font-sans  mb-1">or</span>
                  <div className="flex-1 bg-gradient-to-br from-purple-600 to-pink-600 h-0.5"></div>
                </div>

                <div className="mb-7">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Email
                  </label>
                  <input
                    type="text"
                    placeholder="example@gmail.com"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm 
                    rounded-lg hover:border-purple-600 block w-full   focus:border-purple-600 p-2.5 pr-10"
                  />
                </div>

                <div className="mb-5 relative">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium 
                    text-gray-900 dark:text-white"
                  >
                    Password
                  </label>
                  <input
                    placeholder="••••••••••"
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="h-12 bg-gray-50 border border-gray-300 
                    text-gray-900 text-sm  rounded-lg focus:border-purple-600
                     hover:border-purple-600 block w-full p-2.5 pr-10"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-4"
                    onClick={togglePasswordVisibility}
                  >
                    {showPassword ? <GoEyeClosed /> : <GoEye />}
                  </div>
                </div>
                <div className="mb-5 relative">
                  <label
                    htmlFor="confirm-password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white "
                  >
                    Confirm Password
                  </label>
                  <input
                    placeholder="••••••••••"
                    type={showConfirmPassword ? "text" : "password"}
                    id="confirm-password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="h-12 bg-gray-50 border border-gray-300 text-gray-900 
                    text-sm  rounded-lg focus:ring-purple-600 focus:border-purple-600 
                    hover:border-purple-600  block w-full p-2.5  pr-10"
                  />
                  <div
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-4"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    {showConfirmPassword ? <GoEyeClosed /> : <GoEye />}
                  </div>
                </div>
              </div>
              {error && <p className="text-red-500 mb-5">{error}</p>}

              <div className="text-base font-normal flex ">
                <button
                  onClick={Already}
                  type="button"
                  className="font-bold text-[#1C64F2] text-sm  hover:text-purple-600 transition-colors duration-200 hover:underline "
                >
                  Already have accout ?
                </button>
              </div>
              <button
                onClick={handleSignup}
                disabled={loading} // Disable button while loading
                type="button"
                className=" mt-5 text-white bg-blue-500 hover:bg-blue-600 text-center focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-base px-5 py-2.5 inline-flex items-center justify-center w-full h-12"
              >
                {loading ? "Signing up..." : "Sign up"}
                <RiGhostFill className="ml-2" />
              </button>
              {showPopup && shouldShowPopup() && (
                <SuccessPopup
                  message="Login Successful!"
                  showPopup={showPopup}
                  onClose={() => setShowPopup(false)}
                />
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
