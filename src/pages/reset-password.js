import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GoEye, GoEyeClosed } from "react-icons/go";
import { Button } from "flowbite-react";
import { MdLockReset } from "react-icons/md";

export default function ResetPassword() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (router.isReady) {
      setToken(router.query.token);
    }
  }, [router.isReady, router.query.token]);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // ตรวจสอบการยืนยันรหัสผ่านที่นี่ก่อนส่งคำขอ
    if (newPassword !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }

    try {
      const res = await fetch("http://localhost:8000/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token, newPassword }),
      });

      const data = await res.json();

      if (res.ok) {
        alert("Password has been reset successfully");
        setTimeout(() => {
          router.push("/login");
        }, 100); // หน่วงเวลา 100 มิลลิวินาที ก่อนเปลี่ยนหน้า
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      setMessage("Error resetting password");
      console.error(error);
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <div className="w-full h-screen bg-gradient-to-t from-blue-200 to-pink-200">
      <main>
        <h1 className="flex justify-center pt-20 font-semibold text-3xl">
          Reset Password
        </h1>
        <form
          className="flex flex-col items-center mt-10"
          onSubmit={handleResetPassword}
        >
          <div className="flex flex-col w-80">
            <label className="mt-10" htmlFor="newPassword">
              New Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="text-black bg-[#f4f6f8] focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600 focus:ring-1 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 inline-flex items-center justify-center mb-2 w-full h-11 mt-2 pr-10 text-left"
                required
              />

              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <GoEyeClosed /> : <GoEye />}
              </div>
            </div>

            <label className="mt-5" htmlFor="confirmPassword">
              Confirm Password
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="text-black bg-[#f4f6f8] focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600 focus:ring-1 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 inline-flex items-center justify-center mb-2 w-full h-11 mt-2 pr-10 text-left"
                required
              />

              <div
                className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
                onClick={toggleConfirmPasswordVisibility}
              >
                {showConfirmPassword ? <GoEyeClosed /> : <GoEye />}
              </div>
            </div>
          </div>
          <Button
            className="bg-blue-500 mt-6 flex justify-center items-center h-10 text-base font-medium hover:bg-blue-600 hover:shadow-lg"
            type="submit"
          >
            <MdLockReset className="mr-2 text-lg flex-shrink-0" />
            <span className="flex items-center">Reset Password</span>
          </Button>

          {message && (
            <p className="mt-4 text-green-500 font-medium">{message}</p>
          )}
        </form>
      </main>
    </div>
  );
}
