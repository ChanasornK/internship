import React from "react";
import Slider from "react-slick";
import { useRouter } from "next/router";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Testlogo = () => {
  const router = useRouter();
  const logos = [
    {
      name: "MSI",
      imgUrl:
        "https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/457131951_1923507011498718_6072730157360074857_n.png?stp=dst-png_s2048x2048&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEr1nKNr7SU0FoDQ2tHIP3E-mnH0pWFR4P6acfSlYVHgy4Z5CBKtkRMHX7y_HnCYkCBL2n2nGWnDMvmrO9sCn7e&_nc_ohc=Ncy6btG3GBkQ7kNvgHYzEOk&_nc_ht=scontent.fbkk29-7.fna&oh=03_Q7cD1QFcXtyfiBUvILNx8j-KSTI0j4ifqNfQf7GxO8uywfBhBQ&oe=67072CFE",
    },
    {
      name: "ASUS",
      imgUrl:
        "https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/457510754_955990786296520_499236372958089666_n.png?stp=dst-png_s2048x2048&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGwA8oCljuMiBsY0zUynhfWanuYmUJPaxZqe5iZQk9rEpv8OtOvAkTKGTeCs38ZDSrypTYiZiKEY8fMw6SO_Yo&_nc_ohc=jV5RYTwltRoQ7kNvgE5y9Sb&_nc_ht=scontent.fbkk29-7.fna&_nc_gid=AOjhZD_ISECOFfz8AW2LcZJ&oh=03_Q7cD1QHCClOx44iHxIhNaBjHD2aPtYHfdjENI8PfBQS1oKETiw&oe=67071B17",
    },
    {
      name: "Logitech",
      imgUrl:
        "https://scontent.fbkk29-9.fna.fbcdn.net/v/t1.15752-9/457447325_1715182919225000_8075187449906730638_n.png?stp=dst-png_s2048x2048&_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG3Ykvz8TtZwM6ocLwfCg2NLCSr8aShEywsJKvxpKETLIZURCJQPlfpENRyIuZj9EVSKqlQXbN4kLYfgFBHF7ao&_nc_ohc=YXrmIfBLu1sQ7kNvgHizcEh&_nc_ht=scontent.fbkk29-9.fna&_nc_gid=AOwZlXSpxWDkEOF8o81Z7HA&oh=03_Q7cD1QGcn0ztJCBFRQAyiJnCndfStCOxgDk3gETvzbhADwnpMQ&oe=67075D38",
    },
    {
      name: "Corsair",
      imgUrl:
        "https://scontent.fbkk29-4.fna.fbcdn.net/v/t1.15752-9/457510761_1222879655526200_8627781567526296244_n.png?stp=dst-png_s2048x2048&_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeF6M96ht1ltRKNlsV8ve6ne59vAzg-eOHfn28DOD544dwhbQb6zY2RxawwXksXDB85RMygALir8JcYMO9DKisZW&_nc_ohc=LeAVIpxuJdkQ7kNvgEluuO8&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=ALUmejZjfFcT-lOekdWvlRi&oh=03_Q7cD1QEcOPRvpxd2ubRv0HQAWYxSruFlDph1yjl4X0QA1c8YPA&oe=670767B3",
    },
    {
      name: "Lg",
      imgUrl:
        "https://www.freepnglogos.com/uploads/lg-logo-png/lg-logo-partnership-with-bang-olufsen-yields-top-class-1.png",
    },
    {
      name: "HyperX",
      imgUrl:
        "https://scontent.fbkk29-9.fna.fbcdn.net/v/t1.15752-9/457496665_1187869285625307_2132536490234750103_n.png?stp=dst-png_s2048x2048&_nc_cat=104&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHHcfWspjNJcIyyM7auTYppIj8F_ZXVjIgiPwX9ldWMiHVUre66pyKKxEwrgYq2Mji3YA99Vsl0WbWaY1pLChBl&_nc_ohc=W9hIXLy1Gu8Q7kNvgHx09Jz&_nc_ht=scontent.fbkk29-9.fna&oh=03_Q7cD1QFDg71iyLSu9EySSMg68vgiJ2z4vfKGGc5raEKDgYhDjw&oe=6707757E",
    },
    {
      name: "Razer",
      imgUrl:
        "https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/458283147_1562015881087039_7138264112162137481_n.png?stp=dst-png_s2048x2048&_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHXWnM9l6ugsbbRl-Ocq8jLVK9Mt03hqtVUr0y3TeGq1SeioT-3t2fHlfbjspVuepxdec81djOqVG0Ox7myew2I&_nc_ohc=95peJYqL1EAQ7kNvgHG6mtK&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=A1XcMIKIx4rylv_FfNdvAp2&oh=03_Q7cD1QGQ6sJ4OWU3oJ4OaqebCh4oh64h_u5tt1oVMbaT6ttK0w&oe=67075F11",
    },
    {
      name: "Asrock",
      imgUrl:
        "https://scontent.fbkk29-8.fna.fbcdn.net/v/t1.15752-9/456789115_3970818893203244_1071450512181134003_n.png?_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE7veWgyybx9n5EEYl6gmo4z8QzdfEG2jPPxDN18QbaM1JUOKbgATFICKaMv0Uiil3XwEHYTc6Lq4ZEt_vRYe1a&_nc_ohc=u53KO58OrzQQ7kNvgH08ewD&_nc_ht=scontent.fbkk29-8.fna&oh=03_Q7cD1QGnADyGsu7zZCyMMq4B00nFPgUSJyxBLbk4cE6T7ii5jA&oe=6707775B",
    },
    {
      name: "Lenovo",
      imgUrl:
        "https://scontent.fbkk29-5.fna.fbcdn.net/v/t1.15752-9/456812688_1550154775591509_699400311333807581_n.png?stp=dst-png_s2048x2048&_nc_cat=107&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHgOYU5uE9zwRWvcA13cPIqpuMPuwhLmfCm4w-7CEuZ8DaMesTZdpaiAibGjD0HIa-_9zuwomlWcFo0bJ-S7Ru8&_nc_ohc=hysxZYPOrxEQ7kNvgFRwtUE&_nc_ht=scontent.fbkk29-5.fna&_nc_gid=AraH1-tfD9ifspqZ_IxU6NM&oh=03_Q7cD1QH_P870dbG0LbCWJinPaWUdiRufhy89cOLRF2T3lxEzDw&oe=6708BA96",
    },
    {
      name: "Samsung",
      imgUrl:
        "https://scontent.fbkk29-6.fna.fbcdn.net/v/t1.15752-9/459099897_1054276246087809_6410559811456905430_n.png?_nc_cat=103&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeE9A9dM9he32Mi5PPZ8l4uoSd2L51AQhcxJ3YvnUBCFzIxtj2QgQnDhIz-mibSSI6YPUt3qMU59653hpcwK7ujm&_nc_ohc=YiqPoSodvBsQ7kNvgHvMTMY&_nc_ht=scontent.fbkk29-6.fna&_nc_gid=AbmWlD6XykaCZTdYnh5mneN&oh=03_Q7cD1QGrLPKYapWKsh4f9PjdnQhzbNTuLj-nd-XMLW2Rt7C4-Q&oe=6708CEE3",
    },
    {
      name: "Predator",
      imgUrl:
        "https://scontent.fbkk29-1.fna.fbcdn.net/v/t1.15752-9/457070509_1247376719748870_8094528576549176747_n.png?stp=dst-png_s2048x2048&_nc_cat=101&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHSApGL9baE3TxRrNHXs4dVA1_0JKEe_18DX_QkoR7_X03VtsoUpUWdOTpEu9lS1vPUKNG8k9zL6PaWQy_1yoC4&_nc_ohc=deuQh5AhR4gQ7kNvgFM2C2N&_nc_ht=scontent.fbkk29-1.fna&oh=03_Q7cD1QF6587kz73t8ucQkCvbX8XireHyVYirOK6YprhuNZcPQQ&oe=6708C590",
    },
  ];

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 8, // แสดงโลโก้ 4 รูปต่อหน้า
    slidesToScroll: 1, // เลื่อนทีละ 1 รูป
    autoplay: true,
    autoplaySpeed: 3000, // สไลด์ทุก 3 วินาที
    arrows: true, // มีปุ่มลูกศรให้กดเพื่อเลื่อนหน้า
  };

  const goToPage = (brand) => {
    router.push(`../LogoPage/${brand}`);
  };

  return (
    <div className="w-full">
      <Slider {...settings}>
        {logos.map((logo, index) => (
          <div
            key={index}
            onClick={() => goToPage(logo.name)}
            className="flex items-center justify-center p-4  dark:bg-gray-700 dark:text-white cursor-pointer"
          >
            <img
              src={logo.imgUrl}
              alt={logo.name}
              className="w-24 h-12 object-contain"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Testlogo;
