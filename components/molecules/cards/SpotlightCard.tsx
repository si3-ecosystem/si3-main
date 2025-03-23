import { Button } from "@/components/atoms/button";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { urlForImage } from "@/lib/sanity/image";
import { PortableText } from "@/lib/sanity/portabletext";
import { Member } from "@/types/home";
import { MapPin } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  item: Member;
};

export function SpotlightCard({ item }: Props) {
  const imageUrl = item?.image
    ? urlForImage(item.image)?.src
    : "/icons/jpg/pink-beauty.jpg";

  return (
    <Card className="flex h-full w-full cursor-pointer flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-[#D1D1D1] p-6 transition-all duration-300 !ease-in-out hover:shadow-lg sm:!w-[391px]">
      <div className="flex flex-col gap-4">
        <div className="group relative h-[303.924px] w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl || "/icons/jpg/pink-beauty.jpg"}
            alt={"alt"}
            width={600}
            height={400}
            className="z-0 h-full w-full object-cover transition-all duration-300 ease-in group-hover:scale-[1.02]"
          />
        </div>
        <div className="flex flex-col gap-3">
          <Text variant="2xl" className="font-semibold">
            {item.name}
          </Text>
          <div className="mb-4 flex items-center gap-5">
            <Text className="flex items-center gap-2 text-base tracking-[1.73px] text-[#696969]">
              <MapPin className="size-6 shrink-0" />
              <span>{item.country}</span>
            </Text>
            <Text className="flex items-center gap-2 text-base tracking-[1.73px] text-[#696969]">
              <Image
                src={"/icons/svg/profile.svg"}
                alt="profile"
                className="size-6 h-6 w-6"
                width={40}
                height={40}
              />
              <span>{item.position}</span>
            </Text>
          </div>
          <Text className="prose font-normal tracking-[1.7px]">
            {item?.description && <PortableText value={item?.description} />}
          </Text>
        </div>
      </div>
      <div className="w-full">
        <Button
          asChild
          variant={"outline"}
          className="w-full border-2 border-black"
        >
          <Link href={`${item?.link || "#"}`} target="_blank">
            {item.email}
          </Link>
        </Button>
      </div>
    </Card>
  );
}
