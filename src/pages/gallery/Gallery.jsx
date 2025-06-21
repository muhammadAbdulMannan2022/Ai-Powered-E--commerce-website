import React, { useState } from "react";
import ReHero from "../../Shared/Hero/ReHero";
import { FaEnvelope, FaShoppingCart, FaSpinner } from "react-icons/fa";
import ImageGallery from "./ImageGallery";
import VideoGallery from "./VideoGallery";
import { useGetGalleryQuery } from "../../redux/features/Products/ProductsSlice";

export default function Gallery() {
  const { data: projects, isLoading, isError } = useGetGalleryQuery();
  const [active, setActive] = useState("img");

  return (
    <div>
      <ReHero
        backgroundImage="/gallery.png"
        title={
          <>
            <span className="text-[#C7E44E]">Inspiration Gallery</span>
          </>
        }
        description="we’re committed to delivering premium fencing solutions that stand the test of time. Our focus on quality materials, expert craftsmanship, and customer-first service ensures"
        primaryButtonText="Shop Now"
        secondaryButtonText="Order Free Sample"
        primaryButtonAction={() => {}}
        secondaryButtonAction={() => {}}
        primaryButtonIcon={<FaShoppingCart className="mr-2" />}
        secondaryButtonIcon={<FaEnvelope className="mr-2" />}
      />
      <div className="container mx-auto">
        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-10">
            <FaSpinner className="animate-spin text-[#C7E44E] text-4xl" />
            <p className="ml-4 text-[#3F4919] text-lg">Loading gallery...</p>
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="flex flex-col items-center justify-center py-10">
            <p className="text-red-600 text-lg font-semibold">
              Failed to load gallery. Please try again later.
            </p>
            <button
              onClick={() => refetch()} // Assuming useGetGalleryQuery provides a refetch function
              className="mt-4 px-6 py-2 bg-[#C7E44E] text-[#3F4919] font-semibold rounded hover:bg-[#A8C33E]"
            >
              Retry
            </button>
          </div>
        )}

        {/* Success State */}
        {!isLoading && !isError && projects && (
          <div>
            <div className="border-b border-gray-300 flex items-center justify-center gap-10 py-3">
              <div onClick={() => setActive("img")}>
                <h1
                  className={`text-[#3F4919] text-xl font-bold hover:cursor-pointer ${
                    active === "img" && "border-[#C7E44E] border-b-4 pb-1"
                  }`}
                >
                  Photo Gallery
                </h1>
              </div>
              <div onClick={() => setActive("video")}>
                <h1
                  className={`text-[#3F4919] text-xl font-bold hover:cursor-pointer ${
                    active === "video" && "border-[#C7E44E] border-b-4 pb-1"
                  }`}
                >
                  Video Gallery
                </h1>
              </div>
            </div>
            <div>
              {active === "img" ? (
                <ImageGallery projects={projects} />
              ) : (
                <VideoGallery projects={projects} />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
