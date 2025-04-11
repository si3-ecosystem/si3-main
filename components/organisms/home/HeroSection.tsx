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

type Props = {
  data: Introduction;
  isForm?: boolean;
  extraClassName?: string;
};
const fallbackImage = "/icons/jpg/si_u_scholars_heroimage.jpg";

export function HeroSection({ data, isForm = false, extraClassName }: Props) {
  const imageResult = data?.thumbnail
    ? urlForImage(data.thumbnail)?.src
    : fallbackImage;

  return (
    <div className="@container py-14 lg:py-20">
      <div className="flex flex-col gap-4 sm:gap-10 @3xl:flex-row @3xl:gap-[60px]">
        <div className="z-20 h-full w-full flex-1">
          <Text className="text-primary mb-3.5 pt-6 text-sm font-medium">
            {data.subtitle}
          </Text>
          <Title className="mb-4 text-black">{data.title}</Title>
          <Text className="mb-8 max-w-[535px] leading-7 text-[#454545]">
            {data.description}
          </Text>

          {isForm ? (
            <PartnerProgramForm
              className="mx-auto w-fit text-white"
              showGradient
              title={data.ctaText}
            />
          ) : (
            <Button asChild showGradient={true} className="mb-3">
              <Link href={data.ctaLink}>{data.ctaText}</Link>
            </Button>
          )}
          {data?.memberShip && (
            <Text className="text-[#585858]">
              {data?.memberShip || "*$300 one-time membership fee"}
            </Text>
          )}
        </div>

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
              src={imageResult || fallbackImage}
              {...(data?.thumbnail?.blurDataURL && {
                placeholder: "blur",
                blurDataURL: data?.thumbnail?.blurDataURL,
              })}
              alt="si ui scholars image"
              width={600}
              height={328}
              decoding="async"
              loading="lazy"
              className="h-full w-full rounded-lg object-cover object-center"
            />
          )}
        </div>
      </div>
    </div>
  );
}
