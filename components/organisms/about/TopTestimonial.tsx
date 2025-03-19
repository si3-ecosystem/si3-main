"use client";

import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { QuotIcon } from "@/components/molecules/icons/Quot";
import { urlForImage } from "@/lib/sanity/image";
import { Testimonial } from "@/types/about";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";

type Props = {
  data: Testimonial;
};

export function TopTestimonial({ data }: Props) {
  const imageUrl = data.image
    ? urlForImage(data.image)?.src
    : "/about/kara.jpg";

  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const card = cardRef.current;
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;

    const rotateX = -(mouseY / (rect.height / 2)) * 10;
    const rotateY = (mouseX / (rect.width / 2)) * 10;

    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg)`;
  };

  return (
    <section className="mx-auto w-full max-w-[1440px] px-4 py-14 lg:px-[90px] lg:py-20">
      <div className="@container">
        <div className="flex flex-col gap-10 @3xl:flex-row @3xl:items-center @3xl:gap-[60px]">
          <div className="flex-1">
            <Title className="mb-4 text-black">
              <QuotIcon />
            </Title>
            <Text
              variant="2xl"
              className="max-w-[535px] text-2xl leading-[140%] text-black lg:mb-8 lg:text-3xl lg:leading-normal"
            >
              {data.quote}
              <br />
              <Link
                href={data.sourceUrl || "#"}
                target="_blank"
                className="text-lg underline"
              >
                {" "}
                {data.sourceTitle}
              </Link>{" "}
              <br />
              <span className="text-lg font-medium text-[#4F4F4F] lg:text-2xl">
                {data.author}
              </span>
            </Text>
          </div>
          <div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            className="h-[384.445px] w-full transition-transform duration-300 ease-out @3xl:h-full @3xl:max-h-[384.445px] @3xl:max-w-[356.365px]"
          >
            <Image
              src={imageUrl || "/about/kara.jpg"}
              alt={data.author || "si ui scholars image"}
              {...(data.image?.blurDataURL && {
                placeholder: "blur",
                blurDataURL: data.image?.blurDataURL,
              })}
              width={600}
              height={328}
              decoding="async"
              loading="lazy"
              className="h-full w-full rounded-lg object-cover object-center shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
