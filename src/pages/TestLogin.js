import { useRouter } from "next/router";
import React, { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { Button } from "flowbite-react";
import { auth, googleProvider } from "./test";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { FaSignInAlt } from "react-icons/fa";

const TestLogin = () => {
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
      return;
    }

    try {
      setLoading(true);
      const result = await VerifyUsers(email, password);
      if (result) {
        localStorage.setItem("profile", JSON.stringify(result.data));
        router.push("./");
      } else {
        setError("การเข้าสู้ระบบล้มเหลว โปรดตรวจสอบ email และ password");
      }
    } catch (error) {
      console.error("Error during sign-in:", error);
      setError("เกิดข้อผิดพลาดในการลงชื่อเข้าใช้ โปรดลองอีกครั้ง");
    } finally {
      setLoading(false);
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
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = {
        role: "user",
        email: result.user.email,
        displayName: result.user.displayName,
        photoURL: result.user.photoURL,
      };
      localStorage.setItem("profile", JSON.stringify({ userData: user }));
      router.push("./");
    } catch (error) {
      console.error("Google sign-in error:", error);
      if (error.code === "auth/account-exists-with-different-credential") {
        alert(
          "You have already signed up with a different auth provider for that email."
        );
      }
    }
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

  const handleSignup = () => {
    router.push("./Register");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-gradient-to-r from-blue-200 to-pink-200">
      <div className="w-full max-w-sm bg-gray-100 p-8 rounded-lg shadow-lg relative">
        <div className="absolute top-4 right-4">
          <img src="/path-to-your-logo.png" alt="Logo" className="h-12" />
        </div>
        <form className="relative">
          <div className="mb-3 text-center">
            <h1 className="text-3xl font-bold text-gray-900 mb-6">Welcome </h1>
            <button
              onClick={loginAction}
              type="button"
              className="border-pink-500 border text-black bg-[#f4f6f8] hover:bg-pink-300 text-center focus:ring-4 focus:outline-none focus:ring-[#4285F4]/50 font-medium rounded-lg text-base px-5 py-2.5 inline-flex items-center justify-center mb-4 w-full h-12"
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
            <div className="flex items-center mb-4 mt-4">
              <div className="flex-1 h-0.5 bg-red-200"></div>
              <button className="mx-2 text-gray-600 whitespace-nowrap">
                or
              </button>
              <div className="flex-1 h-0.5 bg-red-200"></div>
            </div>

            {error && <div className="text-red-500 mb-4">{error}</div>}
            <div className="mb-4">
              <label
                htmlFor="email-input"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="text"
                placeholder="example@gmail.com"
                id="email-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600 block w-full p-2.5 pr-10"
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="password-input"
                className="block mb-2 text-sm font-medium text-gray-900"
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
                  className="h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600 block w-full p-2.5 pr-10"
                />
                <div
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? (
                    <GoEyeClosed size={20} />
                  ) : (
                    <GoEye size={20} />
                  )}
                </div>
              </div>
            </div>
            <div className="flex items-start mb-6">
              <div className="flex items-center h-5">
                <input
                  id="remember"
                  aria-describedby="remember"
                  type="checkbox"
                  className="w-4 h-4 border border-gray-300 rounded focus:ring-3 focus:ring-purple-300"
                />
              </div>
              <label
                htmlFor="remember"
                className="font-medium text-gray-900 ml-3 text-sm"
              >
                Remember me
              </label>
            </div>
          </div>
          <Button
            type="button"
            onClick={handleClick}
            disabled={loading}
            className="w-full flex justify-center bg-blue-600"
          >
            {loading ? "Loading..." : "Login"}
          </Button>
          <div className="text-center mt-6">
            <button
              onClick={ResetPassword}
              className="text-blue-500 hover:underline"
            >
              Forgot your password?
            </button>
          </div>
          <div className="text-center mt-6">
            <span className="text-gray-600">Don't have an account? </span>
            <button
              onClick={handleSignup}
              className="text-blue-500 hover:underline"
            >
              Sign up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TestLogin;
