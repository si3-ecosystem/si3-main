import { urlForImage } from "@/lib/sanity/image";
import { SanityImage } from "@/types/diversity-tracker";
import Image from "next/image";

// Type guard to check if the image is a valid Sanity image

interface HeroDiversityTrackerProps {
  title?: string;
  subTitle?: string;
  description?: string;
  background?: SanityImage;
  thumbnail?: SanityImage;
}

export function HeroDiversityTracker({
  title,
  subTitle,
  description,
  background,
}: HeroDiversityTrackerProps) {
  const backgroundImage = background && urlForImage(background)?.src;
  return (
    <section className="relative flex min-h-[300px] items-center p-8 lg:min-h-[493px]">
      {backgroundImage && (
        <Image
          src={backgroundImage}
          alt="background"
          fill
          className="absolute inset-0 z-0 w-full object-cover object-center"
        />
      )}
      <div className="z-10 mx-auto flex max-w-[1440px] flex-1 flex-col items-center justify-between gap-y-3 md:flex-row lg:px-24">
        <div className="max-w-3xl flex-1">
          {title && (
            <p className="mb-4 text-xl leading-[140%] text-gray-800 max-md:text-center">
              {title}
            </p>
          )}
          {subTitle && (
            <h1 className="font-clesmont text-center text-4xl leading-[120%] font-black sm:text-[40px] sm:leading-10 md:text-left">
              {subTitle}
            </h1>
          )}

          <p className="mt-6 max-w-[500px] text-xl leading-[140%] text-gray-600 max-md:text-center">
            {description}
          </p>
        </div>
      </div>
    </section>
  );
}
