import React from "react";
import Menu from "./component/Menu";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import LoadingModal from "./component/loading";
import FixInformation from "./component/FixInformation";
import Information from "./component/Information";
import RatingStarz from "./component/RatingStarz";
import Head from "next/head";

const Myreview = () => {
  const [images, setImages] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [storedEmail, setStoredEmail] = useState(null);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedData = localStorage.getItem("profile");
      let storedEmail = "";
      if (storedData) {
        const profile = JSON.parse(storedData);
        setRole(profile?.userData?.role);
        storedEmail = profile?.userData?.email;
        setStoredEmail(storedEmail);
      }

      try {
        const response = await getImage();
        const imageDataArray = response.data.imageData;

        const validImageDataArray = imageDataArray
          .filter((image) => image.email === storedEmail)
          .map((image) => {
            const base64String = arrayBufferToBase64(image.image.data);
            return {
              id: image.id,
              src: `data:image/png;base64,${base64String}`,
              price: image.price,
              detail: image.detail,
              link: image.link,
              type: image.type,
              rating: image.rating,
              views: image.view,
              email: image.email,
            };
          });

        setImages(validImageDataArray);
      } catch (error) {
        console.error("Error fetching images:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const getImage = async () => {
    try {
      const response = await fetch("http://localhost:8000/getAllImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        return { data };
      } else {
        console.error("Fetch image failed:", data.message);
        return false;
      }
    } catch (error) {
      console.error("Error during fetch image:", error);
      return false;
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;
    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const handleImageClick = (id, link) => {
    window.open(link, "_blank"); // Open the link in a new tab
  };

  // if (loading) {
  //   return <LoadingModal />;
  // }

  return (
    <>
    <Head>
        <title>MyReview</title>
        <link
          rel="icon"
          href="https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458802193_443422025395135_5023098190288504627_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGsvhUqiFI2qfwLotyWmZhEHd1t-B62SgQd3W34HrZKE4xCsI1KQ3Ujgl8xM6tYkfrHIPiZqWI6QkxmepUb6zn&_nc_ohc=QOH9wPGvvU0Q7kNvgG3q1YJ&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=AIjsg8BkR9RPCPVN4o52Vzj&oh=03_Q7cD1QHZnrRI-bLWf-7dxyKZ1kf1jHuINieX_YjZdvCUTAXf3Q&oe=6710882F"
          className="Kuromi "
        />
      </Head>
      {loading ? (
        <LoadingModal />
      ) : (
        <div>
          <Menu />
          <div className="min-h-screen w-full bg-gradient-to-t from-blue-200 to-pink-200 overflow-auto">
            <div className="flex justify-end w-full ">
              <div className="mr-10 mt-44">
                <Information />
              </div>
            </div>

            <div className="flex justify-center items-center -mt-5 ">
              <div className="flex flex-wrap justify-center w-4/5 mb-5">
                {images.map((img, index) => (
                  <div
                    key={index}
                    className="w-64 p-4 border-2 border-[#FF8FAB] rounded-lg shadow-lg h-[450px] bg-gray-100 mx-3 overflow-hidden mt-10"
                  >
                    <button onClick={() => handleImageClick(img.id, img.link)}>
                      {img.src && (
                        <div className="relative z-20">
                          <img
                            src={img.src}
                            alt={`Fetched Image ${index}`}
                            className="w-auto h-56 object-cover transform transition-transform duration-200 hover:scale-125"
                          />
                          <span className="absolute bottom- left-0 bg-gray-100 bg-opacity-75 text-black flex justify-start text-left font-semibold text-base">
                            {img.detail}
                          </span>
                        </div>
                      )}
                    </button>
                    <div className="mt-32">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <RatingStarz
                            getRating={img.rating}
                            isEnabled={false}
                          />
                        </div>
                        {((img.email === storedEmail && role) ||
                          role === "admin") && (
                          <FixInformation dataSource={img} />
                        )}
                      </div>

                      <div className="flex justify-between mt-2">
                        <span className="text-red-600 font-medium">
                          {img.price}
                        </span>
                        <div className="ml-1">{img.views} views</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Myreview;
