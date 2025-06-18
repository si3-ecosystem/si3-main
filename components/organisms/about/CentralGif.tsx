"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

interface CentralGifProps {
  onHoverChange: (isHovering: boolean) => void;
  gifUrl?: string;
  placeholderUrl?: string;
}

export default function CentralGif({
  onHoverChange,
  gifUrl,
  placeholderUrl = "/placeholder.svg",
}: CentralGifProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [isGifLoaded, setIsGifLoaded] = useState(false);
  const gifRef = useRef<HTMLImageElement>(null);
  const placeholderRef = useRef<HTMLImageElement>(null);

  // Preload the GIF
  useEffect(() => {
    if (!gifUrl) return;

    const img = new window.Image();
    img.src = gifUrl;
    img.onload = () => setIsGifLoaded(true);
    img.onerror = () => console.error("Failed to load GIF:", gifUrl);

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [gifUrl]);

  const handleMouseEnter = useCallback(() => {
    if (!isGifLoaded) return;
    setIsHovering(true);
    onHoverChange?.(true);
  }, [isGifLoaded, onHoverChange]);

  const handleMouseLeave = useCallback(() => {
    setIsHovering(false);
    onHoverChange?.(false);
  }, [onHoverChange]);

  // If no GIF URL is provided or it failed to load, just show the placeholder
  if (!gifUrl || !isGifLoaded) {
    return (
      <div className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform">
        <div className="w-[320px] rounded-lg p-4 text-white shadow-lg">
          <div className="relative h-[400px] w-full">
            <Image
              ref={placeholderRef}
              src={placeholderUrl}
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <motion.div
        className="absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 transform"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="w-[320px] rounded-lg p-4 text-white shadow-lg">
          <div className="relative h-[400px] w-full">
            {gifUrl && isGifLoaded && (
              <Image
                ref={gifRef}
                src={gifUrl}
                alt=""
                fill
                className="object-cover"
                unoptimized
                priority
                style={{
                  opacity: isHovering ? 1 : 1,
                  transition: "opacity 0.6s cubic-bezier(0.7, 0.6, 0.3, 1)",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                }}
              />
            )}

            {/* <motion.div
              initial={{ opacity: 1 }}
              animate={{ opacity: isHovering ? 0 : 1 }}
              transition={{ duration: 0.6, ease: [0.7, 0.6, 0.3, 1] }}
              className="absolute inset-0"
            >
              <Image
                ref={placeholderRef}
                src={placeholderUrl}
                alt=""
                fill
                className="object-cover"
                priority
              />
            </motion.div> */}
          </div>
        </div>
      </motion.div>
    </>
  );
}
