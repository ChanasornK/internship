import React from "react";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter();
  const handleHomePage = () => {
    window.location.reload();
  };

  return (
    <div className="">
      <div className="w-full h-screen">
        <header className="w-full bg-[#003399] text-white">
          <div className="flex  justify-start w-4/5 mx-auto text-white font-bold font-serif text-3xl h-40">
            <button className="-mt-16" onClick={handleHomePage}>
              Ming.com
            </button>
            <div className="flex ml-96 bg-red-400 -mt-16 items-center justify-center">
              Icon
            </div>
          </div>
        </header>
        <div className="flex w-full h-[50%] bg-pink-600 ">Hello</div>
      </div>
     
    </div>
  );
};

export default index;
