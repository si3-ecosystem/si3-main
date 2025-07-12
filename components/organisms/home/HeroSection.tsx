"use client";

import React, { memo, useMemo } from "react";
import { Button } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { GalleryCarousel } from "@/components/molecules/carousels/GalleryCarousel";
import { PartnerProgramForm } from "@/components/molecules/forms/PartnerProgramForm";
import { urlForImage } from "@/lib/sanity/image";
import { cn } from "@/lib/utils";
import { Introduction } from "@/types/home";
import Image from "next/image";
import Link from "next/link";
import { trackEvent } from "@/utils/trackEvent";

interface HeroSectionProps {
  readonly data: Introduction;
  readonly isForm?: boolean;
  readonly extraClassName?: string;
}

// Optimized fallback image with proper dimensions
const FALLBACK_IMAGE = {
  src: "/icons/jpg/si_u_scholars_heroimage.jpg",
  width: 600,
  height: 328,
  alt: "SI<3> University Scholars - Empowering Women and Non-Binary Leaders in Web3",
} as const;

// Memoized HeroSection component for better performance
export const HeroSection = memo<HeroSectionProps>(function HeroSection({
  data,
  isForm = false,
  extraClassName,
}) {
  // Memoized image processing for better performance
  const imageData = useMemo(() => {
    const imageResult = data?.thumbnail
      ? urlForImage(data.thumbnail)?.src
      : FALLBACK_IMAGE.src;

    return {
      src: imageResult || FALLBACK_IMAGE.src,
      alt: data?.thumbnail?.alt || FALLBACK_IMAGE.alt,
      blurDataURL: data?.thumbnail?.blurDataURL,
    };
  }, [data?.thumbnail]);

  // Memoized CTA click handler
  const handleCtaClick = React.useCallback(() => {
    trackEvent("Mission CTA Clicked", { ctaText: data.ctaText });
  }, [data.ctaText]);

  return (
    <section className="@container py-14 lg:py-20" aria-label="Hero Section">
      <div className="flex flex-col gap-4 sm:gap-10 @3xl:flex-row @3xl:gap-[60px]">
        {/* Content Section */}
        <div className="z-20 h-full w-full flex-1">
          {data.subtitle && (
            <Text className="text-primary mb-3.5 pt-6 text-sm font-medium">
              {data.subtitle}
            </Text>
          )}

          <Title className="mb-4 text-black" as="h1">
            {data.title}
          </Title>

          <Text className="mb-8 max-w-[535px] leading-7 text-[#454545]">
            {data.description}
          </Text>

          {/* CTA Section */}
          {isForm ? (
            <PartnerProgramForm
              className="mx-auto w-fit text-white"
              showGradient
              title={data.ctaText}
            />
          ) : (
            data.ctaText &&
            data.ctaLink && (
              <Button asChild showGradient className="mb-3">
                <Link
                  href={data.ctaLink}
                  onClick={handleCtaClick}
                  aria-label={`${data.ctaText} - Learn more about our mission`}
                >
                  {data.ctaText}
                </Link>
              </Button>
            )
          )}

          {data?.memberShip && (
            <Text className="text-[#585858]">{data.memberShip}</Text>
          )}
        </div>

        {/* Image/Gallery Section */}
        <div
          className={cn(
            "relative z-0 w-full flex-1 overflow-hidden rounded-xl",
            extraClassName,
          )}
        >
          {data?.gallery && data.gallery.length > 0 ? (
            <GalleryCarousel gallery={data.gallery} />
          ) : (
            <Image
              src={imageData.src}
              alt={imageData.alt}
              width={FALLBACK_IMAGE.width}
              height={FALLBACK_IMAGE.height}
              priority={false} // Changed to false since this is below the fold
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
              {...(imageData.blurDataURL && {
                placeholder: "blur",
                blurDataURL: imageData.blurDataURL,
              })}
              className="h-full w-full rounded-lg object-cover object-center transition-transform duration-300 hover:scale-105"
              onError={(e) => {
                // Fallback to default image on error
                const target = e.target as HTMLImageElement;
                target.src = FALLBACK_IMAGE.src;
                target.alt = FALLBACK_IMAGE.alt;
              }}
            />
          )}
        </div>
      </div>
    </section>
  );
});
