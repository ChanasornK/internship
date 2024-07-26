import React from "react";
import { useRouter } from "next/router";
const index = () => {
  const router = useRouter();
  const handleHomePage = () => {
    window.location.reload();
  };

  return (
    <div className="">
      <div className="w-full h-auto">
        <header className="w-full bg-[#003399] text-white">
          <div className="flex  justify-start w-4/5 mx-auto text-white font-bold font-serif text-3xl h-36">
            <button className="-mt-16" onClick={handleHomePage}>
              Ming.com
            </button>
            <div className="flex ml-80 bg-red-400 -mt-16 items-center justify-center">
              Icon
            </div>
          </div>
        </header>
        <div className=" w-full h-[55%] bg-white mt-24 ">
          <div className="flex justify-center items-center">
            <div className=" w-80   p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
              <button>
                <div className="  h-40 w-56">
                  <img
                    src="https://dlcdnwebimgs.asus.com/gain/C650BB77-5D96-4CED-86C2-68B700AF88C9/w750/h470"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Monitors</h1>
                </div>
              </button>
            </div>
            <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
              <button>
                <div className="  h-40 w-56">
                  <img
                    src="https://www.pcworld.com/wp-content/uploads/2023/10/Pic-2.jpg?quality=50&strip=all&w=1024"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Laptops</h1>
                </div>
              </button>
            </div>
            <button>
              <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
                <div className="  h-40 w-56">
                  <img
                    src="https://media.education.studio7thailand.com/33949/Apple-iPad-Pro-11-inch-Wi-Fi-Space-Gray-1-square_medium.jpg"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Tablets</h1>
                </div>
              </div>
            </button>
            <button>
              <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
                <div className="  h-40 w-56">
                  <img
                    src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Phone</h1>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className=" w-full h-[55%] bg-white  ">
          <div className="flex justify-center items-center">
            <div className=" w-80   p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
              <button>
                <div className="  h-40 w-56">
                  <img
                    src="https://dlcdnwebimgs.asus.com/gain/C650BB77-5D96-4CED-86C2-68B700AF88C9/w750/h470"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Monitors</h1>
                </div>
              </button>
            </div>
            <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
              <button>
                <div className="  h-40 w-56">
                  <img
                    src="https://www.pcworld.com/wp-content/uploads/2023/10/Pic-2.jpg?quality=50&strip=all&w=1024"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Laptops</h1>
                </div>
              </button>
            </div>
            <button>
              <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
                <div className="  h-40 w-56">
                  <img
                    src="https://media.education.studio7thailand.com/33949/Apple-iPad-Pro-11-inch-Wi-Fi-Space-Gray-1-square_medium.jpg"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Tablets</h1>
                </div>
              </div>
            </button>
            <button>
              <div className=" w-80 text-center align-middle p-4 border-2 border-solid  h-64 w-42 flex items-center justify-center">
                <div className="  h-40 w-56">
                  <img
                    src="https://store.storeimages.cdn-apple.com/8756/as-images.apple.com/is/iphone-card-40-iphone15prohero-202309_FMT_WHH?wid=508&hei=472&fmt=p-jpg&qlt=95&.v=1693086369818"
                    className="w-full h-full object-cover"
                  ></img>
                  <h1>Phone</h1>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="bg-white w-full mt-12 font-medium font-serif text-xl">
          <h1 className="ml-32">
            Most View
          </h1>
        
      </div>
      <div className="bg-pink-400 w-full h-80 mt-12">

      </div>
      </div>
      
    </div>
  );
};

export default index;
