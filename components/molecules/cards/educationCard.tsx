"use client";

import { Card, CardContent } from "@/components/atoms/card";
import { PlayCircle } from "lucide-react";
import { useState, useRef } from "react";
import { PlayIcon } from "../icons/PlayIcon";
import { Course, SanityVideo } from "@/types/home";
import { urlForImage } from "@/lib/sanity/image";
import Image from "next/image";
import { VideoPlayerDialog } from "../dialogs/VideoPlayerDialog";

export interface EducationCardItem {
  title: string;
  subtitle: string;
  imageUrl: string;
  previewVideoUrl?: string;
  fullVideoUrl?: string;
}

export interface EducationCardProps {
  item: Course;
  video?: SanityVideo;
  isSignedIn?: boolean;
}

export function EducationCard({
  item,
  isSignedIn = false,
}: EducationCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const image = item?.thumbnail
    ? urlForImage(item.thumbnail)?.src
    : "/icons/jpg/videotemp.jpg";

  const companyLogo = item?.company?.logo
    ? urlForImage(item.company.logo)?.src
    : "/icons/jpg/sihericon.jpg";

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current && item?.video?.url) {
      videoRef.current.play().catch((error) => {
        console.error("Error playing video on hover:", error);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current && item?.video?.url) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  const handleClick = () => {
    if (item?.video?.url) {
      setIsModalOpen(true);
    }
  };

  return (
    <>
      <Card
        className="h-full cursor-pointer overflow-hidden rounded-2xl border border-[#D1D1D1] !p-5 transition-all duration-300 !ease-in-out hover:shadow-lg"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <CardContent className="relative h-full divide-neutral-500 overflow-hidden p-0">
          <div className="relative h-[196.872px] overflow-hidden !rounded-[9px]">
            {!item?.video?.url || !isHovered ? (
              <Image
                width={600}
                height={400}
                src={image || "/icons/jpg/videotemp.jpg"}
                alt={item.title}
                className="z-0 h-full w-full object-cover"
              />
            ) : (
              <video
                ref={videoRef}
                src={item.video?.url}
                className="z-0 h-full w-full object-cover"
                muted
                loop
              />
            )}
            {(!isHovered || !item?.video?.url) && (
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
          <div className="flex flex-col justify-between gap-6 pt-4">
            <div className="flex flex-col items-start justify-start gap-2">
              <Image
                src={companyLogo || "/icons/jpg/sihericon.jpg"}
                alt={item?.company?.name}
                width={600}
                height={400}
                loading="lazy"
                decoding="async"
                className="h-auto max-h-[30px] w-full object-contain object-left"
              />
              <h3 className="line-clamp-2 h-[50px] overflow-hidden text-base leading-5 whitespace-pre-wrap text-[#4F4F4F]">
                {item?.title}
              </h3>
            </div>
            {item?.presenters?.length > 0 ? (
              <div className="flex flex-col">
                <p className="leading-5 font-semibold text-black">
                  {item?.presenters[0]?.name}
                </p>
                <p className="text-black opacity-70">
                  {item?.presenters[0]?.position}
                </p>
              </div>
            ) : null}
          </div>
        </CardContent>
      </Card>

      {item.video && (
        <VideoPlayerDialog
          video={item?.video?.url}
          isVideoOpen={isModalOpen}
          setIsVideoOpen={setIsModalOpen}
          isSignedIn={isSignedIn}
        />
      )}
    </>
  );
}
