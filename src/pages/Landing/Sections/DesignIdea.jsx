import React from "react";
import Title from "../../../helpers/Title";
import Button from "../../../helpers/Button";
import VideoPlayer from "../../../helpers/VideoPlayer";
import { useGetGalleryQuery } from "../../../redux/features/Products/ProductsSlice";

export default function DesignIdea() {
  const { data: gallery, isLoading, isError, refetch } = useGetGalleryQuery();

  // Loading state UI
  if (isLoading) {
    return (
      <div className="py-5 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#94B316]"></div>
          <p className="text-[#6F706A] text-lg interFont">
            Loading inspirations...
          </p>
        </div>
      </div>
    );
  }

  // Error state UI (optional, but good practice)
  if (isError || !gallery || !gallery[0]) {
    return (
      <div className="py-5 flex items-center justify-center min-h-[400px]">
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="text-[#6F706A] text-lg interFont text-center">
            Oops, something went wrong. Please try again later.
          </p>
          <Button label="Retry" onClick={() => refetch()} />
        </div>
      </div>
    );
  }

  return (
    <div className="py-5">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center justify-center gap-4 py-10 max-w-6xl">
          <Title
            className="text-center"
            title={
              <>
                Composite Fencing{" "}
                <span className="text-[#94B316]">Inspirations</span>{" "}
              </>
            }
          />
          <p className="text-[#6F706A] text-lg interFont text-center max-w-3xl px-4">
            Our wood finishes are not mass-produced imitations — they’re
            carefully curated to bring out the natural beauty, texture, and
            character of real wood
          </p>
        </div>
      </div>
      <div className="w-full flex flex-col items-center justify-center overflow-hidden">
        <div className="w-full max-w-7xl px-4">
          {/* Video Section */}
          <div className="mb-4">
            <VideoPlayer
              videoSrc={
                "https://res.cloudinary.com/dze2kofvs/" + gallery[0].video
              }
              autoPlay={true}
              loop={true}
              muted={true}
              threshold={0.6}
              className=""
              controlsClassName="bg-opacity-80"
            />
          </div>

          {/* Images Section */}
          <div className="grid grid-cols-3 gap-2">
            {gallery[0].images.map((img, index) => (
              <div
                key={index}
                className="aspect-square overflow-hidden rounded-lg"
              >
                <img
                  src={"https://res.cloudinary.com/dze2kofvs/" + img.image_file}
                  alt={`Gallery image ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>

        <Button label="View Gallery" className="mt-6" />
      </div>
    </div>
  );
}
