// components/molecules/cards/Grow3dgePopupCard.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { X } from "lucide-react";
import { Card } from "@/components/atoms/card";
import { PartnerProgramForm } from "../forms/PartnerProgramForm";

const STORAGE_KEY = "grow3dge_popup_dismissed";

export function Grow3dgePopupCard() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has previously dismissed the popup
    const isDismissed = localStorage?.getItem(STORAGE_KEY) === "true";
    if (!isDismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsVisible(false);
    localStorage.setItem(STORAGE_KEY, "true");
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Version */}
      <Card className="fixed right-0 bottom-6 z-50 block p-0 sm:right-6">
        <div className="relative h-full overflow-hidden rounded-lg bg-white p-0">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex h-full p-0 lg:gap-5 lg:p-4">
            <div className="relative h-[150px] w-[150px] max-sm:hidden sm:h-[200px] sm:w-[200px]">
              <Image
                src="/popup.png"
                alt="Grow3dge"
                fill
                className="absolute inset-0 h-full w-full overflow-hidden rounded-2xl object-cover object-center"
              />
            </div>
            <div className="relative h-full w-full max-w-[120px] sm:hidden">
              <Image
                src="/popup.png"
                alt="Grow3dge"
                width={600}
                height={400}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="flex flex-col justify-between p-3 pb-0 sm:p-4">
              <div className="flex flex-col gap-1 sm:mb-3 sm:gap-3">
                <h3 className="text-left font-bold text-gray-900 max-sm:text-xs">
                  INTRODUCING GROW3DGE
                </h3>
                <p className="max-w-[300px] text-sm text-gray-700 max-sm:text-[10px] sm:mb-4">
                  Join our 10-week emerging tech growth accelerator program with
                  over twenty leading industry educators.
                </p>
              </div>

              <PartnerProgramForm
                title="Explore Now"
                showGradient
                className="mb-1 w-fit rounded-lg bg-gradient-to-r from-[#07050d] via-[#452c7a] to-[#946de2] px-4 py-1 text-white max-sm:h-8 max-sm:px-2 max-sm:py-0 max-sm:text-xs"
              />
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
