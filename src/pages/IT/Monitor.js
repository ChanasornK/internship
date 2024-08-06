import React from "react";
import Searchform from "../component/Searchform";
import { useRouter } from "next/router";
const Monitor = () => {
  const router = useRouter();
  const handleHomePage = () => {
    router.push("../"); 
  };
  return (
    <>
      <header className="w-full bg-[#003399] text-white">
        <div className="flex  justify-start w-4/5 mx-auto  text-white font-bold font-serif text-4xl h-36">
          <button onClick={handleHomePage} className="-mt-[3%]">Ming.com</button> <Searchform />
          {/* <div className="flex ml-80 bg-red-400 -mt-16 items-center justify-center">
              Icon
            </div> */}
        </div>
      </header>
    </>
  );
};

export default Monitor;
