"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { urlForImage } from "@/lib/sanity/image";
import { Partner } from "@/types/home";

interface MovingLogosProps {
  partners: Partner[];
}

export function MovingLogos({ partners }: MovingLogosProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!partners?.length || !scrollerRef.current) return;

    // Duplicate the partners array to create seamless infinite scroll
    const duplicatedPartners = [...partners, ...partners];

    // Set the width of the scroller to fit all duplicated items
    if (scrollerRef.current) {
      const itemWidth = 160; // Adjust based on your logo width + margin
      scrollerRef.current.style.width = `${duplicatedPartners.length * itemWidth}px`;
    }
  }, [partners]);

  if (!partners?.length) return null;

  return (
    <div className="relative mt-3 w-full overflow-hidden">
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 50s linear infinite;
          display: flex;
          gap: 1rem;
        }
        .animate-scroll:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div ref={containerRef} className="relative h-6 w-full">
        <div
          ref={scrollerRef}
          className="animate-scroll absolute top-0 left-0 flex h-full items-center"
        >
          {[...partners, ...partners].map((partner, index) => (
            <div
              key={`${partner._id}-${index}`}
              className="flex h-auto w-16 items-center justify-center"
            >
              {partner.logo && (
                <Image
                  src={urlForImage(partner.logo)?.src || ""}
                  alt={partner.name}
                  width={120}
                  height={32}
                  className="h-auto max-h-full w-auto max-w-full object-contain"
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
