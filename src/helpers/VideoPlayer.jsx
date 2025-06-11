// VideoPlayer.js
import React, { useRef, useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { Play, Pause, Volume2, VolumeX, Maximize } from "lucide-react";

const VideoPlayer = ({
  videoSrc,
  autoPlay = false,
  loop = true,
  muted = true,
  className = "",
  controlsClassName = "",
  threshold = 0.5,
  poster = "",
  ...props
}) => {
  const videoRef = useRef(null);
  const playerRef = useRef(null); // Reference to the player container for hover detection
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [isMuted, setIsMuted] = useState(muted);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showPoster, setShowPoster] = useState(!autoPlay);
  const [isHovering, setIsHovering] = useState(false); // Track hover state

  const { ref, inView } = useInView({
    threshold,
    skip: !videoSrc,
  });

  // Handle play/pause based on visibility
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (inView && isPlaying) {
      video.play().catch((error) => {
        console.error("Video playback failed:", error);
        setIsPlaying(false);
        setShowPoster(true);
      });
      setShowPoster(false);
    } else {
      video.pause();
      setShowPoster(!isPlaying);
    }
  }, [inView, isPlaying]);

  // Handle video metadata
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const setVideoMetadata = () => {
      setDuration(video.duration);
    };

    const updateProgress = () => {
      setProgress((video.currentTime / video.duration) * 100);
    };

    video.addEventListener("loadedmetadata", setVideoMetadata);
    video.addEventListener("timeupdate", updateProgress);

    return () => {
      video.removeEventListener("loadedmetadata", setVideoMetadata);
      video.removeEventListener("timeupdate", updateProgress);
    };
  }, [videoSrc]);

  // Handle hover events
  useEffect(() => {
    const player = playerRef.current;
    if (!player) return;

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    player.addEventListener("mouseenter", handleMouseEnter);
    player.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      player.removeEventListener("mouseenter", handleMouseEnter);
      player.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  // Control handlers
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    setShowPoster(isPlaying); // Show poster when pausing, hide when playing
  };

  const handleVideoClick = () => {
    setIsPlaying(!isPlaying);
    setShowPoster(isPlaying); // Toggle poster visibility on video click
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleSeek = (e) => {
    const video = videoRef.current;
    if (!video) return;

    const seekTime = (e.target.value / 100) * video.duration;
    video.currentTime = seekTime;
    setProgress(e.target.value);
  };

  const toggleFullScreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (!document.fullscreenElement) {
      video.requestFullscreen().catch((err) => {
        console.error("Fullscreen request failed:", err);
      });
    } else {
      document.exitFullscreen();
    }
  };

  return (
    <div
      ref={(node) => {
        playerRef.current = node; // Set playerRef for hover detection
        ref(node); // Set Intersection Observer ref
      }}
      className={`relative w-full h-full flex justify-center items-center ${className}`}
      {...props}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        loop={loop}
        muted={isMuted}
        poster={poster}
        className="w-full h-auto max-h-[400px] object-cover rounded-lg hover:cursor-pointer"
        onClick={handleVideoClick}
      />
      {poster && showPoster && (
        <div className="absolute inset-0 w-full h-full flex items-center justify-center bg-black/30 rounded-lg">
          <img
            src={poster}
            alt="Video poster"
            className="w-full h-full object-cover rounded-lg"
          />
          <button
            onClick={togglePlay}
            className="absolute w-16 h-16 bg-white/80 rounded-full flex items-center justify-center text-black hover:bg-white transition-colors hover:cursor-pointer"
            aria-label="Play video"
          >
            <Play size={32} fill="currentColor" />
          </button>
        </div>
      )}
      <div
        className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 transition-opacity duration-300 ${
          isHovering ? "opacity-100" : "opacity-0"
        } ${controlsClassName}`}
      >
        <div className="flex items-center gap-4">
          <button
            onClick={togglePlay}
            className="text-white hover:text-gray-300 hover:cursor-pointer"
            aria-label={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>

          <button
            onClick={toggleMute}
            className="text-white hover:text-gray-300 hover:cursor-pointer"
            aria-label={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX size={24} /> : <Volume2 size={24} />}
          </button>

          <input
            type="range"
            min="0"
            max="100"
            value={progress}
            onChange={handleSeek}
            className="flex-1 h-1 bg-gray-600 rounded-full appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #ffffff ${progress}%, #4a5568 ${progress}%)`,
            }}
          />

          <button
            onClick={toggleFullScreen}
            className="text-white hover:text-gray-300 hover:cursor-pointer"
            aria-label="Toggle fullscreen"
          >
            <Maximize size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
