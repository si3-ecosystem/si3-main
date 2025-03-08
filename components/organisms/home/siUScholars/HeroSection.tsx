import { Button } from "@/components/atoms/button";
import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import Image from "next/image";

export function HeroSection() {
  return (
    <div className="@container py-14 lg:py-20">
      <div className="flex flex-col gap-10 @3xl:flex-row @3xl:gap-[60px]">
        <div className="flex-1">
          <Text className="text-primary mb-3.5 pt-6 text-sm font-medium">
            EDUCATION. COMMUNITY. EXPLORATION.
          </Text>
          <Title className="mb-4 text-black">SI U Scholars</Title>
          <Text className="mb-8 max-w-[535px] leading-7 text-[#454545]">
            A free introductory experience to Web3. Begin your journey into our
            ecosystem through education and community, with an intention towards
            leadership and collaboration.
          </Text>
          <Button showGradient={true}>Join NOw</Button>
        </div>
        <div className="h-[263.874px] w-full @3xl:max-h-[328px] @3xl:max-w-[445px]">
          <Image
            src={"/icons/jpg/si_u_scholars_heroimage.jpg"}
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
