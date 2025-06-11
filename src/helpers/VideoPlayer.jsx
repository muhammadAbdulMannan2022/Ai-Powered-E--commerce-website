// VideoPlayer.js
import React, { useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";

const VideoPlayer = ({ videoSrc }) => {
  const videoRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.5, // Trigger when 50% of the video is in view
  });

  useEffect(() => {
    if (videoRef.current) {
      if (inView) {
        videoRef.current.play();
      } else {
        videoRef.current.pause();
      }
    }
  }, [inView]);

  return (
    <div ref={ref} className="w-full h-full flex justify-center items-center">
      <video
        ref={videoRef}
        src={videoSrc}
        controls
        loop
        muted
        className="w-full h-auto max-h-[400px] object-cover rounded-lg"
      />
    </div>
  );
};

export default VideoPlayer;
