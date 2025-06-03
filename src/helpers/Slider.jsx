import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { FaCircle } from "react-icons/fa";
import { Pagination, Navigation } from "swiper/modules";
import "./Slider.css";

export default function Slider() {
  const [ProductData] = useState([
    {
      id: 1,
      image: "/product/1.png",
      title: "Red Bordeaux-wood Grain",
      price: "$29.99",
      features: [
        "20-Year limited residential warranty",
        "Linear grain pattern with mineral streaking",
      ],
      colors: ["#8B4513", "#A0522D", "#CD853F", "#D2691E", "#E9967A"],
    },
    {
      id: 2,
      image: "/product/2.png",
      title: "Oak Natural-wood Grain",
      price: "$34.99",
      features: [
        "25-Year limited residential warranty",
        "Classic oak pattern with natural finish",
      ],
      colors: ["#DEB887", "#D2B48C", "#BC8F8F", "#F5DEB3", "#FFE4B5"],
    },
    {
      id: 3,
      image: "/product/3.png",
      title: "Walnut Dark-wood Grain",
      price: "$39.99",
      features: [
        "30-Year limited residential warranty",
        "Rich dark grain with smooth texture",
      ],
      colors: ["#654321", "#5D4037", "#8B4513", "#A0522D", "#CD853F"],
    },
    {
      id: 4,
      image: "/product/1.png",
      title: "Red Bordeaux-wood Grain",
      price: "$29.99",
      features: [
        "20-Year limited residential warranty",
        "Linear grain pattern with mineral streaking",
      ],
      colors: ["#8B4513", "#A0522D", "#CD853F", "#D2691E", "#E9967A"],
    },
    {
      id: 5,
      image: "/product/2.png",
      title: "Oak Natural-wood Grain",
      price: "$34.99",
      features: [
        "25-Year limited residential warranty",
        "Classic oak pattern with natural finish",
      ],
      colors: ["#DEB887", "#D2B48C", "#BC8F8F", "#F5DEB3", "#FFE4B5"],
    },
    {
      id: 6,
      image: "/product/3.png",
      title: "Walnut Dark-wood Grain",
      price: "$39.99",
      features: [
        "30-Year limited residential warranty",
        "Rich dark grain with smooth texture",
      ],
      colors: ["#654321", "#5D4037", "#8B4513", "#A0522D", "#CD853F"],
    },
  ]);

  return (
    <div className="w-full px-4 md:px-8 py-8 mx-auto">
      <Swiper
        slidesPerView={1}
        spaceBetween={20}
        centeredSlides={true}
        // pagination={{ clickable: true }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
        navigation
        modules={[Navigation]}
        className="mySwiper"
        loop={true}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2, centeredSlides: true },
          1024: { slidesPerView: 3, centeredSlides: true },
        }}
      >
        {ProductData.map((product) => (
          <SwiperSlide key={product.id} className="flex justify-center">
            <Card {...product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
const Card = ({
  image,
  title,
  price,
  features,
  colors,
  altText = "Product image",
}) => {
  return (
    <div className="w-[90%] sm:w-[85%] md:w-[90%] lg:w-[95%] xl:w-[90%] max-w-sm border border-gray-200 rounded-xl overflow-hidden bg-white shadow-md flex flex-col interFont">
      <div className="relative h-48 md:h-56 w-full">
        <img
          src={image || "/placeholder.svg"}
          alt={altText}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-green-800 font-semibold text-lg">{title}</h3>
        <p className="font-bold mt-1 text-base">{price}</p>
        <div className="mt-2 space-y-1 text-sm text-gray-600 flex-grow">
          {features.map((feature, index) => (
            <p key={index}>• {feature}</p>
          ))}
        </div>
        <div className="mt-3">
          <p className="text-sm text-gray-600 mb-1">Color:</p>
          <div className="flex gap-1">
            {colors.map((color, index) => (
              <FaCircle key={index} className="text-lg" style={{ color }} />
            ))}
          </div>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          <button className="bg-green-800 text-white px-4 py-1.5 rounded text-sm font-medium hover:bg-green-900 transition-colors w-full sm:w-auto">
            Shop Now
          </button>
          <button className="border border-gray-300 px-4 py-1.5 rounded text-sm font-medium hover:bg-gray-100 transition-colors w-full sm:w-auto">
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};
