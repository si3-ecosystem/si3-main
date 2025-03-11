import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { QuotIcon } from "@/components/molecules/icons/Quot";
import Image from "next/image";

export function TopTestimonial() {
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
              Web3 is not just about the technology - it&apos;s about creating
              accessible systems and services. A recent BCG study revealed
              &quot;major market gaps in women-focused products and services - a
              $32 Trillion opportunity.” <br /> Let&apos;s design intelligently.{" "}
              <br />
              <span className="text-lg underline">
                {" "}
                *BCG, December 2024
              </span>{" "}
              <br />
              <span className="text-lg font-medium text-[#4F4F4F] lg:text-2xl">
                Kara Howard, Ecosystem Lead
              </span>
            </Text>
          </div>
          <div className="h-[384.445px] w-full @3xl:h-full @3xl:max-h-[384.445px] @3xl:max-w-[356.365px]">
            <Image
              src={"/about/kara.jpg"}
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
    </section>
  );
}
