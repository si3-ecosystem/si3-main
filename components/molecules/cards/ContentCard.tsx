import { cn } from "@/lib/utils";
import { Title } from "@/components/atoms/title";
import { Text } from "@/components/atoms/text";
import { Button } from "@/components/atoms/button";
import Link from "next/link";

interface ButtonProps {
  ctaText: string;
  link: string;
  ariaLabel?: string;
  as?: React.ElementType;
  className?: string;
  showGradient?: boolean;
}

interface ImageSource {
  mobileSrc: string;
  desktopSrc: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
}

interface ContentCardProps {
  title: string;
  description: string;
  image: ImageSource;
  button?: ButtonProps;
  className?: string;
  isFullScreenView?: boolean;
}

export const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  image,
  button,
  className,
  isFullScreenView = false,
}) => {
  const {
    mobileSrc,
    desktopSrc,
    alt,
    width = 1532,
    height = 862,
    className: imageClassName,
  } = image;
  return (
    <div
      className={cn(
        "relative flex w-full flex-col items-center justify-between gap-10 overflow-hidden rounded-lg bg-white lg:flex-row lg:gap-24",
        isFullScreenView ? "max-lg:px-4 lg:pl-24" : "",
        className,
      )}
    >
      <div className="ml-auto w-full space-y-4 lg:max-w-[970px] lg:space-y-6">
        <Title
          className={cn(
            "lg:max-w-[455px] lg:text-left",
            isFullScreenView ? "text-center" : "",
          )}
        >
          {title}
        </Title>
        <Text
          className={cn(
            "max-w-[667px] lg:text-left",
            isFullScreenView ? "text-center" : "",
          )}
        >
          {description}
        </Text>
        {button ? (
          <Link href={button?.link || "#"} scroll={false}>
            <Button showGradient={true} className={cn("mt-4 bg-black")}>
              {button?.ctaText}
            </Button>
          </Link>
        ) : null}
      </div>

      <div className="w-full max-w-[513px]">
        <picture>
          <source media="(min-width: 1025px)" srcSet={desktopSrc} />
          <source media="(max-width: 1024px)" srcSet={mobileSrc} />
          <img
            src={desktopSrc}
            alt={alt}
            width={width}
            height={height}
            loading="lazy"
            decoding="async"
            className={cn(
              "h-full max-h-[643px] w-full rounded-lg lg:max-h-[500px]",
              imageClassName,
            )}
          />
        </picture>
      </div>
    </div>
  );
};
