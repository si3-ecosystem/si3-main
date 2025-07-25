import { Text } from "@/components/atoms/text";
import { Title } from "@/components/atoms/title";
import { SiHerGuidesForm } from "@/components/molecules/forms/siHerGuidesForm";
import { urlForImage } from "@/lib/sanity/image";
import { SanityImage, Web3Brand as Web3Type } from "@/types/home";
import Image from "next/image";

type ItemProps = {
  item: {
    galleryTitle: string;
    images?: SanityImage[];
  };
};

function BrandCard({ item }: ItemProps) {
  return (
    <li className="flex w-full items-center justify-between gap-4 rounded-full border border-gray-300 bg-white px-4 py-3 transition-all duration-300 ease-in-out hover:shadow-md">
      <Text className="text-[#000000] opacity-80">{item.galleryTitle}</Text>
      <ul className="flex items-center gap-5">
        {item?.images?.map((image, key) => {
          const imageUrl = urlForImage(image)?.src;
          return (
            <div className="h-full w-full" key={key}>
              <Image
                src={imageUrl || "/icons/jpg/push.jpg"}
                alt="push"
                loading="lazy"
                decoding="async"
                width={400}
                height={300}
                className="aspect-auto h-full max-h-[26.066px] w-[114px] object-contain"
              />
            </div>
          );
        })}
      </ul>
    </li>
  );
}

type Props = {
  data: Web3Type;
};

export function Web3Brand({ data }: Props) {
  const videoUrl = data.video?.videoUrl;

  console.log("data", data.video?.videoUrl);

  return (
    <div className="@container mt-2">
      <div className="flex flex-col gap-10 @3xl:flex-row @3xl:gap-[60px]">
        <div className="flex-1">
          <Title className="mb-4 !text-xl font-bold text-black max-lg:mx-auto max-lg:text-center max-sm:max-w-[170px] lg:!text-3xl">
            {data?.title}
          </Title>
          <Text className="mb-6 max-w-[535px] leading-7 text-black">
            {data.description}
          </Text>

          <div className="mb-6 hidden lg:block">
            <SiHerGuidesForm title={"APPLY NOW"} className="" fill={true} />
          </div>
          <ul className="grid gap-3">
            {data?.gallery?.map((item, key) => (
              <BrandCard item={item} key={key} />
            ))}
          </ul>
        </div>
        <div className="relative w-full @xl:h-auto @3xl:h-[589.217px] @3xl:max-w-[445px]">
          {videoUrl && videoUrl.endsWith(".gif") ? (
            <Image
              width={600}
              height={600}
              src={videoUrl}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              alt="Web3 Brand GIF"
              className="mx-auto w-full max-w-full object-contain object-center lg:h-[589px] xl:h-full"
              priority
              unoptimized
            />
          ) : (
            <video
              src={videoUrl || "/videos/SiUScholars.mp4"}
              playsInline
              controls
              preload="metadata"
              className="mx-auto h-full max-h-[589px] w-full max-w-[275px] object-cover object-center xl:h-full"
            />
          )}
        </div>

        <div className="mb-6 block lg:hidden">
          <SiHerGuidesForm title={"APPLY NOW"} className="" fill={true} />
        </div>
      </div>
    </div>
  );
}
