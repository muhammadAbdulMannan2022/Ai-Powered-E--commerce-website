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
    if (!isLoading && data) {
      // Flatten all wood_types from each category
      const allWoodTypes = data.flatMap((category) =>
        category.wood_types.map((wood) => ({
          ...wood,
          category_id: category.id,
          category_name: category.name,
          images: category.images,
          videos: category.videos,
        }))
      );
      setProductsData(allWoodTypes);
    }
  }, [data, isLoading]);
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
        {" "}
        {console.log(ProductData)}
        {ProductData.map((product) => (
          <SwiperSlide key={product.id} className="flex justify-center">
            <Card
              key={product.id}
              id={product.id}
              name={product.name}
              tagline={product.tagline}
              secondary_tagline={product.secondary_tagline}
              price_display={product.price_display}
              actual_price={product.actual_price}
              available_colors={product.color_images}
              image_url={
                product.color_images[0]?.image_url || "/placeholder.svg"
              }
              altText={`${product.name} product image`}
              slug={product.slug}
            />
          </SwiperSlide>
        ))}
        {/* Add navigation buttons */}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
}
