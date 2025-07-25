"use client";

import React, { useEffect, useRef } from "react";
import PartnersCard from "@/components/molecules/cards/PartnersCard";
import { Partner } from "@/types/home";
import { urlForImage } from "@/lib/sanity/image";

type Props = {
  data: Partner[];
};

const CommunityPartner = ({ data }: Props) => {
  const scrollerRef = useRef<HTMLDivElement>(null);

  // Duplicate the data array for infinite scrolling
  const duplicatedData = [...data, ...data];

  // Check for reduced motion preference
  const prefersReducedMotion = useRef(
    typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  useEffect(() => {
    if (prefersReducedMotion.current || !scrollerRef.current) return;

    const scroller = scrollerRef.current;
    const scrollerInner = scroller.querySelector(".partner-scroller__inner");

    if (!scrollerInner) return;

    scroller.setAttribute("data-animated", "true");

    const handleResize = () => {
      (scrollerInner as HTMLElement).style.animation = "none";
      void (scrollerInner as HTMLElement).offsetHeight; // Trigger reflow
      (scrollerInner as HTMLElement).style.animation = "";
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [data]);

  return (
    <div className="mx-auto w-full !max-w-[1440px] overflow-hidden px-4 lg:px-24">
      <div
        ref={scrollerRef}
        className="partner-scroller relative w-full"
        data-speed="slow"
        data-direction="right"
      >
        <div className="partner-scroller__inner flex items-center gap-8 py-4">
          {duplicatedData.map((partner, index) => {
            const imageUrl = partner.logo
              ? urlForImage(partner.logo)?.src
              : "/home/partners/community-partner/livepeer.png";
            return (
              <PartnersCard
                key={`${partner._id}-${index}`}
                alt={partner._id}
                type={partner.type}
                src={
                  imageUrl || "/home/partners/community-partner/livepeer.png"
                }
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommunityPartner;
