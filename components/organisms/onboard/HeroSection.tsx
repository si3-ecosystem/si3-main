import { Title } from "@/components/atoms/title";
import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative flex h-[344px] w-full items-center justify-center lg:h-[419px]">
      <Image
        src={"/onboard/onboardHerobg.png"}
        fill
        alt="onboard hero"
        priority
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <Title
        as="h1"
        variant="large"
        className="px-14 text-center text-[32px] text-white uppercase lg:text-5xl"
      >
        Welcome Onboard
      </Title>
    </section>
  );
}
