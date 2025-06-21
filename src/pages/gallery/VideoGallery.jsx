import React, { useState } from "react";
import VideoPlayer from "../../helpers/VideoPlayer";

export default function VideoGallery({ projects }) {
  const [loadingStates, setLoadingStates] = useState({});

  const handleLoadStart = (index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleLoadedData = (index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  };

  return (
    <div className="px-4 md:px-10 lg:px-40 py-16 space-y-24">
      {projects.map((project, index) => (
        <div key={index} className="relative">
          {/* Centered Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#688301] mb-6">
            {project.category}
          </h1>
          <VideoPlayer
            videoSrc={"https://res.cloudinary.com/ds97wytcs/" + project.video}
            onLoadStart={() => handleLoadStart(index)}
            onLoadedData={() => handleLoadedData(index)}
            loop={false}
            vidClass={"shadow max-w-6xl"}
            className="max-w-6xl"
          />
        </div>
      ))}
    </div>
  );
}
