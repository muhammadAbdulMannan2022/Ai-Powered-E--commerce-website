import React from "react";
import Title from "../../../helpers/Title";
import Button from "../../../helpers/Button";
import VideoPlayer from "../../../helpers/VideoPlayer";

export default function DesignIdea() {
  return (
    <div>
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
              videoSrc="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4"
              autoPlay={true}
              loop={true}
              muted={true}
              threshold={0.6}
              poster="https://place.abh.ai/s3fs-public/2022-03/DSC_0128.JPG"
              className="max-w-4xl mx-auto"
              controlsClassName="bg-opacity-80"
            />
          </div>

          {/* Images Section */}
          <div className="grid grid-cols-3 gap-2">
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/gl/gl1.png"
                alt="Image 1"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/gl/gl2.png"
                alt="Image 2"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-lg">
              <img
                src="/gl/gl3.png"
                alt="Image 3"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>

        <Button label="View Gallery" className="mt-6" />
      </div>
    </div>
  );
}
