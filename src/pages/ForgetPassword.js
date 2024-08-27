import { Button } from "flowbite-react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { GoEye } from "react-icons/go";
import { GoEyeClosed } from "react-icons/go";
import { MdLockReset } from "react-icons/md";
const ForgetPassword = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const Alreday = () => {
    router.push("./Login");
  };
  const handleResetPassword = async () => {
    if (!email || !password) {
      setError("กรุณากรอก Email และ Password");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await fetch("http://localhost:8000/updatePassword", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newPassword: password }),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Password updated successfully:", data);
        alert("Reset Password Successful"); // แสดง alert เมื่อ Reset Password สำเร็จ
        router.push("/Login"); // เปลี่ยนเส้นทางไปยังหน้า Login หลังจาก Reset สำเร็จ
      } else {
        console.error("Password update failed:", data.message);
        setError(data.message);
      }
    } catch (error) {
      console.error("Error during password update:", error);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-r from-blue-200 to-pink-200 h-screen w-full flex justify-center">
        <div className="w-full max-w-md">
          <div className="flex justify-center mt-20">
            <span className="font-semibold text-center text-4xl">
              Reset Password
            </span>
          </div>
          <div className="mt-32">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Email
            </label>
            <input
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
            />
          </div>
          <div className="mt-10">
            <div className="mb-5 relative">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                New Password
              </label>
              <input
                placeholder="••••••••••"
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12 focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600h-12 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 pr-10"
              />
              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer mt-4"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <GoEyeClosed /> : <GoEye />}
              </div>
            </div>
          </div>
          <div className="">
            <Button
              className="bg-blue-500 mt-10 w-full flex items-center justify-center"
              onClick={handleResetPassword}
              disabled={loading}
            >
              <MdLockReset className="mr-2 text-xl mt-1" />
              <span className="text-lg">
                {loading ? "Resetting..." : "Reset Password"}
              </span>
            </Button>

            {error && <p className="text-red-500 text-center mt-5">{error}</p>}
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgetPassword;
