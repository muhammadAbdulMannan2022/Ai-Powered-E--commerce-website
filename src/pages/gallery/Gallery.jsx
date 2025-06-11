import React, { useState } from "react";
import ReHero from "../../Shared/Hero/ReHero";
import { FaEnvelope, FaShoppingCart } from "react-icons/fa";
import ImageGallery from "./ImageGallery";
import VideoGallery from "./VideoGallery";
const projects = [
  {
    title: "Modern Garden Fence",
    images: [
      "/projects/1.png",
      "/projects/2.png",
      "/projects/3.png",
      "/projects/4.png",
      "/projects/5.png",
      "/projects/1.png",
      "/projects/2.png",
      "/projects/3.png",
      "/projects/4.png",
      "/projects/5.png",
      "/projects/1.png",
      "/projects/2.png",
      "/projects/3.png",
      "/projects/4.png",
      "/projects/5.png",
      "/projects/1.png",
      "/projects/2.png",
      "/projects/3.png",
      "/projects/4.png",
      "/projects/5.png",
    ],
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
  },
  {
    title: "Poolside Privacy Wall",
    images: [
      "/projects/6.png",
      "/projects/7.png",
      "/projects/8.png",
      "/projects/9.png",
    ],
    video:
      "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
  },
];

export default function Gallery() {
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
        // subtitle="Delivered to Your Door"
        description="we’re committed to delivering premium fencing solutions that stand the test of time. Our focus on superior materials, expert craftsmanship, and customer-first service ensures"
        primaryButtonText="Shop Now"
        secondaryButtonText="Order Free Sample"
        primaryButtonAction={() => {}}
        secondaryButtonAction={() => {}}
        primaryButtonIcon={<FaShoppingCart className="mr-2" />}
        secondaryButtonIcon={<FaEnvelope className="mr-2" />}
      />
      <div>
        <div className="border-b border-gray-300 flex items-center justify-center gap-10 py-3">
          <div onClick={() => setActive("img")}>
            <h1
              className={`text-[#3F4919] text-xl font-bold hover:cursor-pointer ${
                active == "img" && " border-[#C7E44E] border-b-4 pb-1"
              }`}
            >
              Photo Gallery
            </h1>
          </div>
          <div onClick={() => setActive("video")}>
            <h1
              className={`text-[#3F4919] text-xl font-bold hover:cursor-pointer ${
                active == "video" && "border-[#C7E44E]  border-b-4 pb-1"
              }`}
            >
              Video Gallery
            </h1>
          </div>
        </div>
        <div>
          {active == "img" ? (
            <ImageGallery projects={projects} />
          ) : (
            <VideoGallery projects={projects} />
          )}
        </div>
      </div>
    </div>
  );
}
