// components/molecules/cards/Grow3dgePopupCard.tsx
"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { Card } from "@/components/atoms/card";
import { PartnerProgramForm } from "../forms/PartnerProgramForm";
import { useQuery } from "@tanstack/react-query";
import { getHomePageData } from "@/lib/sanity/client";
import { HomepageSchema } from "@/types/home";
import { MovingLogos } from "./MovingLogos";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { closeGrow3dgeModal } from "@/redux/slice/grow3dgeSlice";

export function Grow3dgePopupCard() {
  const isOpen = useAppSelector((state) => state.grow3dge.isOpen);
  const dispatch = useAppDispatch();

  const { data } = useQuery<HomepageSchema>({
    queryKey: ["homepage"],
    queryFn: getHomePageData,
  });

  const partners = data?.communityPartners || [];

  const handleDismiss = () => {
    dispatch(closeGrow3dgeModal());
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Desktop Version */}
      <Card className="fixed right-0 bottom-6 z-50 block w-full max-w-[520px] overflow-hidden rounded-none border-2 border-[#8963d6] bg-transparent p-0 outline-none lg:right-6 lg:rounded-md">
        <div className="relative h-full w-full overflow-hidden bg-white/60 p-0 backdrop-blur-sm">
          <button
            onClick={handleDismiss}
            className="absolute top-3 right-3 !z-30 cursor-pointer text-gray-500 hover:text-gray-700"
            aria-label="Close"
          >
            <X size={20} />
          </button>
          <div className="flex h-full w-full flex-row bg-transparent p-0 lg:gap-5 lg:p-4">
            <div className="relative z-20 min-h-[150px] w-full max-w-[175px] lg:h-[200px] lg:max-w-[200px]">
              <Image
                src="/popup.png"
                alt="Grow3dge"
                fill
                className="absolute inset-0 h-full w-full overflow-hidden object-cover object-center lg:rounded-2xl"
              />
            </div>
            <div className="relative z-20 flex flex-1 flex-col justify-between pb-2 max-lg:p-3">
              <div className="z-30 flex flex-col gap-1 max-sm:mb-0.5 sm:gap-3">
                <h3 className="text-left text-sm font-bold text-gray-900 max-sm:text-xs">
                  INTRODUCING GROW3DGE
                </h3>
                <p className="max-w-[250px] text-sm text-gray-700 max-sm:max-w-[200px] max-sm:text-[8.9px] sm:mb-4 sm:max-w-[300px]">
                  Join our 10-week emerging tech growth accelerator program with
                  over twenty leading industry educators.
                </p>
              </div>

              <div className="max-sm:pt-2 sm:space-y-2">
                <PartnerProgramForm
                  title="Explore Now"
                  showGradient
                  className="relative z-10 w-fit rounded-lg bg-gradient-to-r from-[#07050d] via-[#452c7a] to-[#946de2] px-4 py-1 text-white backdrop-blur-sm max-sm:mb-0 max-sm:h-8 max-sm:px-2 max-sm:py-0 max-sm:text-xs"
                />
                {partners.length > 0 && (
                  <div className="relative w-[calc(100%+1.5rem)]">
                    <MovingLogos partners={partners} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Card>
    </>
  );
}
