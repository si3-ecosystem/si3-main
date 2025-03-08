import Image from "next/image";
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

interface ContentCardProps {
  title: string;
  description: string;
  image: {
    src: string;
    alt: string;
    width?: number;
    height?: number;
    className?: string;
  };
  button?: ButtonProps;
  className?: string;
  isFullScreenView?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({
  title,
  description,
  image,
  button,
  className,
  isFullScreenView = false,
}) => {
  const {
    src,
    alt,
    width = 1532,
    height = 862,
    className: imageClassName,
  } = image;
  const LinkComponent = button?.as || "a";

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
        {button && (
          <Button
            asChild
            showGradient={button.showGradient}
            className={cn("mt-4 bg-black", button.className)}
          >
            {LinkComponent ? (
              <Link
                href={button.link}
                scroll={false}
                aria-label={button.ariaLabel || button.ctaText}
              >
                {button.ctaText}
              </Link>
            ) : (
              button.ctaText
            )}
          </Button>
        )}
      </div>

      <div className="w-full max-w-[513px]">
        <Image
          src={src}
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
      </div>
    </div>
  );
};

export default ContentCard;
