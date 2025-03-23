import { Button } from "@/components/atoms/button";
import { Title } from "@/components/atoms/title";
import { PartnerProgramForm } from "@/components/molecules/forms/PartnerProgramForm";
import Link from "next/link";

interface Props {
  videoSrc: string;
  showGradient?: boolean;
  title: string;
  ctaTitle?: string;
  isLink?: boolean;
  ctaLink?: string;
}

export function CtaVideoSection({
  videoSrc,
  title,
  ctaTitle,
  ctaLink,
  showGradient = false,
  isLink = false,
}: Props) {
  return (
    <section className="relative h-[445.62px] w-full overflow-hidden rounded-t-2xl lg:h-[486px] lg:rounded-t-4xl">
      <video
        autoPlay
        loop
        muted
        className="h-full w-full object-cover object-bottom"
      >
        <source src={videoSrc} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute top-1/2 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 transform text-center text-white">
        <Title className="mb-5 text-[32px] font-normal text-white uppercase lg:text-[40px]">
          {title}
        </Title>

        {isLink ? (
          <Button showGradient={showGradient} asChild>
            <Link href={ctaLink || "#"}>{ctaTitle || "Join Now"}</Link>
          </Button>
        ) : (
          <PartnerProgramForm
            className="mx-auto w-fit"
            showGradient
            title={ctaTitle}
          />
        )}
      </div>
    </section>
  );
}
