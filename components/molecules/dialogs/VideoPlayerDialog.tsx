"use client";

import { Dialog, DialogContent, DialogTitle } from "@/components/atoms/dialog";
import { useState, useRef } from "react";
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

  const handleVideoEnd = () => {
    if (!isSignedIn) {
      setIsVideoOpen(false);
      setTimeout(() => {
        setShowSuccess(true);
      }, 100);
    }
  };

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
              controls
              className="aspect-video w-full rounded-md object-cover"
              src={video}
              autoPlay
              muted={false}
              onEnded={handleVideoEnd}
            />
          </div>
        </DialogContent>
      </Dialog>

      {showSuccess && (
        <SuccessDialog
          titleClass="max-w-[544px] mx-auto w-full text-2xl font-medium mb-0"
          descClass="text-lg text-[#454545] font-normal leading-6 mx-auto w-full tracking-tight"
          className="h-[125.571px] w-[188.088px]"
          open={showSuccess}
          onOpenChange={setShowSuccess}
          imageSrc="/icons/jpg/unlockfull.jpg"
          description="To watch this full content, please join us as a SI U Scholar."
          title="UNLOCK FULL ACCESS"
          ctaLink="/onboard"
          ctaTitle="Sign Up & Learn"
        />
      )}
    </>
  );
}
