import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import Image from "next/image";

function BrandCard() {
  return (
    <li className="flex w-full items-center justify-between gap-4 rounded-full border border-gray-300 px-4 py-3 transition-all duration-300 ease-in-out hover:shadow-md">
      <Text>Decentralized Identities</Text>
      <div>
        <Image
          src={"/icons/jpg/push.jpg"}
          alt="push"
          width={114}
          height={30}
          className="h-auto w-full max-w-[113px] object-cover"
        />
      </div>
    </li>
  );
}

export function Web3Brand() {
  return (
    <div className="@container py-14 lg:py-20">
      <div className="flex flex-col gap-10 @3xl:flex-row @3xl:gap-[60px]">
        <div className="flex-1">
          <Title className="mb-4 text-black">Activate Your Web3 Brand</Title>
          <Text className="mb-6 max-w-[535px] leading-7 text-[#454545]">
            Create your own siher.eth personal brand website with our
            Web3-enabled features.
          </Text>
          <ul className="grid gap-3">
            {Array.from({ length: 5 }).map((item, key) => (
              <BrandCard key={key} />
            ))}
          </ul>
        </div>
        <div className="w-full @max-3xl:h-[489.217px] @3xl:h-full @3xl:max-h-[489.217px] @3xl:max-w-[445px]">
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
