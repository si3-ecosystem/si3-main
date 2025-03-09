import { Badge } from "@/components/atoms/badge";
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
  };
};

export function ExplorePartnersCard({ data }: Props) {
  return (
    <div className="@container rounded-[33px] border border-[rgba(0,0,0,0.2)] px-5 py-6 transition-all duration-300 ease-in-out hover:shadow-md lg:px-8 lg:py-[30px]">
      <div className="flex flex-col gap-10 @3xl:flex-row @3xl:gap-[60px]">
        <div className="flex-1">
          <Badge className="mb-6 bg-[#E8C1FF] text-base leading-5 font-medium tracking-[0.16px] text-black">
            {data.subTitle}
          </Badge>
          <Title className="mb-5 text-black">{data.title}</Title>
          <Text className="mb-6 max-w-[535px] leading-7 text-[#454545]">
            {data.description}
          </Text>
          <Button asChild showGradient={true} className="">
            <Link href={data.CtaLink}>{data.CtaText}</Link>
          </Button>
        </div>
        <div className="h-[316px] w-full @3xl:h-full @3xl:max-h-[400px] @3xl:max-w-[400px]">
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
