import { Button } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import Image from "next/image";
import Link from "next/link";

type Props = {
  data: {
    title: string;
    description: string;
    subTitle: string;
    CtaText: string;
    CtaLink: string;
    image: string;
    memberShipFee?: string;
  };
};

export function HeroSection({ data }: Props) {
  return (
    <div className="@container py-14 lg:py-20">
      <div className="flex flex-col gap-10 @3xl:flex-row @3xl:gap-[60px]">
        <div className="flex-1">
          <Text className="text-primary mb-3.5 pt-6 text-sm font-medium">
            {data.subTitle}
          </Text>
          <Title className="mb-4 text-black">{data.title}</Title>
          <Text className="mb-8 max-w-[535px] leading-7 text-[#454545]">
            {data.description}
          </Text>
          <Button asChild showGradient={true} className="mb-3">
            <Link href={data.CtaLink}>{data.CtaText}</Link>
          </Button>
          {data?.memberShipFee && (
            <Text className="text-[#585858]">
              {data?.memberShipFee || "*$300 one-time membership fee"}
            </Text>
          )}
        </div>
        <div className="h-[263.874px] w-full @3xl:h-full @3xl:max-h-[328px] @3xl:max-w-[445px]">
          <Image
            src={data.image || "/icons/jpg/si_u_scholars_heroimage.jpg"}
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
