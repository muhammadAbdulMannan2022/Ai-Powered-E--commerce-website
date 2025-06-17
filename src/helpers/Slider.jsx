import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation"; // Ensure navigation CSS is included
import { FaCircle } from "react-icons/fa";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import "./Slider.css";
import Card from "./Card";
import { useGetProductsQuery } from "../redux/features/Products/ProductsSlice";

export default function Slider() {
  const [ProductData, setProductsData] = useState([]);
  const { data, isLoading, isError } = useGetProductsQuery();
  useEffect(() => {
    if (!isLoading) {
      setProductsData(data);
    }
    console.log(data, "data i have loaded");
  }, [data]);
  return (
    <div className="w-full px-4 md:px-8 py-8 mx-auto slider_styles">
      <Swiper
        slidesPerView={3}
        spaceBetween={20}
        centeredSlides={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: true,
        }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        modules={[Navigation, Autoplay]}
        className="mySwiper"
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 3, centeredSlides: true },
          1024: { slidesPerView: 3, centeredSlides: true },
        }}
      >
        {ProductData.map((product) => (
          <SwiperSlide key={product.id} className="flex justify-center">
            <Card {...product} />
          </SwiperSlide>
        ))}
        {/* Add navigation buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
}

// const Card = ({
//   image,
//   title,
//   price,
//   features,
//   colors,
//   altText = "Product image",
// }) => {
//   return (
//     <div className="w-[90%] sm:w-[85%] md:w-[90%] lg:w-[95%] xl:w-[90%] max-w-sm border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md flex flex-col interFont">
//       <div className="relative h-48 md:h-56 w-full">
//         <img
//           src={image || "/placeholder.svg"}
//           alt={altText}
//           className="w-full h-full object-cover"
//         />
//       </div>
//       <div className="p-4 flex flex-col flex-grow">
//         <h3 className="text-green-800 font-semibold text-lg">{title}</h3>
//         <p className="font-bold mt-1 text-base">{price}</p>
//         <div className="mt-2 space-y-1 text-sm text-gray-600 flex-grow">
//           {features.map((feature, index) => (
//             <p key={index}>• {feature}</p>
//           ))}
//         </div>
//         <div className="mt-3">
//           <p className="text-sm text-gray-600 mb-1">Color:</p>
//           <div className="flex gap-1">
//             {colors.map((color, index) => (
//               <FaCircle key={index} className="text-lg" style={{ color }} />
//             ))}
//           </div>
//         </div>
//         <div className="mt-4 flex flex-wrap gap-2">
//           <button className="bg-green-800 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-green-900 transition-colors w-full sm:w-auto">
//             Shop Now
//           </button>
//           <button className="border border-gray-300 px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto">
//             Explore More
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };
