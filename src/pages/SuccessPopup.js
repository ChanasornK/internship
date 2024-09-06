import { useState, useEffect } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

const SuccessPopup = ({ message, showPopup, onClose }) => {
  useEffect(() => {
    if (showPopup) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000); // Close popup after 3 seconds
      return () => clearTimeout(timer);
    }
  }, [showPopup, onClose]);

  return (
    showPopup && (
      <div className="fixed top-10 right-10 bg-white shadow-lg rounded-md p-4 flex items-center gap-2 w-80 border border-gray-200">
        <FaCheckCircle className="text-green-500 text-2xl" />
        <span className="text-gray-700">{message}</span>
        <div className="ml-auto cursor-pointer" onClick={onClose}>
          <span className="text-gray-500">×</span>
        </div>
      </div>
    )
  );
};

export default SuccessPopup;
