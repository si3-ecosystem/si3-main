import { Badge } from "@/components/atoms/badge";
import { Card, CardContent } from "@/components/atoms/card";
import { Text } from "@/components/atoms/text";
import { MapPin } from "lucide-react";
import Image from "next/image";
import { WarpcastHandle } from "../icons/WarpcastHandle";
import { TwitterIcon } from "../icons/TwitterIcon";
import { Button } from "@/components/atoms/button";
import { Community } from "@/types/home";
import { urlForImage } from "@/lib/sanity/image";
import Link from "next/link";

export function CollabCard({ item }: { item: Community }) {
  const image = item?.communityLogo
    ? urlForImage(item.communityLogo)?.src
    : "/icons/jpg/sihericon.jpg";
  return (
    <Card className="h-fit cursor-pointer overflow-hidden rounded-2xl border border-[#D1D1D1] !p-0 transition-all duration-300 !ease-in-out hover:shadow-lg sm:!h-full">
      <CardContent className="flex h-full flex-col justify-between !p-0">
        <div className="flex h-fit flex-col">
          <div className="relative z-20 flex h-full w-full flex-col gap-6 px-5 pt-5">
            <Image
              src={"/icons/jpg/collabcardbg.jpg"}
              alt={"community_bg"}
              title={"Background"}
              decoding="async"
              loading="lazy"
              width={600}
              height={400}
              className="absolute top-0 right-0 left-0 -z-10 h-full w-full object-cover object-left"
            />
            <div className="z-10 flex w-full items-start justify-between gap-4">
              <div className="flex h-[75px] w-[75px] items-center justify-center rounded-[14px] bg-white p-2 shadow-md">
                <Image
                  src={image || "/icons/jpg/sihericon.jpg"}
                  alt={item.communityName}
                  title={item.communityName}
                  decoding="async"
                  loading="lazy"
                  width={56}
                  height={56}
                  className="h-full w-full rounded-sm object-contain"
                />
              </div>
              <span className="flex items-center gap-2">
                <MapPin className="text-primary size-4" />
                <p className="text-primary text-base leading-6 font-normal">
                  {item.communityLocation}
                </p>
              </span>
            </div>
            <div className="flex flex-col gap-2 pb-3">
              <h4 className="line-clamp-2 text-xl leading-normal font-semibold tracking-tight whitespace-pre-wrap text-black uppercase">
                {item.communityName}
              </h4>
              {item.communityType && (
                <Badge
                  variant="outline"
                  className="gap-1.5 border-none bg-none outline-none"
                >
                  <span
                    className="size-1.5 rounded-full bg-black"
                    aria-hidden="true"
                  ></span>
                  {item.communityType}
                </Badge>
              )}
            </div>
          </div>
          <div className="flex flex-col gap-6 bg-white px-5 py-6">
            <Text
              className="line-clamp-5 break-words whitespace-pre-wrap"
              variant="base"
            >
              {item.communityDescription}
            </Text>
            <ul className="flex flex-col gap-2.5">
              {item.xHandle && (
                <li className="flex items-center gap-2">
                  <TwitterIcon />
                  <Link
                    href={`https://twitter.com/${item.xHandle}`}
                    target="_blank"
                    className="text-primary"
                  >
                    {item.xHandle}
                  </Link>
                </li>
              )}
              {item.communityWebsite && (
                <li className="flex items-center gap-2">
                  <WarpcastHandle />
                  <Link
                    target="_blank"
                    href={item.communityWebsite}
                    className="text-primary"
                  >
                    {item.communityWebsite}
                  </Link>
                </li>
              )}
              {item.warpastHandle && (
                <li className="flex items-center gap-2">
                  <WarpcastHandle />
                  <Link
                    target="_blank"
                    href={`https://warpcast.com/${item.warpastHandle}`}
                    className="text-primary"
                  >
                    {item.warpastHandle}
                  </Link>
                </li>
              )}
            </ul>
          </div>
        </div>
        <div className="w-full px-5 pb-4">
          <Button
            variant={"outline"}
            asChild
            className="w-full border-2 border-black hover:bg-black hover:text-white"
          >
            <Link href={item.discover}>Discover Now</Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
