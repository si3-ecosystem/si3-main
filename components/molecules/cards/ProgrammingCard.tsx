import { Avatar, AvatarFallback, AvatarImage } from "@/components/atoms/avatar";
import { Badge } from "@/components/atoms/badge";
import { Card } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { urlForImage } from "@/lib/sanity/image";
import { Presenter, ProgrammingEvent } from "@/types/home";
import Image from "next/image";

type PresentersProps = {
  item: Presenter;
};

function Presenters({ item }: PresentersProps) {
  const imageUrl = item?.image && urlForImage(item.image)?.src;

  const logoUrl = item?.logo && urlForImage(item.logo)?.src;
  console.log("logoUrl", logoUrl);
  return (
    <div className="flex w-full items-center justify-between gap-2 rounded-full bg-[#eeeeee] p-2">
      <div className="flex items-center gap-2">
        <Avatar className="size-9 h-10 w-10">
          <AvatarImage
            className="size-9 h-full w-full object-cover"
            src={imageUrl}
            alt="Kelly King"
          />
          <AvatarFallback className="h-full w-full bg-[#D9D9D9]"></AvatarFallback>
        </Avatar>
        <div className="">
          <Text className="leading-normal font-medium">{item.name}</Text>
          <Text className="line-clamp-1 text-sm leading-4 font-medium whitespace-pre-wrap opacity-50">
            {item.position}
          </Text>
        </div>
      </div>
      <div>
        <Image
          src={logoUrl || "/icons/jpg/polygon.jpg"}
          {...(item?.logo?.blurDataURL && {
            placeholder: "blur",
            blurDataURL: item?.logo?.blurDataURL,
          })}
          width={64}
          height={16}
          alt="polygon"
          className="h-auto w-full max-w-16 object-cover"
        />
      </div>
    </div>
  );
}

type Props = {
  item: ProgrammingEvent;
};

export function ProgrammingCard({ item }: Props) {
  const imageUrl = item.image
    ? urlForImage(item.image)?.src
    : "/icons/jpg/pink-beauty.jpg";
  return (
    <Card className="flex h-full w-full cursor-pointer flex-col justify-between gap-8 overflow-hidden rounded-2xl border border-[#D1D1D1] p-6 transition-all duration-300 !ease-in-out hover:shadow-lg sm:!w-[391px]">
      <div className="relative flex flex-col gap-4">
        <div className="relative h-[259px] w-full overflow-hidden rounded-lg">
          <Image
            src={imageUrl || "/icons/jpg/pink-beauty.jpg"}
            alt={"alt"}
            width={600}
            height={400}
            className="z-0 h-full w-full object-cover"
          />
          <Badge
            variant={"default"}
            className="absolute top-3 left-3 rounded-full bg-white px-2.5 py-1.5 text-sm leading-5 font-medium text-black capitalize"
          >
            {item.date}
          </Badge>
        </div>

        <div className="mb-6 flex flex-col gap-1.5">
          <Text variant="2xl" className="font-semibold">
            {item.title}
          </Text>

          <Text className="leading-5 font-normal tracking-[1.7px] text-[#454545]">
            {item.description}
          </Text>
        </div>
        <ul className="grid w-full gap-1">
          {item?.presenters?.map((item, key) => (
            <Presenters item={item} key={key} />
          ))}
        </ul>
      </div>
    </Card>
  );
}
