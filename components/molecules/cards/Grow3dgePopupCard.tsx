// components/molecules/cards/Grow3dgePopupCard.tsx
"use client";

import { useState } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Card } from "@/components/atoms/card";
import { PartnerProgramForm } from "../forms/PartnerProgramForm";

export function Grow3dgePopupCard() {
  const [isVisible, setIsVisible] = useState(true);

  const handleDismiss = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Version */}
      <Card className="fixed right-0 bottom-6 z-50 block overflow-hidden rounded-md border-2 border-[#8963d6] bg-transparent p-0 outline-none sm:right-6">
        <div className="relative h-full overflow-hidden bg-white/60 p-0 backdrop-blur-sm">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 !z-30 cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex h-full bg-transparent p-0 lg:gap-5 lg:p-4">
            <div className="relative z-20 h-[150px] w-[150px] max-sm:hidden sm:h-[200px] sm:w-[200px]">
              <Image
                src="/popup.png"
                alt="Grow3dge"
                fill
                className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl object-cover object-center"
              />
            </div>
            <div className="relative z-20 h-full w-full max-w-[120px] sm:hidden">
              <Image
                src="/popup.png"
                alt="Grow3dge"
                width={600}
                height={400}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="relative z-20 flex flex-col justify-between p-3 pb-0 sm:p-4">
              {/* Glassmorphism background */}

              <div className="z-30 flex flex-col gap-1 sm:mb-3 sm:gap-3">
                <h3 className="text-left font-bold text-gray-900 max-sm:text-xs">
                  INTRODUCING GROW3DGE
                </h3>
                <p className="max-w-[250px] text-sm text-gray-700 max-sm:text-[8.9px] sm:mb-4 sm:max-w-[300px]">
                  Join our 10-week emerging tech growth accelerator program with
                  over twenty leading industry educators.
                </p>
              </div>

              <PartnerProgramForm
                title="Explore Now"
                showGradient
                className="relative z-10 mb-1 w-fit rounded-lg bg-gradient-to-r from-[#07050d] via-[#452c7a] to-[#946de2] px-4 py-1 text-white backdrop-blur-sm max-sm:mb-5 max-sm:h-8 max-sm:px-2 max-sm:py-0 max-sm:text-xs"
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
