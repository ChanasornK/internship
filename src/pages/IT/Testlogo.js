// import React from "react";
// import { Carousel } from "flowbite-react";

// const testlogo = () => {
//   return (
//     // <div classNameName="h-14 mt-44 bg-black flex overflow-x-auto space-x-4 p-4">
//     //   <img
//     //     classNameName="w-32 h-32 object-contain transform transition-transform duration-200 hover:scale-125"
//     //     src="https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/457131951_1923507011498718_6072730157360074857_n.png?stp=dst-png_s2048x2048&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeEr1nKNr7SU0FoDQ2tHIP3E-mnH0pWFR4P6acfSlYVHgy4Z5CBKtkRMHX7y_HnCYkCBL2n2nGWnDMvmrO9sCn7e&_nc_ohc=Ncy6btG3GBkQ7kNvgHYzEOk&_nc_ht=scontent.fbkk29-7.fna&oh=03_Q7cD1QFcXtyfiBUvILNx8j-KSTI0j4ifqNfQf7GxO8uywfBhBQ&oe=67072CFE"
//     //     alt="MSI"
//     //   />
//     //   <img
//     //     classNameName="w-32 h-32 object-contain transform transition-transform duration-200 hover:scale-125"
//     //     src="https://scontent.fbkk29-7.fna.fbcdn.net/v/t1.15752-9/457510754_955990786296520_499236372958089666_n.png?stp=dst-png_s2048x2048&_nc_cat=106&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHGwA8oCljuMiBsY0zUynhfWanuYmUJPaxZqe5iZQk9rEpv8OtOvAkTKGTeCs38ZDSrypTYiZiKEY8fMw6SO_Yo&_nc_ohc=jV5RYTwltRoQ7kNvgE5y9Sb&_nc_ht=scontent.fbkk29-7.fna&_nc_gid=AOjhZD_ISECOFfz8AW2LcZJ&oh=03_Q7cD1QHCClOx44iHxIhNaBjHD2aPtYHfdjENI8PfBQS1oKETiw&oe=67071B17"
//     //     alt="ASUS"
//     //   />
//     //   <img
//     //     classNameName="w-32 h-32 object-contain transform transition-transform duration-200 hover:scale-125"
//     //     src="https://scontent.fbkk29-9.fna.fbcdn.net/v/t1.15752-9/457447325_1715182919225000_8075187449906730638_n.png?stp=dst-png_s2048x2048&_nc_cat=105&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeG3Ykvz8TtZwM6ocLwfCg2NLCSr8aShEywsJKvxpKETLIZURCJQPlfpENRyIuZj9EVSKqlQXbN4kLYfgFBHF7ao&_nc_ohc=YXrmIfBLu1sQ7kNvgHizcEh&_nc_ht=scontent.fbkk29-9.fna&_nc_gid=AOwZlXSpxWDkEOF8o81Z7HA&oh=03_Q7cD1QGcn0ztJCBFRQAyiJnCndfStCOxgDk3gETvzbhADwnpMQ&oe=67075D38"
//     //     alt="Logitech"
//     //   />
//     //   <img
//     //     classNameName="w-32 h-32 object-contain transform transition-transform duration-200 hover:scale-125"
//     //     src="https://scontent.fbkk29-4.fna.fbcdn.net/v/t1.15752-9/457510761_1222879655526200_8627781567526296244_n.png?stp=dst-png_s2048x2048&_nc_cat=110&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeF6M96ht1ltRKNlsV8ve6ne59vAzg-eOHfn28DOD544dwhbQb6zY2RxawwXksXDB85RMygALir8JcYMO9DKisZW&_nc_ohc=LeAVIpxuJdkQ7kNvgEluuO8&_nc_ht=scontent.fbkk29-4.fna&_nc_gid=ALUmejZjfFcT-lOekdWvlRi&oh=03_Q7cD1QEcOPRvpxd2ubRv0HQAWYxSruFlDph1yjl4X0QA1c8YPA&oe=670767B3"
//     //     alt="Corsair"
//     //   />
//     //   <img
//     //     classNameName="w-32 h-32 object-contain transform transition-transform duration-200 hover:scale-125"
//     //     src="https://scontent.fbkk29-8.fna.fbcdn.net/v/t1.15752-9/457038535_904467264858858_2026538451204648731_n.png?stp=dst-png_s2048x2048&_nc_cat=109&ccb=1-7&_nc_sid=9f807c&_nc_eui2=AeHhBW8BwDLugZgUCWTuGNw5EnM1ZOTAARASczVk5MABEHwoZqxbwAtspr2OMYiwXnlPjs-VWwoqpRMyjBxxo-2V&_nc_ohc=j1ToDKTbFZUQ7kNvgFtLQ7G&_nc_ht=scontent.fbkk29-8.fna&_nc_gid=ALF-wl08opOPzgsgy_MKiF8&oh=03_Q7cD1QF0nq4kPZsmMzr17vpvktZSOwlYK-AmU4nnKGk0wV5NTw&oe=670748A4"
//     //     alt="LG"
//     //   />
//     // </div>
   

//     <section className="slider-wrapper">
//       <div className="swiper">
//         <!-- Additional required wrapper -->
//         <div className="swiper-wrapper">
//           <!-- Slides -->
//           <div className="swiper-slide selected">All</div>
//           <div className="swiper-slide">Javascript</div>
//           <div className="swiper-slide">PHP</div>
//           <div className="swiper-slide">React</div>
//           <div className="swiper-slide">Next JS</div>
//           <div className="swiper-slide">Angular</div>
    
//           <div className="swiper-slide">Node js</div>
//           <div className="swiper-slide">Music</div>
//           <div className="swiper-slide">Cryptocurrency</div>
//           <div className="swiper-slide">Gaming</div>
//           <div className="swiper-slide">Live</div>
//           <div className="swiper-slide">AI</div>
    
//           <div className="swiper-slide">Mixes</div>
//           <div className="swiper-slide">Piano</div>
//           <div className="swiper-slide">Instrumental</div>
//         </div>
    
//       </div>
//       <div className="custom-swiper-button-prev">
//         <svg width="9.786" height="18.158" viewBox="0 0 9.786 18.158">
//           <defs>
//             <style>
//               .a {
//                 fill: none;
//                 stroke: #fff;
//                 stroke-linecap: round;
//               }
//             </style>
//           </defs>
//           <path className="a" d="M5281.637,694l8.726,8.726,8.725-8.726" transform="translate(703.433 -5281.284) rotate(90)" />
//         </svg>
    
//       </div>
//       <div className="custom-swiper-button-next">
//         <svg width="9.786" height="18.158" viewBox="0 0 9.786 18.158">
//           <defs>
//             <style>
//               .a {
//                 fill: none;
//                 stroke: #fff;
//                 stroke-linecap: round;
//               }
//             </style>
//           </defs>
//           <path className="a" d="M5281.637,694l8.726,8.726,8.725-8.726" transform="translate(-693.646 5299.442) rotate(-90)" />
//         </svg>
//       </div>
//     </section>
    
   
//   );
// };

// export default testlogo;
