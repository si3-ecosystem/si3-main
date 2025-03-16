"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/atoms/dialog";
import { useState, useRef, useEffect } from "react";
import { SuccessDialog } from "../dialogs/SuccessDialog";
import { X } from "lucide-react";

interface VideoCardProps {
  video: string;
  isSignedIn?: boolean;
  isVideoOpen: boolean;
  setIsVideoOpen: (value: boolean) => void;
}

export function VideoPlayerDialog({
  video,
  isSignedIn = false,
  isVideoOpen,
  setIsVideoOpen,
}: VideoCardProps) {
  const [showSuccess, setShowSuccess] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const TIME_LIMIT = 5;

  useEffect(() => {
    const videoElement = videoRef.current;

    const handleTimeUpdate = () => {
      if (
        videoElement &&
        videoElement.currentTime >= TIME_LIMIT &&
        !isSignedIn
      ) {
        videoElement.currentTime = TIME_LIMIT;
        videoElement.pause();
        setIsVideoOpen(false);
        setTimeout(() => {
          setShowSuccess(true);
        }, 100);
      }
    };

    const handleSeeking = () => {
      if (
        videoElement &&
        videoElement.currentTime > TIME_LIMIT &&
        !isSignedIn
      ) {
        videoElement.currentTime = TIME_LIMIT;
      }
    };

    if (videoElement) {
      videoElement.addEventListener("timeupdate", handleTimeUpdate);
      videoElement.addEventListener("seeking", handleSeeking);
    }

    return () => {
      if (videoElement) {
        videoElement.removeEventListener("timeupdate", handleTimeUpdate);
        videoElement.removeEventListener("seeking", handleSeeking);
      }
    };
  }, [isSignedIn]);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;

    if (isVideoOpen && !isSignedIn) {
      timeoutId = setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.pause();
        }
        setIsVideoOpen(false);
        setTimeout(() => {
          setShowSuccess(true);
        }, 100);
      }, TIME_LIMIT * 1000);
    }

    return () => {
      clearTimeout(timeoutId);
    };
  }, [isVideoOpen, isSignedIn]);

  const handleDialogClose = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
    setIsVideoOpen(false);
  };

  return (
    <>
      <Dialog open={isVideoOpen} onOpenChange={handleDialogClose}>
        <DialogContent hideCloseIcon className="p-0 sm:max-w-[800px]">
          <DialogTitle className="sr-only">
            <X
              onClick={handleDialogClose}
              className="absolute top-6 right-6 z-50 text-white"
            />
          </DialogTitle>

          <div className="relative w-full max-w-[1240px] overflow-hidden rounded-md">
            <video
              ref={videoRef}
              controls={isSignedIn}
              className="aspect-video w-full rounded-md object-cover"
              src={video}
              autoPlay
              muted={!isSignedIn}
            />
            {!isSignedIn && (
              <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                <p className="text-sm text-white">
                  Preview: {TIME_LIMIT} seconds available
                </p>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {showSuccess && (
        <SuccessDialog
          open={showSuccess}
          onOpenChange={setShowSuccess}
          imageSrc="/icons/jpg/unlockfull.jpg"
          description="Unlock Full Access full content, please join us as a SI U Scholar"
          title="To watch the"
          ctaLink="/login"
          ctaTitle="Sign Up & Watch"
        />
      )}
    </>
  );
}
