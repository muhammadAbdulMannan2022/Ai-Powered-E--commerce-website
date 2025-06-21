import React, { useState } from "react";
import VideoPlayer from "../../helpers/VideoPlayer";
import { useGetAllVideoQuery } from "../../redux/features/Products/ProductsSlice";

export default function VideoGallery() {
  const [loadingStates, setLoadingStates] = useState({});
  const { data: videos, isLoading, isError } = useGetAllVideoQuery();

  const handleLoadStart = (index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: true }));
  };

  const handleLoadedData = (index) => {
    setLoadingStates((prev) => ({ ...prev, [index]: false }));
  };

  // Map videos to projects format
  const projects =
    videos?.map((video) => ({
      video: video.video_url,
      title: `Category ${video.wood_category}`, // Using wood_category as title
    })) || [];

  if (isLoading) {
    return <div className="text-center py-16">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="text-center py-16 text-red-500">Error loading videos</div>
    );
  }

  return (
    <div className="px-4 md:px-10 lg:px-40 py-16 space-y-24">
      {projects.map((project, index) => (
        <div key={index} className="relative">
          {/* Centered Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-center text-[#688301] mb-6">
            {project.title}
          </h1>
          <VideoPlayer
            videoSrc={project.video}
            onLoadStart={() => handleLoadStart(index)}
            onLoadedData={() => handleLoadedData(index)}
            loop={false}
          />
        </div>
      ))}
    </div>
  );
}
