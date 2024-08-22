import { Modal } from "flowbite-react";
import React from "react";
import { Oval } from "react-loader-spinner";
import { ProgressBar } from "react-loader-spinner";
const LoadingModal = ({ openModal }) => {
  return (
    <>
      <div className="flex justify-center items-center h-screen bg-gradient-to-t from-blue-200 to-pink-200 ">
        <div className="flex justify-center items-center">
          <div
            role="progressbar"
            aria-label="progress-bar-loading"
            className="h-20 w-20 border-t-4 border-r-4 border-b-4 border-l-4 border-t-transparent border-r-[#FF8FAB] border-purple-400 rounded-full animate-spin"
          ></div>
        </div>
      </div>
    </>
  );
};

export default LoadingModal;
