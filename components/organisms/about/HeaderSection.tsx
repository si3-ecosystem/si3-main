import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import Image from "next/image";

export function HeaderSection() {
  return (
    <section className="about_gradient h-full min-h-[70vh] w-full lg:min-h-[861px]">
      <Image
        src={"/about/hero/about_herobg.jpg"}
        fill
        alt="about_hero"
        className="-z-10 h-full w-full object-cover"
      />
      <div className="flex h-full min-h-[70vh] w-full max-w-[1440px] flex-col justify-center gap-3 px-4 lg:min-h-[80vh] lg:px-[90px]">
        <Title
          as="h1"
          variant="large"
          className="max-w-[608.951px] !text-left !leading-none text-white"
        >
          BUILDING A MORE CONNECTED REALITY.
        </Title>
        <Text variant="2xl" className="text-left text-white">
          Activating the WE in Web3.
        </Text>
      </div>
    </section>
  );
}
