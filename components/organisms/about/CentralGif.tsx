"use client";

import { useState, useRef, useMemo } from "react";
import Image from "next/image";

interface CentralGifProps {
  onHoverChange: (isHovering: boolean) => void;
  gifUrl?: string;
  placeholderUrl?: string;
}

export default function CentralGif({
  onHoverChange,
  gifUrl,
  placeholderUrl,
}: CentralGifProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const playPromiseRef = useRef<Promise<void> | null>(null);
  const isVideo = useMemo(
    () => gifUrl?.endsWith(".mp4") || gifUrl?.includes("mp4"),
    [gifUrl],
  );

  const handleMouseEnter = async () => {
    if (!gifUrl) return;

    setIsHovering(true);
    onHoverChange(true);

    if (isVideo && videoRef.current) {
      try {
        // Wait for any pending play promise to resolve before starting new one
        if (playPromiseRef.current) {
          await playPromiseRef.current;
        }

        playPromiseRef.current = videoRef.current.play();
        await playPromiseRef.current;
        playPromiseRef.current = null;
      } catch (error) {
        console.error("Video play failed:", error);
        setHasError(true);
        playPromiseRef.current = null;
      }
    }
  };

  const handleMouseLeave = async () => {
    setIsHovering(false);
    onHoverChange(false);

    if (isVideo && videoRef.current) {
      try {
        // Wait for any pending play promise before pausing
        if (playPromiseRef.current) {
          await playPromiseRef.current;
          playPromiseRef.current = null;
        }

        videoRef.current.pause();
        videoRef.current.currentTime = 0; // Reset to beginning
      } catch (error) {
        console.error("Video pause failed:", error);
      }
    }
  };

  const handleVideoError = () => {
    console.error("Failed to load video:", gifUrl);
    setHasError(true);
  };

  const handleImageError = () => {
    console.error("Failed to load image:", placeholderUrl);
    setHasError(true);
  };

  // If we have an error or no URL, show the placeholder
  if (hasError || !gifUrl) {
    return (
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="w-[320px] rounded-lg bg-black p-4 text-white shadow-lg">
          <div className="relative h-[400px] w-full">
            <Image
              src={placeholderUrl || "/placeholder.svg"}
              alt=""
              fill
              className="object-cover"
              onError={handleImageError}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div className="w-[320px] rounded-lg bg-black p-4 text-white shadow-lg">
        {isVideo ? (
          // Video Player
          <div className="relative h-[400px] w-full">
            {isHovering ? (
              <video
                ref={videoRef}
                className="h-full w-full object-cover"
                loop
                muted
                playsInline
                preload="metadata"
                onError={handleVideoError}
              >
                <source src={gifUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <Image
                src={placeholderUrl || "/placeholder.svg"}
                alt=""
                fill
                className="object-cover"
                onError={handleImageError}
              />
            )}
          </div>
        ) : (
          // GIF/Image
          <div className="relative h-[400px] w-full">
            <Image
              src={isHovering ? gifUrl : placeholderUrl || "/placeholder.svg"}
              alt=""
              fill
              className="object-cover"
              onError={handleImageError}
            />
          </div>
        )}
      </div>
    </div>
  );
}
