"use client";

import { Card, CardContent } from "@/components/atoms/card";
import { PlayCircle } from "lucide-react";
import { useState, useRef } from "react";
import { PlayIcon } from "../icons/PlayIcon";

export interface EducationCardItem {
  title: string;
  subtitle: string;
  imageUrl: string;
  previewVideoUrl?: string;
  fullVideoUrl?: string;
}

export interface EducationCardProps {
  item: EducationCardItem;
}

export function EducationCard({ item }: EducationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && item.previewVideoUrl) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video on hover:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && item.previewVideoUrl) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (item.fullVideoUrl) {
      setIsModalOpen(true);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Card
        className="cursor-pointer overflow-hidden rounded-2xl border border-[#D1D1D1] !p-5 transition-all duration-300 !ease-in-out hover:shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <CardContent className="relative divide-neutral-500 overflow-hidden p-0">
          <div className="relative h-[196.872px] overflow-hidden !rounded-[9px]">
            {!item.previewVideoUrl || !isHovered ? (
              <img
                src={item.imageUrl}
                alt={item.title}
                className="z-0 h-full w-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={item.previewVideoUrl}
                className="z-0 h-full w-full object-cover"
                muted
                loop
              />
            )}
            {(!isHovered || !item.previewVideoUrl) && (
              <div className="bg-opacity-20 absolute inset-0 !z-20 flex items-center justify-center bg-black opacity-0 transition-opacity hover:opacity-100">
                <PlayCircle className="h-12 w-12 border border-red-500 bg-black fill-black text-black" />
              </div>
            )}

            {!isHovered && (
              <div className="absolute bottom-2 left-2">
                <PlayIcon />
              </div>
            )}
          </div>
          <div className="p-4">
            <h3 className="text-lg font-semibold">{item.title}</h3>
            <p className="text-sm text-gray-500">{item.subtitle}</p>
          </div>
        </CardContent>
      </Card>

      {isModalOpen && item.fullVideoUrl && (
        <div className="bg-opacity-80 fixed inset-0 z-50 flex items-center justify-center bg-black">
          <div className="relative w-full max-w-4xl p-4">
            <button
              onClick={closeModal}
              className="absolute -top-8 -right-8 z-10 text-2xl font-bold text-white"
            >
              &times;
            </button>
            <video
              src={item.fullVideoUrl}
              className="h-auto w-full rounded-lg"
              controls
              autoPlay
            />
          </div>
        </div>
      )}
    </>
  );
}
