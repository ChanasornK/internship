import Head from "next/head";
import { useState, useRef, useEffect } from "react";
import { IoArrowUndoCircleOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import { IoMdMail } from "react-icons/io";

export default function Home() {
  const [email, setEmail] = useState("");
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [showModal, setShowModal] = useState(false); // เพิ่ม state สำหรับ Modal
  const [otp, setOtp] = useState(new Array(6).fill("")); // เก็บค่า OTP เป็น array
  const [timeRemaining, setTimeRemaining] = useState(0); // สถานะเก็บเวลาที่เหลือ
  const [canResend, setCanResend] = useState(false); // สถานะการส่ง OTP อีกครั้ง
  const inputRefs = useRef([]);

  const goLogin = () => {
    router.push("./Login");
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8000/sendOTP", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }), // ส่งอีเมลที่ผู้ใช้กรอก
      });

      const data = await res.json();
      setMessage(data.message);

      // แสดง Modal เพื่อใส่ OTP เมื่อส่งสำเร็จ
      if (res.ok) {
        setShowModal(true);
        // คำนวณเวลา OTP ที่เหลือเมื่อ Modal แสดง
        const otpCreatedAt = new Date(); // ใช้เวลาปัจจุบันแทน, เปลี่ยนให้ดึงจากฐานข้อมูลจริง
        calculateTimeRemaining(otpCreatedAt);
      }

      // Set timeout to clear the message after 1 minute
      setTimeout(() => {
        setMessage("");
      }, 60000);
    } catch (error) {
      setMessage("Error sending reset link");
      console.error(error);

      // Set timeout to clear the error message after 1 minute
      setTimeout(() => {
        setMessage("");
      }, 60000);
    }
  };

  const calculateTimeRemaining = (otpCreatedAt) => {
    const currentTime = new Date();
    const timeDifference = 5 * 60 * 1000 - (currentTime - otpCreatedAt); // 5 นาทีในมิลลิวินาที
    setTimeRemaining(Math.max(0, Math.floor(timeDifference / 1000))); // แปลงเป็นวินาที
  };

  useEffect(() => {
    if (showModal) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 0) {
            setCanResend(true); // เปิดใช้งานปุ่มส่ง OTP ใหม่เมื่อเวลาหมด
            clearInterval(interval);
            return 0;
          }
          return Math.max(0, prev - 1); // ลดเวลา 1 วินาที
        });
      }, 1000);

      return () => clearInterval(interval); // เคลียร์ interval เมื่อคอมโพเนนต์ถูก unmount
    }
  }, [showModal]);

  const handleOtpChange = (element, index) => {
    const value = element.value;
    if (/^[0-9]$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // ถ้ามีการกรอก OTP ในช่องนี้ ให้ไปที่ช่องถัดไป
      if (index < 5 && value) {
        inputRefs.current[index + 1].focus();
      }
    } else if (value === "") {
      // หากช่องปัจจุบันว่าง ให้ลบค่าช่องปัจจุบันและย้าย focus ไปช่องก่อนหน้า
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);
      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();

    const otpString = otp.join(""); // รวมค่า OTP เป็น string
    console.log("OTP Submitted:", otpString);

    // เรียกใช้ฟังก์ชันการตรวจสอบ OTP
    await handleOtpVerification(otpString);

    setShowModal(false); // ปิด Modal หลังจากส่ง OTP
  };

  const handleOtpVerification = async (otp) => {
    try {
      const response = await fetch("http://localhost:8000/verify-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }), // ส่ง email และ otp ไปตรวจสอบ
      });

      const data = await response.json();

      if (response.ok) {
        console.log("OTP verified successfully");
        router.push({
          pathname: "./reset-password",
          query: { email }, // ส่ง email ไปยังหน้า reset-password
        });
      } else {
        setMessage("Invalid OTP, please try again."); // แสดงข้อความถ้า OTP ไม่ถูกต้อง
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      setMessage("An error occurred during OTP verification."); // แสดงข้อความถ้ามีข้อผิดพลาด
    }
  };

  const handleResendOtp = async () => {
    // เรียกใช้ฟังก์ชันสำหรับส่ง OTP อีกครั้ง
    await handleForgotPassword();
    setCanResend(false); // รีเซ็ตสถานะการส่ง OTP ใหม่
  };

  return (
    <>
      <Head>
        <title>Reset Password</title>
        <link
          rel="icon"
          href="https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458802193_443422025395135_5023098190288504627_n.png"
          className="Kuromi"
        />
      </Head>
      <div className="w-full h-screen bg-gradient-to-t from-blue-200 to-pink-200">
        <div className="pt-10 ml-10">
          <button onClick={goLogin}>
            <IoArrowUndoCircleOutline className="text-4xl" />
          </button>
        </div>

        <main>
          <h1 className="flex justify-center pt-20 font-semibold text-3xl">
            Reset Password
          </h1>
          <form
            onSubmit={handleForgotPassword}
            className="flex flex-col items-center mt-10"
          >
            <div className="flex flex-col w-80">
              <label htmlFor="email" className="mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="text-black bg-[#f4f6f8] focus:ring-purple-600 focus:border-purple-600 hover:border-purple-600 text-center focus:ring-1 focus:outline-none font-medium rounded-lg text-base px-5 py-2.5 inline-flex items-center justify-center mb-2 w-full h-12"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded mt-7 flex items-center justify-center hover:bg-blue-600 hover:shadow-lg"
            >
              <IoMdMail className="text-white mr-2 text-lg" />
              Send Link To Gmail
            </button>
          </form>
          {message && (
            <p className="mt-4 text-center text-green-500">{message}</p>
          )}
        </main>

        {/* Modal สำหรับใส่ OTP */}
        {showModal && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full relative">
              <button
                onClick={() => setShowModal(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl"
                aria-label="Close modal"
              >
                &times; {/* หรือใช้ไอคอนที่คุณต้องการ */}
              </button>
              <h2 className="text-xl font-semibold mb-4">Enter OTP</h2>
              <div className="flex justify-between mb-4">
                <p className="text-red-500">
                  Time remaining: {Math.floor(timeRemaining / 60)}:
                  {(timeRemaining % 60).toString().padStart(2, "0")}
                </p>
                {canResend && (
                  <button
                    onClick={handleResendOtp}
                    className="mt-4 bg-green-500 text-white px-4 py-2 hover:bg-green-600 border rounded-lg"
                  >
                    ส่ง OTP อีกครั้ง
                  </button>
                )}
              </div>
              <form
                onSubmit={handleOtpSubmit}
                className="flex flex-col items-center"
              >
                <div className="flex space-x-2 mb-4">
                  {otp.map((_, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      value={otp[index]}
                      onChange={(e) => handleOtpChange(e.target, index)}
                      ref={(el) => (inputRefs.current[index] = el)}
                      className="text-center text-black bg-gray-100 rounded-lg px-4 py-2 w-12 h-12 border-2 border-gray-300 focus:outline-none focus:border-purple-600"
                    />
                  ))}
                </div>
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white px-4 py-2 hover:bg-blue-600 hover:shadow-lg border rounded-lg"
                >
                  ยืนยัน OTP
                </button>
              </form>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
