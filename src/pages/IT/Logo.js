import React from "react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
const Logo = () => {
  const router = useRouter();
  const goToPage = (brand) => {
    router.push(`../LogoPage/${brand}`);
  };

  return (
    <div className="flex gap-10">
      <button onClick={() => goToPage("MSI")}>
        <div className="w-32 h-14">
          <img
            src="https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/457131951_1923507011498718_6072730157360074857_n.png?stp=dst-png_s2048x2048&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEr1nKNr7SU0FoDQ2tHIP3E-mnH0pWFR4P6acfSlYVHgy4Z5CBKtkRMHX7y_HnCYkCBL2n2nGWnDMvmrO9sCn7e&_nc_ohc=Ncy6btG3GBkQ7kNvgHYzEOk&_nc_ht=scontent.fbkk29-7.fna&oh=03_Q7cD1QFcXtyfiBUvILNx8j-KSTI0j4ifqNfQf7GxO8uywfBhBQ&oe=67072CFE"
            className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-125"
          />
        </div>
      </button>
      <button onClick={() => goToPage("ASUS")}>
        <div className="w-32 h-14">
          <img
            src="https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/457510754_955990786296520_499236372958089666_n.png?stp=dst-png_s2048x2048&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGwA8oCljuMiBsY0zUynhfWanuYmUJPaxZqe5iZQk9rEpv8OtOvAkTKGTeCs38ZDSrypTYiZiKEY8fMw6SO_Yo&_nc_ohc=jV5RYTwltRoQ7kNvgE5y9Sb&_nc_ht=scontent.fbkk29-7.fna&_nc_gid=AOjhZD_ISECOFfz8AW2LcZJ&oh=03_Q7cD1QHCClOx44iHxIhNaBjHD2aPtYHfdjENI8PfBQS1oKETiw&oe=67071B17"
            className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-125"
          />
        </div>
      </button>
      <button onClick={() => goToPage("Logitech")}>
        <div className="w-32 h-14">
          <img
            src="https://scontent.fbkk29-9.fna.fbcdn.net/v/t1.15752-9/457447325_1715182919225000_8075187449906730638_n.png?stp=dst-png_s2048x2048&_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG3Ykvz8TtZwM6ocLwfCg2NLCSr8aShEywsJKvxpKETLIZURCJQPlfpENRyIuZj9EVSKqlQXbN4kLYfgFBHF7ao&_nc_ohc=YXrmIfBLu1sQ7kNvgHizcEh&_nc_ht=scontent.fbkk29-9.fna&_nc_gid=AOwZlXSpxWDkEOF8o81Z7HA&oh=03_Q7cD1QGcn0ztJCBFRQAyiJnCndfStCOxgDk3gETvzbhADwnpMQ&oe=67075D38"
            className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-125"
          />
        </div>
      </button>
      <button onClick={() => goToPage("Corsair")}>
        <div className="w-32 h-14">
          <img
            src="https://scontent.fbkk29-4.fna.fbcdn.net/v/t1.15752-9/457510761_1222879655526200_8627781567526296244_n.png?stp=dst-png_s2048x2048&_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeF6M96ht1ltRKNlsV8ve6ne59vAzg-eOHfn28DOD544dwhbQb6zY2RxawwXksXDB85RMygALir8JcYMO9DKisZW&_nc_ohc=LeAVIpxuJdkQ7kNvgEluuO8&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=ALUmejZjfFcT-lOekdWvlRi&oh=03_Q7cD1QEcOPRvpxd2ubRv0HQAWYxSruFlDph1yjl4X0QA1c8YPA&oe=670767B3"
            className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-125"
          />
        </div>
      </button>
      <button onClick={() => goToPage("Lg")}>
        <div className="w-32 h-10">
          <img
            src="https://scontent.fbkk29-8.fna.fbcdn.net/v/t1.15752-9/457038535_904467264858858_2026538451204648731_n.png?stp=dst-png_s2048x2048&_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHhBW8BwDLugZgUCWTuGNw5EnM1ZOTAARASczVk5MABEHwoZqxbwAtspr2OMYiwXnlPjs-VWwoqpRMyjBxxo-2V&_nc_ohc=j1ToDKTbFZUQ7kNvgFtLQ7G&_nc_ht=scontent.fbkk29-8.fna&_nc_gid=ALF-wl08opOPzgsgy_MKiF8&oh=03_Q7cD1QF0nq4kPZsmMzr17vpvktZSOwlYK-AmU4nnKGk0wV5NTw&oe=670748A4"
            className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-125"
          />
        </div>
      </button>
      <button onClick={() => goToPage("HyperX")}>
        <div className="w-32 h-12">
          <img
            src="https://scontent.fbkk29-9.fna.fbcdn.net/v/t1.15752-9/457496665_1187869285625307_2132536490234750103_n.png?stp=dst-png_s2048x2048&_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHHcfWspjNJcIyyM7auTYppIj8F_ZXVjIgiPwX9ldWMiHVUre66pyKKxEwrgYq2Mji3YA99Vsl0WbWaY1pLChBl&_nc_ohc=W9hIXLy1Gu8Q7kNvgHx09Jz&_nc_ht=scontent.fbkk29-9.fna&oh=03_Q7cD1QFDg71iyLSu9EySSMg68vgiJ2z4vfKGGc5raEKDgYhDjw&oe=6707757E"
            className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-125"
          />
        </div>
      </button>
      <button onClick={() => goToPage("Razer")}>
        <div className="w-32 h-12">
          <img
            src="https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458283147_1562015881087039_7138264112162137481_n.png?stp=dst-png_s2048x2048&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHXWnM9l6ugsbbRl-Ocq8jLVK9Mt03hqtVUr0y3TeGq1SeioT-3t2fHlfbjspVuepxdec81djOqVG0Ox7myew2I&_nc_ohc=95peJYqL1EAQ7kNvgHG6mtK&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=A1XcMIKIx4rylv_FfNdvAp2&oh=03_Q7cD1QGQ6sJ4OWU3oJ4OaqebCh4oh64h_u5tt1oVMbaT6ttK0w&oe=67075F11"
            className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-125"
          />
        </div>
      </button>
      <button onClick={() => goToPage("Asrock")}>
        <div className="w-32 h-14">
          <img
            src="https://scontent.fbkk29-8.fna.fbcdn.net/v/t1.15752-9/456789115_3970818893203244_1071450512181134003_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE7veWgyybx9n5EEYl6gmo4z8QzdfEG2jPPxDN18QbaM1JUOKbgATFICKaMv0Uiil3XwEHYTc6Lq4ZEt_vRYe1a&_nc_ohc=u53KO58OrzQQ7kNvgH08ewD&_nc_ht=scontent.fbkk29-8.fna&oh=03_Q7cD1QGnADyGsu7zZCyMMq4B00nFPgUSJyxBLbk4cE6T7ii5jA&oe=6707775B"
            className="w-full h-full object-contain transform transition-transform duration-200 hover:scale-125"
          />
        </div>
      </button>
    </div>
  );
};

export default Logo;
