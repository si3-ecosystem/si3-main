import { Badge } from "@/components/atoms/badge";
import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { urlForImage } from "@/lib/sanity/image";
import { ExploreItem } from "@/types/home";
import Image from "next/image";
import { PartnerProgramForm } from "../forms/PartnerProgramForm";

type Props = {
  item: ExploreItem;
};

export function ExplorePartnersCard({ item }: Props) {
  const imageUrl = item?.image
    ? urlForImage(item.image)?.src
    : "/icons/jpg/si_u_scholars_heroimage.jpg";

  const cardId =
    item.subTitle === "DEAI tRAINING"
      ? "si_partners_campaigns"
      : item.subTitle === "Partner Workshops & Events"
        ? "si_partners_training"
        : "";

  return (
    <div
      id={cardId}
      className="@container mt-16 rounded-[33px] border border-[rgba(0,0,0,0.2)] bg-white px-5 py-6 transition-all duration-300 ease-in-out hover:shadow-md lg:px-8 lg:py-[30px]"
    >
      <div className="flex flex-col gap-10 @3xl:flex-row @3xl:gap-[60px]">
        <div className="flex-1">
          <Badge className="mb-6 bg-[#E8C1FF] text-base leading-5 font-medium tracking-[0.16px] text-black">
            {item.subTitle}
          </Badge>
          <Title className="mb-5 text-black">{item.title}</Title>
          <Text className="mb-6 max-w-[535px] leading-7 text-[#454545]">
            {item.description}
          </Text>

          <PartnerProgramForm
            className="mx-auto w-fit bg-black text-white"
            showGradient
            title={item.ctaText}
          />
        </div>
        <div className="h-[316px] w-full @3xl:h-full @3xl:max-h-[400px] @3xl:max-w-[400px]">
          <Image
            src={imageUrl || "/icons/jpg/si_u_scholars_heroimage.jpg"}
            alt="si ui scholars image"
            width={600}
            height={328}
            decoding="async"
            loading="lazy"
            className="h-full w-full rounded-lg object-cover object-center"
          />
        </div>
      </div>
    </div>
  );
}
