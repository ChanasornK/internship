import { useState, useEffect } from "react";
import { FaCheckCircle, FaTimes } from "react-icons/fa";

const SuccessPopup = ({ message, showPopup, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [progress, setProgress] = useState(100);

  useEffect(() => {
    let interval;
    if (showPopup) {
      setIsClosing(false); // Reset closing state when popup is shown
      setProgress(100); // Reset progress bar to full width

      // Decrease progress every 20ms to complete in 3000ms
      interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.max(prev - 1, 0);
          if (newProgress === 0) {
            setIsClosing(true); // Start closing animation
            setTimeout(onClose, 500); // Close popup after animation finishes
          }
          return newProgress;
        });
      }, 20);

      return () => {
        clearInterval(interval);
      };
    } else {
      setIsClosing(false); // Reset closing state when popup is hidden
    }
  }, [showPopup, onClose]);

  const handleClose = () => {
    setIsClosing(true); // Start closing animation when user clicks close
    setTimeout(onClose, 500); // Delay to let the animation finish
  };

  return (
    showPopup && (
      <div className="fixed inset-10 flex justify-center items-start z-50">
        <div
          className={`flex flex-col justify-center bg-white shadow-lg rounded-md p-4 gap-2 w-80 border border-gray-200 transform transition-all duration-500 ${
            isClosing
              ? "-translate-y-10 opacity-0" // Move up and fade out
              : "translate-y-0 opacity-100 animate-bounceInDown" // Bounce down when showing
          }`}
          style={{
            transition: "transform 0.5s ease-in-out, opacity 0.5s ease-in-out",
          }}
        >
          <div className="flex items-center">
            <FaCheckCircle className="text-green-500 text-2xl" />
            <span className="text-gray-700 ml-2">{message}</span>
            <div className="ml-auto cursor-pointer" onClick={handleClose}>
              <FaTimes className="text-gray-500 text-xl hover:text-gray-700 transition-all duration-300" />
            </div>
          </div>

          {/* Progress Bar - Under the message */}
          <div className="w-full mt-2 h-1 bg-gray-200 rounded-full">
            <div
              key={showPopup ? "show" : "hide"}
              className="h-full bg-green-500 rounded-full transition-all duration-300"
              style={{
                width: `${progress}%`,
                transition: `width ${progress === 0 ? 0 : 0.03}s linear`, // Adjusted for smooth transition
              }}
            ></div>
          </div>
        </div>
      </div>
    )
  );
};

export default SuccessPopup;
